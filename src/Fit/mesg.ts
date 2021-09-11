import { ByteStreamReader } from '../Utility/byteStreamReader';
import { Accumulator } from './accumulator';
import { Field } from './field';
import { Fit } from './fit';
import { MesgDefinition } from './mesgDefinition';
import { DeveloperDataKey } from './developerDataKey';
import { DeveloperField } from './developerField';
import { FieldComponent } from './fieldComponent';
import { FieldDefinition } from './fieldDefinition';
import { MesgNum } from './Profile/Types/mesgNum';
import { Profile } from './profile';
import { DeveloperFieldDefinition } from './developerFieldDefinition';
import { FieldBase } from './fieldBase';
import { Subfield } from './subfield';
import { FitBaseType } from './Profile/Types/fitBaseType';
import { createDateFromTimestamp } from './Profile/Types/dateTime';

export class Mesg {
    public static isOfType(value: any): value is Mesg {
        if (!value) {
            return false;
        }
        if (typeof value.localNum !== 'number') {
            return false;
        }
        if (typeof value.systemTimeOffset !== 'number') {
            return false;
        }
        if (typeof value.fields.length !== 'number') {
            return false;
        }
        if (typeof value.systemTimeOffset !== 'number') {
            return false;
        }
        if (typeof value.developerFields !== 'object') {
            return false;
        }
        if (typeof value.name !== 'string') {
            return false;
        }
        if (typeof value.num !== 'number') {
            return false;
        }
        return true;
    }
    //#region Fields
    /** Not sure what this is */
    protected localNum: number = 0;
    /** Haven't seen this other than 0 */
    protected systemTimeOffset: number = 0;
    /** The actual data we care about */
    private fields: Field[] = [];
    /** Some custom fields from and for 3rd party apps */
    private readonly developerFields: Map<DeveloperDataKey, DeveloperField> =
        new Map<DeveloperDataKey, DeveloperField>();
    //#endregion

    //#region Properties
    /** Name for this message - from profile.ts */
    public name!: string;
    /** Message number - from profile.ts. Identifier for the message */
    public profileMessageNumber!: MesgNum;
    public get LocalNum(): number {
        return this.localNum;
    }
    public set LocalNum(value: number) {
        if (value > Fit.localMesgNumMask) {
            throw new Error(`Mesg:LocalNum - Invalid Local message number ${value}. Local message number must be < ${Fit.localMesgNumMask}`);
        } else {
            this.localNum = value;
        }
    }

    public get Fields(): Field[] {
        return this.fields;
    }

    public get FieldsList(): Field[] {
        return this.fields;
    }

    public get DeveloperFields(): IterableIterator<DeveloperField> {
        return this.developerFields.values();
    }
    //#endregion

    //#region Constructors
    private ctorFromMsg(mesg?: Mesg): void {
        if (mesg === undefined) {
            this.name = 'unknown';
            this.profileMessageNumber = MesgNum.invalid;
            return;
        }
        this.name = mesg.name;
        this.profileMessageNumber = mesg.profileMessageNumber;
        this.localNum = mesg.localNum;
        this.systemTimeOffset = mesg.systemTimeOffset;
        mesg.FieldsList.forEach((field: Field) => {
            if (field.getNumValues() > 0) {
                this.FieldsList.push(new Field(field));
            }
        });

        Array.from(mesg.DeveloperFields)
            .forEach((fld: DeveloperField) => {
                if (fld.getNumValues() > 0) {
                    const key = new DeveloperDataKey(fld.DeveloperDataIndex, fld.Num);
                    this.developerFields.set(key, new DeveloperField(fld));
                }
            });
    }

    private ctorFromNameAndNum(name: string, num: number): void {
        this.name = name;
        this.profileMessageNumber = num;
    }

    private ctorFromMesgNum(mesgNum: number): void {
        this.ctorFromMsg(Profile.getMesg(mesgNum));
    }

    private ctorFromStream(fitStream: ByteStreamReader, defnMesg: MesgDefinition): void {
        this.ctorFromMesgNum(defnMesg.globalMesgNum);
        this.read(fitStream, defnMesg);
    }

    constructor(mesg?: Mesg);
    constructor(name: string, num: number);
    constructor(mesgNum: number);
    constructor(fitStream: ByteStreamReader, defnMesg: MesgDefinition);
    constructor(
        fitStreamOrMesgNumOrNameOrMesg?: ByteStreamReader | Mesg | number | string,
        defnMesgOrNum?: MesgDefinition | number,
    ) {
        if (typeof fitStreamOrMesgNumOrNameOrMesg === 'number') {
            this.ctorFromMesgNum(fitStreamOrMesgNumOrNameOrMesg);
            return;
        }
        if (typeof fitStreamOrMesgNumOrNameOrMesg === 'string' &&
            typeof defnMesgOrNum === 'number'
        ) {
            this.ctorFromNameAndNum(fitStreamOrMesgNumOrNameOrMesg, defnMesgOrNum);
            return;
        }
        if (Mesg.isOfType(fitStreamOrMesgNumOrNameOrMesg)) {
            this.ctorFromMsg(fitStreamOrMesgNumOrNameOrMesg);
            return;
        }
        if (ByteStreamReader.isOfType(fitStreamOrMesgNumOrNameOrMesg) &&
            MesgDefinition.isOfType(defnMesgOrNum)) {

            this.ctorFromStream(fitStreamOrMesgNumOrNameOrMesg, defnMesgOrNum);
            return;
        }
    }
    //#endregion

    //#region Methods
    public read(inStream: ByteStreamReader, defnMesg: MesgDefinition): void {
        inStream.position = 1;
        // tslint:disable-next-line: max-line-length
        const mesgReader: ByteStreamReader = new ByteStreamReader(inStream, defnMesg.isBigEndian);

        this.localNum = defnMesg.localMesgNum;

        defnMesg.getFields()
            .forEach((fieldDef: FieldDefinition) => {
                let read: boolean = true;

            // It's possible the field type found in the field definition may
            // not agree with the type defined in the profile.  The profile
            // type will be preferred for decode.
                let field: Field | undefined = this.getField(fieldDef.num);
                if (field == null) {
                // We normally won't have fields attached to our skeleton message,
                // as we add values we need to add the fields too based on the mesg,field
                // combo in the profile.  Must derive from the profile so the scale etc
                // is correct
                    field = new Field(Profile.getMesg(this.profileMessageNumber)!
                        .getField(fieldDef.num));
                    if (field.fieldNumberInProfile === Fit.fieldNumInvalid) {
                    // If there was no info in the profile the FieldNum will get set to invalid
                    // so preserve the unknown fields info while we know it
                        field.fieldNumberInProfile = fieldDef.num;
                        field.setType(fieldDef.type);
                    }
                    this.setField(field);
                }

                if (field.type !== fieldDef.type) {
                    const fieldSize: number = Fit.baseType[field.type & Fit.baseTypeNumMask].size;
                    const defSize: number = Fit.baseType[fieldDef.type & Fit.baseTypeNumMask].size;

                    if (defSize < fieldSize) {
                        field.setType(fieldDef.type);
                    } else if (defSize !== fieldSize) {
                    // Demotion is hard. Don't read the field if the
                    // sizes are different. Use the profile type if the
                    // signedness of the field has changed.
                        read = false;
                    }
                }

                if (read) {
                    Mesg.readFieldValue(field, fieldDef.size, mesgReader);
                } else {
                // Skip the bytes for the field if we aren't going to bother reading them
                    mesgReader.readBytes(fieldDef.size);
                }
            });

        defnMesg.developerFieldDefinitions.forEach((fldDef: DeveloperFieldDefinition) => {
            let fld: DeveloperField | undefined = this.getDeveloperField(
                fldDef.fieldNum,
                fldDef.developerDataIndex);
            if (fld == null) {
                fld = DeveloperField.ctorFromDeveloperFieldDefinition(fldDef);
                this.setDeveloperField(fld);
            }

            Mesg.readFieldValue(fld, fldDef.size, mesgReader);
        });
    }

    private static readFieldValue(
        field: FieldBase,
        size: number,
        mesgReader: ByteStreamReader,
    ): void {
        const baseType: number = field.Type & Fit.baseTypeNumMask;
        // strings may be an array and are of variable length
        if (baseType === Fit.string) {
            const bytes: number[] = mesgReader.readBytes(size);
            let utf8Bytes: number[] = [];

            if (bytes.findIndex(x => x !== 0) === -1) {
                // Array has no non zero values, don't add any strings
                return;
            }

            for (let i = 0; i < size; i++) {
                const b: number = bytes[i];
                utf8Bytes.push(b);

                if (b === 0x00) {
                    field.addValue(utf8Bytes);
                    utf8Bytes = [];
                }
            }

            if (utf8Bytes.length !== 0) {
                // Add a Null Terminator
                utf8Bytes.push(0);
                field.addValue(utf8Bytes);
                utf8Bytes = [];
            }
        } else {
            const numElements: number = size / Fit.baseType[baseType].size;
            for (let i: number = 0; i < numElements; i++) {
                const { invalid, value }: { invalid: boolean, value: any } = Mesg.tryReadValue(
                    field.Type,
                    mesgReader,
                    size);

                if (!invalid || numElements > 1) {
                    field.setRawValue(i, value);
                }
            }
        }
    }

    private static tryReadValue(
        type: number,
        mesgReader: ByteStreamReader,
        size: number,
    ): {invalid: boolean, value: any} {
        let invalid: boolean = true;
        let value: any;
        const baseTypeNum: number = type & Fit.baseTypeNumMask;
        switch (baseTypeNum) {
            case Fit.enum:
            case Fit.byte:
            case Fit.uInt8:
            case Fit.uInt8z:
                value = mesgReader.readByte();
                if (value !== Fit.baseType[baseTypeNum].invalidValue) {
                    invalid = false;
                }
                break;

            case Fit.sInt8:
                value = mesgReader.readSByte();
                if (value !== Fit.baseType[baseTypeNum].invalidValue) {
                    invalid = false;
                }
                break;

            case Fit.sInt16:
                value = mesgReader.readInt16();
                if (value !== Fit.baseType[baseTypeNum].invalidValue) {
                    invalid = false;
                }
                break;

            case Fit.uInt16:
            case Fit.uInt16z:
                value = mesgReader.readUInt16();
                if (value !== Fit.baseType[baseTypeNum].invalidValue) {
                    invalid = false;
                }
                break;

            case Fit.sInt32:
                value = mesgReader.readInt32();
                if (value !== Fit.baseType[baseTypeNum].invalidValue) {
                    invalid = false;
                }
                break;

            case Fit.uInt32:
            case Fit.uInt32z:
                value = mesgReader.readUInt32();
                if (value !== Fit.baseType[baseTypeNum].invalidValue) {
                    invalid = false;
                }
                break;

            case Fit.sInt64:
                value = mesgReader.readInt64();
                if (value !== Fit.baseType[baseTypeNum].invalidValue) {
                    invalid = false;
                }
                break;

            case Fit.uInt64:
            case Fit.uInt64z:
                value = mesgReader.readUInt64();
                if (value !== Fit.baseType[baseTypeNum].invalidValue) {
                    invalid = false;
                }
                break;

            case Fit.float32:
                value = mesgReader.readSingle();
                if (!isNaN(value)) {
                    invalid = false;
                }
                break;

            case Fit.float64:
                value = mesgReader.readDouble();
                if (!isNaN(value)) {
                    invalid = false;
                }
                break;

            default:
                value = mesgReader.readBytes(size);
                break;
        }

        return { invalid, value };
    }

    // TODO output stream
    // public void Write(Stream outStream, MesgDefinition mesgDef)
    // private static void WriteField(FieldBase field, byte size, BinaryWriter bw)

    //#region FieldList Manipulation Functions
    public hasField(fieldNum: number): boolean {
        for (const field of this.FieldsList) {
            if (field.fieldNumberInProfile === fieldNum) {
                return true;
            }
        }
        return false;
    }

    public setDeveloperField(field: DeveloperField): void {
        const devKey = new DeveloperDataKey(field.DeveloperDataIndex, field.Num);
        this.developerFields.set(devKey, field);
    }

    /**
     * Replace an existing field, otherwise add a reference to fields list
     * @param field Caller allocated field
     */
    public setField(field: Field): void {
        for (let i = 0; i < this.FieldsList.length; i++) {
            if (this.FieldsList[i].fieldNumberInProfile === field.fieldNumberInProfile) {
                this.FieldsList[i] = field;
                return;
            }
        }
        this.FieldsList.push(field);
    }

    /**
     * Insert a field at the desired index.
     * If the field already exists in the mesg it is first removed.
     * @param index Index to insert the field,
     * if index is out of range, the field is added to the end of the list
     * @param field Caller allocated field
     */
    public insertField(index: number, field: Field): void {
        // if message already contains this field, remove it
        for (let i = 0; i < this.FieldsList.length; i++) {
            if (this.FieldsList[i].fieldNumberInProfile === field.fieldNumberInProfile) {
                this.FieldsList.splice(i, 1);
            }
        }
        if (index < 0 || index > this.FieldsList.length) {
            // if the index is out of range, add to the end
            this.FieldsList.push(field);
        } else {
            // insert the new field at desired index
            this.FieldsList.splice(index, 0, field);
        }
    }

    public setFields(mesg: Mesg): void {
        if (mesg.profileMessageNumber !== this.profileMessageNumber) {
            return;
        }
        mesg.FieldsList.forEach((field: Field) => {
            this.setField(new Field(field));
        });
    }

    public getNumFields(): number {
        return this.FieldsList.length;
    }

    private getDeveloperField(
        fieldNum: number, developerIndex: number): DeveloperField | undefined {
        const devKey = new DeveloperDataKey(developerIndex, fieldNum);
        return this.developerFields.has(devKey) ? this.developerFields.get(devKey)! : undefined;
    }

    public getOverrideField(fieldNum: number): FieldBase[] {
        const localFields: FieldBase[] = [];

        const nativeField: Field | undefined = this.getField(fieldNum);
        if (null != nativeField) {
            localFields.push(nativeField);
        }

        Array.from(this.DeveloperFields)
            .filter(x => x.NativeOverride === fieldNum)
            .forEach((field: DeveloperField) => {
                localFields.push(field);
            });

        return localFields;
    }

    public getField(num: number): Field | undefined;
    public getField(fieldName: string, checkMesgSupportForSubFields?: boolean): Field | undefined;
    public getField(
        fieldNameOrNum: string | number,
        checkMesgSupportForSubFields: boolean = true): Field | undefined {
        if (typeof fieldNameOrNum === 'number') {
            return this.getFieldNum(fieldNameOrNum);
        }
        if (typeof fieldNameOrNum === 'string') {
            return this.getFieldStr(fieldNameOrNum, checkMesgSupportForSubFields);
        }
        return undefined;
    }

    private getFieldNum(fieldNum: number): Field | undefined {
        for (const field of this.FieldsList) {
            if (field.fieldNumberInProfile === fieldNum) {
                return field;
            }
        }

        return;
    }

    private getFieldStr(
        fieldName: string,
        checkMesgSupportForSubFields: boolean = true,
    ): Field | undefined {
        for (const field of this.FieldsList) {
            if (field.name === fieldName) {
                return field;
            }

            for (const subfield of field.subfields) {
                if ((subfield.Name === fieldName) &&
                    (!checkMesgSupportForSubFields || (subfield.canMesgSupport(this)))) {
                    return field;
                }
            }
        }
        return;
    }

    public getActiveSubFieldIndex(fieldNum: number): number {
        const testField: Field = new Field(this.getField(fieldNum));

        for (let i = 0; i < testField.subfields.length; i++) {
            if (testField.subfields[i].canMesgSupport(this)) {
                return i;
            }
        }
        return Fit.subfieldIndexMainField;
    }

    public getActiveSubFieldName(fieldNum: number): string {
        const testField: Field = new Field(this.getField(fieldNum));

        for (const subfield of testField.subfields) {
            if (subfield.canMesgSupport(this)) {
                return subfield.Name;
            }
        }
        return Fit.subfieldNameMainField;
    }

    /**
     * Removes the specified field from this message.
     * @param field The Field to be removed from this message.
     */
    public removeField(field: Field): void {
        const idxOf = this.FieldsList.indexOf(field);
        if (idxOf > -1) {
            this.fields = this.fields.splice(idxOf, 1);
        }
    }
    //#endregion

    public getNumFieldValues(fieldNum: number): number;
    // tslint:disable-next-line: unified-signatures
    public getNumFieldValues(fieldName: string): number;
    // tslint:disable-next-line: unified-signatures
    public getNumFieldValues(fieldNum: number, subfieldIndex: number): number;
    // tslint:disable-next-line: unified-signatures
    public getNumFieldValues(fieldNum: number, subfieldName: string): number;
    public getNumFieldValues(
        fieldNumOrName: number | string,
        subfieldIndexOrName?: number | string,
    ): number {
        if (typeof fieldNumOrName === 'number' && subfieldIndexOrName === undefined) {
            return this.getNumFieldValuesFieldNum(fieldNumOrName);
        }
        if (typeof fieldNumOrName === 'string' && subfieldIndexOrName === undefined) {
            return this.getNumFieldValuesFieldName(fieldNumOrName);
        }
        if (typeof fieldNumOrName === 'number' && typeof subfieldIndexOrName === 'number') {
            return this.getNumFieldValuesFieldNumAndSubIdx(fieldNumOrName, subfieldIndexOrName);
        }
        if (typeof fieldNumOrName === 'number' && typeof subfieldIndexOrName === 'string') {
            return this.getNumFieldValuesFieldNumAndSubName(fieldNumOrName, subfieldIndexOrName);
        }
        return 0;
    }

    private getNumFieldValuesFieldNum(fieldNum: number): number {
        const field: Field | undefined = this.getField(fieldNum);

        if (field !== undefined) {
            return field.getNumValues();
        }
        return 0;
    }

    private getNumFieldValuesFieldName(fieldName: string): number {
        const field: Field | undefined = this.getField(fieldName);

        if (field !== undefined) {
            return field.getNumValues();
        }
        return 0;
    }

    private getNumFieldValuesFieldNumAndSubIdx(fieldNum: number, subfieldIndex: number): number {
        const field: Field | undefined = this.getField(fieldNum);

        if (field === undefined) {
            return 0;
        }

        if (subfieldIndex === Fit.subfieldIndexActiveSubfield) {
            return field.getNumValues();
        }

        const subfield: Subfield | undefined = field.getSubfield(subfieldIndex);
        if ((subfield === undefined) || (subfield.canMesgSupport(this))) {
            return field.getNumValues();
        }
        return 0;

    }

    private getNumFieldValuesFieldNumAndSubName(fieldNum: number, subfieldName: string): number {
        const field: Field | undefined = this.getField(fieldNum);

        if (field === undefined) {
            return 0;
        }

        const subfield: Subfield | undefined = field.getSubfield(subfieldName);
        if ((subfield === undefined) || (subfield.canMesgSupport(this))) {
            return field.getNumValues();
        }
        return 0;
    }

    public getFieldValue(
        fieldNum: number,
        fieldArrayIndex?: number,
        subFieldIndex?: number,
    ): any;
    public getFieldValue(
        fieldNum: number,
        fieldArrayIndex: number,
        subfieldName: string,
    ): any;
    public getFieldValue(
        fieldName: string,
        fieldArrayIndex?: number,
    ): any;
    public getFieldValue(
        fieldNumOrName: number | string,
        fieldArrayIndex?: number,
        subFieldIndexOrName?: number | string,
    ): any {
        if (typeof fieldNumOrName === 'number' &&
            (typeof subFieldIndexOrName === 'number' || subFieldIndexOrName === undefined)) {

            return this.getFieldValueFieldNumSubIdx(
                fieldNumOrName, fieldArrayIndex, subFieldIndexOrName);
        }
        if (typeof fieldNumOrName === 'number' &&
            typeof fieldArrayIndex === 'number' &&
            typeof subFieldIndexOrName === 'string') {

            return this.getFieldValueFieldNumSubName(
                fieldNumOrName, fieldArrayIndex, subFieldIndexOrName);
        }
        if (typeof fieldNumOrName === 'string') {
            return this.getFieldValueFieldName(fieldNumOrName, fieldArrayIndex);
        }
    }

    private getFieldValueFieldNumSubIdx(
        fieldNum: number,
        fieldArrayIndex: number = 0,
        subFieldIndex: number = Fit.subfieldIndexActiveSubfield,
    ): any {
        const field: Field | undefined = this.getField(fieldNum);

        if (field === undefined) {
            return;
        }

        if (subFieldIndex === Fit.subfieldIndexActiveSubfield) {
            return field.getValue(fieldArrayIndex, this.getActiveSubFieldIndex(fieldNum));
        }  {
            const subfield: Subfield | undefined = field.getSubfield(subFieldIndex);

            if ((subfield === undefined) || (subfield.canMesgSupport(this))) {
                return field.getValue(fieldArrayIndex, subFieldIndex);
            }
            return null;
        }
    }

    private getFieldValueFieldNumSubName(
        fieldNum: number,
        fieldArrayIndex: number,
        subfieldName: string,
    ): any {
        const field: Field | undefined = this.getField(fieldNum);

        if (field === undefined) {
            return null;
        }

        const subfield: Subfield | undefined = field.getSubfield(subfieldName);

        if ((subfield === undefined) || (subfield.canMesgSupport(this))) {
            return field.getValue(fieldArrayIndex, subfieldName);
        }
        return null;
    }

    private getFieldValueFieldName(fieldName: string, fieldArrayIndex: number = 0): any {
        const field: Field | undefined = this.getField(fieldName, false);

        if (field === undefined) {
            return null;
        }

        const subfield: Subfield | undefined = field.getSubfield(fieldName);

        if ((subfield == null) || (subfield.canMesgSupport(this))) {
            return field.getValue(fieldArrayIndex, fieldName);
        }

        return null;
    }

    public getIsFieldAccumulated(num: number): boolean {
        const field: Field | undefined = this.getField(num);
        if (field !== undefined) {
            return field.IsAccumulated;
        }
        return false;
    }

    public setFieldValue(
        fieldNum: number,
        fieldArrayIndex: number,
        value: any,
        subfieldIndex?: number,
    ): void;
    public setFieldValue(
        fieldNum: number,
        fieldArrayIndex: number,
        value: any,
        subfieldName: string,
    ): void;
    public setFieldValue(
        name: string,
        fieldArrayIndex: number,
        value: any,
    ): void;
    public setFieldValue(
        fieldNumOrName: number | string,
        fieldArrayIndex: number,
        value: any,
        subfieldIndexOrName?: number | string,
    ): void {
        if (typeof fieldNumOrName === 'number' &&
            (typeof subfieldIndexOrName === 'number' ||
            subfieldIndexOrName === undefined)) {
            return this.setFieldValue_FieldNumSubIdx(
                fieldNumOrName, fieldArrayIndex, value, subfieldIndexOrName);
        }
        if (typeof fieldNumOrName === 'number' &&
            typeof subfieldIndexOrName === 'string') {
            return this.setFieldValue_FieldNumSubName(
                fieldNumOrName, fieldArrayIndex, value, subfieldIndexOrName);
        }
        if (typeof fieldNumOrName === 'string') {
            return this.setFieldValue_FieldName(fieldNumOrName, fieldArrayIndex, value);
        }
        return;
    }

    private setFieldValue_FieldNumSubIdx(
        fieldNum: number,
        fieldArrayIndex: number,
        value: any,
        subfieldIndex: number = Fit.subfieldIndexActiveSubfield,
    ): void {
        let localSubfieldIndex = subfieldIndex;
        if (localSubfieldIndex === Fit.subfieldIndexActiveSubfield) {
            localSubfieldIndex = this.getActiveSubFieldIndex(fieldNum);
        } else {
            const testField: Field = new Field(this.getField(fieldNum));
            const subfield: Subfield | undefined = testField.getSubfield(localSubfieldIndex);

            if ((subfield !== undefined) && !(subfield.canMesgSupport(this))) {
                return;
            }
        }

        let field: Field | undefined = this.getField(fieldNum);

        if (field === undefined) {
                // We normally won't have fields attached to our skeleton message,
                // as we add values we need to add the fields too based on the mesg,field
                // combo in the profile.
            field = new Field(Profile.getMesg(this.profileMessageNumber)!
                .getField(fieldNum));
            if (field.fieldNumberInProfile === Fit.fieldNumInvalid) {
                    // If there was no info in the profile our FieldNum will get set to invalid,
                    // at least preserve FieldNum while we know it
                field.fieldNumberInProfile = fieldNum;
            }
            this.setField(field);
        }
        field!.setValue5(fieldArrayIndex, value, localSubfieldIndex);
    }

    private setFieldValue_FieldNumSubName(
        fieldNum: number,
        fieldArrayIndex: number,
        value: any,
        subfieldName: string,
    ): void {
        const testField: Field = new Field(this.getField(fieldNum));
        const subfield: Subfield | undefined = testField.getSubfield(subfieldName);

        if ((subfield != null) && !(subfield.canMesgSupport(this))) {
            return;
        }

        let field: Field | undefined = this.getField(fieldNum);

        if (field === undefined) {
            // We normally won't have fields attached to our skeleton message,
            // as we add values we need to add the fields too based on the mesg,field
            // combo in the profile.
            field = new Field(Profile.getMesg(this.profileMessageNumber)!
                .getField(fieldNum));
            if (field!.fieldNumberInProfile === Fit.fieldNumInvalid) {
                // If there was no info in the profile our FieldNum will get set to invalid,
                // at least preserve FieldNum while we know it
                field!.fieldNumberInProfile = fieldNum;
            }
            this.setField(field!);
        }
        field!.setValue6(fieldArrayIndex, value, subfieldName);
    }

    private setFieldValue_FieldName(name: string, fieldArrayIndex: number, value: any): void {
        const testField = new Field(this.getField(name));
        const subfield = testField.getSubfield(name);

        if ((subfield !== undefined) && !(subfield.canMesgSupport(this))) {
            return;
        }

        let field = this.getField(name, false);

        if (field == null) {
            field = new Field(Profile.getMesg(this.profileMessageNumber)!
                .getField(name));
            this.setField(field);
        }

        field!.setValue6(fieldArrayIndex, value, name);
    }

    public timestampToDateTime(timestamp: number | undefined): Date | undefined {
        // const GarminTimeOffset = 631065600000;
        let date: Date | undefined;
        if (timestamp !== undefined) {
            date = createDateFromTimestamp(timestamp);
        }

        return date;
    }

    /**
     * Removes all fields from this message that have been generated through
     * component expansion while decoding the source .FIT file.
     */
    public removeExpandedFields(): void {
        this.fields = this.fields.filter(x => !x.isExpandedField);
    }

    private* expandComponentsInList(
        componentList: FieldComponent[],
        currentField: Field,
        offset: number,
        accumulator: Accumulator,
    ): Generator<FieldComponentExpansion, void, unknown> {
        // When components.Count > 0 a field will be created and appended to the field list
        if ((componentList != null) && (componentList.length > 0)) {
            for (const fC of componentList) {

                if (fC.fieldNum !== Fit.fieldNumInvalid) {
                    // Create a new field to expand into
                    const newField = new Field(Profile.getMesg(this.profileMessageNumber)!
                        .getField(fC.fieldNum));

                    // Mark that this field has been generated through expansion
                    newField.isExpandedField = true;

                    // cache a field that we use to set properties on
                    const f = this.getField(newField.fieldNumberInProfile);

                    // GetBitsValue will not return more bits than the componentField type can hold.
                    // This means strings are built one letter at a time when using components
                    // which is a bad idea to start with)
                    let bitsValue: number | undefined =
                            currentField.getBitsValue(offset, fC.bits, newField.Type);
                    if (bitsValue === undefined) {
                        break;
                    }

                    if (fC.accumulate) {
                        // tslint:disable-next-line: max-line-length
                        bitsValue = accumulator.accumulate(this.profileMessageNumber, fC.fieldNum, bitsValue, fC.bits);
                    }

                    if (newField.isNumeric()) {
                            // If the field is invalid, set the raw value so that
                            // the invalid value is not scaled or offset.
                        if (FitBaseType.isNumericInvalid(bitsValue, newField.getType())) {
                            if (this.hasField(newField.fieldNumberInProfile)) {
                                f!.setRawValue(f!.getNumValues(), bitsValue);
                            } else {
                                newField.setRawValue(0, bitsValue);
                            }
                        } else {
                            let fbitsValue = bitsValue;

                            fbitsValue = (fbitsValue / fC.scale) - fC.offset;

                            if (this.hasField(newField.fieldNumberInProfile)) {
                                f!.setValue(f!.getNumValues(), fbitsValue);
                            } else {
                                newField.setValue1(fbitsValue);
                            }
                        }
                    } else {
                            // Shouldn't apply scale/offset to string or enum
                        let nonNumericBitsValue: any;
                            // Ensure strings are added as byte[]
                        if ((newField.type & Fit.baseTypeNumMask) === Fit.string) {
                            nonNumericBitsValue = [];
                            nonNumericBitsValue.push(bitsValue);
                        } else {
                            nonNumericBitsValue = bitsValue;
                        }
                        if (this.hasField(newField.fieldNumberInProfile)) {
                            f!.setValue(f!.getNumValues(), nonNumericBitsValue);
                        } else {
                            newField.setValue1(nonNumericBitsValue);
                        }
                    }
                    // tslint:disable-next-line:no-parameter-reassignment
                    offset += fC.bits;

                    // Return each field as we iterate
                    yield new FieldComponentExpansion(newField, offset);
                }
            }
        }
    }

    public expandComponents(accumulator: Accumulator): void {
        // Traverse the field list
        // Change to for loop so we can add items as we iterate
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.FieldsList.length; ++i) {
            let componentList: FieldComponent[];
            // Determine the active subfield
            const activeSubfield =
                this.getActiveSubFieldIndex(this.FieldsList[i].fieldNumberInProfile);

            // tslint:disable-next-line: prefer-conditional-expression
            if (activeSubfield === Fit.subfieldIndexMainField) {
                componentList = this.FieldsList[i].components;
            } else {
                componentList = this.FieldsList[i].getSubfield(activeSubfield)!.Components;
            }

            // Traverse the component list
            let offset = 0;
            for (const f of this.expandComponentsInList(
                                componentList, this.FieldsList[i], offset, accumulator)) {
                // Add the new field
                this.FieldsList.push(f.getField());
                // update offset
                offset = f.getOffset();
            }
        }
    }
    //#endregion
}

// tslint:disable-next-line: max-classes-per-file
class FieldComponentExpansion {
    private offset: number;
    private field: Field;

    public constructor(f: Field, offset: number) {
        this.field = f;
        this.offset = offset;
    }

    public getOffset(): number {
        return this.offset;
    }

    public getField(): Field {
        return this.field;
    }
}
