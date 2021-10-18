import * as fs from 'fs';
import { FitDecoder } from '.';
import { MesgNum } from './Fit/Profile/Types/mesgNum';

/**
 * Before running this, run "npm install @types/node"
 * Some random gibberish on how to use current version in node environment
 */
class Main {
    public start(): void {
        const bytes = fs.readFileSync('fit.fit');
        const decoder = new FitDecoder();
        Promise.resolve()
            .then(() => decoder.decode(new Uint8Array(bytes)))
            .catch((err) => {
                // tslint:disable-next-line: no-console
                console.error(err);
            });
        let monitoringCurrentTimestamp = 0;
        decoder.mesgEvent = (ev): void => {
            console.log(ev.messageDefinition.profileMessage.name)
            const timestampField = ev.getField('Timestamp');
            if (timestampField) {
                // this is actual timestamp. save it for later.
                const data = timestampField.getValue();
                if (typeof data !== 'number')
                    throw new Error("invalid type");
                monitoringCurrentTimestamp = data;
            }
            // Only care about measurements.
            if (ev.messageDefinition.profileMessage.id === MesgNum.monitoring) {
                ev.fields.forEach((field) => {
                    if (field.fieldDefinition.profileField.id === 253) {
                        // timestamp
                        const data = field.getValue();
                        if (typeof data !== 'number')
                            throw new Error("invalid type");
                        monitoringCurrentTimestamp = data;
                    }
                    if (field.fieldDefinition.profileField.id === 26) {
                        // timestamp16
                        const data = field.getValue();
                        if (typeof data !== 'number')
                            throw new Error("invalid type");
                        monitoringCurrentTimestamp += (data - (monitoringCurrentTimestamp & 0xFFFF)) & 0xFFFF;
                    }
                    if (field.fieldDefinition.profileField.id === 27) {
                        // HR
                        const value = field.getValue();
                        const date = ev.timestampToDateTime(monitoringCurrentTimestamp);
                        // tslint:disable-next-line: no-console
                        console.log(`HR - at: ${date!.toString()} - ${value} bpm`);
                        // console.log('time - ' + time + 'HR - ' + field.getValue());
                    }
                });
            }
        };
    }
}

new Main().start();
