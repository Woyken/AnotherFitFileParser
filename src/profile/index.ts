export * from "../scripts/generated/fitSdkProfile";
import {
  baseTypesList,
  messageList,
} from "../scripts/generated/fitSdkProfile";

export type BaseTypesListType = typeof baseTypesList;
export type BaseTypesListIndex = keyof BaseTypesListType;
export type BaseTypesListItem = BaseTypesListType[BaseTypesListIndex];
export function isInBaseTypesList(
  typeIndex: number
): typeIndex is BaseTypesListIndex {
  const keys = Object.keys(baseTypesList);
  if (keys.indexOf(typeIndex.toString()) >= 0) return true;
  return false;
}

export function findBaseTypeById(baseTypeId: number) {
  const values = Object.values(baseTypesList);
  return values.find(b => b.baseTypeid === baseTypeId);
}

// export type ArrayElement<ArrayType extends readonly unknown[]> =
//   ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];
export type MessageListType = typeof messageList;
export type MessageListMessageType = ArrayElement<MessageListType>;
export type MessageListId = MessageListMessageType["id"];
export function isInMessageList(
  messageIndex: number
): messageIndex is MessageListId {
  if (messageList.find((m) => m.id == messageIndex)) return true;
  return false;
}

export type MessageListMessageFieldType = ArrayElement<
  MessageListMessageType["fields"]
>;
export type MessageListMessageFieldSubfieldType = ArrayElement<
  MessageListMessageFieldType["subfields"]
>;
export type MessageListMessageFieldSubfieldRefFieldType = ArrayElement<
  MessageListMessageFieldSubfieldType["refFields"]
>;

export function isBaseTypeNumeric(baseTypeId: BaseTypesListIndex) {
  const baseType = baseTypesList[baseTypeId];
  switch (baseType.baseType) {
    case "enum":
    case "string":
      return false;
    case "byte":
    case "float32":
    case "float64":
    case "sint16":
    case "sint32":
    case "sint64":
    case "sint8":
    case "uint16":
    case "uint16z":
    case "uint32":
    case "uint32z":
    case "uint64":
    case "uint64z":
    case "uint8":
    case "uint8z":
      return true;
    default:
      throw new Error(
        `Field:IsNumeric - Unexpected Fit Type ${JSON.stringify(baseType)}`
      );
  }
}

export function isValueValidForBaseType(baseTypeId: BaseTypesListIndex, value: number | number[]) {
  const baseType = baseTypesList[baseTypeId];

  if (typeof value !== 'number')
    return baseType.baseType === 'string';

  switch (baseType.baseType) {
    case 'enum':
    case 'byte':
    case 'uint8':
    case 'uint8z':
      if (value >= 0 && value <= 255) {
        return true;
      }
      break;
    case 'sint8':
      if (value >= -128 && value <= 127) {
        return true;
      }
      break;
    case 'sint16':
      if (value >= -32768 && value <= 32767) {
        return true;
      }
      break;
    case 'uint16':
    case 'uint16z':
      if (value >= 0 && value <= 65535) {
        return true;
      }
      break;
    case 'sint32':
      if (value >= -2147483648 && value <= 2147483647) {
        return true;
      }
      break;
    case 'uint32':
    case 'uint32z':
      if (value >= -2147483648 && value <= 2147483647) {
        return true;
      }
      break;
    case 'sint64':
      return true;
    case 'uint64':
    case 'uint64z':
      return true;
    case 'float32':
      if (value >= -3.402823e38 && value <= 3.402823e38) {
        return true;
      }
      break;
    case 'float64':
      if (value >= -1.79769313486232e308 && value <= 1.79769313486232e308) {
        return true;
      }
      break;
    case 'string':
      return false;
    default:
      break;
  }

  return false;
}
