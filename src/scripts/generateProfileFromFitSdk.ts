import zip from "jszip";
import fs from "fs/promises";
import xlsx from "xlsx";

// Generate types for Profile messages and types
// Run this with "npx ts-node "

// Very hacky Fitbit SDK Profile parsing solution
// Being very lazy with nullable types, everything might break if something changes in Profile

// Similar to python implementation found here:
// https://github.com/dtcooper/python-fitparse/blob/master/scripts/generate_profile.py

function parseSpreadsheet(xlsxData: ArrayBuffer) {
  const workbook = xlsx.read(xlsxData, { type: "array" });
  const typeList = parseTypes(workbook.Sheets["Types"]);
  const messageList = parseMessages(workbook.Sheets["Messages"], typeList);
  return { typeList, messageList };
}

function getCellStringValue(
  sheet: xlsx.WorkSheet,
  column: number,
  row: number
) {
  const c = xlsx.utils.encode_cell({ c: column, r: row });
  return sheet[c] as xlsx.CellObject | undefined;
}

function consumeCellStringValue(
  sheet: xlsx.WorkSheet,
  column: number,
  row: number
) {
  const cell = xlsx.utils.encode_cell({ c: column, r: row });
  const result = sheet[cell] as xlsx.CellObject | undefined;
  sheet[cell] = undefined;
  return result;
}

interface ParsedType {
  name: string;
  baseType: string;
  comment: string | undefined;
  values: ParsedTypeValue[];
}
interface ParsedTypeValue {
  name: string;
  value: string;
  comment: string | undefined;
}

function parseTypes(sheet: xlsx.WorkSheet) {
  const sheetRowCount =
    sheet["!rows"]?.length || xlsx.utils.decode_range(sheet["!ref"]!).e.r;
  const parsedTypesList: ParsedType[] = [];
  let currentType: ParsedType;
  for (let r = 1; r < sheetRowCount; r++) {
    const firstRowCel = getCellStringValue(sheet, 0, r);
    if (firstRowCel) {
      // First column exists - new message type
      const name = firstRowCel.w!;
      const baseType = getCellStringValue(sheet, 1, r)?.w!;
      const comment = getCellStringValue(sheet, 4, r)?.w!;
      currentType = { baseType, name, comment, values: [] };
      parsedTypesList.push(currentType);
    } else {
      // no first column - value for current type
      const name = getCellStringValue(sheet, 2, r)?.w!;
      const value = getCellStringValue(sheet, 3, r)?.w!;
      const comment = getCellStringValue(sheet, 4, r)?.w!;
      currentType!.values.push({ value, name, comment });
    }
  }
  return parsedTypesList;
}

interface ParsedMessage {
  num: string;
  name: string;
  groupName: string;
  fields: ParsedMessageField[];
  comment: string | undefined;
}

interface ParsedMessageField {
  name: string;
  type: string;
  num: string;
  scale: string;
  offset: string;
  units: string;
  components: ParsedMessageFieldComponent[];
  subfields: ParsedMessageFieldSubField[];
  comment: string | undefined;
}

interface ParsedMessageFieldSubField {
  name: string;
  type: string;
  num: string;
  scale: string;
  offset: string;
  units: string;
  components: ParsedMessageFieldComponent[];
  refFields: ParsedMessageFieldSubFieldRefField[];
  comment: string | undefined;
}
interface ParsedMessageFieldSubFieldRefField {
  name: string;
  value: string;
  num: unknown;
  raw_value: unknown;
}

interface ParsedMessageFieldComponent {
  name: string;
  num: unknown;
  scale: number;
  offset: number;
  units: string;
  bits: number;
  bitOffset: unknown;
  accumulate: boolean;
}

function trimWhitespaceForArray(arr?: string[]) {
  return arr?.map(trimWhitespace)!;
}

function trimWhitespace(str: string) {
  return str.replace(/^\s+|\s+$/g, "");
}

function parseMessages(sheet: xlsx.WorkSheet, typeList: ParsedType[]) {
  const sheetRowCount =
    sheet["!rows"]?.length || xlsx.utils.decode_range(sheet["!ref"]!).e.r;
  let currentGroupName: string;
  let currentMessage: ParsedMessage;
  let parsedMessagesList: ParsedMessage[] = [];
  let currentField: ParsedMessageField;
  for (let r = 1; r < sheetRowCount; r++) {
    if (
      getCellStringValue(sheet, 3, r) &&
      Array.from(Array(14).keys())
        .filter((x) => x !== 3)
        .map((x) => getCellStringValue(sheet, x, r))
        .every((x) => !x)
    ) {
      currentGroupName = getCellStringValue(sheet, 3, r)?.w!;
    } else if (getCellStringValue(sheet, 0, r)) {
      // First row means a new message
      const name = getCellStringValue(sheet, 0, r)?.w!;
      const groupName = currentGroupName!;
      const comment = getCellStringValue(sheet, 13, r)?.w!;
      const num = typeList
        .find((t) => t.name == "mesg_num")!
        .values.find((v) => v.name == name)!.value;
      currentMessage = { num, name, comment, groupName, fields: [] };
      parsedMessagesList.push(currentMessage);
    } else {
      let parsedComponents: ParsedMessageFieldComponent[] = [];
      if (getCellStringValue(sheet, 5, r)) {
        // Get components if they exist
        const componentNames = trimWhitespaceForArray(
          consumeCellStringValue(sheet, 5, r)?.w?.split(",")!
        );
        const componentScales = trimWhitespaceForArray(
          consumeCellStringValue(sheet, 6, r)?.w?.split(",")!
        )?.map(parseFloat)!;
        const componentOffsets = trimWhitespaceForArray(
          consumeCellStringValue(sheet, 7, r)?.w?.split(",")!
        )?.map(parseFloat)!;
        const componentUnits = trimWhitespaceForArray(
          consumeCellStringValue(sheet, 8, r)?.w?.split(",")!
        );
        const componentBits = trimWhitespaceForArray(
          consumeCellStringValue(sheet, 9, r)?.w?.split(",")!
        );
        const componentAccumulate = trimWhitespaceForArray(
          consumeCellStringValue(sheet, 10, r)?.w?.split(",")!
        )?.map((x) => x == "1")!;
        parsedComponents = componentNames.map((x, index) => ({
          name: componentNames[index],
          scale: componentScales?.[index],
          offset: componentOffsets?.[index],
          units: componentUnits?.[index],
          bits: parseInt(componentBits[index]),
          accumulate: componentAccumulate?.[index],
          num: undefined,
          bitOffset: undefined,
        }));
      }
      // Otherwise a field
      // Not a subfield if first row has definition num
      if (getCellStringValue(sheet, 1, r)) {
        const name = getCellStringValue(sheet, 2, r)?.w!;
        const type = getCellStringValue(sheet, 3, r)?.w!;
        const num = getCellStringValue(sheet, 1, r)?.w!;
        const scale = getCellStringValue(sheet, 6, r)?.w!;
        const offset = getCellStringValue(sheet, 7, r)?.w!;
        const units = getCellStringValue(sheet, 8, r)?.w!;
        const comment = getCellStringValue(sheet, 13, r)?.w!;
        currentField = {
          comment,
          units,
          offset,
          scale,
          num,
          type,
          name,
          components: parsedComponents,
          subfields: [],
        };

        // TODO figure out if this is needed
        // # Wipe out scale, units, offset from field since components scale is None or b'' or is not digit
        // if row[6] is None or row[6] == b'' or not str(row[6]).isdigit():
        //     field = field._replace(scale=None, offset=None, units=None)

        currentMessage!.fields.push(currentField);
      } else if (getCellStringValue(sheet, 2, r)) {
        // Sub fields
        const name = getCellStringValue(sheet, 2, r)?.w!;
        const type = getCellStringValue(sheet, 3, r)?.w!;
        const num = currentField!.num;
        const scale = getCellStringValue(sheet, 6, r)?.w!;
        //const scales = trimWhitespaceForArray(getCellStringValue(sheet, 6, r)?.w?.split(",")!);
        const offset = getCellStringValue(sheet, 7, r)?.w!;
        const units = getCellStringValue(sheet, 8, r)?.w!;
        const comment = getCellStringValue(sheet, 13, r)?.w!;

        const refNames = trimWhitespaceForArray(
          getCellStringValue(sheet, 11, r)?.w?.split(",")!
        );
        const refValues = trimWhitespaceForArray(
          getCellStringValue(sheet, 12, r)?.w?.split(",")!
        );

        //parsedComponents.forEach((component, idx) => )

        const subField: ParsedMessageFieldSubField = {
          comment,
          components: parsedComponents,
          name,
          num,
          offset,
          type,
          scale,
          units,
          refFields: refNames.map((name, index) => ({
            name: name,
            value: refValues[index],
            num: undefined,
            raw_value: undefined,
          })),
        };
        //TODO consider
        //# Wipe out scale, units, offset from field since it's a component
        //subfield = subfield._replace(scale=None, offset=None, units=None)

        currentField!.subfields.push(subField);
        //ParsedMessageFieldSubFieldRefField
      }
    }
  }
  // Resolve reference fields for subfields and components
  for (const message of parsedMessagesList) {
    for (const field of message.fields) {
      for (const subField of field.subfields) {
        for (const refField of subField.refFields) {
          const referencedField = message.fields.find(
            (f) => f.name == refField.name
          )!;
          refField.num = referencedField.num;
          refField.raw_value = typeList
            .find((t) => t.name === referencedField.type)!
            .values.find((v) => v.name === refField.value)!.value;
        }
        let bitOffset = 0;
        for (const component of subField.components) {
          component.num = message.fields.find(
            (f) => f.name == component.name
          )!.num;
          component.bitOffset = bitOffset;
          bitOffset += component.bits;
        }
      }
      let bitOffset = 0;
      for (const component of field.components) {
        component.num = message.fields.find(
          (f) => f.name == component.name
        )!.num;
        component.bitOffset = bitOffset;
        bitOffset += component.bits;
      }
    }
  }

  return parsedMessagesList;
}

const BASE_TYPES_MAP = {
  bool: "0x00", // mapping bool to same value as enum
  enum: "0x00",
  sint8: "0x01",
  uint8: "0x02",
  sint16: "0x83",
  uint16: "0x84",
  sint32: "0x85",
  uint32: "0x86",
  string: "0x07",
  float32: "0x88",
  float64: "0x89",
  uint8z: "0x0A",
  uint16z: "0x8B",
  uint32z: "0x8C",
  byte: "0x0D",
  sint64: "0x8E",
  uint64: "0x8F",
  uint64z: "0x90",
};

function formatCommentToOptionalString(
  preOffset: string = "",
  comment?: string,
  postOffset: string = ""
) {
  return comment ? `${preOffset}/** ${comment} */${postOffset}` : "";
}

function formatTypeListToString(typeList: ParsedType[]) {
  function formatTypeToString(type: ParsedType) {
    return `${formatCommentToOptionalString("  ", type.comment, "\n")}\
  ${type.name}: {
    name: '${type.name}',
    baseTypeid: ${BASE_TYPES_MAP[type.baseType as keyof typeof BASE_TYPES_MAP]},
    baseType: '${type.baseType}',${
      !type.values?.length
        ? ""
        : `
    values: {${type.values.map(
      (v) => `${formatCommentToOptionalString(
        `\n      ${v.comment?.includes("Deprecated") ? "// " : ""}`,
        v.comment,
        ""
      )}
      ${v.comment?.includes("Deprecated") ? "// " : ""}0x${parseInt(
        v.value
      ).toString(16)}: '${v.name}'`
    )}
    }`
    }
  }`;
  }
  return `\
const profileTypeList = {
${typeList.map(formatTypeToString).join(",\n")}
} as const`;
}

function baseTypeOrTypeAsString(type: string, typeList: ParsedType[]) {
  return typeList.find((t) => t.name == type)
    ? `profileTypeList['${type}']`
    : `baseTypesList[${BASE_TYPES_MAP[type as keyof typeof BASE_TYPES_MAP]}]`;
}

function formatMessageListToString(
  messageList: ParsedMessage[],
  typeList: ParsedType[]
) {
  function formatComponentToString(component: ParsedMessageFieldComponent) {
    return `
{
  id: '${component.num}',
  name: '${component.name}',
  scale: '${component.scale}',
  offset: '${component.offset}',
  units: '${component.units}',
  accumulate: '${component.accumulate}',
  bits: '${component.bits}',
  bitOffset: '${component.bitOffset}',
}`;
  }
  function formatMessageToString(message: ParsedMessage) {
    return `${formatCommentToOptionalString("  ", message.comment, "\n")}\
  {
    id: ${message.num},
    name: '${message.name}',
    groupName: '${message.groupName}',
    fields: [${message.fields
      .map(
        (field) => `${formatCommentToOptionalString(
          "\n      ",
          field.comment,
          ""
        )}
      {
        id: ${field.num},
        name: '${field.name}',
        scale: ${field.scale},
        offset: ${field.offset},
        units: '${field.units}',
        typeId: '${field.type}',
        type: ${baseTypeOrTypeAsString(field.type, typeList)},
        components: [${field.components
          .map(formatComponentToString)
          .join(",")
          .split("\n").join(`
          `)}
        ],
        subfields: [${field.subfields
          .map(
            (subfield) => `
          {
            id: ${subfield.num},
            name: '${subfield.name}',
            typeId: '${subfield.type}',
            type: ${baseTypeOrTypeAsString(subfield.type, typeList)},
            scale: ${subfield.scale},
            offset: ${subfield.offset},
            units: '${subfield.units}',
            refFields: [${subfield.refFields
              .map(
                (refField) => `
              {
                id: ${refField.num},
                name: '${refField.name}',
                rawValue: ${refField.raw_value},
                value: '${refField.value}',
              }`
              )
              .join(",")}
            ],
            components: [${subfield.components
              .map(formatComponentToString)
              .join(",")
              .split("\n").join(`
              `)}
            ],
          }`
          )
          .join(",")}

        ],
      }`
      )
      .join(",")}
    ],
  }`;
  }
  return `\
const messageList = [
${messageList.map(formatMessageToString).join(",\n")}
] as const`;
}

async function main() {
  const pathToFitSdk = process.argv[2];
  if (!pathToFitSdk) {
    const tempPath = process.argv[1]
      .split("\\")
      .map((s) => s.split("/"))
      .flat();
    const currentFileName = tempPath[tempPath.length - 1];
    console.error(
      `missing argument, should be run like so: '${currentFileName} PATH_TO_fitSdk.zip'`
    );
    return;
  }
  const fileData = await fs.readFile(pathToFitSdk);
  const zipData = await zip.loadAsync(fileData);
  const contentFitH = await zipData.files["c/fit.h"].async("string");
  const profileVersionStr = contentFitH.match(
    /Profile Version.+?(\d+\.?\d*).*/
  )?.[1];
  if (!profileVersionStr) throw new Error("invalid profile version");
  const profileVersion = parseFloat(profileVersionStr);

  const profileXlsxFileData = await zipData.files["Profile.xlsx"].async(
    "arraybuffer"
  );
  const { messageList, typeList } = parseSpreadsheet(profileXlsxFileData);

  const typeListStr = formatTypeListToString(typeList);

  const messageListStr = formatMessageListToString(messageList, typeList);

  const messageListMapByName = `const messageListMapByName = { ${messageList.map(m => `${m.name}: messageList[${messageList.findIndex(me => me.name === m.name)}]`).join(',\n')} } as const`

  const output = `\
// Some sort of header goes here
// Parsed from
// SDK version: ${profileVersion}
// On ${new Date().toUTCString()}
// Parsed ${typeList.length} types (${
    typeList.map((t) => t.values).flat().length
  } values), ${messageList.length} messages (${
    messageList.map((m) => m.fields).flat().length
  } fields)

export ${baseTypesListStr}

export ${typeListStr}

export ${messageListStr}

export ${messageListMapByName}
`;

  try {
    await fs.access("generated");
  } catch (error) {
    await fs.mkdir("generated");
  }
  await fs.writeFile("./generated/fitSdkProfile.ts", output);
  console.log("Successfully generated profile types fitSdkProfile.ts");
}

main();

const baseTypesListStr = `\
const baseTypesList = {
  0x00: { name: "enum", id: 0x00, fmt: "B", invalidValue: 0xff },
  0x01: { name: "sint8", id: 0x01, fmt: "b", invalidValue: 0x7f },
  0x02: { name: "uint8", id: 0x02, fmt: "B", invalidValue: 0xff },
  0x83: { name: "sint16", id: 0x83, fmt: "h", invalidValue: 0x7fff },
  0x84: { name: "uint16", id: 0x84, fmt: "H", invalidValue: 0xffff },
  0x85: { name: "sint32", id: 0x85, fmt: "i", invalidValue: 0x7fffffff },
  0x86: { name: "uint32", id: 0x86, fmt: "I", invalidValue: 0xffffffff },
  0x07: { name: "string", id: 0x07, fmt: "s", invalidValue: 0x00 },
  0x88: { name: "float32", id: 0x88, fmt: "f", invalidValue: NaN },
  0x89: { name: "float64", id: 0x89, fmt: "d", invalidValue: NaN },
  0x0a: { name: "uint8z", id: 0x0a, fmt: "B", invalidValue: 0x0 },
  0x8b: { name: "uint16z", id: 0x8b, fmt: "H", invalidValue: 0x0 },
  0x8c: { name: "uint32z", id: 0x8c, fmt: "I", invalidValue: 0x0 },
  0x0d: { name: "byte", id: 0x0d, fmt: "B", invalidValue: 0xff },
  0x8e: { name: "sint64", id: 0x8e, fmt: "q", invalidValue: 0x7fffffffffffffff },
  0x8f: { name: "uint64", id: 0x8f, fmt: "Q", invalidValue: 0xffffffffffffffff },
  0x90: { name: "uint64z", id: 0x90, fmt: "Q", invalidValue: 0 },
} as const;`;
