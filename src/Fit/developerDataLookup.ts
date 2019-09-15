import { DeveloperDataKey } from './developerDataKey';
import { DeveloperFieldDescription } from './developerFieldDescription';

export class DeveloperDataLookup {
    private readonly fieldDescriptionMesgs: Map<DeveloperDataKey, FieldDescriptionMesg>;
    private readonly developerDataIdMesgs: Map<number, DeveloperDataIdMesg>;

    public constructor() {
        this.fieldDescriptionMesgs = new Dictionary<DeveloperDataKey, FieldDescriptionMesg>();
        this.developerDataIdMesgs = new Dictionary<byte, DeveloperDataIdMesg>();
    }

    public getMesgs(
        key: DeveloperDataKey,
    ): { ddmsg: DeveloperDataIdMesg, fdmsg: FieldDescriptionMesg } | undefined {
        const devIdMesg: DeveloperDataIdMesg;
        const descriptionMesg: FieldDescriptionMesg;

        this.developerDataIdMesgs.TryGetValue(key.DeveloperDataIndex, out devIdMesg);
        this.fieldDescriptionMesgs.TryGetValue(key, out descriptionMesg);

        if (devIdMesg !== undefined && descriptionMesg !== undefined) {
            return {
                ddmsg: devIdMesg,
                fdmsg: descriptionMesg,
            };
        }

        return;
    }

    public add(mesg: DeveloperDataIdMesg): void {
        const index: number | undefined = mesg.GetDeveloperDataIndex();
        if (index === undefined) {
            return;
        }

        this.developerDataIdMesgs.set(index, mesg);

        // Remove all fields currently associated with this developer
        const keysToRemove =
            Array.from(this.fieldDescriptionMesgs.keys())
                .filter((k) => {
                    return k.developerDataIndex === index;
                });

        keysToRemove.forEach((key) => {
            this.fieldDescriptionMesgs.delete(key);
        });
    }

    public add1(mesg: FieldDescriptionMesg): DeveloperFieldDescription | undefined {
        let desc: DeveloperFieldDescription | undefined;

        const developerDataIndex: number | undefined = mesg.GetDeveloperDataIndex();
        const fieldDefinitionNumber: number | undefined = mesg.GetFieldDefinitionNumber();
        if ((developerDataIndex !== undefined) &&
            (fieldDefinitionNumber !== undefined)) {
            const key = new DeveloperDataKey(
                developerDataIndex,
                fieldDefinitionNumber);

            this.fieldDescriptionMesgs.set(key, mesg);

            // Build a Description of the pairing we just created
            const pair = this.getMesgs(key);
            if (pair !== undefined) {
                desc = new DeveloperFieldDescription(pair.ddmsg, pair.fdmsg);
            }
        }

        return desc;
    }
}
