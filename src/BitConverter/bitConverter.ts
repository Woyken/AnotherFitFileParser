export class BitConverter {
    public static readonly isLittleEndian: boolean = true;

    /**
     * To float
     */
    public static toSingle(value: number[], startIndex: number): number {
        const buf = new ArrayBuffer(4);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return view.getFloat32(startIndex);
    }

    /**
     * To double
     */
    public static toDouble(value: number[], startIndex: number): number {
        const buf = new ArrayBuffer(8);
        const view = new DataView(buf);
        value.forEach((v, index) => {
            view.setUint8(index, v);
        });
        return view.getFloat64(startIndex);
    }
}
