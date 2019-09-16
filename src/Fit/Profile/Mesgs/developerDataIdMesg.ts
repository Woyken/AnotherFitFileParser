import { Fit } from '../../fit';
import { Mesg } from '../../mesg';
import { Profile } from '../../profile';
import { MesgNum } from '../Types/mesgNum';

/// <summary>
/// Field Numbers for <see cref="DeveloperDataIdMesg"/>
/// </summary>
export class FieldDefNum {
    public static readonly developerId: number = 0;
    public static readonly applicationId: number = 1;
    public static readonly manufacturerId: number = 2;
    public static readonly developerDataIndex: number = 3;
    public static readonly applicationVersion: number = 4;
    public static readonly invalid: number = Fit.fieldNumInvalid;
}

// tslint:disable-next-line: max-classes-per-file
export class DeveloperDataIdMesg extends Mesg {
    //#region Fields
        //#endregion

        //#region Constructors
    public constructor(mesg: Mesg | undefined = Profile.getMesg(MesgNum.developerDataId)) {
        super(mesg);
    }
        //#endregion // Constructors

        //#region Methods

        /// <summary>
        ///
        /// </summary>
        /// <returns>returns number of elements in field DeveloperId</returns>
    public getNumDeveloperId(): number {
        return this.getFieldValue(0, Fit.subfieldIndexMainField);
    }

        /// <summary>
        /// Retrieves the DeveloperId field</summary>
        /// <param name="index">0 based index of DeveloperId element to retrieve</param>
        /// <returns>Returns nullable byte representing the DeveloperId field</returns>
    public getDeveloperId(index: number): number | undefined {
        const val: any = this.getFieldValue(0, index, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);
    }

        /// <summary>
        /// Set DeveloperId field</summary>
        /// <param name="index">0 based index of developer_id</param>
        /// <param name="developerId_">Nullable field value to be set</param>
    public setDeveloperId(index: number, developerId: number | undefined): void {
        this.setFieldValue(0, index, developerId, Fit.subfieldIndexMainField);
    }

        /// <summary>
        ///
        /// </summary>
        /// <returns>returns number of elements in field ApplicationId</returns>
    public getNumApplicationId(): number {
        return this.getNumFieldValues(1, Fit.subfieldIndexMainField);
    }

        /// <summary>
        /// Retrieves the ApplicationId field</summary>
        /// <param name="index">0 based index of ApplicationId element to retrieve</param>
        /// <returns>Returns nullable byte representing the ApplicationId field</returns>
    public getApplicationId(index: number): number | undefined {
        const val: any = this.getFieldValue(1, index, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

        /// <summary>
        /// Set ApplicationId field</summary>
        /// <param name="index">0 based index of application_id</param>
        /// <param name="applicationId_">Nullable field value to be set</param>
    public setApplicationId(index: number, applicationId: number | undefined): void {
        this.setFieldValue(1, index, applicationId, Fit .subfieldIndexMainField);
    }

        /// <summary>
        /// Retrieves the ManufacturerId field</summary>
        /// <returns>Returns nullable ushort representing the ManufacturerId field</returns>
    public getManufacturerId(): number | undefined {
        const val: any = this.getFieldValue(2, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

        /// <summary>
        /// Set ManufacturerId field</summary>
        /// <param name="manufacturerId_">Nullable field value to be set</param>
    public setManufacturerId(manufacturerId: number | undefined): void {
        this.setFieldValue(2, 0, manufacturerId, Fit.subfieldIndexMainField);
    }

        /// <summary>
        /// Retrieves the DeveloperDataIndex field</summary>
        /// <returns>Returns nullable byte representing the DeveloperDataIndex field</returns>
    public getDeveloperDataIndex(): number | undefined {
        const val: any = this.getFieldValue(3, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

        /// <summary>
        /// Set DeveloperDataIndex field</summary>
        /// <param name="developerDataIndex_">Nullable field value to be set</param>
    public setDeveloperDataIndex(developerDataIndex: number | undefined): void {
        this.setFieldValue(3, 0, developerDataIndex, Fit.subfieldIndexMainField);
    }

        /// <summary>
        /// Retrieves the ApplicationVersion field</summary>
        /// <returns>Returns nullable uint representing the ApplicationVersion field</returns>
    public getApplicationVersion(): number | undefined {
        const val: any = this.getFieldValue(4, 0, Fit.subfieldIndexMainField);
        if (val === undefined) {
            return undefined;
        }

        return (val);

    }

        /// <summary>
        /// Set ApplicationVersion field</summary>
        /// <param name="applicationVersion_">Nullable field value to be set</param>
    public setApplicationVersion(applicationVersion: number | undefined): void {
        this.setFieldValue(4, 0, applicationVersion, Fit.subfieldIndexMainField);
    }

        //#endregion // Methods
}
