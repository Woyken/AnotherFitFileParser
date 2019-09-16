import { DeveloperDataKey } from './developerDataKey';
import { DeveloperFieldDescription } from './developerFieldDescription';
import { FieldDescriptionMesg } from './Profile/Mesgs/fieldDescriptionMesg';
import { DeveloperDataIdMesg } from './Profile/Mesgs/developerDataIdMesg';

export class DeveloperDataLookup {
    private readonly fieldDescriptionMesgs: Map<DeveloperDataKey, FieldDescriptionMesg>;
    private readonly developerDataIdMesgs: Map<number, DeveloperDataIdMesg>;

    public constructor() {
        this.fieldDescriptionMesgs = new Map<DeveloperDataKey, FieldDescriptionMesg>();
        this.developerDataIdMesgs = new Map<number, DeveloperDataIdMesg>();
    }

    public getMesgs(
        key: DeveloperDataKey,
    ): { ddmsg: DeveloperDataIdMesg, fdmsg: FieldDescriptionMesg } | undefined {
        let devIdMesg: DeveloperDataIdMesg | undefined;
        let descriptionMesg: FieldDescriptionMesg | undefined;

        if (this.developerDataIdMesgs.has(key.developerDataIndex)) {
            devIdMesg = this.developerDataIdMesgs.get(key.developerDataIndex);
        }
        if (this.fieldDescriptionMesgs.has(key)) {
            descriptionMesg = this.fieldDescriptionMesgs.get(key);
        }

        if (devIdMesg !== undefined && descriptionMesg !== undefined) {
            return {
                ddmsg: devIdMesg,
                fdmsg: descriptionMesg,
            };
        }

        return;
    }

    public add(mesg: DeveloperDataIdMesg): void {
        const index: number | undefined = mesg.getDeveloperDataIndex();
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

        const developerDataIndex: number | undefined = mesg.getDeveloperDataIndex();
        const fieldDefinitionNumber: number | undefined = mesg.getFieldDefinitionNumber();
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
