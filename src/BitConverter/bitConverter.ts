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
     * TODO: Better way to parse 64bit values, current method is inacurate
     */
    public static toInt64(value: number[], startIndex: number, isBigEndian?: boolean): number {
        const buf = new ArrayBuffer(8);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return BitConverter.getUint64(view, startIndex, !isBigEndian);
    }

    /**
     * To UInt64
     * TODO: Better way to parse 64bit values, current method is inacurate
     */
    public static toUInt64(value: number[], startIndex: number, isBigEndian?: boolean): number {
        const buf = new ArrayBuffer(8);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return BitConverter.getUint64(view, startIndex, !isBigEndian);
    }

    // TODO: Better way to parse 64bit values, current method is inacurate
    public static getUint64(dataview: DataView, byteOffset: number, littleEndian: boolean): number {
        // split 64-bit number into two 32-bit (4-byte) parts
        const left =  dataview.getUint32(byteOffset, littleEndian);
        const right = dataview.getUint32(byteOffset + 4, littleEndian);

        // combine the two 32-bit values
        const combined = littleEndian ? left + 2 ** 32 * right : 2 ** 32 * left + right;

        if (!Number.isSafeInteger(combined)) {
            // WARNING. Lost some data.
            // console.warn(combined, 'exceeds MAX_SAFE_INTEGER. Precision may be lost');
        }

        return combined;
    }
}
