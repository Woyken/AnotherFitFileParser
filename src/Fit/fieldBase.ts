import { Fit } from './fit';
import { Subfield } from './subfield';

export abstract class FieldBase {
        //#region Fields
    private readonly values: any[] = [];
        //#endregion

        //#region Properties
    public abstract name: string;
    public abstract type: number;
    public abstract scale: number;
    public abstract offset: number;
    public abstract units: string;
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
    }

    public getName_Idx(subfieldIndex: number): string {
        return this.getName(this.getSubfield(subfieldIndex));
    }

    public getName_Name(subFieldName: string): string {
        return this.getName(this.getSubfield(subFieldName));
    }

    private getName_Subfield(subfield?: Subfield): string {
        return subfield == null ? this.name : subfield.Name;
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
    }

    public getType1(subfieldIndex: number): number {
        return this.getType(this.getSubfield(subfieldIndex));
    }

    public getType2(subFieldName: string): number {
        return this.getType(this.getSubfield(subFieldName));
    }

    private getType3(subfield: Subfield): number {
        return subfield == null ? this.type : subfield.type;
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
    }

    public getUnits1(subfieldIndex: number): string {
        return this.getUnits(this.getSubfield(subfieldIndex));
    }

    public getUnits2(subFieldName: string): string {
        return this.getUnits(this.getSubfield(subFieldName));
    }

    private getUnits3(subfield?: Subfield): string {
        return subfield == null ? this.units : subfield.Units;
    }

    public getSize(): number {
        let size = 0;

        switch (this.type & Fit.baseTypeNumMask) {
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
                size = (this.getNumValues() * Fit.baseType[this.type & Fit.baseTypeNumMask].size);
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

    public isSigned3(subfield: Subfield): boolean {
        let type: number = subfield == null ? this.type : subfield.Type;
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
        let value: number? = 0 ;
        let data: number = 0;
        let mask: number;
        let index: number = 0;
        let bitsInValue: number = 0;
        let bitsInData: number;

            // Ensure the destination type can hold the desired number of bits.
            // We don't support arrays in the destination at this time.
        if ((Fit.baseType[componentType & Fit.baseTypeNumMask].size * 8) < bits) {
            bits = Fit.baseType[componentType & Fit.baseTypeNumMask].size * 8;
        }

        if (this.values.length === 0) {
            return undefined;
        }

        while (bitsInValue < bits)
        {
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
            bitsInData = Fit.baseType[this.type & Fit.baseTypeNumMask].size * 8 - offset;
            offset -= Fit.baseType[this.type & Fit.baseTypeNumMask].size * 8;

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
            scale = this.scale;
            offset = this.offset;
        } else {
            scale = subfield.Scale;
            offset = subfield.Offset;
        }

        let value: any;
        let castToFloat: boolean = false;

        switch (this.type & Fit.baseTypeNumMask) {
            case Fit.enum:
            case Fit.byte:
            case Fit.uInt8:
            case Fit.uInt8z:
                value = Convert.ToByte(value[index]);
                if ((value === Fit.baseType[this.type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.sInt8:
                value = Convert.ToSByte(value[index]);
                if ((value === Fit.baseType[this.type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.sInt16:
                value = Convert.ToInt16(value[index]);
                if ((value === Fit.baseType[this.type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.uInt16:
            case Fit.uInt16z:
                value = Convert.ToUInt16(value[index]);
                if ((value === Fit.baseType[this.type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.sInt32:
                value = Convert.ToInt32(value[index]);
                if ((value === Fit.baseType[this.type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.uInt32:
            case Fit.uInt32z:
                value = Convert.ToUInt32(value[index]);
                if ((value === Fit.baseType[this.type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.sInt64:
                value = Convert.ToInt64(value[index]);
                if ((value === Fit.baseType[this.type & Fit.baseTypeNumMask].invalidValue) &&
                       (scale !== 1.0)) {
                    castToFloat = true;
                }
                break;

            case Fit.uInt64:
            case Fit.uInt64z:
                value = Convert.ToUInt64(value[index]);
                if ((value === Fit.baseType[this.type & Fit.baseTypeNumMask].invalidValue) &&
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
            if (scale !== 1.0 || this.offset !== 0.0) {
                value = ((Convert.toSingle(value) / scale) - offset);
            }
        }

        return value;
    }

    // TODO convert SetValue methods

    // public SetValue(value: any): void {
    //     SetValue(0, value, (Subfield)null);
    // }

    // public SetValue(value: any, subfieldIndex: number): void {
    //     SetValue(0, value, GetSubfield(subfieldIndex));
    // }

    // public SetValue(value: any, subfieldName: string): void {
    //     SetValue(0, value, GetSubfield(subfieldName));
    // }

    // public SetValue(index: number, value: any): void {
    //     SetValue(index, value, (Subfield)null);
    // }

    // public SetValue(index: number, value: any, subfieldIndex: number): void {
    //     SetValue(index, value, GetSubfield(subfieldIndex));
    // }

    // public SetValue(index: number, value: any, subfieldName: string): void {
    //     SetValue(index, value, GetSubfield(subfieldName));
    // }

    // public SetValue(index: number, value: any, subfield: Subfield): void {
    //     let scale: number, offset;

    //     while (index >= this.getNumValues()) {
    //         // Add placeholders of the correct type so GetSize() will
    //         // still compute correctly
    //         switch (this.type & Fit.baseTypeNumMask) {
    //             case Fit.enum:
    //             case Fit.byte:
    //             case Fit.uInt8:
    //             case Fit.uInt8z:
    //                 value.Add(new byte());
    //                 break;

    //             case Fit.sInt8:
    //                 value.Add(new sbyte());
    //                 break;

    //             case Fit.sInt16:
    //                 value.Add(new short());
    //                 break;

    //             case Fit.uInt16:
    //             case Fit.uInt16z:
    //                 value.Add(new ushort());
    //                 break;

    //             case Fit.sInt32:
    //                 value.Add(new int());
    //                 break;

    //             case Fit.uInt32:
    //             case Fit.uInt32z:
    //                 value.Add(new uint());
    //                 break;

    //             case Fit.sInt64:
    //                 value.Add(new long());
    //                 break;

    //             case Fit.uInt64:
    //             case Fit.uInt64z:
    //                 value.Add(new ulong());
    //                 break;

    //             case Fit.float32:
    //                 value.Add(new float());
    //                 break;

    //             case Fit.float64:
    //                 value.Add(new double());
    //                 break;

    //             case Fit.string:
    //                 value.Add(new byte[0]);
    //                 break;

    //             default:
    //                 break;
    //         }
    //     }

    //     if (subfield == null) {
    //         scale = this.scale;
    //         offset = this.offset;
    //     } else {
    //         scale = subfield.scale;
    //         offset = this.offset;
    //     }

    //         // Cast to long as scale and offset only apply to integer based types
    //         // and we want to make sure we have maximum precision.
    //     let invalidValue: number = 0;
    //     let castedValue: number = 0;

    //     if (this.isNumeric()) {
    //             // Cast to long as scale and offset only apply to integer based types
    //             // and we want to make sure we have maximum precision.
    //         invalidValue = Convert.toDouble(Fit.baseType[this.type & Fit.baseTypeNumMask]
    //                         .invalidValue);
    //         castedValue = Convert.toDouble(value);

    //             // If the field is numeric, check if the value is less than the base
    //             // type's invalid value. For "z" base types where 0 is invalid, check
    //             // that the value is > 0. Apply scale and offset if valid.
    //         if ((castedValue < invalidValue) ||
    //                ((invalidValue === 0) && (castedValue > 0))) {
    //             if (scale !== 1.0 || Offset !== 0.0) {
    //                 value = Convert.toSingle(value);
    //                 value = (value + offset) * scale;
    //             }
    //         }
    //     }

    //         // Must convert value back to the base type, if there was a scale or offset it will
    //         // have been converted to float.  Caller also may have passed in an unexpected type.
    //     let success: boolean = false;

    //     switch (Type & Fit.baseTypeNumMask) {
    //         case Fit.enum:
    //         case Fit.byte:
    //         case Fit.uInt8:
    //         case Fit.uInt8z:
    //             if ((Convert.toDouble(value) >= byte.MinValue) &&
    //                 (Convert.toDouble(value) <= byte.MaxValue)) {
    //                 value = Convert.toByte(value);
    //                 success = true;
    //             }
    //             break;

    //         case Fit.sInt8:
    //             if ((Convert.toDouble(value) >= sbyte.MinValue) &&
    //                 (Convert.toDouble(value) <= sbyte.MaxValue)) {
    //                 value = Convert.toSByte(value);
    //                 success = true;
    //             }
    //             break;

    //         case Fit.sInt16:
    //             if ((Convert.toDouble(value) >= short.MinValue) &&
    //                 (Convert.toDouble(value) <= short.MaxValue)) {
    //                 value = Convert.ToInt16(value);
    //                 success = true;
    //             }
    //             break;

    //         case Fit.uInt16:
    //         case Fit.uInt16z:
    //             if ((Convert.toDouble(value) >= ushort.MinValue) &&
    //                 (Convert.toDouble(value) <= ushort.MaxValue)) {
    //                 value = Convert.ToUInt16(value);
    //                 success = true;
    //             }
    //             break;

    //         case Fit.sInt32:
    //             if ((Convert.toDouble(value) >= int.MinValue) &&
    //                 (Convert.toDouble(value) <= int.MaxValue)) {
    //                 value = Convert.ToInt32(value);
    //                 success = true;
    //             }
    //             break;

    //         case Fit.uInt32:
    //         case Fit.uInt32z:
    //             if ((Convert.toDouble(value) >= uint.MinValue) &&
    //                 (Convert.toDouble(value) <= uint.MaxValue)) {
    //                 value = Convert.ToUInt32(value);
    //                 success = true;
    //             }
    //             break;

    //         case Fit.sInt64:
    //             value = Convert.ToInt64(value);
    //             success = true;
    //             break;

    //         case Fit.uInt64:
    //         case Fit.uInt64z:
    //             value = Convert.ToUInt64(value);
    //             success = true;
    //             break;

    //         case Fit.float32:
    //             if ((Convert.toDouble(value) >= float.MinValue) && (Convert.toDouble(value) <= float.MaxValue)) {
    //                 value = Convert.toSingle(value);
    //                 success = true;
    //             }
    //             break;

    //         case Fit.float64:
    //             if (((double)value >= double.MinValue; ) && ((double); value <= double.MaxValue; ))
    //             {
    //                 value = Convert.toDouble(value);
    //                 success = true;
    //             }
    //             break;

    //         case Fit.string:
    //             success = true;
    //             break;

    //         default:
    //             break;
    //     }

    //         // If the conversion failed, set the value to invalid
    //     if (!success) {
    //         value = Fit.baseType[Type & Fit.baseTypeNumMask].invalidValue;
    //     }
    //     value[index] = value;
    // }

    public setRawValue(index: number, value: any): void {
        while (index >= this.getNumValues()) {
                // Add placeholders of the correct type so GetSize() will
                // still compute correctly
            switch (this.type & Fit.baseTypeNumMask) {
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
        switch (this.type & Fit.baseTypeNumMask) {
            case Fit.enum:
            case Fit.byte:
            case Fit.uInt8:
            case Fit.uInt8z:
                value = Convert.ToByte(value);
                break;

            case Fit.sInt8:
                value = Convert.ToSByte(value);
                break;

            case Fit.sInt16:
                value = Convert.ToInt16(value);
                break;

            case Fit.uInt16:
            case Fit.uInt16z:
                value = Convert.ToUInt16(value);
                break;

            case Fit.sInt32:
                value = Convert.ToInt32(value);
                break;

            case Fit.uInt32:
            case Fit.uInt32z:
                value = Convert.ToUInt32(value);
                break;

            case Fit.sInt64:
                value = Convert.ToInt64(value);
                break;

            case Fit.uInt64:
            case Fit.uInt64z:
                value = Convert.ToUInt64(value);
                break;

            case Fit.float32:
                value = Convert.toSingle(value);
                break;

            case Fit.float64:
                value = Convert.toDouble(value);
                break;

            default:
                break;

        }
        value[index] = value;
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
        switch (this.type & Fit.baseTypeNumMask) {
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
                throw new Error(`Field:IsNumeric - Unexpected Fit Type ${this.type}`);

        }
        return isNumeric;
    }
    //#endregion;

}
