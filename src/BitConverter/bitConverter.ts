export class BitConverter {
    public static readonly isLittleEndian: boolean = true;

    /**
     * To float
     */
    public static toSingle(value: number[], startIndex: number, isBigEndian?: boolean): number {
        const buf = new ArrayBuffer(4);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return view.getFloat32(startIndex, !isBigEndian);
    }

    /**
     * To double
     */
    public static toDouble(value: number[], startIndex: number, isBigEndian?: boolean): number {
        const buf = new ArrayBuffer(8);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return view.getFloat64(startIndex, !isBigEndian);
    }

    /**
     * To Int16
     */
    public static toInt16(value: number[], startIndex: number, isBigEndian?: boolean): number {
        const buf = new ArrayBuffer(2);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return view.getInt16(startIndex, !isBigEndian);
    }

    /**
     * To UInt16
     */
    public static toUInt16(value: number[], startIndex: number, isBigEndian?: boolean): number {
        const buf = new ArrayBuffer(2);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return view.getUint16(startIndex, !isBigEndian);
    }

    /**
     * To Int32
     */
    public static toInt32(value: number[], startIndex: number, isBigEndian?: boolean): number {
        const buf = new ArrayBuffer(4);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return view.getInt32(startIndex, !isBigEndian);
    }

    /**
     * To UInt32
     */
    public static toUInt32(value: number[], startIndex: number, isBigEndian?: boolean): number {
        const buf = new ArrayBuffer(4);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return view.getUint32(startIndex, !isBigEndian);
    }

    /**
     * To Int64
     */
    public static toInt64(value: number[], startIndex: number, isBigEndian?: boolean): bigint {
        const buf = new ArrayBuffer(8);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return view.getBigInt64(startIndex, !isBigEndian);
    }

    /**
     * To UInt64
     */
    public static toUInt64(value: number[], startIndex: number, isBigEndian?: boolean): bigint {
        const buf = new ArrayBuffer(8);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return view.getBigUint64(startIndex, !isBigEndian);
    }
}
