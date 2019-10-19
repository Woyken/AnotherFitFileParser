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

// tslint:disable-next-line: max-classes-per-file
export class ProtocolVersion {
    public static V10: DetailedProtocolVersion = new DetailedProtocolVersion(1, 0);
    public static V20: DetailedProtocolVersion = new DetailedProtocolVersion(2, 0);

}

// tslint:disable-next-line:max-classes-per-file
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

// tslint:disable-next-line: max-classes-per-file
export class Fit {
    public static readonly protocolVersionMajorShift: number = 4;
    // tslint:disable-next-line: max-line-length
    public static readonly protocolVersionMajorMask: number = (0x0F << Fit.protocolVersionMajorShift);

    public static readonly protocolVersion: number = ProtocolVersion.V20.version;
    public static readonly protocolMajorVersion: number = ProtocolVersion.V20.majorVersion;
    public static readonly protocolMinorVersion: number = ProtocolVersion.V20.minorVersion;

    public static readonly profileMajorVersion: number = 20;
    public static readonly profileMinorVersion: number = 96;
    // tslint:disable-next-line: max-line-length
    public static readonly profileVersion: number = ((Fit.profileMajorVersion * 100) + Fit.profileMinorVersion);

    public static readonly headerTypeMask: number = 0xF0;
    public static readonly compressedHeaderMask: number = 0x80;
    public static readonly compressedTimeMask: number = 0x1F;
    public static readonly compressedLocalMesgNumMask: number = 0x60;

    public static readonly mesgDefinitionMask: number = 0x40;
    public static readonly devDataMask: number = 0x20;
    public static readonly mesgHeaderMask: number = 0x00;
    public static readonly localMesgNumMask: number = 0x0F;
    public static readonly maxLocalMesgs: number = Fit.localMesgNumMask + 1;

    public static readonly mesgDefinitionReserved: number = 0x00;
    public static readonly littleEndian: number = 0x00;
    public static readonly bigEndian: number = 0x01;

    public static readonly maxMesgSize: number = 255;
    public static readonly maxFieldSize: number = 255;

    public static readonly headerWithCRCSize: number = 14;
    public static readonly headerWithoutCRCSize: number = (Fit.headerWithCRCSize - 2);

    public static readonly fieldNumInvalid: number = 255;
    public static readonly fieldNumTimeStamp: number = 253;

    public static readonly subfieldIndexActiveSubfield: number = 0xFFFE;
    public static readonly subfieldIndexMainField: number = Fit.subfieldIndexActiveSubfield + 1;
    public static readonly subfieldNameMainField: string = '';

    public static baseType: FitType[] = [
        new FitType(false, 0x00, 'enum', 0xFF, 1, false, false),
        new FitType(false, 0x01, 'sint8', 0x7F, 1, true, true),
        new FitType(false, 0x02, 'uint8', 0xFF, 1, false, true),
        new FitType(true, 0x83, 'sint16', 0x7FFF, 2, true, true),
        new FitType(true, 0x84, 'uint16', 0xFFFF, 2, false, true),
        new FitType(true, 0x85, 'sint32', 0x7FFFFFFF, 4, true, true),
        new FitType(true, 0x86, 'uint32', 0xFFFFFFFF, 4, false, true),
        new FitType(false, 0x07, 'string', 0x00, 1, false, false),
        // tslint:disable-next-line: max-line-length
        new FitType(true, 0x88, 'float32', BitConverter.toSingle([0xFF, 0xFF, 0xFF, 0xFF], 0), 4, true, false),
        // tslint:disable-next-line: max-line-length
        new FitType(true, 0x89, 'float64', BitConverter.toDouble([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF], 0), 8, true, false),
        new FitType(false, 0x0A, 'uint8z', 0x00, 1, false, true),
        new FitType(true, 0x8B, 'uint16z', 0x0000, 2, false, true),
        new FitType(true, 0x8C, 'uint32z', 0x00000000, 4, false, true),
        new FitType(false, 0x0D, 'byte', 0xFF, 1, false, false),
        new FitType(true, 0x8E, 'sint64', 0x7FFFFFFFFFFFFFFF, 8, true, true),
        new FitType(true, 0x8F, 'uint64', 0xFFFFFFFFFFFFFFFF, 8, false, true),
        new FitType(true, 0x90, 'uint64z', 0x0000000000000000, 8, false, true)];

    // Index into the BaseTypes array
    public static readonly enum: number = 0x00;
    public static readonly sInt8: number = 0x01;
    public static readonly uInt8: number = 0x02;
    public static readonly sInt16: number = 0x03;
    public static readonly uInt16: number = 0x04;
    public static readonly sInt32: number = 0x05;
    public static readonly uInt32: number = 0x06;
    public static readonly string: number = 0x07;
    public static readonly float32: number = 0x08;
    public static readonly float64: number = 0x09;
    public static readonly uInt8z: number = 0x0A;
    public static readonly uInt16z: number = 0x0B;
    public static readonly uInt32z: number = 0x0C;
    public static readonly byte: number = 0x0D;
    public static readonly sInt64: number = 0x0E;
    public static readonly uInt64: number = 0x0F;
    public static readonly uInt64z: number = 0x10;

    // And this with the type defn to get the index
    public static readonly baseTypeNumMask: number = 0x1F;
}
