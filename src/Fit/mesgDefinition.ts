import { Fit } from './fit';
import { ByteStreamReader } from '../Utility/byteStreamReader';
import { FieldDefinition } from './fieldDefinition';
import { DeveloperFieldDefinition } from './developerFieldDefinition';
import { DeveloperDataLookup } from './developerDataLookup';
import { DeveloperDataKey } from './developerDataKey';

export class MesgDefinition {
    public static isOfType(value: any): value is MesgDefinition {
        if (typeof value.localMesgNum !== 'number') {
            return false;
        }
        if (typeof value.globalMesgNum !== 'number') {
            return false;
        }
        return true;
    }

    //#region Properties

    public get developerFieldDefinitions(): DeveloperFieldDefinition[] {
        return this.devFieldDefs;
    }

    //#endregion

    //#region Constructors
    constructor(
        public readonly localMesgNum: number,
        public readonly globalMesgNum: number,
        public readonly numFields: number,
        private readonly fieldDefs: FieldDefinition[],
        private readonly devFieldDefs: DeveloperFieldDefinition[]) {
    }
    //#endregion

    //#region Methods

    public static createMesgDef(fitSource: ByteStreamReader, lookup: DeveloperDataLookup) {
        return this.read(fitSource, lookup);
    }

    private static read(fitSource: ByteStreamReader, lookup: DeveloperDataLookup): MesgDefinition {
        fitSource.position = 0;
        const br: ByteStreamReader = new ByteStreamReader(fitSource, false);

        const header = br.readByte();
        const localMesgNum = header & Fit.localMesgNumMask;

        /* const reserved: number = */ br.readByte();
        const architecture = br.readByte();
        const isBigEndian = architecture === Fit.bigEndian;
        br.isBigEndian = isBigEndian;
        const globalMesgNum = br.readUInt16();
        const numFields = br.readByte();
        const fieldDefs: FieldDefinition[] = [];
        for (let i = 0; i < numFields; i++) {
            const num: number = br.readByte();
            const size: number = br.readByte();
            const type: number = br.readByte();

            const newField: FieldDefinition = new FieldDefinition(num, size, type);
            fieldDefs.push(newField);
        }

        const containsDevData = (header & Fit.devDataMask) === Fit.devDataMask;
        const devFieldDefs: DeveloperFieldDefinition[] = []
        if (containsDevData) {
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

                devFieldDefs.push(defn);
            }
        }
        return new MesgDefinition(localMesgNum, globalMesgNum, numFields, fieldDefs, devFieldDefs);
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

    public getFields(): FieldDefinition[] {
        // This is a reference to the real list
        return this.fieldDefs;
    }
    //#endregion
}
