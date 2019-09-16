import { Mesg } from '../../../Fit/mesg';
import { Fit } from '../../../Fit/fit';
import { Profile } from '../../../Fit/profile';
import { MesgNum } from '../Types/mesgNum';

/// <summary>
/// Field Numbers for <see cref="FieldDescriptionMesg"/>
/// </summary>
export class FieldDefNum {
    public static readonly developerDataIndex: number = 0;
    public static readonly fieldDefinitionNumber: number = 1;
    public static readonly fitBaseTypeId: number = 2;
    public static readonly fieldName: number = 3;
    public static readonly array: number = 4;
    public static readonly components: number = 5;
    public static readonly scale: number = 6;
    public static readonly offset: number = 7;
    public static readonly units: number = 8;
    public static readonly bits: number = 9;
    public static readonly accumulate: number = 10;
    public static readonly fitBaseUnitId: number = 13;
    public static readonly nativeMesgNum: number = 14;
    public static readonly nativeFieldNum: number = 15;
    public static readonly invalid: number = Fit.fieldNumInvalid;
}

function stringToBytesUTF8(str: string): number[] {
    const utf8 = unescape(encodeURIComponent(str));

    const arr = [];
    for (let i = 0; i < utf8.length; i++) {
        arr.push(utf8.charCodeAt(i));
    }
    return arr;
}

function bytesToStringUTF8(uintArray: number[]): string {
    const encodedString = String.fromCharCode.apply(null, uintArray);
    const decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

// tslint:disable-next-line: max-classes-per-file
export class FieldDescriptionMesg extends Mesg {
    //#region Fields
    //#endregion

    //#region Constructors
    public constructor(mesg: Mesg | undefined = Profile.getMesg(MesgNum.fieldDescription)) {
        super(mesg);
    }
    //#endregion // Constructors

    //#region Methods
    /// <summary>
    /// Retrieves the DeveloperDataIndex field</summary>
    /// <returns>Returns nullable byte representing the DeveloperDataIndex field</returns>
    public getDeveloperDataIndex(): number | undefined {
        const val: any = this.getFieldValue(0, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

    /// <summary>
    /// Set DeveloperDataIndex field</summary>
    /// <param name="developerDataIndex_">Nullable field value to be set</param>
    public setDeveloperDataIndex(developerDataIndex: number | undefined): void {
        this.setFieldValue(0, 0, developerDataIndex, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the FieldDefinitionNumber field</summary>
    /// <returns>Returns nullable byte representing the FieldDefinitionNumber field</returns>
    public getFieldDefinitionNumber(): number | undefined {
        const val: any = this.getFieldValue(1, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

    /// <summary>
    /// Set FieldDefinitionNumber field</summary>
    /// <param name="fieldDefinitionNumber_">Nullable field value to be set</param>
    public setFieldDefinitionNumber(fieldDefinitionNumber: number | undefined): void {
        this.setFieldValue(1, 0, fieldDefinitionNumber, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the FitBaseTypeId field</summary>
    /// <returns>Returns nullable byte representing the FitBaseTypeId field</returns>
    public getFitBaseTypeId(): number | undefined {
        const val: any = this.getFieldValue(2, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

    /// <summary>
    /// Set FitBaseTypeId field</summary>
    /// <param name="fitBaseTypeId_">Nullable field value to be set</param>
    public setFitBaseTypeId(fitBaseTypeId: number | undefined): void {
        this.setFieldValue(2, 0, fitBaseTypeId, Fit.subfieldIndexMainField);
    }

    /// <summary>
    ///
    /// </summary>
    /// <returns>returns number of elements in field FieldName</returns>
    public getNumFieldName(): number {
        return this.getNumFieldValues(3, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the FieldName field</summary>
    /// <param name="index">0 based index of FieldName element to retrieve</param>
    /// <returns>Returns byte[] representing the FieldName field</returns>
    public getFieldName(index: number): number[] {
        const data: number[] = this.getFieldValue(3, index, Fit.subfieldIndexMainField);
        return data.slice(0, data.length - 1);
    }

    /// <summary>
    /// Retrieves the FieldName field</summary>
    /// <param name="index">0 based index of FieldName element to retrieve</param>
    /// <returns>Returns string representing the FieldName field</returns>
    public getFieldNameAsString(index: number): string | undefined {
        const data: number[] | undefined = this.getFieldValue(3, index, Fit.subfieldIndexMainField);
        return data !== undefined ? bytesToStringUTF8(data.slice(0, data.length - 1)) : undefined;
    }

    /// <summary>
    /// Set FieldName field</summary>
    /// <param name="index">0 based index of field_name</param>
    /// <param name="fieldName">field value to be set</param>
    public setFieldName(index: number, fieldName: number[] | string): void {
        if (typeof fieldName === 'string') {
            const data: number[] = stringToBytesUTF8(fieldName);
            return this.setFieldValue(3, index, data, Fit.subfieldIndexMainField);
        }
        return this.setFieldValue(3, index, fieldName, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the Array field</summary>
    /// <returns>Returns nullable byte representing the Array field</returns>
    public getArray(): number | undefined {
        const val: any = this.getFieldValue(4, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

    /// <summary>
    /// Set Array field</summary>
    /// <param name="array_">Nullable field value to be set</param>
    public setArray(array: number | undefined): void {
        this.setFieldValue(4, 0, array, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the Components field</summary>
    /// <returns>Returns byte[] representing the Components field</returns>
    public getComponents(): number[] {
        const data: number[] = this.getFieldValue(5, 0, Fit.subfieldIndexMainField);
        return data.slice(0, data.length - 1);
    }

    /// <summary>
    /// Retrieves the Components field</summary>
    /// <returns>Returns string representing the Components field</returns>
    public getComponentsAsstring(): string | undefined {
        const data: number[] | undefined = this.getFieldValue(5, 0, Fit.subfieldIndexMainField);
        return data !== undefined ? bytesToStringUTF8(data.slice(0, data.length - 1)) : undefined;
    }

    /// <summary>
    /// Set Components field</summary>
    /// <param name="components_">field value to be set</param>
    public setComponents(components: number[] | string): void {
        if (typeof components === 'string') {
            const data: number[] = stringToBytesUTF8(components);
            return this.setFieldValue(5, 0, data, Fit.subfieldIndexMainField);
        }
        return this.setFieldValue(5, 0, components, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the Scale field</summary>
    /// <returns>Returns nullable byte representing the Scale field</returns>
    public getScale(): number | undefined {
        const val: any = this.getFieldValue(6, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

    /// <summary>
    /// Set Scale field</summary>
    /// <param name="scale_">Nullable field value to be set</param>
    public setScale(scale: number | undefined): void {
        this.setFieldValue(6, 0, scale, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the Offset field</summary>
    /// <returns>Returns nullable sbyte representing the Offset field</returns>
    public getOffset(): number | undefined {
        const val: any = this.getFieldValue(7, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

    /// <summary>
    /// Set Offset field</summary>
    /// <param name="offset_">Nullable field value to be set</param>
    public setOffset(offset: number | undefined): void {
        this.setFieldValue(7, 0, offset, Fit.subfieldIndexMainField);
    }

    /// <summary>
    ///
    /// </summary>
    /// <returns>returns number of elements in field Units</returns>
    public getNumUnits(): number {
        return this.getNumFieldValues(8, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the Units field</summary>
    /// <param name="index">0 based index of Units element to retrieve</param>
    /// <returns>Returns byte[] representing the Units field</returns>
    public getUnits(index: number): number[] {
        const data: number[] = this.getFieldValue(8, index, Fit.subfieldIndexMainField);
        return data.slice(0, data.length - 1);
    }

    /// <summary>
    /// Retrieves the Units field</summary>
    /// <param name="index">0 based index of Units element to retrieve</param>
    /// <returns>Returns string representing the Units field</returns>
    public getUnitsAsString(index: number): string | undefined {
        const data: number[] | undefined = this.getFieldValue(8, index, Fit.subfieldIndexMainField);
        return data !== undefined ? bytesToStringUTF8(data.slice(0, data.length - 1)) : undefined;
    }

    /// <summary>
    /// Set Units field</summary>
    /// <param name="index">0 based index of units</param>
    /// <param name="units_">field value to be set</param>
    public setUnits(index: number, units: number[] | string): void {
        if (typeof units === 'string') {
            const data: number[] = stringToBytesUTF8(units);
            return this.setFieldValue(8, index, data, Fit.subfieldIndexMainField);
        }
        return this.setFieldValue(8, index, units, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the Bits field</summary>
    /// <returns>Returns byte[] representing the Bits field</returns>
    public getBits(): number[] {
        const data: number[] = this.getFieldValue(9, 0, Fit.subfieldIndexMainField);
        return data.slice(0, data.length - 1);
    }

    /// <summary>
    /// Retrieves the Bits field</summary>
    /// <returns>Returns string representing the Bits field</returns>
    public getBitsAsString(): string | undefined {
        const data: number[] | undefined = this.getFieldValue(9, 0, Fit.subfieldIndexMainField);
        return data !== undefined ? bytesToStringUTF8(data.slice(0, data.length - 1)) : undefined;
    }

    /// <summary>
    /// Set Bits field</summary>
    /// <param name="bits_">field value to be set</param>
    public setBits(bits: number[] | string): void {
        if (typeof bits === 'string') {
            const data: number[] = stringToBytesUTF8(bits);
            return this.setFieldValue(9, 0, data, Fit.subfieldIndexMainField);
        }
        this.setFieldValue(9, 0, bits, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the Accumulate field</summary>
    /// <returns>Returns byte[] representing the Accumulate field</returns>
    public getAccumulate(): number[] {
        const data: number[] = this.getFieldValue(10, 0, Fit.subfieldIndexMainField);
        return data.slice(0, data.length - 1);
    }

    /// <summary>
    /// Retrieves the Accumulate field</summary>
    /// <returns>Returns string representing the Accumulate field</returns>
    public getAccumulateAsString(): string | undefined {
        const data: number[] | undefined = this.getFieldValue(10, 0, Fit.subfieldIndexMainField);
        return data !== undefined ? bytesToStringUTF8(data.slice(0, data.length - 1)) : undefined;
    }

    /// <summary>
    /// Set Accumulate field</summary>
    /// <param name="accumulate_">field value to be set</param>
    public setAccumulate(accumulate: number[] | string): void {
        if (typeof accumulate === 'string') {
            const data: number[] = stringToBytesUTF8(accumulate);
            return this.setFieldValue(10, 0, data, Fit.subfieldIndexMainField);
        }
        return this.setFieldValue(10, 0, accumulate, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the FitBaseUnitId field</summary>
    /// <returns>Returns nullable ushort representing the FitBaseUnitId field</returns>
    public getFitBaseUnitId(): number | undefined {
        const val: any = this.getFieldValue(13, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

    /// <summary>
    /// Set FitBaseUnitId field</summary>
    /// <param name="fitBaseUnitId_">Nullable field value to be set</param>
    public setFitBaseUnitId(fitBaseUnitId: number | undefined): void {
        this.setFieldValue(13, 0, fitBaseUnitId, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the NativeMesgNum field</summary>
    /// <returns>Returns nullable ushort representing the NativeMesgNum field</returns>
    public getNativeMesgNum(): number | undefined {
        const val: any = this.getFieldValue(14, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

    /// <summary>
    /// Set NativeMesgNum field</summary>
    /// <param name="nativeMesgNum_">Nullable field value to be set</param>
    public setNativeMesgNum(nativeMesgNum: number | undefined): void {
        this.setFieldValue(14, 0, nativeMesgNum, Fit.subfieldIndexMainField);
    }

    /// <summary>
    /// Retrieves the NativeFieldNum field</summary>
    /// <returns>Returns nullable byte representing the NativeFieldNum field</returns>
    public getNativeFieldNum(): number | undefined {
        const val: any = this.getFieldValue(15, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

    /// <summary>
    /// Set NativeFieldNum field</summary>
    /// <param name="nativeFieldNum_">Nullable field value to be set</param>
    public setNativeFieldNum(nativeFieldNum: number | undefined): void {
        this.setFieldValue(15, 0, nativeFieldNum, Fit.subfieldIndexMainField);
    }

    //#endregion // Methods
}
