import { Decode } from './Fit/decode';
import { ByteStreamReader } from './Utility/byteStreamReader';
import { MesgAny } from './Fit/mesg';

export class FitDecoder {
    public mesgEvent: ((msg: MesgAny) => void) | undefined;

    public decode(bytes: Uint8Array): void {
        const decode = new Decode();
        if (!this.mesgEvent) {
            throw new Error('mesgEvent callback is not registered.');
        }
        decode.mesgEvent = (msg) => this.mesgEvent?.(msg);
        decode.read(new ByteStreamReader(bytes));
    }
}
