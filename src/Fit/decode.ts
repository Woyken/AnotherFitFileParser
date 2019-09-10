import { Header } from '../InternalTypes/header';
import { ByteStreamReader } from '../Utility/byteStreamReader';
import { DecodeMode } from './decodeMode';
import { Fit } from './fit';
import { DeveloperFieldDescription } from './developerFieldDescription';
import { MesgDefinition } from './mesgDefinition';
import { Mesg } from './mesg';
import { Accumulator } from './accumulator';
import { DeveloperDataLookup } from './developerDataLookup';
import { CRC } from './crc';
import { Field } from './field';
import { Profile } from './profile';

export class Decode {
    private readonly CRCSIZE: number = 2;
    private readonly INVALID_DATA_SIZE = 0;

    //#region Fields
    // tslint:disable-next-line: prefer-array-literal
    private localMesgDefs: MesgDefinition[] = new Array<MesgDefinition>(Fit.maxLocalMesgs);
    private fileHeader?: Header;
    private timestamp: number = 0;
    private lastTimeOffset: number = 0;
    private invalidDataSize: boolean = false;
    private accumulator: Accumulator = new Accumulator();

    private readonly lookup: DeveloperDataLookup = new DeveloperDataLookup();
    //#endregion

    //#region Properties
    public get InvalidDataSize(): boolean {
        return this.invalidDataSize;
    }
    public set InvalidDataSize(value: boolean) {
        this.invalidDataSize = value;
    }
    //#endregion

    //#region Constructors
    constructor() {
    }
    //#endregion

    //#region Methods
    public mesgEvent?: (mesg: Mesg) => {};
    public mesgDefinitionEvent?: () => {};
    public developerFieldDescriptionEvent?: (description: DeveloperFieldDescription) => {};

    /**
     * Reads the file header to check if the file is FIT.
     * Does not check CRC.
     * Returns true if file is FIT.
     * @param fitStream Seekable (file)stream to parse
     */
    public isFit(fitStream: ByteStreamReader): boolean {
        const position = fitStream.position;
        let status = false;
        // TODO: Investigate if needed try/catch
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

                // tslint:disable-next-line:prefer-array-literal
                const data: number[] = new Array(fileSize);

                fitStream.position = fitStream.position - header.size;
                fitStream.read(data, 0, data.length);
                isValid = isValid && (CRC.Calc16(data, data.length) === 0x0000);
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
            // tslint:disable-next-line: max-line-length
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
            // tslint:disable-next-line: prefer-array-literal
            const data: number[] = new Array(fileSize);
            fitStream.position = filePosition;
            fitStream.read(data, 0, data.length);
            readOK = readOK && (CRC.calc16(data, data.length) === 0x0000);
            fitStream.position = filePosition + fileSize;
        }
        return readOK;
    }

    public decodeNextMessage(fitStream: ByteStreamReader) {
        const nextByte = fitStream.readByte();

        // Is it a compressed timestamp mesg?
        if ((nextByte & Fit.compressedHeaderMask) === Fit.compressedHeaderMask) {
            const mesgBuffer: number[] = [];
            const timeOffset = nextByte & Fit.compressedTimeMask;
            this.timestamp += ((timeOffset - this.lastTimeOffset) & Fit.compressedTimeMask);
            this.lastTimeOffset = timeOffset;
            const timestampField: Field = new Field(Profile.getMesg(MesgNum.record).getField('Timestamp'));
            timestampField.setValue(this.timestamp);

            const localMesgNum: number = ((nextByte & Fit.compressedLocalMesgNumMask) >> 5);
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

            const newMesg: Mesg = new Mesg(mesgBuffer, this.localMesgDefs[localMesgNum]);
            newMesg.insertField(0, timestampField);
            this.raiseMesgEvent(newMesg);
        } else if ((nextByte & Fit.mesgDefinitionMask) === Fit.mesgDefinitionMask) {
            // Is it a mesg def?
            const mesgDefBuffer: number[] = [];

            // Figure out number of fields (length) of our defn and build buffer
            mesgDefBuffer.push(nextByte);
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

            if ((nextByte & Fit.devDataMask) === Fit.devDataMask) {
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

            const newMesgDef: MesgDefinition = new MesgDefinition(mesgDefBuffer, this.lookup);
            this.localMesgDefs[newMesgDef.localMesgNum] = newMesgDef;
            if (this.mesgDefinitionEvent) {
                this.mesgDefinitionEvent(newMesgDef);
            }
        } else if ((nextByte & Fit.mesgDefinitionMask) === Fit.mesgHeaderMask) {
            // Is it a data mesg?
            const mesgBuffer: number[] = [];

            const localMesgNum: number = (nextByte & Fit.localMesgNumMask);
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

            const newMesg: Mesg = new Mesg(mesgBuffer, this.localMesgDefs[localMesgNum]);
            // If the new message contains a timestamp field, record the value to use as
            // a reference for compressed timestamp headers
            const timestampField: Field = newMesg.getField('Timestamp');
            if (timestampField != null) {
                const tsValue: object = timestampField.getValue();
                if (tsValue != null) {
                    this.timestamp = tsValue;
                    this.lastTimeOffset = timestamp & Fit.compressedTimeMask;
                }
            }

            newMesg.fieldsList.forEach((field: Field) => {
                if (field.isAccumulated) {
                    for (let i = 0; i < field.getNumValues(); i++) {
                        let value: number = Convert.toInt64(field.getRawValue(i));

                        newMesg.fieldsList.forEach((fieldIn: Field) => {
                            fieldIn.components.forEach((fc: FieldComponent) => {
                                if ((fc.fieldNum === field.num) && (fc.accumulate)) {
                                    // tslint:disable-next-line: max-line-length
                                    value = ((((value / field.scale) - field.offset) + fc.offset) * fc.scale);
                                }
                            });
                        });
                        this.accumulator.set(newMesg.num, field.num, value);
                    }
                }
            });

            // tslint:disable-next-line: max-line-length
            // Now that the entire message is decoded we can evaluate subfields and expand any components
            newMesg.ExpandComponents(this.accumulator);

            this.raiseMesgEvent(newMesg);
        } else {
            throw new Error(`Decode:Read - FIT decode error: Unexpected Record Header Byte 0x${nextByte} at stream position: ${fitStream.position}`);
        }
    }

    private raiseMesgEvent(newMesg: Mesg): void {
        if ((newMesg.Num === MesgNum.developerDataId) ||
            (newMesg.Num === MesgNum.fieldDescription)) {
            this.handleMetaData(newMesg);
        }

        if (this.mesgEvent) {
            this.mesgEvent(newMesg);
        }
    }

    private handleMetaData(newMesg: Mesg): void {
        if (newMesg.Num === MesgNum.developerDataId) {
            const mesg = new DeveloperDataIdMesg(newMesg);
            this.lookup.add(mesg);
        } else if (newMesg.num === MesgNum.fieldDescription) {
            const mesg = new FieldDescriptionMesg(newMesg);
            const desc: DeveloperFieldDescription = this.lookup.add(mesg);
            if (desc != null) {
                if (this.developerFieldDescriptionEvent) {
                    this.developerFieldDescriptionEvent(desc);
                }
            }
        }
    }
    //#endregion
} // class
