import { Fit } from '../../fit';

export class FitBaseType {
    public static readonly enum: number = 0;
    public static readonly sint8: number = 1;
    public static readonly uint8: number = 2;
    public static readonly sint16: number = 131;
    public static readonly uint16: number = 132;
    public static readonly sint32: number = 133;
    public static readonly uint32: number = 134;
    public static readonly string: number = 7;
    public static readonly float32: number = 136;
    public static readonly float64: number = 137;
    public static readonly uint8z: number = 10;
    public static readonly uint16z: number = 139;
    public static readonly uint32z: number = 140;
    public static readonly byte: number = 13;
    public static readonly sint64: number = 142;
    public static readonly uint64: number = 143;
    public static readonly uint64z: number = 144;
    public static readonly invalid: number = 0xFF;

    public static isNumericInvalid(value: number, type: number): boolean {
        let isInvalid: boolean = false;

        switch (type) {
            case FitBaseType.enum:
            case FitBaseType.byte:
            case FitBaseType.uint8:
            case FitBaseType.uint8z: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitBaseType.sint8: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitBaseType.sint16: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitBaseType.uint16:
            case FitBaseType.uint16z: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitBaseType.sint32: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitBaseType.uint32:
            case FitBaseType.uint32z: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitBaseType.float32: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitBaseType.float64: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            default:
                isInvalid = true;
                break;
        }

        return isInvalid;
    }
}
