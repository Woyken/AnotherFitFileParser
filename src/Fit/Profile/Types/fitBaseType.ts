import { Fit } from '../../fit';

export enum FitFieldType {
    enum = 0,
    sint8 = 1,
    uint8 = 2,
    sint16 = 131,
    uint16 = 132,
    sint32 = 133,
    uint32 = 134,
    string = 7,
    float32 = 136,
    float64 = 137,
    uint8z = 10,
    uint16z = 139,
    uint32z = 140,
    byte = 13,
    sint64 = 142,
    uint64 = 143,
    uint64z = 144,
    invalid = 0xFF,
}

export class FitBaseType {
    public static isNumericInvalid(value: number, type: number): boolean {
        let isInvalid: boolean = false;

        switch (type) {
            case FitFieldType.enum:
            case FitFieldType.byte:
            case FitFieldType.uint8:
            case FitFieldType.uint8z: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue as number;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitFieldType.sint8: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue as number;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitFieldType.sint16: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue as number;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitFieldType.uint16:
            case FitFieldType.uint16z: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue as number;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitFieldType.sint32: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue as number;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitFieldType.uint32:
            case FitFieldType.uint32z: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue as number;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitFieldType.float32: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue as number;
                if (value === val) {
                    isInvalid = true;
                }
                break;
            }
            case FitFieldType.float64: {
                const val: number = Fit.baseType[type & Fit.baseTypeNumMask].invalidValue as number;
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
