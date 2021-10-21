import { ByteStreamReader } from '../Utility/byteStreamReader';
import { Accumulator } from './accumulator';
import { Field, FieldAny } from './field';
import { Fit } from './fit';
import { MesgDefinition, MesgDefinitionAny, MessageListMessageTypeWithInvalid } from './mesgDefinition';
import { DeveloperField } from './developerField';
import { FieldComponent } from './fieldComponent';
import { FieldDefinition, ProfileFieldTypeWithInvalid } from './fieldDefinition';
import { DeveloperFieldDefinition } from './developerFieldDefinition';
import { FitBaseType } from './Profile/Types/fitBaseType';
import { createDateFromTimestamp } from './Profile/Types/dateTime';
import { ArrayElement, BaseTypesListIndex, BaseTypesListType, isBaseTypeNumeric } from '../profile';

export class Mesg<T extends MessageListMessageTypeWithInvalid> {
    constructor(
        public messageDefinition: MesgDefinition<T>,
        public localNum: number,
        /** The actual data we care about */
        public readonly fields: Field<ArrayElement<T['fields']>>[],
        /** Some custom fields from and for 3rd party apps */
        public readonly developerFields: DeveloperField[]){
    }

    public static readAndCreate(inStream: ByteStreamReader, defnMesg: MesgDefinitionAny): MesgAny {
        inStream.position = 1;
        const mesgReader: ByteStreamReader = new ByteStreamReader(inStream, defnMesg.isBigEndian);

        const localNum = defnMesg.localMesgNum;
        if (localNum > Fit.localMesgNumMask)
            throw new Error(`Mesg:LocalNum - Invalid Local message number ${localNum}. Local message number must be < ${Fit.localMesgNumMask}`);

        const fields: FieldAny[] = [];
        defnMesg.fieldDefinitions.forEach((fieldDef) => {

            const field = Mesg.readFieldValue(fieldDef, mesgReader);

            fields.push(field);
        });

        const devFields: DeveloperField[] = [];
        defnMesg.developerFieldDefinitions.forEach((developerFieldDefinition) => {
             const field = Mesg.readDevFieldValue(developerFieldDefinition, mesgReader);
             devFields.push(field);
        });

        return new Mesg(defnMesg, localNum, fields, devFields);
    }

    private static readFieldValue<T extends ProfileFieldTypeWithInvalid>(
        fieldDef: FieldDefinition<T>,
        mesgReader: ByteStreamReader,
    ): Field<T> {
        const field = new Field(fieldDef);
        const baseType = fieldDef.baseType;
        // strings may be an array and are of variable length
        if (baseType.baseType === 'string') {
            const bytes: number[] = mesgReader.readBytes(fieldDef.size);
            let utf8Bytes: number[] = [];

            if (bytes.findIndex(x => x !== 0) === -1) {
                // Array has no non zero values, don't add any strings
                return field;
            }

            for (let i = 0; i < fieldDef.size; i++) {
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
            const numElements: number = fieldDef.size / baseType.size;
            for (let i: number = 0; i < numElements; i++) {
                const { invalid, value } = Mesg.tryReadValue(
                    fieldDef.baseType,
                    mesgReader,
                    fieldDef.size);

                if (!invalid || numElements > 1) {
                    field.setRawValue(i, value);
                }
            }
        }
        return field;
    }

    private static readDevFieldValue(
        fieldDef: DeveloperFieldDefinition,
        mesgReader: ByteStreamReader,
    ): DeveloperField {
        const field = new DeveloperField(fieldDef);
        const baseType = fieldDef.descriptionMesg.baseType;
        // strings may be an array and are of variable length
        if (baseType.baseType === 'string') {
            const bytes: number[] = mesgReader.readBytes(fieldDef.size);
            let utf8Bytes: number[] = [];

            if (bytes.findIndex(x => x !== 0) === -1) {
                // Array has no non zero values, don't add any strings
                return field;
            }

            for (let i = 0; i < fieldDef.size; i++) {
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
            const numElements: number = fieldDef.size / baseType.size;
            for (let i: number = 0; i < numElements; i++) {
                const { invalid, value } = Mesg.tryReadValue(
                    fieldDef.descriptionMesg.baseType,
                    mesgReader,
                    fieldDef.size);

                if (!invalid || numElements > 1) {
                    field.setRawValue(i, value);
                }
            }
        }
        return field;
    }

    private static tryReadValue(
        baseType: BaseTypesListType[BaseTypesListIndex],
        mesgReader: ByteStreamReader,
        size: number,
    ): {invalid: boolean, value: number | number[]} {
        let invalid: boolean = true;
        let value: number | number[];
        switch (baseType.baseType) {
            case 'enum':
            case 'byte':
            case 'uint8':
            case 'uint8z':
                value = mesgReader.readByte();
                if (value !== baseType.invalidValue) {
                    invalid = false;
                }
                break;

            case 'sint8':
                value = mesgReader.readSByte();
                if (value !== baseType.invalidValue) {
                    invalid = false;
                }
                break;

            case 'sint16':
                value = mesgReader.readInt16();
                if (value !== baseType.invalidValue) {
                    invalid = false;
                }
                break;

            case 'uint16':
            case 'uint16z':
                value = mesgReader.readUInt16();
                if (value !== baseType.invalidValue) {
                    invalid = false;
                }
                break;

            case 'sint32':
                value = mesgReader.readInt32();
                if (value !== baseType.invalidValue) {
                    invalid = false;
                }
                break;

            case 'uint32':
            case 'uint32z':
                value = mesgReader.readUInt32();
                if (value !== baseType.invalidValue) {
                    invalid = false;
                }
                break;

            case 'sint64':
                value = mesgReader.readInt64();
                if (value !== baseType.invalidValue) {
                    invalid = false;
                }
                break;

            case 'uint64':
            case 'uint64z':
                value = mesgReader.readUInt64();
                if (value !== baseType.invalidValue) {
                    invalid = false;
                }
                break;

            case 'float32':
                value = mesgReader.readSingle();
                if (!isNaN(value)) {
                    invalid = false;
                }
                break;

            case 'float64':
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

    private hasField(fieldNum: number): boolean {
        for (const field of this.fields) {
            if (field.fieldDefinition.profileField.id === fieldNum) {
                return true;
            }
        }
        return false;
    }

    /**
     * Replace an existing field, otherwise add a reference to fields list
     * @param field Caller allocated field
     */
    public setField(field: Field<ArrayElement<T['fields']>>): void {
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].fieldDefinition.profileField.id === field.fieldDefinition.profileField.id) {
                this.fields[i] = field;
                return;
            }
        }
        this.fields.push(field);
    }

    /**
     * Insert a field at the desired index.
     * If the field already exists in the mesg it is first removed.
     * @param index Index to insert the field,
     * if index is out of range, the field is added to the end of the list
     * @param field Caller allocated field
     */
    public insertField(index: number, field: Field<ArrayElement<T['fields']>>): void {
        // if message already contains this field, remove it
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].fieldDefinition.profileField.id === field.fieldDefinition.profileField.id) {
                this.fields.splice(i, 1);
            }
        }
        if (index < 0 || index > this.fields.length) {
            // if the index is out of range, add to the end
            this.fields.push(field);
        } else {
            // insert the new field at desired index
            this.fields.splice(index, 0, field);
        }
    }

    public getField(fieldId: number): Field<ArrayElement<T['fields']>> | undefined;
    public getField(fieldName: string, checkMesgSupportForSubFields?: boolean): Field<ArrayElement<T['fields']>> | undefined;
    public getField(
        fieldNameOrId: string | number,
        checkMesgSupportForSubFields: boolean = true): Field<ArrayElement<T['fields']>> | undefined {
        if (typeof fieldNameOrId === 'number') {
            return this.getFieldNum(fieldNameOrId);
        }
        if (typeof fieldNameOrId === 'string') {
            return this.getFieldStr(fieldNameOrId, checkMesgSupportForSubFields);
        }
        return undefined;
    }

    private getFieldNum(fieldId: number): Field<ArrayElement<T['fields']>> | undefined {
        for (const field of this.fields) {
            if (field.fieldDefinition.profileField.id === fieldId) {
                return field;
            }
        }
        return;
    }

    private getFieldStr(
        fieldName: string,
        checkMesgSupportForSubFields: boolean = true,
    ): Field<ArrayElement<T['fields']>> | undefined {
        for (const field of this.fields) {
            if (field.fieldDefinition.profileField.name === fieldName) {
                return field;
            }

            for (const subfield of field.subfields) {
                if ((subfield.name === fieldName) &&
                    (!checkMesgSupportForSubFields || (canSubfieldSupportMesg(subfield, this)))) {
                    return field;
                }
            }
        }
        return;
    }

    private getActiveSubFieldIndex(fieldNum: number): keyof ArrayElement<T['fields']>['subfields'] & number {
        const testField = this.fields.find(f => f.fieldDefinition.profileField.id === fieldNum);
        if (!testField)
            return Fit.subfieldIndexMainField;

        // TODO simplify with filter?
        for (let i = 0; i < testField.subfields.length; i++) {
            if (canSubfieldSupportMesg(testField.subfields[i], this))
                return i;
        }
        return Fit.subfieldIndexMainField;
    }

    public getNumFieldValues(fieldNum: number): number;
    public getNumFieldValues(fieldNum: number, subfieldIndex: number): number;
    public getNumFieldValues(
        fieldNum: number,
        subfieldIndex?: number,
    ): number {
        if (typeof fieldNum === 'number' && subfieldIndex === undefined) {
            return this.getNumFieldValuesFieldNum(fieldNum);
        }
        if (typeof fieldNum === 'number' && typeof subfieldIndex === 'number') {
            return this.getNumFieldValuesFieldNumAndSubIdx(fieldNum, subfieldIndex);
        }
        return 0;
    }

    private getNumFieldValuesFieldNum(fieldNum: number): number {
        const field = this.getField(fieldNum);

        if (field !== undefined) {
            return field.getNumValues();
        }
        return 0;
    }

    private getNumFieldValuesFieldNumAndSubIdx(fieldNum: number, subfieldIndex: number): number {
        const field = this.getFieldNum(fieldNum);

        if (field === undefined) {
            return 0;
        }

        if (subfieldIndex === Fit.subfieldIndexActiveSubfield) {
            return field.getNumValues();
        }

        const subfield = field.getSubfield(subfieldIndex);
        if ((subfield === undefined) || (canSubfieldSupportMesg(subfield, this))) {
            return field.getNumValues();
        }
        return 0;

    }

    public getFieldValue(
        fieldId: ArrayElement<T['fields']>['id'],
        fieldArrayIndex?: number,
        subFieldIndex?: number,
    ): number | number[] | undefined;
    public getFieldValue(
        fieldId: ArrayElement<T['fields']>['id'],
        fieldArrayIndex: number,
        subfieldName: string,
    ): number | number[] | undefined;
    public getFieldValue(
        fieldName: ArrayElement<T['fields']>['name'],
        fieldArrayIndex?: number,
    ): number | number[] | undefined;
    public getFieldValue(
        fieldNumOrName: ArrayElement<T['fields']>['id'] | ArrayElement<T['fields']>['name'],
        fieldArrayIndex?: number,
        subFieldIndexOrName?: number | string,
    ): number | number[] | undefined {
        if (typeof fieldNumOrName === 'number' && (typeof subFieldIndexOrName === 'number' || subFieldIndexOrName === undefined)) {
            return this.getFieldValueFieldNumSubIdx(fieldNumOrName, fieldArrayIndex, subFieldIndexOrName);
        }
        if (typeof fieldNumOrName === 'number' && typeof fieldArrayIndex === 'number' && typeof subFieldIndexOrName === 'string') {
            return this.getFieldValueFieldNumSubName(fieldNumOrName, fieldArrayIndex, subFieldIndexOrName);
        }
        if (typeof fieldNumOrName === 'string') {
            return this.getFieldValueFieldName(fieldNumOrName, fieldArrayIndex);
        }
        throw new Error("invalid arguments");
    }

    private getFieldValueFieldNumSubIdx(
        fieldId: ArrayElement<T['fields']>['id'], // todo also pass subfield? probably better to just have another method
        fieldArrayIndex: number = 0,
        subFieldIndex: number = Fit.subfieldIndexActiveSubfield,
    ): number | number[] | undefined {
        const field = this.getFieldNum(fieldId);
        if (!field)
            return;

        if (subFieldIndex === Fit.subfieldIndexActiveSubfield) {
            return field.getValue1(fieldArrayIndex, this.getActiveSubFieldIndex(fieldId));
        } else {
            const subfield = field.getSubfield(subFieldIndex);

            if ((subfield === undefined) || (canSubfieldSupportMesg(subfield, this))) {
                return field.getValue(fieldArrayIndex, subFieldIndex);
            }
            return;
        }
    }

    private getFieldValueFieldNumSubName(
        fieldNum: number,
        fieldArrayIndex: number,
        subfieldName: string,
    ): number | number[] | undefined {
        const field = this.getFieldNum(fieldNum);

        if (field === undefined) {
            return undefined;
        }

        const subfield = field.getSubfieldByName(subfieldName);

        if ((subfield === undefined) || (canSubfieldSupportMesg(subfield, this))) {
            const subfield = field.getSubfieldByName(subfieldName);
            return field.getValue(fieldArrayIndex, subfield);
        }
        return undefined;
    }

    private getFieldValueFieldName(fieldName: string, fieldArrayIndex: number = 0): number | number[] | undefined {
        const field = this.getFieldStr(fieldName, false);

        if (field === undefined) {
            return undefined;
        }

        const subfield = field.getSubfieldByName(fieldName);

        if ((subfield == null) || (canSubfieldSupportMesg(subfield, this))) {
            return field.getValue(fieldArrayIndex, subfield);
        }

        return;
    }

    public timestampToDateTime(timestamp: number | undefined): Date | undefined {
        // const GarminTimeOffset = 631065600000;
        let date: Date | undefined;
        if (timestamp !== undefined) {
            date = createDateFromTimestamp(timestamp);
        }

        return date;
    }

    private* expandComponentsInList(
        componentList: FieldComponent[],
        currentField: Field<ArrayElement<T['fields']>>,
        offset: number,
        accumulator: Accumulator,
    ): Generator<FieldComponentExpansion<ArrayElement<T['fields']>>, void, unknown> {
        // When components.Count > 0 a field will be created and appended to the field list
        if ((componentList != null) && (componentList.length > 0)) {
            for (const fC of componentList) {

                if (fC.fieldNum !== Fit.fieldNumInvalid) {
                    // Create a new field to expand into
                    const matchingField = this.getFieldNum(fC.fieldNum);
                    if (!matchingField)
                        throw new Error("field not found for component expansion");

                    const newField = new Field(matchingField.fieldDefinition);

                    // Mark that this field has been generated through expansion
                    newField.isExpandedField = true;

                    // GetBitsValue will not return more bits than the componentField type can hold.
                    // This means strings are built one letter at a time when using components
                    // which is a bad idea to start with)
                    let bitsValue: number | undefined = currentField.getBitsValue(offset, fC.bits, newField.fieldDefinition.baseType);
                    if (bitsValue === undefined) {
                        break;
                    }

                    if (fC.accumulate) {
                        bitsValue = accumulator.accumulate(this.messageDefinition.profileMessage.id, fC.fieldNum, bitsValue, fC.bits);
                    }

                    if (isBaseTypeNumeric(newField.fieldDefinition.baseType.baseTypeid)) {
                        // If the field is invalid, set the raw value so that
                        // the invalid value is not scaled or offset.
                        if (FitBaseType.isNumericInvalid(bitsValue, newField.fieldDefinition.baseType)) {
                            if (this.hasField(newField.fieldDefinition.profileField.id)) {
                                matchingField.setRawValue(matchingField.getNumValues(), bitsValue);
                            } else {
                                newField.setRawValue(0, bitsValue);
                            }
                        } else {
                            let fbitsValue = bitsValue;

                            fbitsValue = (fbitsValue / fC.scale) - fC.offset;

                            if (this.hasField(newField.fieldDefinition.profileField.id)) {
                                matchingField.setValue(matchingField.getNumValues(), fbitsValue);
                            } else {
                                newField.setValue1(fbitsValue);
                            }
                        }
                    } else {
                        // Shouldn't apply scale/offset to string or enum
                        let nonNumericBitsValue: any;
                        // Ensure strings are added as byte[]
                        if (newField.fieldDefinition.profileField.baseType.baseType === 'string') {
                            nonNumericBitsValue = [];
                            nonNumericBitsValue.push(bitsValue);
                        } else {
                            nonNumericBitsValue = bitsValue;
                        }
                        if (this.hasField(newField.fieldDefinition.profileField.id)) {
                            matchingField.setValue(matchingField.getNumValues(), nonNumericBitsValue);
                        } else {
                            newField.setValue1(nonNumericBitsValue);
                        }
                    }
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
        for (let i = 0; i < this.fields.length; ++i) {
            let componentList: FieldComponent[];
            // Determine the active subfield
            const activeSubfield = this.getActiveSubFieldIndex(this.fields[i].fieldDefinition.profileField.id);

            if (activeSubfield === Fit.subfieldIndexMainField) {
                componentList = this.fields[i].components;
            } else {
                const subfield = this.fields[i].getSubfield(activeSubfield);
                if (!subfield)
                    throw new Error("subfield not found");

                componentList = subfield.components.map(x => new FieldComponent(x.id, x.accumulate, x.bits, x.scale, x.offset));
            }

            // Traverse the component list
            let offset = 0;
            for (const f of this.expandComponentsInList(componentList, this.fields[i], offset, accumulator)) {
                // Add the new field
                this.fields.push(f.field);
                // update offset
                offset = f.offset;
            }
        }
    }
}

export type MesgAny = Mesg<MessageListMessageTypeWithInvalid>;

class FieldComponentExpansion<T extends ProfileFieldTypeWithInvalid> {
    public offset: number;
    public field: Field<T>;

    public constructor(f: Field<T>, offset: number) {
        this.field = f;
        this.offset = offset;
    }
}

function canSubfieldSupportMesg<T extends MessageListMessageTypeWithInvalid>(subfield: ArrayElement<ArrayElement<T['fields']>['subfields']>, mesg: Mesg<T>) {
    for (const refField of subfield.refFields) {
        const referencedField = mesg.fields.find(f => f.fieldDefinition.profileField.id === refField.id);
        if (!referencedField)
            continue;
        //
        if (referencedField.getValue1(0, Fit.subfieldIndexMainField) === refField.rawValue)
            // this subfield can support this message
            return true;
    }
    return false;
}
