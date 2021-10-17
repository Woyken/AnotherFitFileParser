import { MessageListMessageFieldType, BaseTypesListItem, baseTypesList } from '../profile';
import { Fit } from './fit';

export const invalidField = {
    id: Fit.fieldNumInvalid,
    name: 'unknown',
    offset: 0,
    scale: 1,
    typeId: 'byte',
    units: '',
    type: baseTypesList[0x00],
    baseType: baseTypesList[0x00],
    profileType: undefined,
    subfields: [],
    components: [],
} as const;

export type ProfileFieldTypeWithInvalid = MessageListMessageFieldType | typeof invalidField;

export class FieldDefinition<T extends ProfileFieldTypeWithInvalid> {
    /** Defined in the Global FIT profile for the specified FIT message */
    public profileField: T;
    /** Size (in bytes) of the specified FIT message’s field */
    public size: number;
    /** Base type of the specified FIT message’s field */
    public baseType: BaseTypesListItem;

    public constructor(
            profileField: T | undefined,
            size: number,
            baseTypeId: BaseTypesListItem,
        ) {
            this.profileField = profileField ?? (invalidField as T);
            this.size = size;
            this.baseType = baseTypeId;
    }
}

export type FieldDefinitionAny = FieldDefinition<ProfileFieldTypeWithInvalid>;
