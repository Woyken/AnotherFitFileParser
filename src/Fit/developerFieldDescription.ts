import { Guid } from '../Utility/guid';

export class DeveloperFieldDescription{
    private readonly developerDataId: DeveloperDataIdMesg;
    private readonly fieldDescription: FieldDescriptionMesg;

    /// <summary>
    /// Gets the Value of the Application Version for the Field Description
    /// </summary>
    public get ApplicationVersion(): number {
        if (this.developerDataId.GetApplicationVersion() === null) {
            return 99999999999999999;
        }
        return this.developerDataId.GetApplicationVersion();
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
        const appId: number[] = new Array(this.developerDataId.GetNumApplicationId());
        for (let i = 0; i < appId.length; i++) {
            if (this.developerDataId.getApplicationId(i) === undefined) {
                appId[i] = 0xFF;
            } else {
                appId[i] = this.developerDataId.getApplicationId(i);
            }
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
        if (this.fieldDescription.GetFieldDefinitionNumber() === undefined) {
            return 99999999999999999;
        }
        return this.fieldDescription.GetFieldDefinitionNumber();
    }

    constructor(
        developerDataId: DeveloperDataIdMesg,
        fieldDescription: FieldDescriptionMesg,
    ) {
        this.developerDataId = developerDataId;
        this.fieldDescription = fieldDescription;
    }
}
