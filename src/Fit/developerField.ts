import { FieldBase } from './fieldBase';
import { Fit } from './fit';
import { Subfield } from './subfield';
import { DeveloperFieldDefinition } from './developerFieldDefinition';
import { DeveloperDataIdMesg } from './Profile/Mesgs/developerDataIdMesg';
import { FieldDescriptionMesg } from './Profile/Mesgs/fieldDescriptionMesg';

export class DeveloperField extends FieldBase {
    //#region Fields
    private definition!: DeveloperFieldDefinition;
    //#endregion

    //#region Properties

    public get IsDefined(): boolean {
        return this.definition.IsDefined;
    }

    public get Num(): number {
        return this.definition.fieldNum;
    }

    public get DeveloperDataIndex(): number {
        return this.definition.developerDataIndex;
    }

    public get AppVersion(): number  {
        if (this.definition.IsDefined) {
            return this.definition.DeveloperIdMesg!.getApplicationVersion() ?
                this.definition.DeveloperIdMesg!.getApplicationVersion()! : 0;
        }

        return 0;
    }

    public get AppId(): number[] | undefined {
        if (this.definition.IsDefined) {
            const msg = this.definition.DeveloperIdMesg!;
            // tslint:disable-next-line: prefer-array-literal
            const appId: number[] = new Array(msg.getNumApplicationId());

            for (let i = 0; i < appId.length; i++) {
                appId[i] = msg.getApplicationId(i) ? msg.getApplicationId(i)! : 0xFF;
            }

            return appId;
        }

        return undefined;
    }

    public get Name(): string | undefined {
        return this.definition.IsDefined ?
            this.definition.DescriptionMesg!.getFieldNameAsString(0) : undefined;
    }

    public get Type(): number {
        if (this.definition.IsDefined) {
            return this.definition.DescriptionMesg!.getFitBaseTypeId() ?
                this.definition.DescriptionMesg!.getFitBaseTypeId()! : Fit.uInt8;
        }

        return Fit.uInt8;
    }

    public get Scale(): number {
        if (this.definition.IsDefined) {
            return this.definition.DescriptionMesg!.getScale() ?
                this.definition.DescriptionMesg!.getScale()! : 1.0;
        }

        return 1.0;
    }

    public get Offset(): number {
        if (this.definition.IsDefined) {
            return this.definition.DescriptionMesg!.getOffset() ?
                this.definition.DescriptionMesg!.getOffset()! : 0.0;
        }

        return 0.0;
    }

    public get Units(): string | undefined {
        return this.definition.IsDefined ?
            this.definition.DescriptionMesg!.getUnitsAsString(0) : undefined;
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
            return this.definition.DescriptionMesg!.getNativeFieldNum() ?
                this.definition.DescriptionMesg!.getNativeFieldNum()! : Fit.fieldNumInvalid;
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
        result.definition = DeveloperFieldDefinition.ctor2(description, developerDataIdMesg, 0);
        return result;
    }

    //#endregion

    //#region Methods
    // tslint:disable-next-line: variable-name
    public getSubfield(_subfieldNameOrIndex: string | number): Subfield | undefined {
        // Developer Fields do not currently support Sub Fields
        return;
    }

    //#endregion

}
