export class MesgNum {
    public static readonly fileId: number = 0;
    public static readonly capabilities: number = 1;
    public static readonly deviceSettings: number = 2;
    public static readonly userProfile: number = 3;
    public static readonly hrmProfile: number = 4;
    public static readonly sdmProfile: number = 5;
    public static readonly bikeProfile: number = 6;
    public static readonly zonesTarget: number = 7;
    public static readonly hrZone: number = 8;
    public static readonly powerZone: number = 9;
    public static readonly metZone: number = 10;
    public static readonly sport: number = 12;
    public static readonly goal: number = 15;
    public static readonly session: number = 18;
    public static readonly lap: number = 19;
    public static readonly record: number = 20;
    public static readonly event: number = 21;
    public static readonly deviceInfo: number = 23;
    public static readonly workout: number = 26;
    public static readonly workoutStep: number = 27;
    public static readonly schedule: number = 28;
    public static readonly weightScale: number = 30;
    public static readonly course: number = 31;
    public static readonly coursePoint: number = 32;
    public static readonly totals: number = 33;
    public static readonly activity: number = 34;
    public static readonly software: number = 35;
    public static readonly fileCapabilities: number = 37;
    public static readonly mesgCapabilities: number = 38;
    public static readonly fieldCapabilities: number = 39;
    public static readonly fileCreator: number = 49;
    public static readonly bloodPressure: number = 51;
    public static readonly speedZone: number = 53;
    public static readonly monitoring: number = 55;
    public static readonly trainingFile: number = 72;
    public static readonly hrv: number = 78;
    public static readonly antRx: number = 80;
    public static readonly antTx: number = 81;
    public static readonly antChannelId: number = 82;
    // tslint:disable-next-line:variable-name
    public static readonly Length: number = 101;
    public static readonly monitoringInfo: number = 103;
    public static readonly pad: number = 105;
    public static readonly slaveDevice: number = 106;
    public static readonly connectivity: number = 127;
    public static readonly weatherConditions: number = 128;
    public static readonly weatherAlert: number = 129;
    public static readonly cadenceZone: number = 131;
    public static readonly hr: number = 132;
    public static readonly segmentLap: number = 142;
    public static readonly memoGlob: number = 145;
    public static readonly segmentId: number = 148;
    public static readonly segmentLeaderboardEntry: number = 149;
    public static readonly segmentPoint: number = 150;
    public static readonly segmentFile: number = 151;
    public static readonly workoutSession: number = 158;
    public static readonly watchfaceSettings: number = 159;
    public static readonly gpsMetadata: number = 160;
    public static readonly cameraEvent: number = 161;
    public static readonly timestampCorrelation: number = 162;
    public static readonly gyroscopeData: number = 164;
    public static readonly accelerometerData: number = 165;
    public static readonly threeDSensorCalibration: number = 167;
    public static readonly videoFrame: number = 169;
    public static readonly obdiiData: number = 174;
    public static readonly nmeaSentence: number = 177;
    public static readonly aviationAttitude: number = 178;
    public static readonly video: number = 184;
    public static readonly videoTitle: number = 185;
    public static readonly videoDescription: number = 186;
    public static readonly videoClip: number = 187;
    public static readonly ohrSettings: number = 188;
    public static readonly exdScreenConfiguration: number = 200;
    public static readonly exdDataFieldConfiguration: number = 201;
    public static readonly exdDataConceptConfiguration: number = 202;
    public static readonly fieldDescription: number = 206;
    public static readonly developerDataId: number = 207;
    public static readonly magnetometerData: number = 208;
    public static readonly barometerData: number = 209;
    public static readonly oneDSensorCalibration: number = 210;
    public static readonly set: number = 225;
    public static readonly stressLevel: number = 227;
    public static readonly diveSettings: number = 258;
    public static readonly diveGas: number = 259;
    public static readonly diveAlarm: number = 262;
    public static readonly exerciseTitle: number = 264;
    public static readonly diveSummary: number = 268;
    // 0xFF00 - 0xFFFE reserved for manufacturer specific messages
    public static readonly mfgRangeMin: number = 0xFF00;
    // 0xFF00 - 0xFFFE reserved for manufacturer specific messages
    public static readonly mfgRangeMax: number = 0xFFFE;
    public static readonly invalid: number = 0xFFFF;
}
