import { Decode } from './Fit/decode';
import { ByteStreamReader } from './Utility/byteStreamReader';
import { Mesg } from './Fit/mesg';

export class FitDecoder {
    public mesgEvent: ((msg: Mesg) => void) | undefined;

    public decode(bytes: Uint8Array): void {
        const decode = new Decode();
        if (!this.mesgEvent) {
            throw new Error('mesgEvent callback is not registered.');
        }
        decode.mesgEvent = (msg: Mesg): void => this.mesgEvent?.(msg);
        decode.read(new ByteStreamReader(bytes));
    }
}
