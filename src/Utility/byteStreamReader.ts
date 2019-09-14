export class ByteStreamReader {
    public static isOfType(value: any): value is ByteStreamReader {
        if (!value) {
            return false;
        }
        if (typeof value.pposition !== 'number') {
            return false;
        }
        if (typeof value.readByte !== 'function') {
            return false;
        }
        return true;
    }

    public read(outputBuffer: number[], offset: number, count: number): void {
        for (let i = 0; i < count; i++) {
            outputBuffer[offset + i] = this.readByte();
        }
    }
    private pposition: number = 0;

    public constructor(public buffer: Buffer, public isBigEndian: boolean = false) {
    }

    public get position(): number {
        return this.pposition;
    }

    public set position(value: number) {
        this.pposition = value;
    }

    public get length(): number {
        return this.buffer.length;
    }

    public readByte(): number {
        const readNumber = this.buffer[this.pposition];
        this.pposition++;
        return readNumber;
    }

    public readBytes(numBytes: number): number[] {
        const resultArray: number[] = [];
        for (let i = 0; i < numBytes; i++) {
            resultArray.push(this.readByte());
        }
        return resultArray;
    }

    public readUInt16(): number {
        return this.readByte() + (this.readByte() << 8);
    }

    public readUInt32(): number {
        return (
            this.readByte() +
            (this.readByte() << 8) +
            (this.readByte() << 16) +
            (this.readByte() << 24)
        );
    }

    public readChars(numOfChars: number): string[] {
        const resultChars: string[] = [];
        for (let i = 0; i < numOfChars; i++) {
            const byte = this.readByte();
            resultChars.push(String.fromCharCode(byte));
        }
        return resultChars;
    }
}
