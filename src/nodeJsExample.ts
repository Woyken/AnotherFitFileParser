// import * as fs from 'fs';
// import { FitDecoder } from '.';
// import { MesgNum } from './Fit/Profile/Types/mesgNum';

// /**
//  * Before running this, run "npm install @types/node"
//  * Some random gibberish on how to use current version in node environment
//  */
// class Main {
//     public start(): void {
//         const bytes = fs.readFileSync('.fit.fit').buffer;
//         const decoder = new FitDecoder();
//         Promise.resolve()
//             .then(() => decoder.decode(new Uint8Array(bytes)))
//             .catch((err) => {
//                 // tslint:disable-next-line: no-console
//                 console.error(err);
//             });
//         let lastTimestamp = 0;

//         decoder.mesgEvent = (ev): void => {
//             const timestampField = ev.getField('Timestamp');
//             if (timestampField) {
//                 // this is actual timestamp. save it for later.
//                 lastTimestamp = timestampField.getValue();
//             }

//             // Only care about measurements.
//             ev.Fields.forEach((field) => {
//                 if (ev.profileMessageNumber === MesgNum.monitoring) {
//                     let currentTimestamp = 0;
//                     if (field.fieldNumberInProfile === 26) {
//                         // timestamp16
//                         currentTimestamp =
//                             (lastTimestamp & 0xFFFF0000) | (field.getValue() & 0xFFFF);
//                     }
//                     if (field.fieldNumberInProfile === 27) {
//                         // HR
//                         const value = field.getValue();
//                         const dateTime = ev.timestampToDateTime(currentTimestamp);
//                         // tslint:disable-next-line: no-console
//                         console.log(`HR - at: ${dateTime!.toString()} - ${value} bpm`);
//                         // console.log('time - ' + time + 'HR - ' + field.getValue());
//                     }
//                 }
//             });
//             return;
//         };
//     }
// }

// new Main().start();
