import { BaseTypesListItem } from '../../../profile';

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
    public static isNumericInvalid(value: number, type: BaseTypesListItem): boolean {
        let isInvalid: boolean = false;

        switch (type.baseType) {
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
            case 'float32':
            case 'float64': {
                if (value === type.invalidValue) {
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
