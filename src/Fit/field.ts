import { Subfield } from './subfield';
import { ProfileType } from './profile';
import { Fit } from './fit';
import { FieldBase } from './fieldBase';
import { FieldComponent } from './fieldComponent';
import { FitFieldType } from './Profile/Types/fitBaseType';

export class Field extends FieldBase {
    public static isOfType(value: any): value is Field {
        if (typeof value.name !== 'string') {
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
        if (typeof value.isAccumulated !== 'boolean') {
            return false;
        }
        if (typeof value.num !== 'number') {
            return false;
        }
        if (typeof value.isExpandedField !== 'boolean') {
            return false;
        }
        return true;
    }
    //#region; Fields;
    public name!: string;
    public type!: FitFieldType;
    public scale!: number;
    public offset!: number;
    public units!: string;
    private isAccumulated!: boolean;
    private profileType!: ProfileType;

    public subfields: Subfield[] = [];
    public components: FieldComponent[] = [];
    //#endregion;

    //#region; Properties;
    public get Name(): string {
        return this.name;
    }

    public fieldNumberInProfile!: number;

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

    public get ProfileType(): ProfileType {
        return this.profileType;
    }

    public isExpandedField!: boolean;
    //#endregion;

    //#region; Constructors;
    public constructor(other?: Field);
    public constructor(
        name: string | undefined,
        fieldNumberInProfile: number,
        type: FitFieldType,
        scale: number,
        offset: number,
        units: string,
        accumulated: boolean,
        profileType: ProfileType,
        );
    /** Implementation */
    public constructor(
        nameOrField?: string | Field,
        fieldNumberInProfile?: number,
        type?: FitFieldType,
        scale?: number,
        offset?: number,
        units?: string,
        accumulated?: boolean,
        profileType?: ProfileType,
    ) {
        super(typeof nameOrField === 'string' ? undefined : nameOrField);
        if (typeof nameOrField === 'string') {
            this.ctorFromData(
                nameOrField,
                fieldNumberInProfile!,
                type!,
                scale,
                offset,
                units,
                accumulated,
                profileType,
            );
            return;
        }
        this.ctorCopy(nameOrField);
    }

    public ctorCopy(other?: Field): void {
        if (other === undefined) {
            this.name = 'unknown';
            this.fieldNumberInProfile = Fit.fieldNumInvalid;
            this.type = 0;
            this.scale = 1;
            this.offset = 0;
            this.units = '';
            this.isAccumulated = false;
            this.profileType = ProfileType.Enum;
            this.isExpandedField = false;
            return;
        }

        this.name = other.Name;
        this.fieldNumberInProfile = other.fieldNumberInProfile;
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
        name: string | undefined,
        num: number,
        type: FitFieldType,
        scale: number = 1.0,
        offset: number = 0.0,
        units: string = '',
        accumulated: boolean = false,
        profileType: ProfileType = ProfileType.NumTypes,
    ): void {
        this.name = name === undefined ? 'unknown' : name;
        this.fieldNumberInProfile = num;
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

    public getSubfield(index: number): Subfield | undefined;
    // tslint:disable-next-line: unified-signatures
    public getSubfield(subfieldName: string): Subfield | undefined;
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
