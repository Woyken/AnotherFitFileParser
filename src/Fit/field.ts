import { Subfield } from './subfield';
import { Profile } from './profile';
import { Fit } from './fit';
import { FieldBase } from './fieldBase';
import { FieldComponent } from './fieldComponent';

export class Field extends FieldBase {
    //#region; Fields;
    public name!: string;
    public type!: number;
    public scale!: number;
    public offset!: number;
    public units!: string;
    private isAccumulated!: boolean;
    private profileType: Profile.Type;

    public subfields: Subfield[] = [];
    public components: FieldComponent[] = [];
    //#endregion;

    //#region; Properties;
    public get Name(): string {
        return this.name;
    }

    public num!: number;

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

    public get IsAccumulated(): boolean {
        return this.isAccumulated;
    }

    public get ProfileType(): Profile.Type {
        return this.profileType;
    }

    public isExpandedField!: boolean;
    //#endregion;

    //#region; Constructors;
    public constructor(
        nameOrField?: string | Field,
        num?: number,
        type?: number,
        scale?: number,
        offset?: number,
        units?: string,
        accumulated?: boolean,
        profileType?: Profile.Type,
    ) {
        super(nameOrField);
        if (typeof nameOrField === 'string') {
            this.ctorFromData(
                nameOrField, num!, type!, scale, offset, units, accumulated, profileType);
            return;
        }
        this.ctorCopy(nameOrField);
    }

    public ctorCopy(other?: Field): void {
        if (other === undefined) {
            this.name = 'unknown';
            this.num = Fit.fieldNumInvalid;
            this.type = 0;
            this.scale = 1;
            this.offset = 0;
            this.units = '';
            this.isAccumulated = false;
            this.profileType = Profile.Type.Enum;
            this.isExpandedField = false;
            return;
        }

        this.name = other.Name;
        this.num = other.num;
        this.type = other.Type;
        this.scale = other.Scale;
        this.offset = other.Offset;
        this.units = other.units;
        this.isAccumulated = other.isAccumulated;
        this.profileType = other.profileType;
        this.isExpandedField = other.isExpandedField;

        other.subfields.forEach((subfield: Subfield) => {
            this.subfields.push(new Subfield(subfield));
        });

        other.components.forEach((component: FieldComponent) => {
            this.components.push(new FieldComponent(component));
        });
    }

    public ctorFromData(
        name?: string,
        num: number,
        type: number,
        scale: number = 1.0,
        offset: number = 0.0,
        units: string = '',
        accumulated: boolean = false,
        profileType: Profile.Type = Profile.Type.NumTypes,
    ): void {
        this.name = name === undefined ? 'unknown' : name;
        this.num = num;
        this.type = type;
        this.scale = scale;
        this.offset = offset;
        this.units = units;
        this.isAccumulated = accumulated;
        this.profileType = profileType;
        this.isExpandedField = false;
    }
    //#endregion;

    //#region; Methods;

    public setType(value: number): void {
        this.type = value;
    }

    public getSubfield(subfieldNameOrIndex: string | number): Subfield | undefined {
        if (typeof subfieldNameOrIndex === 'string') {
            return this.subfields.find(subfield => subfield.Name === subfieldNameOrIndex);
        }
        // SubfieldIndexActiveSubfield and SubfieldIndexMainField
        // will be out of this range
        if (subfieldNameOrIndex >= 0 && subfieldNameOrIndex < this.subfields.length) {
            return this.subfields[subfieldNameOrIndex];
        }

        return;
    }
    //#endregion;
}
