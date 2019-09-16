import { Mesg } from './mesg';
import { Field } from './field';
import { Fit } from './fit';
import { FieldComponent } from './fieldComponent';

//#region Internal Classes
/// <summary>
/// The SubfieldMap class tracks the reference field/value pairs which indicate a field
/// should use the alternate subfield definition rather than the usual defn (allows Dynamic Fields)
/// </summary>
class SubfieldMap {
    private refFieldNum!: number;
    private refFieldValue!: any;

    public constructor(refFieldNumOrCopy: number | SubfieldMap, refFieldValue?: any) {
        if (typeof refFieldNumOrCopy !== 'number') {
            this.ctorCopy(refFieldNumOrCopy);
            return;
        }
        if (typeof refFieldNumOrCopy === 'number') {
            this.refFieldNum = refFieldNumOrCopy;
            this.refFieldValue = refFieldValue;
        }
    }

    public ctorCopy(subfieldMap: SubfieldMap): void {
        this.refFieldNum = subfieldMap.refFieldNum;
        this.refFieldValue = subfieldMap.refFieldValue;
    }

    /// <summary>
    /// Checks if the reference fields in a given message indicate the subfield (alternate)
    /// definition should be used
    /// </summary>
    /// <param name="mesg">message of interest</param>
    /// <returns>true if the subfield is active</returns>
    public canMesgSupport(mesg: Mesg): boolean {
        const field: Field | undefined = mesg.getField(this.refFieldNum);

        if (field !== undefined) {
            const value: any = field.getValue(0, Fit.subfieldIndexMainField);
            // Float refvalues are not supported
            if (value === this.refFieldValue) {
                return true;
            }
        }
        return false;
    }
}
        //#endregion Internal Classes

/// <summary>
    /// The Subfield class represents an alternative field definition used
    /// by dynamic fields.  They can only be associated with a containing
    /// field object.
    /// </summary>
// tslint:disable-next-line: max-classes-per-file
export class Subfield {
    public static isOfType(value: any): value is Subfield {
        if (value == null) {
            return false;
        }
        if (typeof value.name !== 'string') {
            return false;
        }
        if (typeof value.type !== 'number') {
            return false;
        }
        if (typeof value.scale !== 'number') {
            return false;
        }
        if (typeof value.offset !== 'number') {
            return false;
        }
        if (typeof value.units !== 'string') {
            return false;
        }
        if (typeof value.canMesgSupport !== 'function') {
            return false;
        }
        return true;
    }

    //#region Fields
    private name!: string;
    private type!: number;
    private scale!: number;
    private offset!: number;
    private units!: string;
    private maps!: SubfieldMap[];
    private components!: FieldComponent[];
    //#endregion // Fields

    //#region Properties
    public get Name(): string {
        return this.name;
    }

    public get Type(): number {
        return this.type;
    }

    public get Scale(): number {
        return this.scale;
    }

    public get Offset(): number {
        return this.offset;
    }

    public get Units(): string {
        return this.units;
    }

    public get Components(): FieldComponent[] {
        return this.components;
    }
    //#endregion; // Properties

    //#region; Constructors;
    public constructor(
        nameOrCopy: string | Subfield,
        type?: number,
        scale?: number,
        offset?: number,
        units?: string,
    ) {
        if (typeof nameOrCopy === 'string') {
            this.ctorFromData(nameOrCopy, type!, scale!, offset!, units!);
            return;
        }
        this.ctorCopy(nameOrCopy);
    }

    public ctorCopy(subfield: Subfield): void {
        if (subfield == null) {
            this.name = 'unknown';
            this.type = 0;
            this.scale = 1;
            this.offset = 0;
            this.units = '';
            this.maps = [];
            this.components = [];
            return;
        }

        this.name = subfield.name;
        this.type = subfield.type;
        this.scale = subfield.scale;
        this.offset = subfield.offset;
        this.units = subfield.units;

        this.maps = [];
        subfield.maps.forEach((map: SubfieldMap) => {
            this.maps.push(new SubfieldMap(map));
        });

        this.components = [];
        subfield.components.forEach((comp: FieldComponent) => {
            this.components.push(new FieldComponent(comp));
        });
    }

    public ctorFromData(
        name: string,
        type: number,
        scale: number,
        offset: number,
        units: string,
    ): void {
        this.name = name;
        this.type = type;
        this.scale = scale;
        this.offset = offset;
        this.units = units;
        this.maps = [];
        this.components = [];
    }
    //#endregion; // Constructors

    //#region; Methods;
    public addMap(refFieldNum: number, refFieldValue: any): void {
        this.maps.push(new SubfieldMap(refFieldNum, refFieldValue));
    }

    public addComponent(newComponent: FieldComponent): void {
        this.components.push(newComponent);
    }

    /// <summary>
    /// Checks if the reference fields in a given message indicate the subfield (alternate)
    /// definition should be used
    /// </summary>
    /// <param name="mesg">message of interest</param>
    /// <returns>true if the subfield is active</returns>
    public canMesgSupport(mesg: Mesg): boolean {
        for (const map of this.maps) {
            if (map.canMesgSupport(mesg)) {
                return true;
            }
        }
        return false;
    }
    //#endregion; // Methods
} // Class
