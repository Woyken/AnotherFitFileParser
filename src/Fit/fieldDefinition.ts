import { Field } from './field';

export class FieldDefinition {
    public static isOfType(value: any): value is FieldDefinition {
        if (typeof value.num !== 'number') {
            return false;
        }
        if (typeof value.size !== 'number') {
            return false;
        }
        if (typeof value.type !== 'number') {
            return false;
        }
        if (typeof value.ctorFromField === 'function') {
            return false;
        }
        return true;
    }
    //#region Fields

    //#endregion

    //#region Properties
    // Opt for the simpler form until we need a backing field
    public num!: number;
    public size!: number;
    public type!: number;
    //#endregion

    //#region Constructors
    public constructor(
            newNumOrFieldOrFieldDef?: number | Field | FieldDefinition,
            newSize?: number,
            newType?: number,
        ) {
        if (typeof newNumOrFieldOrFieldDef === 'number') {
            this.ctorFromData(newNumOrFieldOrFieldDef, newSize!, newType!);
            return;
        }
        if (Field.isOfType(newNumOrFieldOrFieldDef)) {
            this.ctorFromField(newNumOrFieldOrFieldDef);
            return;
        }
        if (FieldDefinition.isOfType(newNumOrFieldOrFieldDef)) {
            this.ctorCopy(newNumOrFieldOrFieldDef);
            return;
        }
    }

    public ctorFromField(field: Field): void {
        this.num = field.fieldNumberInProfile;
        this.size = field.getSize();
        this.type = field.Type;
    }

    public ctorFromData(newNum: number, newSize: number, newType: number): void {
        this.num = newNum;
        this.size = newSize;
        this.type = newType;
    }

    public ctorCopy(fieldDef: FieldDefinition): void {
        this.num = fieldDef.num;
        this.size = fieldDef.size;
        this.type = fieldDef.type;
    }
        //#endregion

        //#region Methods

        //#endregion
}
