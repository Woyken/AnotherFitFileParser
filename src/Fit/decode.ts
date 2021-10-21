import { Header } from '../InternalTypes/header';
import { ByteStreamReader } from '../Utility/byteStreamReader';
import { DecodeMode } from './decodeMode';
import { Fit } from './fit';
import { MesgDefinition, MesgDefinitionAny, MessageListMessageTypeWithInvalid } from './mesgDefinition';
import { Mesg, MesgAny } from './mesg';
import { Accumulator } from './accumulator';
import { CRC } from './crc';
import { Field, FieldAny } from './field';
import { FieldComponent } from './fieldComponent';
import { MesgNum } from './Profile/Types/mesgNum';
import { DeveloperDataIdMesg, DeveloperDataIdMessage } from './Profile/Mesgs/developerDataIdMesg';
import { FieldDescriptionMesg, FieldDescriptionMessage } from './Profile/Mesgs/fieldDescriptionMesg';
import { ArrayElement, messageFieldsMapByName } from '../profile/index';
import { FieldDefinition } from './fieldDefinition';

export class Decode {
    private readonly CRCSIZE: number = 2;
    private readonly INVALID_DATA_SIZE: number = 0;

    /** Message definitions in current FIT file */
    private localMesgDefs: MesgDefinitionAny[] = new Array<MesgDefinitionAny>(Fit.maxLocalMesgs);
    private fileHeader?: Header;
    private timestamp: number = 0;
    private invalidDataSize: boolean = false;
    private accumulator: Accumulator = new Accumulator();

    private readonly developerFieldLookup: FieldDescriptionMesg[] = [];
    private readonly developerDataLookup: DeveloperDataIdMesg[] = [];

    public get InvalidDataSize(): boolean {
        return this.invalidDataSize;
    }
    public set InvalidDataSize(value: boolean) {
        this.invalidDataSize = value;
    }

    constructor() {
    }

    public mesgEvent?: (mesg: MesgAny) => void;

    /**
     * Reads the file header to check if the file is FIT.
     * Does not check CRC.
     * Returns true if file is FIT.
     * @param fitStream Seekable (file)stream to parse
     */
    public isFit(fitStream: ByteStreamReader): boolean {
        const position = fitStream.position;
        let status = false;
        const header = new Header(fitStream);
        status = header.isValid();

        fitStream.position = position;
        return status;
    }

    /**
     * Reads the FIT binary file header and crc to check compatibility and integrity.
     * Also checks data reords size.
     * Returns true if file is ok (not corrupt).
     * @param fitStream Seekable (file)stream to parse.
     */
    public checkIntegrity(fitStream: ByteStreamReader): boolean {
        let isValid = true;
        const position = fitStream.position;
        let fileSize = 0;
        // TODO: Investigate if needed try/catch
        while ((fitStream.position < fitStream.length) && isValid) {
            // Is there a valid header?
            const header = new Header(fitStream);
            isValid = header.isValid();

            // Get the file size from the header
            // When the data size is 0 set flags, don't calculate CRC
            if (header.dataSize > this.INVALID_DATA_SIZE) {
                fileSize = header.size + header.dataSize + this.CRCSIZE;

                // Is the file CRC ok?
                // Need to rewind the header size because the header is part of the CRC calculation.

                const data: number[] = new Array(fileSize);

                fitStream.position = fitStream.position - header.size;
                fitStream.read(data, 0, data.length);
                isValid = isValid && (CRC.calc16(data, data.length) === 0x0000);
            } else {
                this.invalidDataSize = true;
                isValid = false;
            }
        }
        fitStream.position = position;
        return isValid;
    }

    /**
     * Reads a FIT binary File
     * @param fitStream Seekable (file)stream to parse.
     * @param mode Decode Mode to use for reading the file
     * @returns Returns true if reading finishes successfully.
     */
    public read(fitStream: ByteStreamReader, mode?: DecodeMode): boolean {
        if (mode === undefined) {
            return this.readWithoutMode(fitStream);
        }
        return this.readWithMode(fitStream, DecodeMode.Normal);
    }

    private readWithoutMode(fitStream: ByteStreamReader): boolean {
        let status = true;
        const position = fitStream.position;

        while ((fitStream.position < fitStream.length) && status) {
            status = this.read(fitStream, DecodeMode.Normal);
        }

        fitStream.position = position;

        return status;
    }

    private readWithMode(fitStream: ByteStreamReader, mode: DecodeMode): boolean {
        let readOK = true;
        let fileSize = 0;
        const filePosition = fitStream.position;
        // TODO: Investigate if needed try/catch

        // Attempt to read header
        if (mode === DecodeMode.Normal) {
            this.fileHeader = new Header(fitStream);
            readOK = readOK && this.fileHeader.isValid();

            // Get the file size from the header
            // When the data size is invalid set the file size to the fitstream length
            if (!this.invalidDataSize) {
                fileSize = this.fileHeader.size + this.fileHeader.dataSize + this.CRCSIZE;
            } else {
                fileSize = fitStream.length;
            }

            if (!readOK) {
                throw new Error(`FIT decode error: File is not FIT format. Check file header data type. Error at stream position: ${fitStream.position}`);
            }
            if ((this.fileHeader.protocolVersion & Fit.protocolVersionMajorMask) > (Fit.protocolMajorVersion << Fit.protocolVersionMajorShift)) {
                // The decoder does not support decode accross protocol major revisions
                throw new Error(`FIT decode error: Protocol Version ${(this.fileHeader.protocolVersion & Fit.protocolVersionMajorMask) >> Fit.protocolVersionMajorShift}.X not supported by SDK Protocol Ver${Fit.protocolMajorVersion}.${Fit.protocolMinorVersion} `);
            }
        } else if (mode === DecodeMode.InvalidHeader) {
            // When skipping the header force the stream position to be at the beginning of the data
            // Also the fileSize is the length of the filestream.
            fitStream.position += Fit.headerWithCRCSize;
            fileSize = fitStream.length;
        } else if (mode === DecodeMode.DataOnly) {
            // When the stream is only data move the position of the stream
            // to the start. FileSize is the length of the stream
            fitStream.position = 0;
            fileSize = fitStream.length;
        } else {
            throw new Error('Invalid Decode Mode Provided to read');
        }

        // Read data messages and definitions
        while (fitStream.position < (filePosition + fileSize - this.CRCSIZE)) {
            this.decodeNextMessage(fitStream);
        }

        // Is the file CRC ok?
        if ((mode === DecodeMode.Normal) && !this.invalidDataSize) {
            const data: number[] = new Array(fileSize);
            fitStream.position = filePosition;
            fitStream.read(data, 0, data.length);
            readOK = readOK && (CRC.calc16(data, data.length) === 0x0000);
            fitStream.position = filePosition + fileSize;
        }
        return readOK;
    }

    public decodeNextMessage(fitStream: ByteStreamReader): void {
        const messageHeaderByte = fitStream.readByte();

        // Is it a compressed timestamp mesg?
        if ((messageHeaderByte & Fit.compressedHeaderMask) === Fit.compressedHeaderMask) {
            const mesgBuffer: number[] = [];
            const timeOffset = messageHeaderByte & Fit.compressedTimeMask;
            if (timeOffset >= (this.timestamp & Fit.compressedTimeMask)) {
                // If Time Offset >= (Previous Timestamp)&0x0000001F (i.e. offset value is greater than least significant 5 bits of previous timestamp):
                // Timestamp = (Previous timestamp) & 0xFFFFFFE0 + Time Offset
                this.timestamp = (this.timestamp & Fit.compressedTimeOffsetMask) + timeOffset;
            }
            else {
                // If Time Offset < (Previous Timestamp) & 0x0000001F (i.e. offset is less than least significant 5 bits of previous timestamp):
                // Timestamp = (Previous timestamp) & 0xFFFFFFE0 + Time Offset + 0x20
                // The addition of 0x20 accounts for the rollover event
                this.timestamp = (this.timestamp & Fit.compressedTimeOffsetMask) + timeOffset + 0x20;
            }

            // Local message is limited to 2 bits here, needs to be defined in the beginning of the file
            const localMesgNum: number = ((messageHeaderByte & Fit.compressedLocalMesgNumMask) >> 5);
            mesgBuffer.push(localMesgNum);
            if (this.localMesgDefs[localMesgNum] == null) {
                throw new Error(`Decode:DecodeNextMessage - FIT decode error: Missing message definition for local message number ${localMesgNum} at stream position ${fitStream.position}`);
            }
            const fieldsSize: number = this.localMesgDefs[localMesgNum].getMesgSize() - 1;

            // TODO: Investigate if needed try/catch
            const read: number[] = fitStream.readBytes(fieldsSize);
            if (read.length < fieldsSize) {
                throw new Error(`Field size mismatch, expected: ${fieldsSize} received: ${read.length}`);
            }
            mesgBuffer.push(...read);

            const timestampFieldType = messageFieldsMapByName.record_timestamp.field;
            const timestampFieldDef = new FieldDefinition(timestampFieldType, 1, messageFieldsMapByName.record_timestamp.field.baseType)
            const timestampField = new Field(timestampFieldDef);
            timestampField.setValue1(this.timestamp);

            const newMesg = Mesg.readAndCreate(new ByteStreamReader(new Uint8Array(mesgBuffer)), this.localMesgDefs[localMesgNum]);
            // Somehow it doesn't like the types... Manual cast it is..
            newMesg.insertField(0, timestampField as Field<ArrayElement<typeof newMesg.messageDefinition.profileMessage.fields>>);
            if (!this.handleMetaData(newMesg))
                this.raiseMesgEvent(newMesg);
        } else if ((messageHeaderByte & Fit.mesgDefinitionMask) === Fit.mesgDefinitionMask) {
            // Is it a mesg def?
            const mesgDefBuffer: number[] = [];

            // Figure out number of fields (length) of our defn and build buffer
            mesgDefBuffer.push(messageHeaderByte);
            mesgDefBuffer.push(...fitStream.readBytes(4));
            const numFields: number = fitStream.readByte();
            mesgDefBuffer.push(numFields);
            let numBytes: number = numFields * 3; // 3 Bytes per field

            // TODO: Investigate if needed try/catch
            let read: number[] = fitStream.readBytes(numBytes);
            if (read.length < numBytes) {
                throw new Error(`Message Definition size mismatch, expected: ${numBytes} received: ${read.length}`);
            }
            mesgDefBuffer.push(...read);

            if ((messageHeaderByte & Fit.devDataMask) === Fit.devDataMask) {
                // Definition Contains Dev Data
                const numDevFields: number = fitStream.readByte();
                mesgDefBuffer.push(numDevFields);

                numBytes = numDevFields * 3;
                read = fitStream.readBytes(numBytes);
                if (read.length < numBytes) {
                    throw new Error(`Message Definition size mismatch, expected: ${numBytes} received: ${read.length}`);
                }

                // Read Dev Data
                mesgDefBuffer.push(...read);
            }

            const newMesgDef = MesgDefinition.createMesgDef(new ByteStreamReader(new Uint8Array(mesgDefBuffer)), this.developerDataLookup);
            // Set message def by local id, can override previous message defs if needed
            this.localMesgDefs[newMesgDef.localMesgNum] = newMesgDef;
        } else if ((messageHeaderByte & Fit.mesgDefinitionMask) === Fit.mesgHeaderType) {
            // Is it a data mesg?
            const mesgBuffer: number[] = [];

            const localMesgNum: number = (messageHeaderByte & Fit.localMesgNumMask);
            mesgBuffer.push(localMesgNum);
            if (this.localMesgDefs[localMesgNum] == null) {
                throw new Error(`Decode:DecodeNextMessage - FIT decode error: Missing message definition for local message number ${localMesgNum} at stream position ${fitStream.position}`);
            }
            // TODO: Investigate if needed try/catch
            const fieldsSize: number = this.localMesgDefs[localMesgNum].getMesgSize() - 1;
            const read: number[] = fitStream.readBytes(fieldsSize);
            if (read.length < fieldsSize) {
                throw new Error(`Field size mismatch, expected: ${fieldsSize} received: ${read.length}`);
            }
            mesgBuffer.push(...read);

            const newMesg = Mesg.readAndCreate(new ByteStreamReader(new Uint8Array(mesgBuffer)), this.localMesgDefs[localMesgNum]);
            // If the new message contains a timestamp field, record the value to use as
            // a reference for compressed timestamp headers
            const timestampField = newMesg.getField('timestamp');
            if (timestampField !== undefined) {
                const tsValue = timestampField.getValue3();
                if (tsValue !== undefined) {
                    if (typeof tsValue !== 'number')
                        throw new Error("invalid timestamp value");
                    this.timestamp = tsValue;
                }
            }

            newMesg.fields.forEach((field: FieldAny) => {
                if (field.IsAccumulated) {
                    for (let i = 0; i < field.getNumValues(); i++) {
                        let value = field.getRawValue(i);

                        if (typeof value !== 'number')
                            throw new Error("TODO need to investigate how to tread undefined and string types with components");

                        newMesg.fields.forEach((fieldIn) => {
                            fieldIn.components.forEach((fc: FieldComponent) => {
                                if (field.fieldDefinition.profileField.scale === undefined || field.fieldDefinition.profileField.offset === undefined)
                                    return; // Not much use if they are undefined, maybe should treat as 0?
                                if (typeof value !== 'number')
                                    throw new Error("TODO need to investigate how to tread undefined and string types with components");

                                if (
                                    (fc.fieldNum === field.fieldDefinition.profileField.id) && (fc.accumulate)
                                ) {
                                    value = ((((value / field.fieldDefinition.profileField.scale) - field.fieldDefinition.profileField.offset) + fc.offset) * fc.scale);
                                }
                            });
                        });
                        this.accumulator.set(newMesg.messageDefinition.profileMessage.id, field.fieldDefinition.profileField.id, value);
                    }
                }
            });

            // Now that the entire message is decoded we can evaluate subfields and expand any components
            newMesg.expandComponents(this.accumulator);
            if (!this.handleMetaData(newMesg))
                this.raiseMesgEvent(newMesg);
        } else {
            throw new Error(`Decode:Read - FIT decode error: Unexpected Record Header Byte 0x${messageHeaderByte} at stream position: ${fitStream.position}`);
        }
    }

    private raiseMesgEvent(newMesg: MesgAny): void {
        if (this.mesgEvent) {
            this.mesgEvent(newMesg);
        }
    }

    private handleMetaData<T extends MessageListMessageTypeWithInvalid>(newMesg: Mesg<T>): boolean {
        const profileMessage = newMesg.messageDefinition.profileMessage;
        if (profileMessage.id === MesgNum.developerDataId) {
            // Typescript can't narrow this type, manual cast it is
            const mesg = newMesg as unknown as Mesg<DeveloperDataIdMessage>;
            const developerDataIdMesg = new DeveloperDataIdMesg(mesg);
            this.developerDataLookup.push(developerDataIdMesg);
            return true;
        } else if (profileMessage.id === MesgNum.fieldDescription) {
            // Typescript can't narrow this type, manual cast it is
            const mesg = newMesg as unknown as Mesg<FieldDescriptionMessage>;
            const developerDataIndex = mesg.getFieldValue(0, 0, Fit.subfieldIndexMainField);
            const developerDataIdMesg = this.developerDataLookup.find(x => x.developerDataIndex === developerDataIndex);
            if (!developerDataIdMesg)
                throw new Error(`can't be undefined`);
            const fieldDescriptionMesg = new FieldDescriptionMesg(mesg, developerDataIdMesg);
            developerDataIdMesg.addFieldDescription(fieldDescriptionMesg);

            this.developerFieldLookup.push(fieldDescriptionMesg);
            return true;
        }
        return false
    }
}
