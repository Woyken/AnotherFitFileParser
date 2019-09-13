import { FieldBase } from './fieldBase';
import { Fit } from './fit';
import { Subfield } from './subfield';

export class DeveloperField extends FieldBase {
    //#region Fields
    private definition: DeveloperFieldDefinition;
    //#endregion

    //#region Properties

    public get IsDefined(): boolean {
        return this.definition.IsDefined;
    }

    public get Num(): number {
        return this.definition.FieldNum;
    }

    public get DeveloperDataIndex(): number {
        return this.definition.DeveloperDataIndex;
    }

    public get AppVersion(): number  {
        if (this.definition.IsDefined) {
            return this.definition.DeveloperIdMesg.GetApplicationVersion() ?
                this.definition.DeveloperIdMesg.GetApplicationVersion() : 0;
        }

        return 0;
    }

    public get AppId(): number[] | undefined {
        if (this.definition.IsDefined) {
            const msg = this.definition.DeveloperIdMesg;
            // tslint:disable-next-line: prefer-array-literal
            const appId: number[] = new Array(msg.getNumApplicationId());

            for (let i = 0; i < appId.length; i++) {
                appId[i] = msg.GetApplicationId(i) ? msg.GetApplicationId(i) : 0xFF;
            }

            return appId;
        }

        return undefined;
    }

    public get Name(): string {
        return this.definition.IsDefined ?
            this.definition.DescriptionMesg.GetFieldNameAsString(0) : null;
    }

    public get Type(): number {
        if (this.definition.IsDefined) {
            return this.definition.DescriptionMesg.GetFitBaseTypeId() ?
                this.definition.DescriptionMesg.GetFitBaseTypeId() : Fit.uInt8;
        }

        return Fit.uInt8;
    }

    public get Scale(): number {
        if (this.definition.IsDefined) {
            return this.definition.DescriptionMesg.GetScale() ?
                this.definition.DescriptionMesg.GetScale() : 1.0;
        }

        return 1.0;
    }

    public get Offset(): number {
        if (this.definition.IsDefined) {
            return this.definition.DescriptionMesg.GetOffset() ?
                this.definition.DescriptionMesg.GetOffset() : 0.0;
        }

        return 0.0;
    }

    public get Units(): string {
        return this.definition.IsDefined ?
            this.definition.DescriptionMesg.GetUnitsAsString(0) : null;
    }

    /// <summary>
    /// Retrieve the Native Field Number that this Developer Field Overrides
    /// </summary>
    /// <returns>
    /// Native Field Number that is overridden if applicable,
    /// <see cref="Fit.FieldNumInvalid"/> otherwise
    /// </returns>
    public get NativeOverride(): number {
        if (this.definition.IsDefined) {
            return this.definition.DescriptionMesg.GetNativeFieldNum() ?
                this.definition.DescriptionMesg.GetNativeFieldNum() : Fit.fieldNumInvalid;
        }

        return Fit.fieldNumInvalid;
    }

    //#endregion

    //#region Constructors
    public constructor(other?: DeveloperField) {
        super(other);
        if (other) {
            this.definition = other.definition;
        }
    }

    public static ctorFromDeveloperFieldDefinition(
        definition: DeveloperFieldDefinition,
    ): DeveloperField {
        const result = new DeveloperField();
        result.definition = definition;
        return result;
    }

    public static ctorFromFieldDescriptionMesg(
        description: FieldDescriptionMesg,
        developerDataIdMesg: DeveloperDataIdMesg,
    ): DeveloperField {
        const result = new DeveloperField();
        result.definition = new DeveloperFieldDefinition(description, developerDataIdMesg, 0);
        return result;
    }

    //#endregion

    //#region Methods
    public getSubfield(subfieldNameOrIndex: string | number): Subfield | undefined {
        // Developer Fields do not currently support Sub Fields
        return;
    }

    //#endregion

}
