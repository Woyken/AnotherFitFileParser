import { Guid } from '../Utility/guid';
import { DeveloperDataIdMesg } from './Profile/Mesgs/developerDataIdMesg';
import { FieldDescriptionMesg } from './Profile/Mesgs/fieldDescriptionMesg';

export class DeveloperFieldDescription {
    private readonly developerDataId: DeveloperDataIdMesg;
    private readonly fieldDescription: FieldDescriptionMesg;

    /// <summary>
    /// Gets the Value of the Application Version for the Field Description
    /// </summary>
    public get ApplicationVersion(): number | undefined {
        if (this.developerDataId.getApplicationVersion() === null) {
            return 99999999999999999;
        }
        return this.developerDataId.getApplicationVersion();
    }

    /**
     * Gets the Value of the Application Id for the Field Description
     */
    public get applicationId(): Guid {
            // If the Application Id is not exactly 16 bytes
            // (see size of UUID) return Empty
        if (this.developerDataId.getNumApplicationId() !== 16) {
            return Guid.empty;
        }

        // Read the App Id
        // tslint:disable-next-line: prefer-array-literal
        const appId: number[] = new Array(this.developerDataId.getNumApplicationId());
        for (let i = 0; i < appId.length; i++) {
            const id = this.developerDataId.getApplicationId(i);
            appId[i] = id !== undefined ? id : 0xFF;
        }

        // The SDK Treats these UUIDs in Java format so we need to convert to
        // a CLS Compliant Array where the array is in the form
        // u32, u16, u16, u8, u8, u8, u8, u8, u8, u8, u8 and flipping from big endian to
        // little endian
        // tslint:disable-next-line: prefer-array-literal
        const net: number[] = new Array(appId.length);
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

    /// <summary>
    /// Gets the Value of the Field Definition Number for thbe Field Description
    /// </summary>
    public get FieldDefinitionNumber(): number {
        const defNum = this.fieldDescription.getFieldDefinitionNumber();
        if (defNum === undefined) {
            return 99999999999999999;
        }
        return defNum;
    }

    constructor(
        developerDataId: DeveloperDataIdMesg,
        fieldDescription: FieldDescriptionMesg,
    ) {
        this.developerDataId = developerDataId;
        this.fieldDescription = fieldDescription;
    }
}
