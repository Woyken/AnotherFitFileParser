export class ByteStreamReader {
    read(outputBuffer: number[], offset: number, count: number) {
        for (let i = 0; i < count; i++) {
            outputBuffer[offset + i] = this.readByte();
        }
    }
    private pposition = 0;

    public constructor(public buffer: Buffer) {
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
