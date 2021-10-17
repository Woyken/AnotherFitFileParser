import { DeveloperFieldDefinition } from './developerFieldDefinition';

export class DeveloperField {
    public definition: DeveloperFieldDefinition;
    public values: (number | number[])[] = [];

    constructor(definition: DeveloperFieldDefinition) {
        this.definition = definition
    }

    setRawValue(index: number, value: number | number[]) {
        while (index >= this.values.length) {
            // Add placeholders of the correct type so GetSize() will
            // still compute correctly
            switch (this.definition.descriptionMesg.baseType.baseType) {
                case 'string':
                    this.values.push([0]);
                    break;
                default:
                    this.values.push(0);
                    break;
            }
        }
        this.values[index] = value;
    }

    addValue(value: number[]) {
        while (0 >= this.values.length) {
            // Add placeholders of the correct type so GetSize() will
            // still compute correctly
            const fieldDef = this.definition;

            switch (fieldDef.descriptionMesg.baseType.baseType) {
                case 'string':
                    this.values.push([0]);
                    break;
                default:
                    this.values.push(0);
                    break;
            }
        }
        this.values[0] = value;
    }
}
