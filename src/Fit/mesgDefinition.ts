import { Fit } from './fit';
import { ByteStreamReader } from '../Utility/byteStreamReader';

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
    private architecture: number;
    private plocalMesgNum: number;
    // tslint:disable-next-line:prefer-array-literal
    private fieldDefs: FieldDefinition[] = [];
    private readonly devFieldDefs: DeveloperFieldDefinition[] = [];
    private header: number;
    //#endregion

    //#region Properties
    public globalMesgNum: number;
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

    public numFields: number;

    public get isBigEndian(): boolean {
        return this.architecture === Fit.bigEndian;
    }

    public get containsDevData(): boolean {
        return (this.header & Fit.devDataMask) === Fit.devDataMask;
    }

    public developerFieldDefinitions(): DeveloperFieldDefinition[] {
        return this.devFieldDefs;
    }

    //#endregion

    //#region Constructors
    public constructor (
        fitSourceOrMesgOrMesgDef?: ByteStreamReader | Mesg | MesgDefinition,
        lookup?: DeveloperDataLookup,
    ) {
        if (fitSource === undefined && lookup === undefined) {
            this.ctorNoParams;
            return;
        }
        if (Mesg.isOfType(fitSourceOrMesgOrMesgDef)) {
            this.ctorMesg(fitSourceOrMesgOrMesgDef);
        }
        if (MesgDefinition.isOfType(fitSourceOrMesgOrMesgDef)) {
            this.ctorMesgDef(fitSourceOrMesgOrMesgDef);
        }
        this.read(fitSource, lookup);
    }

    private ctorNoParams() {
        this.localMesgNum = 0;
        this.globalMesgNum = MesgNum.Invalid;
        this.architecture = Fit.littleEndian;
    }

    public ctorMesg(mesg: Mesg) {
        this.localMesgNum = mesg.localNum;
        this.globalMesgNum = mesg.num;
        this.architecture = Fit.littleEndian;
        this.numFields = mesg.fieldsList.length;

        mesg.fieldsList.forEach((field: Field) => {
            this.fieldDefs.push(new FieldDefinition(field));
        });
        mesg.developerFields.forEach((field: DeveloperFieldDefinition) => {
            this.devFieldDefs.push(new DeveloperFieldDefinition(
                field.Num,
                field.GetSize(),
                field.DeveloperDataIndex));
        });
    }

    public ctorMesgDef(mesgDef: MesgDefinition) {
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
        const br: EndianBinaryReader = new EndianBinaryReader(fitSource, false);

        this.header = br.ReadByte();
        this.localMesgNum = this.header & Fit.localMesgNumMask;

        const reserved: number = br.ReadByte();
        this.architecture = br.ReadByte();
        br.IsBigEndian = this.isBigEndian;
        this.globalMesgNum = br.ReadUInt16();
        this.numFields = br.ReadByte();
        for (let i = 0; i < this.numFields; i++) {
            const num: number = br.ReadByte();
            const size: number = br.ReadByte();
            const type: number = br.ReadByte();

            const newField: FieldDefinition = new FieldDefinition(num, size, type);
            this.fieldDefs.push(newField);
        }

        if (this.containsDevData) {
            const devFldCount: number = br.ReadByte();
            for (let i = 0; i < devFldCount; i++) {
                // Seek to the Size
                const num: number = br.ReadByte();
                const size: number = br.ReadByte();
                const devIdx: number = br.ReadByte();
                let defn: DeveloperFieldDefinition;
                const key = new DeveloperDataKey(devIdx, num);
                const tuple: [DeveloperDataIdMesg, FieldDescriptionMesg] = lookup.GetMesgs(key);

                if (tuple != null) {
                    defn = new DeveloperFieldDefinition(tuple.Item2, tuple.Item1, size);
                } else {
                    defn = new DeveloperFieldDefinition(num, size, devIdx);
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
            return p.size + c.size;
        },                                0);
        mesgSize += this.devFieldDefs.reduce((p, c) => {
            return p.size + c.size;
        },                                   0);

        return mesgSize;
    }

    public addField(FieldDefinition field): void {
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
    ): DeveloperFieldDefinition {
        return this.devFieldDefs.find((def) => {
            return (def.FieldNum === num) && (def.DeveloperDataIndex === developerIndex);
        });
    }

    public supports(mesgDef: MesgDefinition | Mesg): boolean {
        if (Mesg.isOfType(mesgDef)) {
            return this.supports(new MesgDefinition(mesg));
        }

        if (mesgDef == null) {
            return false;
        }

        if (this.globalMesgNum !== mesgDef.GlobalMesgNum) {
            return false;
        }

        if (this.localMesgNum !== mesgDef.LocalMesgNum) {
            return false;
        }

        for (const fieldDef of mesgDef.GetFields()) {
            const supportedFieldDef: FieldDefinition = this.getField(fieldDef.Num);

            if (supportedFieldDef === null) {
                return false;
            }

            if (fieldDef.Size > supportedFieldDef.Size) {
                return false;
            }
        }

        for (const fieldDef of mesgDef.DeveloperFieldDefinitions) {
            // tslint:disable-next-line: max-line-length
            const supportedFieldDef = this.getDeveloperFieldDefinition(fieldDef.FieldNum, fieldDef.DeveloperDataIndex);

            if (supportedFieldDef == null) {
                return false;
            }

            if (fieldDef.Size > supportedFieldDef.Size) {
                return false;
            }
        }

        return true;
    }
    //#endregion
}
