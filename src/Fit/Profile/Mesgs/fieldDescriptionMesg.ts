import { Mesg } from '../../../Fit/mesg';
import { Fit } from '../../../Fit/fit';
import { BaseTypesListItem, findBaseTypeById, messageFieldsMapByName } from '../../../profile';
import { DeveloperDataIdMesg } from './developerDataIdMesg';

/// <summary>
/// Field Numbers for <see cref="FieldDescriptionMesg"/>
/// </summary>
export const enum FieldDefNum {
    developerDataIndex = 0,
    fieldDefinitionNumber = 1,
    fitBaseTypeId = 2,
    fieldName = 3,
    array = 4,
    components = 5,
    scale = 6,
    offset = 7,
    units = 8,
    bits = 9,
    accumulate = 10,
    fitBaseUnitId = 13,
    nativeMesgNum = 14,
    nativeFieldNum = 15,
    invalid = 255, // Fit.fieldNumInvalid,
}

// function stringToBytesUTF8(str: string): number[] {
//     const utf8 = unescape(encodeURIComponent(str));

//     const arr = [];
//     for (let i = 0; i < utf8.length; i++) {
//         arr.push(utf8.charCodeAt(i));
//     }
//     return arr;
// }

function bytesToStringUTF8(uintArray: number[]): string {
    const encodedString = String.fromCharCode.apply(null, uintArray);
    const decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

export type FieldDescriptionMessage = typeof messageFieldsMapByName.field_description_field_name.message;
export class FieldDescriptionMesg {
    private mesg: Mesg<FieldDescriptionMessage>;

    public developerDataId: DeveloperDataIdMesg;
    public fieldDefinitionNumber: number;
    public baseType: BaseTypesListItem;

    public constructor(mesg: Mesg<FieldDescriptionMessage>, developerDataId: DeveloperDataIdMesg) {
        this.mesg = mesg;
        this.developerDataId = developerDataId;

        const developerDataIndex = mesg.getFieldValue(messageFieldsMapByName.field_description_developer_data_index.field.id, 0, Fit.subfieldIndexMainField);
        if (developerDataIndex === undefined)
            throw new Error(`can't be undefined`);

        const fieldDefinitionNumber = mesg.getFieldValue(messageFieldsMapByName.field_description_field_definition_number.field.id, 0, Fit.subfieldIndexMainField);
        if (fieldDefinitionNumber === undefined)
            throw new Error(`can't be undefined`);
        if (typeof fieldDefinitionNumber !== 'number')
            throw new Error(`invalid type`);
        this.fieldDefinitionNumber = fieldDefinitionNumber;

        const baseTypeId = mesg.getFieldValue(messageFieldsMapByName.field_description_fit_base_type_id.field.id, 0, Fit.subfieldIndexMainField);
        if (baseTypeId === undefined)
            throw new Error(`can't be undefined`);
        if (typeof baseTypeId !== 'number')
            throw new Error(`invalid type`);
        const baseType = findBaseTypeById(baseTypeId);
        if (!baseType)
            throw new Error(`can't be undefined`);
        this.baseType = baseType;
    }

    // private parseFieldName(mesg: Mesg<FieldDescriptionMessage>): string | undefined {
    //     const fieldNameCount = mesg.getNumFieldValues(messageFieldsMapByName.field_description_field_name.field.id, Fit.subfieldIndexMainField);
    //     if (fieldNameCount === undefined)
    //         return;
    //     if (typeof fieldNameCount !== 'number')
    //         throw new Error(`invalid type`);
    //     const nameBytes: number[] = []
    //     for (let i = 0; i < fieldNameCount; i++) {
    //         const value = mesg.getFieldValue(messageFieldsMapByName.field_description_field_name.field.id, i, Fit.subfieldIndexMainField);
    //         if (typeof value === 'number')
    //             throw new Error("invalid type");
    //         nameBytes.push();
    //     }
    //     return bytesToStringUTF8(nameBytes);
    // }

    /// <summary>
    /// Retrieves the Array field</summary>
    /// <returns>Returns nullable byte representing the Array field</returns>
    public getArray(): number | undefined {
        const val: any = this.mesg.getFieldValue(messageFieldsMapByName.field_description_array.field.id, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);
    }

    /// <summary>
    /// Retrieves the Components field</summary>
    /// <returns>Returns byte[] representing the Components field</returns>
    public getComponents(): number[] {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_components.field.id, 0, Fit.subfieldIndexMainField);
        if (!data || typeof data === 'number')
            throw new Error("invalid type");

        return data.slice(0, data.length - 1);
    }

    /// <summary>
    /// Retrieves the Components field</summary>
    /// <returns>Returns string representing the Components field</returns>
    public getComponentsAsstring(): string | undefined {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_components.field.id, 0, Fit.subfieldIndexMainField);
        if (typeof data === 'number')
            throw new Error("invalid type");
        return data !== undefined ? bytesToStringUTF8(data.slice(0, data.length - 1)) : undefined;
    }

    /// <summary>
    /// Retrieves the Scale field</summary>
    /// <returns>Returns nullable byte representing the Scale field</returns>
    public getScale(): number | undefined {
        const val = this.mesg.getFieldValue(messageFieldsMapByName.field_description_scale.field.id, 0, Fit.subfieldIndexMainField);
        if (val === undefined)
            return undefined;
        if (typeof val !== 'number')
            throw new Error("invalid type");
        return val;
    }

    /// <summary>
    /// Retrieves the Offset field</summary>
    /// <returns>Returns nullable sbyte representing the Offset field</returns>
    public getOffset(): number | undefined {
        const val = this.mesg.getFieldValue(messageFieldsMapByName.field_description_offset.field.id, 0, Fit.subfieldIndexMainField);
        if (val === undefined)
            return undefined;
        if (typeof val !== 'number')
            throw new Error("invalid type");

        return val;
    }

    /// <summary>
    ///
    /// </summary>
    /// <returns>returns number of elements in field Units</returns>
    public getNumUnits(): number {
        return this.mesg.getNumFieldValues(messageFieldsMapByName.field_description_units.field.id, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the Units field</summary>
    /// <param name="index">0 based index of Units element to retrieve</param>
    /// <returns>Returns byte[] representing the Units field</returns>
    public getUnits(index: number): number[] {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_units.field.id, index, Fit.subfieldIndexMainField);
        if (!data || typeof data === 'number')
            throw new Error("invalid type");

        return data.slice(0, data.length - 1);
    }

    /// <summary>
    /// Retrieves the Units field</summary>
    /// <param name="index">0 based index of Units element to retrieve</param>
    /// <returns>Returns string representing the Units field</returns>
    public getUnitsAsString(index: number): string | undefined {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_units.field.id, index, Fit.subfieldIndexMainField);
        if (typeof data === 'number')
            throw new Error("invalid type");
        return data !== undefined ? bytesToStringUTF8(data.slice(0, data.length - 1)) : undefined;
    }

    /// <summary>
    /// Retrieves the Bits field</summary>
    /// <returns>Returns byte[] representing the Bits field</returns>
    public getBits(): number[] {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_bits.field.id, 0, Fit.subfieldIndexMainField);
        if (!data || typeof data === 'number')
            throw new Error("invalid type");
        return data.slice(0, data.length - 1);
    }

    /// <summary>
    /// Retrieves the Bits field</summary>
    /// <returns>Returns string representing the Bits field</returns>
    public getBitsAsString(): string | undefined {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_bits.field.id, 0, Fit.subfieldIndexMainField);
        if (typeof data === 'number')
            throw new Error("invalid type");
        return data !== undefined ? bytesToStringUTF8(data.slice(0, data.length - 1)) : undefined;
    }

    /// <summary>
    /// Retrieves the Accumulate field</summary>
    /// <returns>Returns byte[] representing the Accumulate field</returns>
    public getAccumulate(): number[] {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_accumulate.field.id, 0, Fit.subfieldIndexMainField);
        if (!data || typeof data === 'number')
            throw new Error("invalid type");
        return data.slice(0, data.length - 1);
    }

    /// <summary>
    /// Retrieves the Accumulate field</summary>
    /// <returns>Returns string representing the Accumulate field</returns>
    public getAccumulateAsString(): string | undefined {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_accumulate.field.id, 0, Fit.subfieldIndexMainField);
        if (typeof data === 'number')
            throw new Error("invalid type");
        return data !== undefined ? bytesToStringUTF8(data.slice(0, data.length - 1)) : undefined;
    }

    /// <summary>
    /// Retrieves the FitBaseUnitId field</summary>
    /// <returns>Returns nullable ushort representing the FitBaseUnitId field</returns>
    public getFitBaseUnitId(): number | undefined {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_fit_base_unit_id.field.id, 0, Fit.subfieldIndexMainField);
        if (data === undefined)
            return undefined;
        if (typeof data !== 'number')
            throw new Error("invalid type");
        return data;
    }

    /// <summary>
    /// Retrieves the NativeMesgNum field</summary>
    /// <returns>Returns nullable ushort representing the NativeMesgNum field</returns>
    public getNativeMesgNum(): number | undefined {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_native_mesg_num.field.id, 0, Fit.subfieldIndexMainField);
        if (data === undefined)
            return undefined;
        if (typeof data !== 'number')
            throw new Error("invalid type");

        return data;
    }

    /// <summary>
    /// Retrieves the NativeFieldNum field</summary>
    /// <returns>Returns nullable byte representing the NativeFieldNum field</returns>
    public getNativeFieldNum(): number | undefined {
        const data = this.mesg.getFieldValue(messageFieldsMapByName.field_description_native_field_num.field.id, 0, Fit.subfieldIndexMainField);
        if (data === undefined)
            return undefined;
        if (typeof data !== 'number')
            throw new Error("invalid type");

        return data;
    }
}
