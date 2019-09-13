export class FieldComponent {
    //#region Fields
    public fieldNum!: number;
    public accumulate!: boolean;
    public bits!: number;
    public scale!: number;
    public offset!: number;

    public accumulatedValue: number = 0;
    public lastValue: number = 0;
    //#endregion // Fields

    //#region Properties
    //#endregion // Properties

    //#region Constructors
    constructor(
        fieldNumOrCopy: number | FieldComponent,
        accumulate?: boolean,
        bits?: number,
        scale?: number,
        offset?: number,
    ) {
        if (typeof fieldNumOrCopy === 'number') {
            this.ctorFromData(fieldNumOrCopy, accumulate!, bits!, scale!, offset!);
            return;
        }
        this.ctorCopy(fieldNumOrCopy);
    }

    public ctorFromData(
        fieldNum: number,
        accumulate: boolean,
        bits: number,
        scale: number,
        offset: number,
    ): void {
        this.fieldNum = fieldNum;
        this.accumulate = accumulate;
        this.bits = bits;
        this.scale = scale;
        this.offset = offset;
    }

    public ctorCopy(component: FieldComponent): void {
        this.fieldNum = component.fieldNum;
        this.accumulate = component.accumulate;
        this.bits = component.bits;
        this.scale = component.scale;
        this.offset = component.offset;
        this.accumulatedValue = component.accumulatedValue;
        this.lastValue = component.lastValue;
    }
    //#endregion // Constructors

    //#region Methods
    public aaccumulate(value: number): number {
        const mask: number = (1 << this.bits) - 1;

        this.accumulatedValue += (value - this.lastValue) & mask;
        this.lastValue = value;

        return this.accumulatedValue;
    }
    //#endregion // Methods
} // Class
