export class CRC {
    private static crcTable: number[] = [0x0000, 0xCC01, 0xD801, 0x1400, 0xF001, 0x3C00, 0x2800, 0xE401,
        0xA001, 0x6C00, 0x7800, 0xB401, 0x5000, 0x9C01, 0x8801, 0x4400];

    //#region Methods
    public static get16(crc: number, data: number): number {
        let tmp: number;

        // compute checksum of lower four bits of byte
        tmp = this.crcTable[crc & 0xF];
        crc = ((crc >> 4) & 0x0FFF);
        crc = (crc ^ tmp ^ this.crcTable[data & 0xF]);

        // compute checksum of upper four bits of byte
        tmp = this.crcTable[crc & 0xF];
        crc = ((crc >> 4) & 0x0FFF);
        crc = (crc ^ tmp ^ this.crcTable[(data >> 4) & 0xF]);

        return crc;
    }

    public static calc16(dataBlock: number[], size: number): number {
        let crc: number = 0;

        for (let i = 0; i < size; i++) {
            crc = CRC.get16(crc, dataBlock[i]);
        }
        return crc;
    }
    //#endregion // Methods
}
