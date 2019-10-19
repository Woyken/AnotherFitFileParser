import { Fit } from './fit';
import { ByteStreamReader } from '../Utility/byteStreamReader';
import { FieldDefinition } from './fieldDefinition';
import { Mesg } from './mesg';
import { DeveloperFieldDefinition } from './developerFieldDefinition';
import { Field } from './field';
import { DeveloperDataLookup } from './developerDataLookup';
import { DeveloperField } from './developerField';
import { DeveloperDataKey } from './developerDataKey';
import { MesgNum } from './Profile/Types/mesgNum';

export class MesgDefinition {
    public static isOfType(value: any): value is MesgDefinition {
        if (typeof value.architecture !== 'number') {
            return false;
        }
        if (typeof value.localMesgNum !== 'number') {
            return false;
        }
        if (typeof value.header !== 'number') {
            return false;
        }
        if (typeof value.globalMesgNum !== 'number') {
            return false;
        }
        return true;
    }

    //#region Fields
    private architecture!: number;
    private plocalMesgNum!: number;
    // tslint:disable-next-line:prefer-array-literal
    private fieldDefs: FieldDefinition[] = [];
    private readonly devFieldDefs: DeveloperFieldDefinition[] = [];
    private header!: number;
    //#endregion

    //#region Properties
    public globalMesgNum!: number;
    public get localMesgNum(): number {
        return this.plocalMesgNum;
    }
    public set localMesgNum(value: number) {
        if (value > Fit.localMesgNumMask) {
            throw new Error(`MesgDefinition:LocalMesgNum - Invalid Local message number ${value}. Local message number must be < ${Fit.localMesgNumMask}`);
        } else {
            this.plocalMesgNum = value;
        }
    }

    public get numDevFields(): number {
        return this.devFieldDefs.length;
    }

    public numFields!: number;

    public get isBigEndian(): boolean {
        return this.architecture === Fit.bigEndian;
    }

    public get containsDevData(): boolean {
        return (this.header & Fit.devDataMask) === Fit.devDataMask;
    }

    public get developerFieldDefinitions(): DeveloperFieldDefinition[] {
        return this.devFieldDefs;
    }

    //#endregion

    //#region Constructors
    public constructor (
        fitSourceOrMesgOrMesgDef?: ByteStreamReader | Mesg | MesgDefinition,
        lookup?: DeveloperDataLookup,
    ) {
        if (fitSourceOrMesgOrMesgDef === undefined && lookup === undefined) {
            this.ctorNoParams();
            return;
        }
        if (Mesg.isOfType(fitSourceOrMesgOrMesgDef)) {
            this.ctorMesg(fitSourceOrMesgOrMesgDef);
            return;
        }
        if (MesgDefinition.isOfType(fitSourceOrMesgOrMesgDef)) {
            this.ctorMesgDef(fitSourceOrMesgOrMesgDef);
            return;
        }
        this.read(fitSourceOrMesgOrMesgDef!, lookup!);
    }

    private ctorNoParams(): void {
        this.localMesgNum = 0;
        this.globalMesgNum = MesgNum.invalid;
        this.architecture = Fit.littleEndian;
    }

    public ctorMesg(mesg: Mesg): void {
        this.localMesgNum = mesg.LocalNum;
        this.globalMesgNum = mesg.profileMessageNumber;
        this.architecture = Fit.littleEndian;
        this.numFields = mesg.FieldsList.length;

        mesg.FieldsList.forEach((field: Field) => {
            this.fieldDefs.push(new FieldDefinition(field));
        });
        Array.from(mesg.DeveloperFields)
            .forEach((field: DeveloperField) => {
                this.devFieldDefs.push(DeveloperFieldDefinition.ctor1(
                    field.Num,
                    field.getSize(),
                    field.DeveloperDataIndex));
            });
    }

    public ctorMesgDef(mesgDef: MesgDefinition): void {
        this.localMesgNum = mesgDef.plocalMesgNum;
        this.globalMesgNum = mesgDef.globalMesgNum;
        this.architecture = mesgDef.isBigEndian ? Fit.bigEndian : Fit.littleEndian;
        this.numFields = mesgDef.numFields;

        mesgDef.fieldDefs.forEach((fieldDef: FieldDefinition) => {
            this.fieldDefs.push(new FieldDefinition(fieldDef));
        });

        this.devFieldDefs.push(...mesgDef.devFieldDefs);
    }
    //#endregion

    //#region Methods

    private read(fitSource: ByteStreamReader, lookup: DeveloperDataLookup): void {
        fitSource.position = 0;
        const br: ByteStreamReader = new ByteStreamReader(fitSource, false);

        this.header = br.readByte();
        this.localMesgNum = this.header & Fit.localMesgNumMask;

        /* const reserved: number = */ br.readByte();
        this.architecture = br.readByte();
        br.isBigEndian = this.isBigEndian;
        this.globalMesgNum = br.readUInt16();
        this.numFields = br.readByte();
        for (let i = 0; i < this.numFields; i++) {
            const num: number = br.readByte();
            const size: number = br.readByte();
            const type: number = br.readByte();

            const newField: FieldDefinition = new FieldDefinition(num, size, type);
            this.fieldDefs.push(newField);
        }

        if (this.containsDevData) {
            const devFldCount: number = br.readByte();
            for (let i = 0; i < devFldCount; i++) {
                // Seek to the Size
                const num: number = br.readByte();
                const size: number = br.readByte();
                const devIdx: number = br.readByte();
                let defn: DeveloperFieldDefinition;
                const key = new DeveloperDataKey(devIdx, num);
                const tuple = lookup.getMesgs(key);

                // tslint:disable-next-line: prefer-conditional-expression
                if (tuple != null) {
                    defn = DeveloperFieldDefinition.ctor2(tuple.fdmsg, tuple.ddmsg, size);
                } else {
                    defn = DeveloperFieldDefinition.ctor1(num, size, devIdx);
                }

                this.devFieldDefs.push(defn);
            }
        }
    }

    // TODO add write to stream
    // public Write(Stream fitDest): void

    public getMesgSize(): number {
        let mesgSize: number = 1;  // header

        mesgSize += this.fieldDefs.reduce((p, c) => {
            return p + c.size;
        },                                0);
        mesgSize += this.devFieldDefs.reduce((p, c) => {
            return p + c.size;
        },                                   0);

        return mesgSize;
    }

    public addField(field: FieldDefinition): void {
        this.fieldDefs.push(field);
    }

    public clearFields(): void {
        this.fieldDefs = [];
    }

    public getNumFields(): number {
        return this.fieldDefs.length;
    }

    public getFields(): FieldDefinition[] {
        // This is a reference to the real list
        return this.fieldDefs;
    }

    public getField(num: number): FieldDefinition | null {
        for (const fieldDef of this.fieldDefs) {
            if (fieldDef.num === num) {
                return fieldDef;
            }
        }
        return null;
    }

    public getDeveloperFieldDefinition(
        num: number,
        developerIndex: number,
    ): DeveloperFieldDefinition | undefined {
        return this.devFieldDefs.find((def) => {
            return (def.fieldNum === num) && (def.developerDataIndex === developerIndex);
        });
    }

    public supports(mesgDef: MesgDefinition | Mesg): boolean {
        if (Mesg.isOfType(mesgDef)) {
            return this.supports(new MesgDefinition(mesgDef));
        }

        if (mesgDef == null) {
            return false;
        }

        if (this.globalMesgNum !== mesgDef.globalMesgNum) {
            return false;
        }

        if (this.localMesgNum !== mesgDef.localMesgNum) {
            return false;
        }

        for (const fieldDef of mesgDef.getFields()) {
            const supportedFieldDef: FieldDefinition | null = this.getField(fieldDef.num);

            if (supportedFieldDef === null) {
                return false;
            }

            if (fieldDef.size > supportedFieldDef.size) {
                return false;
            }
        }

        for (const fieldDef of mesgDef.developerFieldDefinitions) {
            // tslint:disable-next-line: max-line-length
            const supportedFieldDef = this.getDeveloperFieldDefinition(fieldDef.fieldNum, fieldDef.developerDataIndex);

            if (supportedFieldDef == null) {
                return false;
            }

            if (fieldDef.size > supportedFieldDef.size) {
                return false;
            }
        }

        return true;
    }
    //#endregion
}
