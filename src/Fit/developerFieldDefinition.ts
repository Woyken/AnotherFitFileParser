import { DeveloperDataIdMesg } from './Profile/Mesgs/developerDataIdMesg';
import { FieldDescriptionMesg } from './Profile/Mesgs/fieldDescriptionMesg';

export class DeveloperFieldDefinition {
    private descriptionMesg: FieldDescriptionMesg | undefined;
    private developerIdMesg: DeveloperDataIdMesg  | undefined;

    /// <summary>
    /// Gets a boolean indicating if the Field Definition has associated meta
    /// data
    /// </summary>
    public get IsDefined(): boolean {
        return !this.descriptionMesg === null;
    }

    /// <summary>
    /// Gets the Field Number associated with the Developer Field
    /// </summary>
    public fieldNum!: number;

    /// <summary>
    /// Gets the Number of bytes associated with the Developer Field
    /// </summary>
    public size!: number;

    /// <summary>
    /// Gets the developer index of the Developer Field
    /// </summary>
    public developerDataIndex!: number;

    /// <summary>
    /// Gets the current description message for the field
    /// </summary>
    public get DescriptionMesg(): FieldDescriptionMesg | undefined {
        return this.descriptionMesg;
    }

    /// <summary>
    /// Gets the Associated Developer Id for the message
    /// </summary>
    public get DeveloperIdMesg(): DeveloperDataIdMesg | undefined {
        return this.developerIdMesg;
    }

    private constructor() {
    }

    public static ctor1(
        fieldNum: number,
        size: number,
        developerDataIndex: number,
    ): DeveloperFieldDefinition {
        const result = new DeveloperFieldDefinition();
        result.descriptionMesg = undefined;
        result.fieldNum = fieldNum;
        result.size = size;
        result.developerDataIndex = developerDataIndex;
        return result;
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="desc"></param>
    /// <param name="devId"></param>
    /// <param name="size"></param>
    /// <exception cref="InvalidOperationException">
    ///     If description parameter is invalid
    /// </exception>
    public static ctor2(
        desc: FieldDescriptionMesg,
        devId: DeveloperDataIdMesg,
        size: number,
    ): DeveloperFieldDefinition {
        const result = new DeveloperFieldDefinition();
        const fieldDefinitionNumber: number | undefined = desc.getFieldDefinitionNumber();
        const developerDataIndex: number | undefined = desc.getDeveloperDataIndex();
        if ((developerDataIndex != null) &&
            (fieldDefinitionNumber != null)) {
            result.descriptionMesg = desc;
            result.developerIdMesg = devId;
            result.size = size;
            result.fieldNum = fieldDefinitionNumber;
            result.developerDataIndex = developerDataIndex;
        } else {
            throw new Error('Description must: have: a: valid: developer: data: index: and: field: definition: number: Message');
        }
        return result;
    }
}
