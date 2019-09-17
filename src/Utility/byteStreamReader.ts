import { BitConverter } from '../BitConverter/bitConverter';

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
    public buffer: Uint8Array;
    private pposition: number = 0;

    public constructor(
        bufferOrStream: Uint8Array | ByteStreamReader,
        public isBigEndian: boolean = false,
    ) {
        if (ByteStreamReader.isOfType(bufferOrStream)) {
            this.buffer = new Uint8Array(bufferOrStream.buffer, bufferOrStream.position);
            return;
        }
        this.buffer = bufferOrStream;
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

    public readSByte(): number {
        let readNumber = this.readByte();
        if (readNumber > 127) {
            readNumber = readNumber - 256;
        }
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

    public readSingle(): number {
        return BitConverter.toSingle(this.readBytes(4), 0, this.isBigEndian);
    }

    public readDouble(): number {
        return BitConverter.toDouble(this.readBytes(8), 0, this.isBigEndian);
    }

    public readUInt16(): number {
        return BitConverter.toUInt16(this.readBytes(2), 0, this.isBigEndian);
    }

    public readInt16(): number {
        return BitConverter.toInt16(this.readBytes(2), 0, this.isBigEndian);
    }

    public readUInt32(): number {
        return BitConverter.toUInt32(this.readBytes(4), 0, this.isBigEndian);
    }

    public readInt32(): number {
        return BitConverter.toInt32(this.readBytes(4), 0, this.isBigEndian);
    }

    public readUInt64(): number {
        return BitConverter.toUInt64(this.readBytes(8), 0, this.isBigEndian);
    }

    public readInt64(): number {
        return BitConverter.toInt64(this.readBytes(8), 0, this.isBigEndian);
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
