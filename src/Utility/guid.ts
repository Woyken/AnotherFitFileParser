export class Guid {
    public guid: string;

    constructor (guid: string | number[]) {
        if (typeof guid === 'string') {
            this.guid = guid;
        } else {
            this.guid = Guid.fromBytes(guid).guid;
        }
    }

    public static get empty(): Guid {
        return new Guid('00000000-0000-0000-0000-000000000000');
    }

    private static fromBytes(bytes: number[]): Guid {
        // reverse first four bytes, and join with following two reversed, joined with following two reversed, joined with rest of the bytes
        const preparedBytes = bytes.slice(0, 4).reverse().concat(bytes.slice(4, 6).reverse()).concat(bytes.slice(6, 8).reverse()).concat(bytes.slice(8));

        const guidParts = preparedBytes.map((item) => {
            // return hex value with "0" padding
            return (`00${item.toString(16).toUpperCase()}`).substr(-2, 2);
        });
        return new Guid(guidParts.join(''));
    }

    public toString(): string {
        return this.guid;
    }

    // Static member
    static newGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
