import { AccumulatedField } from './accumulatedField';
import { MesgNum } from './Profile/Types/mesgNum';

export class Accumulator {
    public accumulatedFields: AccumulatedField[] = [];

    public set(mesgNum: MesgNum, destFieldNum: number, value: number): void {
        let accumField: AccumulatedField | null = null;
        let i: number;

        for (i = 0; i < this.accumulatedFields.length; i++) {
            accumField = this.accumulatedFields[i];

            if ((accumField.mesgNum === mesgNum) && (accumField.destFieldNum === destFieldNum)) {
                break;
            }
        }

        if (i === this.accumulatedFields.length) {
            accumField = new AccumulatedField(mesgNum, destFieldNum);
            this.accumulatedFields.push(accumField);
        }

        if (accumField) {
            accumField.set(value);
        }
    }

    public accumulate(mesgNum: MesgNum, destFieldNum: number, value: number, bits: number): number {
        let accumField: AccumulatedField | null = null;
        let i: number;
        for (i = 0; i < this.accumulatedFields.length; i++) {
            accumField = this.accumulatedFields[i];

            if ((accumField.mesgNum === mesgNum) && (accumField.destFieldNum === destFieldNum)) {
                break;
            }
        }

        if (i === this.accumulatedFields.length) {
            accumField = new AccumulatedField(mesgNum, destFieldNum);
            this.accumulatedFields.push(accumField);
        }

        if (accumField) {
            return accumField.accumulate(value, bits);
        }
        throw new Error('Accumulated field is null.');
    }
}
