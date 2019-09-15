import { Fit } from './fit';
import { Subfield } from './subfield';

export abstract class FieldBase {
        //#region Fields
    private readonly values: any[] = [];
        //#endregion

        //#region Properties
    public abstract get Name(): string;
    public abstract get Type(): number;
    public abstract get Scale(): number;
    public abstract get Offset(): number;
    public abstract get Units(): string;
        //#endregion

        //#region Constructors

    protected constructor(other?: FieldBase) {
        if (other !== undefined) {
            for (const obj of other.values) {
                this.values.push(obj);
            }
        }
    }
        //#endregion

        //#region Methods

    public abstract getSubfield(subfieldNameOrIndex: string | number): Subfield | undefined;

    public getName(subfieldIndexOrNameOrSubfield?: number | string | Subfield): string {
        if (typeof subfieldIndexOrNameOrSubfield === 'number') {
            return this.getName_Idx(subfieldIndexOrNameOrSubfield);
        }
        if (typeof subfieldIndexOrNameOrSubfield === 'string') {
            return this.getName_Name(subfieldIndexOrNameOrSubfield);
        }
        if (subfieldIndexOrNameOrSubfield === undefined ||
                Subfield.isOfType(subfieldIndexOrNameOrSubfield)) {
            return this.getName_Subfield(subfieldIndexOrNameOrSubfield);
        }
        throw new Error('invalid parameters.');
    }

    public getName_Idx(subfieldIndex: number): string {
        return this.getName(this.getSubfield(subfieldIndex));
    }

    public getName_Name(subFieldName: string): string {
        return this.getName(this.getSubfield(subFieldName));
    }

    private getName_Subfield(subfield?: Subfield): string {
        return subfield == null ? this.Name : subfield.Name;
    }

    public getType(subfieldIndexOrNameOrSubfield?: number | string | Subfield): number {
        if (typeof subfieldIndexOrNameOrSubfield === 'number') {
            return this.getType1(subfieldIndexOrNameOrSubfield);
        }
        if (typeof subfieldIndexOrNameOrSubfield === 'string') {
            return this.getType2(subfieldIndexOrNameOrSubfield);
        }
        if (subfieldIndexOrNameOrSubfield === undefined ||
                Subfield.isOfType(subfieldIndexOrNameOrSubfield)) {
            return this.getType3(subfieldIndexOrNameOrSubfield);
        }
        throw new Error('invalid parameters.');
    }

    public getType1(subfieldIndex: number): number {
        return this.getType(this.getSubfield(subfieldIndex));
    }

    public getType2(subFieldName: string): number {
        return this.getType(this.getSubfield(subFieldName));
    }

    private getType3(subfield?: Subfield): number {
        return subfield === undefined ? this.Type : subfield.Type;
    }

    public getUnits(subfieldIndexOrNameOrSubfield?: number | string | Subfield): string {
        if (typeof subfieldIndexOrNameOrSubfield === 'number') {
            return this.getUnits1(subfieldIndexOrNameOrSubfield);
        }
        if (typeof subfieldIndexOrNameOrSubfield === 'string') {
            return this.getUnits2(subfieldIndexOrNameOrSubfield);
        }
        if (subfieldIndexOrNameOrSubfield === undefined ||
                Subfield.isOfType(subfieldIndexOrNameOrSubfield)) {
            return this.getUnits3(subfieldIndexOrNameOrSubfield);
        }
        throw new Error('invalid parameters.');
    }

    public getUnits1(subfieldIndex: number): string {
        return this.getUnits(this.getSubfield(subfieldIndex));
    }

    public getUnits2(subFieldName: string): string {
        return this.getUnits(this.getSubfield(subFieldName));
    }

    private getUnits3(subfield?: Subfield): string {
        return subfield == null ? this.Units : subfield.Units;
    }

    public getSize(): number {
        let size = 0;

        switch (this.Type & Fit.baseTypeNumMask) {
            case Fit.enum:
            case Fit.sInt8:
            case Fit.uInt8:
            case Fit.sInt16:
            case Fit.uInt16:
            case Fit.sInt32:
            case Fit.uInt32:
            case Fit.float32:
            case Fit.float64:
            case Fit.uInt8z:
            case Fit.uInt16z:
            case Fit.uInt32z:
            case Fit.sInt64:
            case Fit.uInt64:
            case Fit.uInt64z:
            case Fit.byte:
                size = (this.getNumValues() * Fit.baseType[this.Type & Fit.baseTypeNumMask].size);
                break;

            case Fit.string:
                // Each string may be of differing length
                // The fit binary must also include a null terminator
                this.values.forEach((element) => {
                    size += element.length;
                });
                break;

            default:
                break;
        }
        return size;
    }

    public isSigned(subfieldIndexOrNameOrSubfield?: number | string | Subfield): boolean {
        if (typeof subfieldIndexOrNameOrSubfield === 'number') {
            return this.isSigned1(subfieldIndexOrNameOrSubfield);
        }
        if (typeof subfieldIndexOrNameOrSubfield === 'string') {
            return this.isSigned2(subfieldIndexOrNameOrSubfield);
        }
        if (subfieldIndexOrNameOrSubfield === undefined ||
                Subfield.isOfType(subfieldIndexOrNameOrSubfield)) {
            return this.isSigned3(subfieldIndexOrNameOrSubfield);
        }
        return false;
    }

    public isSigned1(subfieldIndex: number): boolean {
        return this.isSigned(this.getSubfield(subfieldIndex));
    }

    public isSigned2(subfieldName: string): boolean {
        return this.isSigned(this.getSubfield(subfieldName));
    }

    public isSigned3(subfield?: Subfield): boolean {
        let type: number = subfield === undefined ? this.Type : subfield.Type;
        type &= Fit.baseTypeNumMask;
        return Fit.baseType[type].isSigned;
    }

    public addValue(value: any): void {
        value.Add(value);
    }

    public getNumValues(): number {
        return this.values.length;
    }

    public getBitsValue(offset: number,  bits: number,  componentType: number): number | undefined {
        let value: number | undefined = 0 ;
        let data: number = 0;
        let mask: number;
        let index: number = 0;
        let bitsInValue: number = 0;
        let bitsInData: number;

            // Ensure the destination type can hold the desired number of bits.
            // We don't support arrays in the destination at this time.
        if ((Fit.baseType[componentType & Fit.baseTypeNumMask].size * 8) < bits) {
            // tslint:disable-next-line: no-parameter-reassignment
            bits = Fit.baseType[componentType & Fit.baseTypeNumMask].size * 8;
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

            data = Convert.toInt64(this.values[index++]);

                // Shift data to reach desired bits starting at 'offset'
                // If offset is larger than the containing types size,
                // we must grab additional elements
            data >>= offset;
            bitsInData = Fit.baseType[this.Type & Fit.baseTypeNumMask].size * 8 - offset;
            // tslint:disable-next-line: no-parameter-reassignment
            offset -= Fit.baseType[this.Type & Fit.baseTypeNumMask].size * 8;

            if (bitsInData > 0) {
                    // We have reached desired data, pull off bits until we
                    // get enough
                // tslint:disable-next-line: no-parameter-reassignment
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
        if (Fit.baseType[componentType & Fit.baseTypeNumMask].isSigned &&
                Fit.baseType[componentType & Fit.baseTypeNumMask].isInteger) {
            const signBit: number = (1 << (bits - 1));

            if ((value & signBit) !== 0) {
                value = -signBit + (value & (signBit - 1));
            }
        }
        return value;
    }

    public getValue(
        index?: number,
        subfieldIndexOrNameOrSubfield?: number | string | Subfield,
    ): any {
        if (typeof subfieldIndexOrNameOrSubfield === 'number') {
            return this.getValue1(index!, subfieldIndexOrNameOrSubfield);
        }
        if (typeof subfieldIndexOrNameOrSubfield === 'string') {
            return this.getValue2(index!, subfieldIndexOrNameOrSubfield);
        }
        if (index === undefined || typeof subfieldIndexOrNameOrSubfield === 'undefined') {
            return this.getValue3(index, subfieldIndexOrNameOrSubfield);
        }
    }

    public getValue1(index: number, subfieldIndex: number): any {
        return this.getValue3(index, this.getSubfield(subfieldIndex));
    }

    public getValue2(index: number, subfieldName: string): any {
        return this.getValue3(index, this.getSubfield(subfieldName));
    }

    public getValue3(index: number = 0, subfield?: Subfield): any {
        let scale: number;
        let offset: number;

        if (index >= this.values.length || index < 0) {
            return null;
        }

        if (subfield == null) {
            scale = this.Scale;
            offset = this.Offset;
        } else {
            scale = subfield.Scale;
            offset = subfield.Offset;
        }

        let value: any;
        let castToFloat: boolean = false;

        switch (this.Type & Fit.baseTypeNumMask) {
            case Fit.enum:
            case Fit.byte:
            case Fit.uInt8:
            case Fit.uInt8z:
                value = Convert.ToByte(value[index]);
                if ((value === Fit.baseType[this.Type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.sInt8:
                value = Convert.ToSByte(value[index]);
                if ((value === Fit.baseType[this.Type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.sInt16:
                value = Convert.ToInt16(value[index]);
                if ((value === Fit.baseType[this.Type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.uInt16:
            case Fit.uInt16z:
                value = Convert.ToUInt16(value[index]);
                if ((value === Fit.baseType[this.Type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.sInt32:
                value = Convert.ToInt32(value[index]);
                if ((value === Fit.baseType[this.Type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.uInt32:
            case Fit.uInt32z:
                value = Convert.ToUInt32(value[index]);
                if ((value === Fit.baseType[this.Type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.sInt64:
                value = Convert.ToInt64(value[index]);
                if ((value === Fit.baseType[this.Type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.uInt64:
            case Fit.uInt64z:
                value = Convert.ToUInt64(value[index]);
                if ((value === Fit.baseType[this.Type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.float32:
                value = Convert.toSingle(value[index]);
                if (isNaN(value) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.float64:
                value = Convert.toDouble(value[index]);
                if (isNaN(value) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.string:
                value = value[index];
                break;

            default:
                value = null;
                break;
        }

        if (castToFloat) {
                // Cast to Single Precision (float) since its expecting a float value if scale > 1
            value = Convert.toSingle(value);
            return value;
        }

        if (this.isNumeric()) {
            if (scale !== 1.0 || this.Offset !== 0.0) {
                value = ((Convert.toSingle(value) / scale) - offset);
            }
        }

        return value;
    }

    public setValue1(value: any): void {
        this.setValue(0, value, undefined);
    }

    public setValue2(value: any, subfieldIndex: number): void {
        this.setValue(0, value, this.getSubfield(subfieldIndex));
    }

    public setValue3(value: any, subfieldName: string): void {
        this.setValue(0, value, this.getSubfield(subfieldName));
    }

    public setValue4(index: number, value: any): void {
        this.setValue(index, value, undefined);
    }

    public setValue5(index: number, value: any, subfieldIndex: number): void {
        this.setValue(index, value, this.getSubfield(subfieldIndex));
    }

    public setValue6(index: number, value: any, subfieldName: string): void {
        this.setValue(index, value, this.getSubfield(subfieldName));
    }

    public setValue(index: number, value: any, subfield?: Subfield): void {
        let scale: number;
        let offset: number;

        while (index >= this.getNumValues()) {
            // Add placeholders of the correct type so GetSize() will
            // still compute correctly
            switch (this.Type & Fit.baseTypeNumMask) {
                case Fit.enum:
                case Fit.byte:
                case Fit.uInt8:
                case Fit.uInt8z:
                    this.values.push(0);
                    break;

                case Fit.sInt8:
                    this.values.push(0);
                    break;

                case Fit.sInt16:
                    this.values.push(0);
                    break;

                case Fit.uInt16:
                case Fit.uInt16z:
                    this.values.push(0);
                    break;

                case Fit.sInt32:
                    this.values.push(0);
                    break;

                case Fit.uInt32:
                case Fit.uInt32z:
                    this.values.push(0);
                    break;

                case Fit.sInt64:
                    this.values.push(0);
                    break;

                case Fit.uInt64:
                case Fit.uInt64z:
                    this.values.push(0);
                    break;

                case Fit.float32:
                    this.values.push(0);
                    break;

                case Fit.float64:
                    this.values.push(0);
                    break;

                case Fit.string:
                    this.values.push(0);
                    break;

                default:
                    break;
            }
        }

        if (subfield == null) {
            scale = this.Scale;
            offset = this.Offset;
        } else {
            scale = subfield.Scale;
            offset = this.Offset;
        }

            // Cast to long as scale and offset only apply to integer based types
            // and we want to make sure we have maximum precision.
        let invalidValue: number = 0;
        let castedValue: number = 0;

        if (this.isNumeric()) {
                // Cast to long as scale and offset only apply to integer based types
                // and we want to make sure we have maximum precision.
            invalidValue = Convert.toDouble(Fit.baseType[this.Type & Fit.baseTypeNumMask]
                            .invalidValue);
            castedValue = Convert.toDouble(value);

                // If the field is numeric, check if the value is less than the base
                // type's invalid value. For "z" base types where 0 is invalid, check
                // that the value is > 0. Apply scale and offset if valid.
            if ((castedValue < invalidValue) ||
                   ((invalidValue === 0) && (castedValue > 0))) {
                if (scale !== 1.0 || this.Offset !== 0.0) {
                    // tslint:disable-next-line: no-parameter-reassignment
                    value = Convert.toSingle(value);
                    // tslint:disable-next-line: no-parameter-reassignment
                    value = (value + offset) * scale;
                }
            }
        }

            // Must convert value back to the base type, if there was a scale or offset it will
            // have been converted to float.  Caller also may have passed in an unexpected type.
        let success: boolean = false;

        switch (this.Type & Fit.baseTypeNumMask) {
            case Fit.enum:
            case Fit.byte:
            case Fit.uInt8:
            case Fit.uInt8z:
                if ((Convert.toDouble(value) >= 0) &&
                    (Convert.toDouble(value) <= 255)) {
                    // tslint:disable-next-line: no-parameter-reassignment
                    value = Convert.toByte(value);
                    success = true;
                }
                break;

            case Fit.sInt8:
                if ((Convert.toDouble(value) >= -128) &&
                    (Convert.toDouble(value) <= 127)) {
                    // tslint:disable-next-line: no-parameter-reassignment
                    value = Convert.toSByte(value);
                    success = true;
                }
                break;

            case Fit.sInt16:
                if ((Convert.toDouble(value) >= -32768) &&
                    (Convert.toDouble(value) <= 32767)) {
                    // tslint:disable-next-line: no-parameter-reassignment
                    value = Convert.ToInt16(value);
                    success = true;
                }
                break;

            case Fit.uInt16:
            case Fit.uInt16z:
                if ((Convert.toDouble(value) >= 0) &&
                    (Convert.toDouble(value) <= 65535)) {
                    value = Convert.ToUInt16(value);
                    success = true;
                }
                break;

            case Fit.sInt32:
                if ((Convert.toDouble(value) >= -2147483648) &&
                    (Convert.toDouble(value) <= 2147483647)) {
                    // tslint:disable-next-line: no-parameter-reassignment
                    value = Convert.ToInt32(value);
                    success = true;
                }
                break;

            case Fit.uInt32:
            case Fit.uInt32z:
                if ((Convert.toDouble(value) >= -2147483648) &&
                    (Convert.toDouble(value) <= 2147483647)) {
                    // tslint:disable-next-line: no-parameter-reassignment
                    value = Convert.ToUInt32(value);
                    success = true;
                }
                break;

            case Fit.sInt64:
                // tslint:disable-next-line: no-parameter-reassignment
                value = Convert.ToInt64(value);
                success = true;
                break;

            case Fit.uInt64:
            case Fit.uInt64z:
                // tslint:disable-next-line: no-parameter-reassignment
                value = Convert.ToUInt64(value);
                success = true;
                break;

            case Fit.float32:
                if ((Convert.toDouble(value) >= -3.402823E+38) &&
                    (Convert.toDouble(value) <= 3.402823E+38)) {
                    // tslint:disable-next-line:no-parameter-reassignment
                    value = Convert.toSingle(value);
                    success = true;
                }
                break;

            case Fit.float64:
                if ((value >= -1.79769313486232E+308) && (value <= 1.79769313486232E+308)) {
                    // tslint:disable-next-line:no-parameter-reassignment
                    value = Convert.toDouble(value);
                    success = true;
                }
                break;

            case Fit.string:
                success = true;
                break;

            default:
                break;
        }

            // If the conversion failed, set the value to invalid
        if (!success) {
            // tslint:disable-next-line: no-parameter-reassignment
            value = Fit.baseType[this.Type & Fit.baseTypeNumMask].invalidValue;
        }
        value[index] = value;
    }

    public setRawValue(index: number, value: any): void {
        while (index >= this.getNumValues()) {
                // Add placeholders of the correct type so GetSize() will
                // still compute correctly
            switch (this.Type & Fit.baseTypeNumMask) {
                case Fit.enum:
                case Fit.byte:
                case Fit.uInt8:
                case Fit.uInt8z:
                    this.values.push(0);
                    break;

                case Fit.sInt8:
                    this.values.push(0);
                    break;

                case Fit.sInt16:
                    this.values.push(0);
                    break;

                case Fit.uInt16:
                case Fit.uInt16z:
                    this.values.push(0);
                    break;

                case Fit.sInt32:
                    this.values.push(0);
                    break;

                case Fit.uInt32:
                case Fit.uInt32z:
                    this.values.push(0);
                    break;

                case Fit.sInt64:
                    this.values.push(0);
                    break;

                case Fit.uInt64:
                case Fit.uInt64z:
                    this.values.push(0);
                    break;

                case Fit.float32:
                    this.values.push(0);
                    break;

                case Fit.float64:
                    this.values.push(0);
                    break;

                case Fit.string:
                    this.values.push(''); /*new byte[0]*/
                    break;

                default:
                    break;
            }
        }
        // Must convert value back to the base type, caller may have passed in an unexpected type.
        switch (this.Type & Fit.baseTypeNumMask) {
            case Fit.enum:
            case Fit.byte:
            case Fit.uInt8:
            case Fit.uInt8z:
                // tslint:disable-next-line:no-parameter-reassignment
                value = Convert.ToByte(value);
                break;

            case Fit.sInt8:
                // tslint:disable-next-line:no-parameter-reassignment
                value = Convert.ToSByte(value);
                break;

            case Fit.sInt16:
                // tslint:disable-next-line:no-parameter-reassignment
                value = Convert.ToInt16(value);
                break;

            case Fit.uInt16:
            case Fit.uInt16z:
                // tslint:disable-next-line:no-parameter-reassignment
                value = Convert.ToUInt16(value);
                break;

            case Fit.sInt32:
                // tslint:disable-next-line:no-parameter-reassignment
                value = Convert.ToInt32(value);
                break;

            case Fit.uInt32:
            case Fit.uInt32z:
                // tslint:disable-next-line:no-parameter-reassignment
                value = Convert.ToUInt32(value);
                break;

            case Fit.sInt64:
                // tslint:disable-next-line:no-parameter-reassignment
                value = Convert.ToInt64(value);
                break;

            case Fit.uInt64:
            case Fit.uInt64z:
                // tslint:disable-next-line:no-parameter-reassignment
                value = Convert.ToUInt64(value);
                break;

            case Fit.float32:
                // tslint:disable-next-line:no-parameter-reassignment
                value = Convert.toSingle(value);
                break;

            case Fit.float64:
                // tslint:disable-next-line:no-parameter-reassignment
                value = Convert.toDouble(value);
                break;

            default:
                break;

        }
        this.values[index] = value;
    }

    public getRawValue(index: number): any {
        if (index >= this.values.length || index < 0) {
            return null;
        }
        const value: any = this.values[index];
        return value;
    }

    public isNumeric(): boolean {
        let isNumeric: boolean;
        switch (this.Type & Fit.baseTypeNumMask) {
            case Fit.enum:
            case Fit.string:
                isNumeric = false;
                break;

            case Fit.sInt8:
            case Fit.uInt8:
            case Fit.sInt16:
            case Fit.uInt16:
            case Fit.sInt32:
            case Fit.uInt32:
            case Fit.float32:
            case Fit.float64:
            case Fit.uInt8z:
            case Fit.uInt16z:
            case Fit.uInt32z:
            case Fit.byte:
            case Fit.sInt64:
            case Fit.uInt64:
            case Fit.uInt64z:
                isNumeric = true;
                break;

            default:
                throw new Error(`Field:IsNumeric - Unexpected Fit Type ${this.Type}`);

        }
        return isNumeric;
    }
    //#endregion;

}
