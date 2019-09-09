import { ByteStreamReader } from '../Utility/byteStreamReader';

export class Header {
    private readonly headerWithCRCSize: number = 14;

    public size: number;
    public protocolVersion: number;
    public profileVersion: number;
    public dataSize: number;
    public dataType: string[];
    public crc: number;

    public constructor(bytesStream: ByteStreamReader) {
        this.size = bytesStream.readByte();
        this.protocolVersion = bytesStream.readByte();
        this.profileVersion = bytesStream.readUInt16();
        this.dataSize = bytesStream.readUInt32();
        this.dataType = bytesStream.readChars(4);
        if (this.size === this.headerWithCRCSize) {
            this.crc = bytesStream.readUInt16();
        } else {
            this.crc = 0x0000;
        }
    }

    public isValid(): boolean {
        if (this.dataType.join('') === '.FIT') {
            return true;
        }
        return false;
    }
}
