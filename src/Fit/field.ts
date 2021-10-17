import { Fit } from './fit';
import { FieldComponent } from './fieldComponent';
import { ArrayElement, BaseTypesListItem, isBaseTypeNumeric, isValueValidForBaseType } from '../profile';
import { FieldDefinition, ProfileFieldTypeWithInvalid } from './fieldDefinition';

export class Field<T extends ProfileFieldTypeWithInvalid> {
    private readonly values: (number | number[])[] = [];

    public fieldIdOverride?: number;
    public fieldTypeOverride?: number;

    public fieldDefinition: FieldDefinition<T>;
    private isAccumulated!: boolean;

    public subfields: ArrayElement<T['subfields']>[] = [];
    public components: FieldComponent[] = [];

    public get IsAccumulated(): boolean {
        return this.isAccumulated;
    }

    public isExpandedField!: boolean;

    public constructor(fieldDefinition: FieldDefinition<T>) {
        // this.fieldDefinition = new FieldDefinition(invalidField, 0, baseTypesList[0]);
        this.fieldDefinition = fieldDefinition;
    }

    public setIdOverride(value: number): void {
        if (this.fieldDefinition.profileField.id !== Fit.fieldNumInvalid)
            throw new Error(`Cannot override any other field id than "invalid" (current ${this.fieldDefinition.profileField.id})`);
        this.fieldIdOverride = value;
    }

    public setTypeOverride(value: number): void {
        if (this.fieldDefinition.profileField.id !== Fit.fieldNumInvalid)
            throw new Error(`Cannot override any other field type than "invalid" (current ${this.fieldDefinition.baseType.baseTypeid})`);
        this.fieldTypeOverride = value;
    }

    public getSubfield(index: keyof T['subfields']): ArrayElement<T['subfields']> | undefined;
    // tslint:disable-next-line: unified-signatures
    public getSubfield(subfieldName: ArrayElement<T['subfields']>['name']): ArrayElement<T['subfields']> | undefined;
    public getSubfield(subfieldNameOrIndex: ArrayElement<T['subfields']>['name'] | keyof T['subfields']): ArrayElement<T['subfields']> | undefined {
        if (typeof subfieldNameOrIndex === 'string') {
            const result = this.fieldDefinition.profileField.subfields.map(x => x).find(subfield => subfield.name === subfieldNameOrIndex);
            return result;
        }
        // SubfieldIndexActiveSubfield and SubfieldIndexMainField
        // will be out of this range
        if (subfieldNameOrIndex >= 0 && subfieldNameOrIndex < this.fieldDefinition.profileField.subfields.length) {
            if (typeof subfieldNameOrIndex === 'number')
                return this.fieldDefinition.profileField.subfields[subfieldNameOrIndex];
        }

        return;
    }

    public getSubfieldByName(subfieldName: string) {
        return this.fieldDefinition.profileField.subfields.map(x => x).find(subfield => subfield.name === subfieldName);
    }

    public addValue(value: number[]): void {
        this.values.push(value);
    }

    public getNumValues(): number {
        return this.values.length;
    }

    public getBitsValue(offset: number,  bits: number,  baseType: BaseTypesListItem): number | undefined {
        let value: number | undefined = 0 ;
        let data: number = 0;
        let mask: number;
        let index: number = 0;
        let bitsInValue: number = 0;
        let bitsInData: number;

        // Ensure the destination type can hold the desired number of bits.
        // We don't support arrays in the destination at this time.

        if ((baseType.size * 8) < bits) {
            bits = baseType.size * 8;
        }

        if (this.values.length === 0) {
            return undefined;
        }

        while (bitsInValue < bits) {
            // If we run out of bits it likely is because our profile is newer and defines
            // additional components not present in the field
            if (index === this.values.length) {
                return undefined;
            }

            const tempData = this.values[index++];
            if (typeof tempData !== 'number')
                throw new Error("data not number");
            data = tempData;
            // Shift data to reach desired bits starting at 'offset'
            // If offset is larger than the containing types size,
            // we must grab additional elements
            data >>= offset;
            bitsInData = this.fieldDefinition.baseType.size * 8 - offset;
            offset -= this.fieldDefinition.baseType.size * 8;

            if (bitsInData > 0) {
                // We have reached desired data, pull off bits until we
                // get enough
                offset = 0;
                // If there are more bits available in data than we need
                // just capture those we need
                if (bitsInData > (bits - bitsInValue)) {
                    bitsInData = bits - bitsInValue;
                }
                mask = (1 << bitsInData) - 1;
                value |= ((data & mask) << bitsInValue);
                bitsInValue += bitsInData;
            }
        }

        // Sign extend if needed
        if (baseType.isSigned) {
            const signBit: number = (1 << (bits - 1));

            if ((value & signBit) !== 0) {
                value = -signBit + (value & (signBit - 1));
            }
        }
        return value;
    }

    public getValue(
        index?: number,
        subfieldIndexOrNameOrSubfield?: keyof T['subfields'] & number | ArrayElement<T['subfields']>['name'] | ArrayElement<T['subfields']>,
    ): number | number[] | undefined {
        if (typeof subfieldIndexOrNameOrSubfield === 'number') {
            return this.getValue1(index!, subfieldIndexOrNameOrSubfield);
        }
        if (typeof subfieldIndexOrNameOrSubfield === 'string') {
            return this.getValue2(index!, subfieldIndexOrNameOrSubfield);
        }
        if (index === undefined || typeof subfieldIndexOrNameOrSubfield === 'undefined') {
            return this.getValue3(index, subfieldIndexOrNameOrSubfield);
        }
        throw new Error("invalid params");

    }

    public getValue1(index: number, subfieldIndex: keyof T['subfields'] & number): number | number[] | undefined {
        return this.getValue3(index, this.getSubfield(subfieldIndex));
    }

    private getValue2(index: number, subfieldName: ArrayElement<T['subfields']>['name']): number | number[] | undefined {
        return this.getValue3(index, this.getSubfield(subfieldName));
    }

    public getValue3(index: number = 0, subfield?: ArrayElement<T['subfields']>): number | number[] | undefined {
        let scale: ArrayElement<T['subfields']>['scale'] | T['scale'];
        let offset: ArrayElement<T['subfields']>['offset'] | T['offset'];

        if (index >= this.values.length || index < 0) {
            return;
        }

        if (subfield === undefined) {
            scale = this.fieldDefinition.profileField.scale;
            offset = this.fieldDefinition.profileField.offset;
        } else {
            scale = subfield.scale;
            offset = subfield.offset;
        }

        let value: number | number[];
        const fieldDef = this.fieldDefinition;
        switch (fieldDef.baseType.baseType) {
            case 'enum':
            case 'byte':
            case 'uint8':
            case 'uint8z':
            case 'sint8':
            case 'sint16':
            case 'uint16':
            case 'uint16z':
            case 'sint32':
            case 'uint32':
            case 'uint32z':
                value = this.values[index];
                if (typeof value !== 'number')
                    throw new Error("wrong value");
                if ((value === fieldDef.baseType.invalidValue) && (scale !== 1.0)) {
                    return value;
                }
                break;

            case 'float32':
                value = this.values[index];
                if (typeof value !== 'number')
                    throw new Error("wrong value");
                if (isNaN(value) && (scale !== 1.0)) {
                    return value;
                }
                break;

            case 'string':
                value = this.values[index];
                if (typeof value === 'number')
                    throw new Error("wrong value");
                break;
            default:
                throw new Error("unknown base type");
        }

        if (typeof value === 'number' && isBaseTypeNumeric(this.fieldDefinition.baseType.baseTypeid)) {
            if (scale === undefined || offset === undefined)
                return value;
            if (scale !== 1.0 || offset !== 0.0) {
                // This should be number, but ts doesn't allow to use in arithmetics for some reason, casting...
                const scaleNum = scale as number;
                const offsetNum = offset as number;
                value = ((value / scaleNum) - offsetNum);
            }
        }

        return value;
    }

    public setValue1(value: number | number[]): void {
        this.setValue(0, value, undefined);
    }

    public setValue5(index: number, value: number | number[], subfieldIndex: keyof T['subfields'] & number): void {
        this.setValue(index, value, this.getSubfield(subfieldIndex));
    }

    public setValue6(index: number, value: number | number[], subfieldName: ArrayElement<T['subfields']>['name']): void {
        this.setValue(index, value, this.getSubfield(subfieldName));
    }

    public setValue(index: number, value: number | number[], subfield?: ArrayElement<T['subfields']>): void {
        let scale: ArrayElement<T['subfields']>['scale'] | T['scale'];
        let offset: ArrayElement<T['subfields']>['offset'] | T['offset'];

        while (index >= this.getNumValues()) {
            // Add placeholders of the correct type so GetSize() will
            // still compute correctly
            const fieldDef = this.fieldDefinition;

            switch (fieldDef.baseType.baseType) {
                case 'enum':
                case 'byte':
                case 'uint8':
                case 'uint8z':
                case 'sint8':
                case 'sint16':
                case 'uint16':
                case 'uint16z':
                case 'sint32':
                case 'uint32':
                case 'uint32z':
                case 'sint64':
                case 'uint64':
                case 'uint64z':
                case 'float32':
                case 'float64':
                    this.values.push(0);
                    break;
                case 'string':
                    this.values.push([0]);
                    break;
                default:
                    break;
            }
        }

        if (subfield == null) {
            scale = this.fieldDefinition.profileField.scale;
            offset = this.fieldDefinition.profileField.offset;
        } else {
            scale = subfield.scale;
            offset = subfield.offset;
        }

            // Cast to long as scale and offset only apply to integer based types
            // and we want to make sure we have maximum precision.
        let invalidValue: number = 0;
        let castedValue: number = 0;

        if (typeof value === 'number' && isBaseTypeNumeric(this.fieldDefinition.baseType.baseTypeid)) {
            // Cast to long as scale and offset only apply to integer based types
            // and we want to make sure we have maximum precision.
            invalidValue = this.fieldDefinition.baseType.invalidValue;
            castedValue = value;

            // If the field is numeric, check if the value is less than the base
            // type's invalid value. For "z" base types where 0 is invalid, check
            // that the value is > 0. Apply scale and offset if valid.
            if ((castedValue < invalidValue) || ((invalidValue === 0) && (castedValue > 0))) {
                if (scale === undefined || offset === undefined)
                    throw new Error("invalid scale or offset");

                if (scale !== 1.0 || offset !== 0.0) {
                    // tslint:disable-next-line: no-parameter-reassignment
                    value = value;
                    // tslint:disable-next-line: no-parameter-reassignment
                    value = (value + (offset as number)) * (scale as number);
                }
            }
        }

        // Must convert value back to the base type, if there was a scale or offset it will
        // have been converted to float.  Caller also may have passed in an unexpected type.
        let success: boolean = false;

        success = isValueValidForBaseType(this.fieldDefinition.baseType.baseTypeid, value);

        // If the conversion failed, set the value to invalid
        if (!success) {
            value = this.fieldDefinition.baseType.invalidValue;
        }
        this.values[index] = value;
    }

    public setRawValue(index: number, value: number | number[]): void {
        while (index >= this.getNumValues()) {
            // Add placeholders of the correct type so GetSize() will
            // still compute correctly
            switch (this.fieldDefinition.baseType.baseType) {
                case 'enum':
                case 'byte':
                case 'uint8':
                case 'uint8z':
                case 'sint8':
                case 'sint16':
                case 'uint16':
                case 'uint16z':
                case 'sint32':
                case 'uint32':
                case 'uint32z':
                case 'sint64':
                case 'uint64':
                case 'uint64z':
                case 'float32':
                case 'float64':
                    this.values.push(0);
                    break;

                case 'string':
                    this.values.push([0]); /*new byte[0]*/
                    break;

                default:
                    break;
            }
        }
        this.values[index] = value;
    }

    public getRawValue(index: number): number | number[] | undefined {
        if (index >= this.values.length || index < 0) {
            return;
        }
        const value = this.values[index];
        return value;
    }
}

export type FieldAny = Field<ProfileFieldTypeWithInvalid>;
