export class AccumulatedField {
    public mesgNum: number;
    public destFieldNum: number;
    private lastValue: number;
    private accumulatedValue: number;

    public constructor(mesgNum: number, destFieldNum: number) {
        this.mesgNum = mesgNum;
        this.destFieldNum = destFieldNum;
        this.lastValue = 0;
        this.accumulatedValue = 0;
    }

    public accumulate(value: number, bits: number): number {
        const mask: number = (1 << bits) - 1;

        this.accumulatedValue += (value - this.lastValue) & mask;
        this.lastValue = value;

        return this.accumulatedValue;
    }

    public set(value: number): number {
        this.accumulatedValue = value;
        this.lastValue = value;
        return this.accumulatedValue;
    }
}
