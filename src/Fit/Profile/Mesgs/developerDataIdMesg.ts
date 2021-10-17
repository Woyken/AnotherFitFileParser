import { messageFieldsMapByName } from '../../../profile';
import { Guid } from '../../../Utility/guid';
import { Fit } from '../../fit';
import { Mesg } from '../../mesg';
import { FieldDescriptionMesg } from './fieldDescriptionMesg';

/// <summary>
/// Field Numbers for <see cref="DeveloperDataIdMesg"/>
/// </summary>
// export class FieldDefNum {
//     public static readonly developerId: number = 0;
//     public static readonly applicationId: number = 1;
//     public static readonly manufacturerId: number = 2;
//     public static readonly developerDataIndex: number = 3;
//     public static readonly applicationVersion: number = 4;
//     public static readonly invalid: number = Fit.fieldNumInvalid;
// }

export type DeveloperDataIdMessage = typeof messageFieldsMapByName.developer_data_id_developer_id.message;
export class DeveloperDataIdMesg {
    applicationId: Guid;
    developerDataIndex: number;
    applicationVersion: number;

    public readonly fieldDescriptions: FieldDescriptionMesg[] = [];

    public constructor(message: Mesg<DeveloperDataIdMessage>) {
        const applicationId = this.parseApplicationId(message);
        if (!applicationId)
            throw new Error(`ApplicationId could not be parsed for developer data`);
        this.applicationId = applicationId;
        const developerDataIndex = message.getFieldValue(3, 0, Fit.subfieldIndexMainField); // throw if not found?
        if (typeof developerDataIndex !== 'number')
            throw new Error(`DeveloperDataIndex could not be parsed for developer data`);
        this.developerDataIndex = developerDataIndex;
        const applicationVersion = message.getFieldValue(4, 0, Fit.subfieldIndexMainField); // not throw if not found? it may not be required
        if (typeof applicationVersion !== 'number')
            throw new Error(`ApplicationVersion could not be parsed for developer data`);
        this.applicationVersion = applicationVersion;
    }

    public addFieldDescription(fieldDescription: FieldDescriptionMesg) {
        this.fieldDescriptions.push(fieldDescription);
    }

    private parseApplicationId(message: Mesg<DeveloperDataIdMessage>): Guid | undefined {
        // If the Application Id is not exactly 16 bytes
        // (see size of UUID) return Empty
        const applicationIdCount = message.getNumFieldValues(1, Fit.subfieldIndexMainField);
        if (applicationIdCount !== 16)
            return;

        // Read the App Id
        const appId = new Array<number>(applicationIdCount);
        for (let i = 0; i < appId.length; i++) {
            const id = message.getFieldValue(1, i, Fit.subfieldIndexMainField);
            if (typeof id !== 'number')
                throw new Error("invalid type");
            appId[i] = id !== undefined ? id : 0xFF;
        }

        // The SDK Treats these UUIDs in Java format so we need to convert to
        // a CLS Compliant Array where the array is in the form
        // u32, u16, u16, u8, u8, u8, u8, u8, u8, u8, u8 and flipping from big endian to
        // little endian
        const net = new Array<number>(appId.length);
        for (let i = 8; i < 16; i++) {
            net[i] = appId[i];
        }

        // Flip The endianness of the u32 and u16 values
        net[3] = appId[0];
        net[2] = appId[1];
        net[1] = appId[2];
        net[0] = appId[3];
        net[5] = appId[4];
        net[4] = appId[5];
        net[7] = appId[6];
        net[6] = appId[7];
        return new Guid(net);
    }
}
