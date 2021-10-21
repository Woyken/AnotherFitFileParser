import { BitConverter } from '../BitConverter/bitConverter';

class DetailedProtocolVersion {
    public majorVersion: number = 0;
    public minorVersion: number = 0;

    public constructor(major: number, minor: number) {
        this.majorVersion = major;
        this.minorVersion = minor;
    }

    public get version(): number {
        return (this.majorVersion << Fit.protocolVersionMajorShift) | this.minorVersion;
    }
}

export class ProtocolVersion {
    public static V10: DetailedProtocolVersion = new DetailedProtocolVersion(1, 0);
    public static V20: DetailedProtocolVersion = new DetailedProtocolVersion(2, 0);

}

export class FitType {
    public constructor(
        public endianAbility: boolean,
        public baseTypeField: number,
        public typeName: string,
        public invalidValue: string | number,
        public size: number,
        public isSigned: boolean,
        public isInteger: boolean,
    ) {}
}

export class Fit {
    public static readonly protocolVersionMajorShift = 4;
    public static readonly protocolVersionMajorMask = (0x0F << Fit.protocolVersionMajorShift);

    public static readonly protocolVersion: number = ProtocolVersion.V20.version;
    public static readonly protocolMajorVersion: number = ProtocolVersion.V20.majorVersion;
    public static readonly protocolMinorVersion: number = ProtocolVersion.V20.minorVersion;

    public static readonly profileMajorVersion = 20;
    public static readonly profileMinorVersion = 96;
    public static readonly profileVersion = ((Fit.profileMajorVersion * 100) + Fit.profileMinorVersion);

    // public static readonly headerTypeMask = 0b11110000;//240;
    public static readonly compressedHeaderMask = 0b10000000;
    public static readonly compressedTimeMask = 0b00011111; // 0x0000001F
    public static readonly compressedTimeOffsetMask = 0b11111111111111111111111111100000; //0xFFFFFFE0
    public static readonly compressedLocalMesgNumMask = 0b01100000;

    public static readonly mesgDefinitionMask = 0b01000000;
    public static readonly mesgHeaderType = 0b0;
    public static readonly devDataMask = 0b00100000;
    public static readonly localMesgNumMask = 0b00001111 as const;
    public static readonly maxLocalMesgs = Fit.localMesgNumMask + 1;

    public static readonly mesgDefinitionReserved = 0x00;
    public static readonly littleEndian = 0x00;
    public static readonly bigEndian = 0x01;

    public static readonly maxMesgSize = 255;
    public static readonly maxFieldSize = 255;

    public static readonly headerWithCRCSize = 14;
    public static readonly headerWithoutCRCSize = (Fit.headerWithCRCSize - 2);

    public static readonly fieldNumInvalid = 255;
    public static readonly fieldNumTimeStamp = 253;

    public static readonly subfieldIndexActiveSubfield = 0xFFFE;
    public static readonly subfieldIndexMainField = 0xFFFF;
    public static readonly subfieldNameMainField = '';

    public static baseType: FitType[] = [
        new FitType(false, 0x00, 'enum', 0xFF, 1, false, false),
        new FitType(false, 0x01, 'sint8', 0x7F, 1, true, true),
        new FitType(false, 0x02, 'uint8', 0xFF, 1, false, true),
        new FitType(true, 0x83, 'sint16', 0x7FFF, 2, true, true),
        new FitType(true, 0x84, 'uint16', 0xFFFF, 2, false, true),
        new FitType(true, 0x85, 'sint32', 0x7FFFFFFF, 4, true, true),
        new FitType(true, 0x86, 'uint32', 0xFFFFFFFF, 4, false, true),
        new FitType(false, 0x07, 'string', 0x00, 1, false, false),
        new FitType(true, 0x88, 'float32', BitConverter.toSingle([0xFF, 0xFF, 0xFF, 0xFF], 0), 4, true, false),
        new FitType(true, 0x89, 'float64', BitConverter.toDouble([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF], 0), 8, true, false),
        new FitType(false, 0x0A, 'uint8z', 0x00, 1, false, true),
        new FitType(true, 0x8B, 'uint16z', 0x0000, 2, false, true),
        new FitType(true, 0x8C, 'uint32z', 0x00000000, 4, false, true),
        new FitType(false, 0x0D, 'byte', 0xFF, 1, false, false),
        new FitType(true, 0x8E, 'sint64', 0x7FFFFFFFFFFFFFFF, 8, true, true),
        new FitType(true, 0x8F, 'uint64', 0xFFFFFFFFFFFFFFFF, 8, false, true),
        new FitType(true, 0x90, 'uint64z', 0x0000000000000000, 8, false, true)];

    // Index into the BaseTypes array
    public static readonly enum = 0x00;
    public static readonly sInt8 = 0x01;
    public static readonly uInt8 = 0x02;
    public static readonly sInt16 = 0x03;
    public static readonly uInt16 = 0x04;
    public static readonly sInt32 = 0x05;
    public static readonly uInt32 = 0x06;
    public static readonly string = 0x07;
    public static readonly float32 = 0x08;
    public static readonly float64 = 0x09;
    public static readonly uInt8z = 0x0A;
    public static readonly uInt16z = 0x0B;
    public static readonly uInt32z = 0x0C;
    public static readonly byte = 0x0D;
    public static readonly sInt64 = 0x0E;
    public static readonly uInt64 = 0x0F;
    public static readonly uInt64z = 0x10;

    // And this with the type defn to get the index
    public static readonly baseTypeNumMask = 0x1F;
}
