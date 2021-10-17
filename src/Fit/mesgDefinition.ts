import { Fit } from './fit';
import { ByteStreamReader } from '../Utility/byteStreamReader';
import { FieldDefinition, invalidField } from './fieldDefinition';
import { DeveloperFieldDefinition } from './developerFieldDefinition';
import { ArrayElement, messageList, MessageListMessageType, findBaseTypeById } from '../profile';
import { DeveloperDataIdMesg } from './Profile/Mesgs/developerDataIdMesg';
import { MesgNum } from './Profile/Types/mesgNum';


const invalidFields: (typeof invalidField)[] = [];
export const invalidMessage = {
    id: MesgNum.invalid as number,
    name: 'unknown',
    groupName: 'unknown',
    fields: invalidFields,
};

export type MessageListMessageTypeWithInvalid = MessageListMessageType | typeof invalidMessage;
export class MesgDefinition<T extends MessageListMessageTypeWithInvalid> {
    constructor(
        public readonly isBigEndian: boolean,
        public readonly localMesgNum: number,
        public readonly profileMessage: T,
        public readonly fieldsCount: number,
        public readonly fieldDefinitions: FieldDefinition<ArrayElement<T['fields']>>[],
        public readonly developerFieldDefinitions: DeveloperFieldDefinition[]) {
    }

    public static createMesgDef(fitSource: ByteStreamReader, developerDataIdLookup: DeveloperDataIdMesg[]) {
        return this.read(fitSource, developerDataIdLookup);
    }

    private static read(fitSource: ByteStreamReader, lookup: DeveloperDataIdMesg[]): MesgDefinitionAny {
        fitSource.position = 0;
        const br: ByteStreamReader = new ByteStreamReader(fitSource, false);

        const header = br.readByte();
        const localMesgNum = header & Fit.localMesgNumMask;

        /* const reserved: number = */ br.readByte();
        const architecture = br.readByte();
        const isBigEndian = architecture === Fit.bigEndian;
        br.isBigEndian = isBigEndian;
        const profileMesgNum = br.readUInt16();
        let profileMessage = messageList.find(p => p.id === profileMesgNum) ?? invalidMessage;
        // if (!profileMessage)
        //     throw new Error(`Profile message id ${profileMesgNum} not found`);
        const numFields = br.readByte();
        const fieldDefs: FieldDefinition<ArrayElement<typeof profileMessage.fields>>[] = [];
        for (let i = 0; i < numFields; i++) {
            const fieldId = br.readByte();
            const profileField = profileMessage.fields.map(x => x).find(f => f.id === fieldId);
            // if (!profileField)
            //     throw new Error(`Field id ${fieldId} for profile message id ${profileMesgNum} not found`);
            const size = br.readByte();
            const baseTypeId = br.readByte();
            const baseType = findBaseTypeById(baseTypeId);
            if (!baseType)
                throw new Error(`BaseType ${baseTypeId} for Field id ${fieldId} for profile message id ${profileMesgNum} not found`);

            const newField = new FieldDefinition(profileField, size, baseType);
            fieldDefs.push(newField);
        }

        const containsDevData = (header & Fit.devDataMask) === Fit.devDataMask;
        const devFieldDefs: DeveloperFieldDefinition[] = []
        if (containsDevData) {
            const developerFieldCount = br.readByte();
            for (let i = 0; i < developerFieldCount; i++) {
                // Seek to the Size
                const fieldNumber = br.readByte();
                const size = br.readByte();
                const developerDataIndex = br.readByte();
                const devDataId = lookup.find(x => x.developerDataIndex === developerDataIndex);
                if (!devDataId)
                    throw new Error('cannot be null');
                const fieldDescription = devDataId.fieldDescriptions.find(x => x.fieldDefinitionNumber === fieldNumber);
                if (!fieldDescription)
                    throw new Error('cannot be null');
                const fieldDefinition = new DeveloperFieldDefinition(fieldDescription, size);
                devFieldDefs.push(fieldDefinition);
            }
        }
        return new MesgDefinition(isBigEndian, localMesgNum, profileMessage, numFields, fieldDefs, devFieldDefs);
    }

    public getMesgSize(): number {
        let mesgSize: number = 1;  // header

        mesgSize += this.fieldDefinitions.reduce((p, c) => {
            return p + c.size;
        }, 0);
        mesgSize += this.developerFieldDefinitions.reduce((p, c) => {
            return p + c.size;
        }, 0);

        return mesgSize;
    }
}

export type MesgDefinitionAny = MesgDefinition<MessageListMessageTypeWithInvalid>;
