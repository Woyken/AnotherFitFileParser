import { Mesg } from './mesg';
import { Subfield } from './subfield';
import { Field } from './field';
import { FieldComponent } from './fieldComponent';
import { MesgNum } from './Profile/Types/mesgNum';
import { FitFieldType } from './Profile/Types/fitBaseType';

export enum ProfileType {
    Enum,
    Sint8,
    Uint8,
    Sint16,
    Uint16,
    Sint32,
    Uint32,
    String,
    Float32,
    Float64,
    Uint8z,
    Uint16z,
    Uint32z,
    Byte,
    Sint64,
    Uint64,
    Uint64z,
    Bool,
    File,
    MesgNum,
    Checksum,
    FileFlags,
    MesgCount,
    DateTime,
    LocalDateTime,
    MessageIndex,
    DeviceIndex,
    Gender,
    Language,
    LanguageBits0,
    LanguageBits1,
    LanguageBits2,
    LanguageBits3,
    LanguageBits4,
    TimeZone,
    DisplayMeasure,
    DisplayHeart,
    DisplayPower,
    DisplayPosition,
    Switch,
    Sport,
    SportBits0,
    SportBits1,
    SportBits2,
    SportBits3,
    SportBits4,
    SportBits5,
    SportBits6,
    SubSport,
    SportEvent,
    Activity,
    Intensity,
    SessionTrigger,
    AutolapTrigger,
    LapTrigger,
    TimeMode,
    BacklightMode,
    DateMode,
    BacklightTimeout,
    Event,
    EventType,
    TimerTrigger,
    FitnessEquipmentState,
    Tone,
    Autoscroll,
    ActivityClass,
    HrZoneCalc,
    PwrZoneCalc,
    WktStepDuration,
    WktStepTarget,
    Goal,
    GoalRecurrence,
    GoalSource,
    Schedule,
    CoursePoint,
    Manufacturer,
    GarminProduct,
    AntplusDeviceType,
    AntNetwork,
    WorkoutCapabilities,
    BatteryStatus,
    HrType,
    CourseCapabilities,
    Weight,
    WorkoutHr,
    WorkoutPower,
    BpStatus,
    UserLocalId,
    SwimStroke,
    ActivityType,
    ActivitySubtype,
    ActivityLevel,
    Side,
    LeftRightBalance,
    LeftRightBalance100,
    LengthType,
    DayOfWeek,
    ConnectivityCapabilities,
    WeatherReport,
    WeatherStatus,
    WeatherSeverity,
    WeatherSevereType,
    TimeIntoDay,
    LocaltimeIntoDay,
    StrokeType,
    BodyLocation,
    SegmentLapStatus,
    SegmentLeaderboardType,
    SegmentDeleteStatus,
    SegmentSelectionType,
    SourceType,
    LocalDeviceType,
    DisplayOrientation,
    WorkoutEquipment,
    WatchfaceMode,
    DigitalWatchfaceLayout,
    AnalogWatchfaceLayout,
    RiderPositionType,
    PowerPhaseType,
    CameraEventType,
    SensorType,
    BikeLightNetworkConfigType,
    CommTimeoutType,
    CameraOrientationType,
    AttitudeStage,
    AttitudeValidity,
    AutoSyncFrequency,
    ExdLayout,
    ExdDisplayType,
    ExdDataUnits,
    ExdQualifiers,
    ExdDescriptors,
    AutoActivityDetect,
    SupportedExdScreenLayouts,
    FitBaseType,
    TurnType,
    BikeLightBeamAngleMode,
    FitBaseUnit,
    SetType,
    ExerciseCategory,
    BenchPressExerciseName,
    CalfRaiseExerciseName,
    CardioExerciseName,
    CarryExerciseName,
    ChopExerciseName,
    CoreExerciseName,
    CrunchExerciseName,
    CurlExerciseName,
    DeadliftExerciseName,
    FlyeExerciseName,
    HipRaiseExerciseName,
    HipStabilityExerciseName,
    HipSwingExerciseName,
    HyperextensionExerciseName,
    LateralRaiseExerciseName,
    LegCurlExerciseName,
    LegRaiseExerciseName,
    LungeExerciseName,
    OlympicLiftExerciseName,
    PlankExerciseName,
    PlyoExerciseName,
    PullUpExerciseName,
    PushUpExerciseName,
    RowExerciseName,
    ShoulderPressExerciseName,
    ShoulderStabilityExerciseName,
    ShrugExerciseName,
    SitUpExerciseName,
    SquatExerciseName,
    TotalBodyExerciseName,
    TricepsExtensionExerciseName,
    WarmUpExerciseName,
    RunExerciseName,
    WaterType,
    TissueModelType,
    DiveGasStatus,
    DiveAlarmType,
    DiveBacklightMode,
    FaveroProduct,

    NumTypes,
}

/// <summary>
/// Represents the Fit Profile including message, field and type definition.
/// </summary>
export class Profile {
    //#region Nested Types

    //#endregion

    //#region Fields

    private static readonly mesgLookup: Map<number, Mesg> = new Map<number, Mesg>();

    //#endregion // Fields

    //#region Properties

    //#endregion

    //#region Constructors

    //#endregion

    //#region Methods
    public static getMesg(globalMesgNum: number): Mesg | undefined {
        const mesg: Mesg | undefined = this.lookupMesg(globalMesgNum);

        if (null != mesg) {
            return mesg;
        }

        return new Mesg('unknown', globalMesgNum);
    }

    public static getField(globalMesgNum: number, fieldNum: number): Field | undefined {
        const mesg: Mesg | undefined = this.lookupMesg(globalMesgNum);

        if (null != mesg) {
            return mesg.getField(fieldNum);
        }

        return new Field('unknown', fieldNum, 0, 1, 0, '', false, ProfileType.Enum);
    }

    public static getField1(globalMesgNum: number, fieldName: string): Field | undefined {
        const mesg: Mesg | undefined = this.lookupMesg(globalMesgNum);

        if (null != mesg) {
            return mesg.getField(fieldName);
        }

        return undefined;
    }

    private static lookupMesg(globalMesgNum: number): Mesg | undefined {
        if (!Profile.mesgLookup.has(globalMesgNum)) {
            // Maybe it isnt in the lookup because we haven't initialized it
            // yet
            Profile.initMesg(globalMesgNum);
        }
        const rv: Mesg | undefined = Profile.mesgLookup.get(globalMesgNum);
        return rv;
    }

    private static initMesg(num: number): void {
        let newMesg: Mesg | undefined;
        if (Profile.mesgLookup.has(num)) {
            // Message has already been initialized
            return;
        }

        switch (num) {
            case MesgNum.fileId:
                newMesg = Profile.createFileIdMesg();
                break;

            case MesgNum.fileCreator:
                newMesg = Profile.createFileCreatorMesg();
                break;

            case MesgNum.timestampCorrelation:
                newMesg = Profile.createTimestampCorrelationMesg();
                break;

            case MesgNum.software:
                newMesg = Profile.createSoftwareMesg();
                break;

            case MesgNum.slaveDevice:
                newMesg = Profile.createSlaveDeviceMesg();
                break;

            case MesgNum.capabilities:
                newMesg = Profile.createCapabilitiesMesg();
                break;

            case MesgNum.fileCapabilities:
                newMesg = Profile.createFileCapabilitiesMesg();
                break;

            case MesgNum.mesgCapabilities:
                newMesg = Profile.createMesgCapabilitiesMesg();
                break;

            case MesgNum.fieldCapabilities:
                newMesg = Profile.createFieldCapabilitiesMesg();
                break;

            case MesgNum.deviceSettings:
                newMesg = Profile.createDeviceSettingsMesg();
                break;

            case MesgNum.userProfile:
                newMesg = Profile.createUserProfileMesg();
                break;

            case MesgNum.hrmProfile:
                newMesg = Profile.createHrmProfileMesg();
                break;

            case MesgNum.sdmProfile:
                newMesg = Profile.createSdmProfileMesg();
                break;

            case MesgNum.bikeProfile:
                newMesg = Profile.createBikeProfileMesg();
                break;

            case MesgNum.connectivity:
                newMesg = Profile.createConnectivityMesg();
                break;

            case MesgNum.watchfaceSettings:
                newMesg = Profile.createWatchfaceSettingsMesg();
                break;

            case MesgNum.ohrSettings:
                newMesg = Profile.createOhrSettingsMesg();
                break;

            case MesgNum.zonesTarget:
                newMesg = Profile.createZonesTargetMesg();
                break;

            case MesgNum.sport:
                newMesg = Profile.createSportMesg();
                break;

            case MesgNum.hrZone:
                newMesg = Profile.createHrZoneMesg();
                break;

            case MesgNum.speedZone:
                newMesg = Profile.createSpeedZoneMesg();
                break;

            case MesgNum.cadenceZone:
                newMesg = Profile.createCadenceZoneMesg();
                break;

            case MesgNum.powerZone:
                newMesg = Profile.createPowerZoneMesg();
                break;

            case MesgNum.metZone:
                newMesg = Profile.createMetZoneMesg();
                break;

            case MesgNum.diveSettings:
                newMesg = Profile.createDiveSettingsMesg();
                break;

            case MesgNum.diveAlarm:
                newMesg = Profile.createDiveAlarmMesg();
                break;

            case MesgNum.diveGas:
                newMesg = Profile.createDiveGasMesg();
                break;

            case MesgNum.goal:
                newMesg = Profile.createGoalMesg();
                break;

            case MesgNum.activity:
                newMesg = Profile.createActivityMesg();
                break;

            case MesgNum.session:
                newMesg = Profile.createSessionMesg();
                break;

            case MesgNum.lap:
                newMesg = Profile.createLapMesg();
                break;

            case MesgNum.Length:
                newMesg = Profile.createLengthMesg();
                break;

            case MesgNum.record:
                newMesg = Profile.createRecordMesg();
                break;

            case MesgNum.event:
                newMesg = Profile.createEventMesg();
                break;

            case MesgNum.deviceInfo:
                newMesg = Profile.createDeviceInfoMesg();
                break;

            case MesgNum.trainingFile:
                newMesg = Profile.createTrainingFileMesg();
                break;

            case MesgNum.hrv:
                newMesg = Profile.createHrvMesg();
                break;

            case MesgNum.weatherConditions:
                newMesg = Profile.createWeatherConditionsMesg();
                break;

            case MesgNum.weatherAlert:
                newMesg = Profile.createWeatherAlertMesg();
                break;

            case MesgNum.gpsMetadata:
                newMesg = Profile.createGpsMetadataMesg();
                break;

            case MesgNum.cameraEvent:
                newMesg = Profile.createCameraEventMesg();
                break;

            case MesgNum.gyroscopeData:
                newMesg = Profile.createGyroscopeDataMesg();
                break;

            case MesgNum.accelerometerData:
                newMesg = Profile.createAccelerometerDataMesg();
                break;

            case MesgNum.magnetometerData:
                newMesg = Profile.createMagnetometerDataMesg();
                break;

            case MesgNum.barometerData:
                newMesg = Profile.createBarometerDataMesg();
                break;

            case MesgNum.threeDSensorCalibration:
                newMesg = Profile.createThreeDSensorCalibrationMesg();
                break;

            case MesgNum.oneDSensorCalibration:
                newMesg = Profile.createOneDSensorCalibrationMesg();
                break;

            case MesgNum.videoFrame:
                newMesg = Profile.createVideoFrameMesg();
                break;

            case MesgNum.obdiiData:
                newMesg = Profile.createObdiiDataMesg();
                break;

            case MesgNum.nmeaSentence:
                newMesg = Profile.createNmeaSentenceMesg();
                break;

            case MesgNum.aviationAttitude:
                newMesg = Profile.createAviationAttitudeMesg();
                break;

            case MesgNum.video:
                newMesg = Profile.createVideoMesg();
                break;

            case MesgNum.videoTitle:
                newMesg = Profile.createVideoTitleMesg();
                break;

            case MesgNum.videoDescription:
                newMesg = Profile.createVideoDescriptionMesg();
                break;

            case MesgNum.videoClip:
                newMesg = Profile.createVideoClipMesg();
                break;

            case MesgNum.set:
                newMesg = Profile.createSetMesg();
                break;

            case MesgNum.course:
                newMesg = Profile.createCourseMesg();
                break;

            case MesgNum.coursePoint:
                newMesg = Profile.createCoursePointMesg();
                break;

            case MesgNum.segmentId:
                newMesg = Profile.createSegmentIdMesg();
                break;

            case MesgNum.segmentLeaderboardEntry:
                newMesg = Profile.createSegmentLeaderboardEntryMesg();
                break;

            case MesgNum.segmentPoint:
                newMesg = Profile.createSegmentPointMesg();
                break;

            case MesgNum.segmentLap:
                newMesg = Profile.createSegmentLapMesg();
                break;

            case MesgNum.segmentFile:
                newMesg = Profile.createSegmentFileMesg();
                break;

            case MesgNum.workout:
                newMesg = Profile.createWorkoutMesg();
                break;

            case MesgNum.workoutSession:
                newMesg = Profile.createWorkoutSessionMesg();
                break;

            case MesgNum.workoutStep:
                newMesg = Profile.createWorkoutStepMesg();
                break;

            case MesgNum.exerciseTitle:
                newMesg = Profile.createExerciseTitleMesg();
                break;

            case MesgNum.schedule:
                newMesg = Profile.createScheduleMesg();
                break;

            case MesgNum.totals:
                newMesg = Profile.createTotalsMesg();
                break;

            case MesgNum.weightScale:
                newMesg = Profile.createWeightScaleMesg();
                break;

            case MesgNum.bloodPressure:
                newMesg = Profile.createBloodPressureMesg();
                break;

            case MesgNum.monitoringInfo:
                newMesg = Profile.createMonitoringInfoMesg();
                break;

            case MesgNum.monitoring:
                newMesg = Profile.createMonitoringMesg();
                break;

            case MesgNum.hr:
                newMesg = Profile.createHrMesg();
                break;

            case MesgNum.stressLevel:
                newMesg = Profile.createStressLevelMesg();
                break;

            case MesgNum.memoGlob:
                newMesg = Profile.createMemoGlobMesg();
                break;

            case MesgNum.antChannelId:
                newMesg = Profile.createAntChannelIdMesg();
                break;

            case MesgNum.antRx:
                newMesg = Profile.createAntRxMesg();
                break;

            case MesgNum.antTx:
                newMesg = Profile.createAntTxMesg();
                break;

            case MesgNum.exdScreenConfiguration:
                newMesg = Profile.createExdScreenConfigurationMesg();
                break;

            case MesgNum.exdDataFieldConfiguration:
                newMesg = Profile.createExdDataFieldConfigurationMesg();
                break;

            case MesgNum.exdDataConceptConfiguration:
                newMesg = Profile.createExdDataConceptConfigurationMesg();
                break;

            case MesgNum.fieldDescription:
                newMesg = Profile.createFieldDescriptionMesg();
                break;

            case MesgNum.developerDataId:
                newMesg = Profile.createDeveloperDataIdMesg();
                break;

            case MesgNum.diveSummary:
                newMesg = Profile.createDiveSummaryMesg();
                break;

            case MesgNum.pad:
                newMesg = Profile.createPadMesg();
                break;

            default:
                break;
        }

        if (undefined !== newMesg) {
            // Make Sure another thread didn't get here first
            if (!Profile.mesgLookup.has(num)) {
                Profile.mesgLookup.set(num, newMesg);
            }
        }
    }

    private static createFileIdMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('FileId', MesgNum.fileId);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Type', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.File));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Manufacturer', 1, FitFieldType.uint16, 1, 0, '', false, ProfileType.Manufacturer));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Product', 2, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FaveroProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 263);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GarminProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 15);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 13);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SerialNumber', 3, FitFieldType.uint32z, 1, 0, '', false, ProfileType.Uint32z));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeCreated', 4, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Number', 5, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ProductName', 8, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        fieldIndex++;

        return newMesg;
    }

    private static createFileCreatorMesg(): Mesg {
        const newMesg: Mesg = new Mesg('FileCreator', MesgNum.fileCreator);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SoftwareVersion', 0, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HardwareVersion', 1, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));

        return newMesg;
    }

    private static createTimestampCorrelationMesg(): Mesg {
        const newMesg: Mesg = new Mesg('TimestampCorrelation', MesgNum.timestampCorrelation);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FractionalTimestamp', 0, FitFieldType.uint16, 32768, 0, 's', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SystemTimestamp', 1, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FractionalSystemTimestamp', 2, FitFieldType.uint16, 32768, 0, 's', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LocalTimestamp', 3, FitFieldType.uint32, 1, 0, 's', false, ProfileType.LocalDateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 4, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SystemTimestampMs', 5, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));

        return newMesg;
    }

    private static createSoftwareMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Software', MesgNum.software);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Version', 3, FitFieldType.uint16, 100, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PartNumber', 5, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createSlaveDeviceMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('SlaveDevice', MesgNum.slaveDevice);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Manufacturer', 0, FitFieldType.uint16, 1, 0, '', false, ProfileType.Manufacturer));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Product', 1, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FaveroProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 263);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GarminProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 15);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 13);
        subfieldIndex++;
        fieldIndex++;

        return newMesg;
    }

    private static createCapabilitiesMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Capabilities', MesgNum.capabilities);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Languages', 0, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sports', 1, FitFieldType.uint8z, 1, 0, '', false, ProfileType.SportBits0));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WorkoutsSupported', 21, FitFieldType.uint32z, 1, 0, '', false, ProfileType.WorkoutCapabilities));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ConnectivitySupported', 23, FitFieldType.uint32z, 1, 0, '', false, ProfileType.ConnectivityCapabilities));

        return newMesg;
    }

    private static createFileCapabilitiesMesg(): Mesg {
        const newMesg: Mesg = new Mesg('FileCapabilities', MesgNum.fileCapabilities);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Type', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.File));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Flags', 1, FitFieldType.uint8z, 1, 0, '', false, ProfileType.FileFlags));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Directory', 2, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxCount', 3, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxSize', 4, FitFieldType.uint32, 1, 0, 'bytes', false, ProfileType.Uint32));

        return newMesg;
    }

    private static createMesgCapabilitiesMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('MesgCapabilities', MesgNum.mesgCapabilities);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('File', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.File));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MesgNum', 1, FitFieldType.uint16, 1, 0, '', false, ProfileType.MesgNum));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CountType', 2, FitFieldType.enum, 1, 0, '', false, ProfileType.MesgCount));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Count', 3, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('NumPerFile', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 0);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('MaxPerFile', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 1);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('MaxPerFileType', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 2);
        subfieldIndex++;
        fieldIndex++;

        return newMesg;
    }

    private static createFieldCapabilitiesMesg(): Mesg {
        const newMesg: Mesg = new Mesg('FieldCapabilities', MesgNum.fieldCapabilities);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('File', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.File));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MesgNum', 1, FitFieldType.uint16, 1, 0, '', false, ProfileType.MesgNum));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FieldNum', 2, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Count', 3, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));

        return newMesg;
    }

    private static createDeviceSettingsMesg(): Mesg {
        const newMesg: Mesg = new Mesg('DeviceSettings', MesgNum.deviceSettings);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActiveTimeZone', 0, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('UtcOffset', 1, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeOffset', 2, FitFieldType.uint32, 1, 0, 's', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeMode', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.TimeMode));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeZoneOffset', 5, FitFieldType.sint8, 4, 0, 'hr', false, ProfileType.Sint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BacklightMode', 12, FitFieldType.enum, 1, 0, '', false, ProfileType.BacklightMode));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActivityTrackerEnabled', 36, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ClockTime', 39, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PagesEnabled', 40, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MoveAlertEnabled', 46, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DateMode', 47, FitFieldType.enum, 1, 0, '', false, ProfileType.DateMode));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DisplayOrientation', 55, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayOrientation));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MountingSide', 56, FitFieldType.enum, 1, 0, '', false, ProfileType.Side));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DefaultPage', 57, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AutosyncMinSteps', 58, FitFieldType.uint16, 1, 0, 'steps', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AutosyncMinTime', 59, FitFieldType.uint16, 1, 0, 'minutes', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LactateThresholdAutodetectEnabled', 80, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BleAutoUploadEnabled', 86, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AutoSyncFrequency', 89, FitFieldType.enum, 1, 0, '', false, ProfileType.AutoSyncFrequency));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AutoActivityDetect', 90, FitFieldType.uint32, 1, 0, '', false, ProfileType.AutoActivityDetect));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NumberOfScreens', 94, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SmartNotificationDisplayOrientation', 95, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayOrientation));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TapInterface', 134, FitFieldType.enum, 1, 0, '', false, ProfileType.Switch));

        return newMesg;
    }

    private static createUserProfileMesg(): Mesg {
        const newMesg: Mesg = new Mesg('UserProfile', MesgNum.userProfile);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FriendlyName', 0, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Gender', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.Gender));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Age', 2, FitFieldType.uint8, 1, 0, 'years', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Height', 3, FitFieldType.uint8, 100, 0, 'm', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Weight', 4, FitFieldType.uint16, 10, 0, 'kg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Language', 5, FitFieldType.enum, 1, 0, '', false, ProfileType.Language));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ElevSetting', 6, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayMeasure));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WeightSetting', 7, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayMeasure));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RestingHeartRate', 8, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DefaultMaxRunningHeartRate', 9, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DefaultMaxBikingHeartRate', 10, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DefaultMaxHeartRate', 11, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HrSetting', 12, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayHeart));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SpeedSetting', 13, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayMeasure));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DistSetting', 14, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayMeasure));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PowerSetting', 16, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayPower));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActivityClass', 17, FitFieldType.enum, 1, 0, '', false, ProfileType.ActivityClass));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PositionSetting', 18, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayPosition));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TemperatureSetting', 21, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayMeasure));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LocalId', 22, FitFieldType.uint16, 1, 0, '', false, ProfileType.UserLocalId));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GlobalId', 23, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WakeTime', 28, FitFieldType.uint32, 1, 0, '', false, ProfileType.LocaltimeIntoDay));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SleepTime', 29, FitFieldType.uint32, 1, 0, '', false, ProfileType.LocaltimeIntoDay));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HeightSetting', 30, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayMeasure));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('UserRunningStepLength', 31, FitFieldType.uint16, 1000, 0, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('UserWalkingStepLength', 32, FitFieldType.uint16, 1000, 0, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DepthSetting', 47, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayMeasure));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DiveCount', 49, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));

        return newMesg;
    }

    private static createHrmProfileMesg(): Mesg {
        const newMesg: Mesg = new Mesg('HrmProfile', MesgNum.hrmProfile);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Enabled', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HrmAntId', 1, FitFieldType.uint16z, 1, 0, '', false, ProfileType.Uint16z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LogHrv', 2, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HrmAntIdTransType', 3, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));

        return newMesg;
    }

    private static createSdmProfileMesg(): Mesg {
        const newMesg: Mesg = new Mesg('SdmProfile', MesgNum.sdmProfile);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Enabled', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SdmAntId', 1, FitFieldType.uint16z, 1, 0, '', false, ProfileType.Uint16z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SdmCalFactor', 2, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Odometer', 3, FitFieldType.uint32, 100, 0, 'm', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SpeedSource', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SdmAntIdTransType', 5, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OdometerRollover', 7, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));

        return newMesg;
    }

    private static createBikeProfileMesg(): Mesg {
        const newMesg: Mesg = new Mesg('BikeProfile', MesgNum.bikeProfile);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 0, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SubSport', 2, FitFieldType.enum, 1, 0, '', false, ProfileType.SubSport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Odometer', 3, FitFieldType.uint32, 100, 0, 'm', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BikeSpdAntId', 4, FitFieldType.uint16z, 1, 0, '', false, ProfileType.Uint16z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BikeCadAntId', 5, FitFieldType.uint16z, 1, 0, '', false, ProfileType.Uint16z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BikeSpdcadAntId', 6, FitFieldType.uint16z, 1, 0, '', false, ProfileType.Uint16z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BikePowerAntId', 7, FitFieldType.uint16z, 1, 0, '', false, ProfileType.Uint16z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CustomWheelsize', 8, FitFieldType.uint16, 1000, 0, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AutoWheelsize', 9, FitFieldType.uint16, 1000, 0, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BikeWeight', 10, FitFieldType.uint16, 10, 0, 'kg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PowerCalFactor', 11, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AutoWheelCal', 12, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AutoPowerZero', 13, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Id', 14, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SpdEnabled', 15, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CadEnabled', 16, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SpdcadEnabled', 17, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PowerEnabled', 18, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CrankLength', 19, FitFieldType.uint8, 2, -110, 'mm', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Enabled', 20, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BikeSpdAntIdTransType', 21, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BikeCadAntIdTransType', 22, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BikeSpdcadAntIdTransType', 23, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BikePowerAntIdTransType', 24, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OdometerRollover', 37, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FrontGearNum', 38, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FrontGear', 39, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RearGearNum', 40, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RearGear', 41, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ShimanoDi2Enabled', 44, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));

        return newMesg;
    }

    private static createConnectivityMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Connectivity', MesgNum.connectivity);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BluetoothEnabled', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BluetoothLeEnabled', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AntEnabled', 2, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 3, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LiveTrackingEnabled', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WeatherConditionsEnabled', 5, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WeatherAlertsEnabled', 6, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AutoActivityUploadEnabled', 7, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CourseDownloadEnabled', 8, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WorkoutDownloadEnabled', 9, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GpsEphemerisDownloadEnabled', 10, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('IncidentDetectionEnabled', 11, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GrouptrackEnabled', 12, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));

        return newMesg;
    }

    private static createWatchfaceSettingsMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('WatchfaceSettings', MesgNum.watchfaceSettings);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Mode', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.WatchfaceMode));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Layout', 1, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DigitalLayout', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 0);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AnalogLayout', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 1);
        subfieldIndex++;
        fieldIndex++;

        return newMesg;
    }

    private static createOhrSettingsMesg(): Mesg {
        const newMesg: Mesg = new Mesg('OhrSettings', MesgNum.ohrSettings);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Enabled', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Switch));

        return newMesg;
    }

    private static createZonesTargetMesg(): Mesg {
        const newMesg: Mesg = new Mesg('ZonesTarget', MesgNum.zonesTarget);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxHeartRate', 1, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ThresholdHeartRate', 2, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FunctionalThresholdPower', 3, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HrCalcType', 5, FitFieldType.enum, 1, 0, '', false, ProfileType.HrZoneCalc));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PwrCalcType', 7, FitFieldType.enum, 1, 0, '', false, ProfileType.PwrZoneCalc));

        return newMesg;
    }

    private static createSportMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Sport', MesgNum.sport);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SubSport', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.SubSport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 3, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createHrZoneMesg(): Mesg {
        const newMesg: Mesg = new Mesg('HrZone', MesgNum.hrZone);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HighBpm', 1, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 2, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createSpeedZoneMesg(): Mesg {
        const newMesg: Mesg = new Mesg('SpeedZone', MesgNum.speedZone);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HighValue', 0, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 1, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createCadenceZoneMesg(): Mesg {
        const newMesg: Mesg = new Mesg('CadenceZone', MesgNum.cadenceZone);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HighValue', 0, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 1, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createPowerZoneMesg(): Mesg {
        const newMesg: Mesg = new Mesg('PowerZone', MesgNum.powerZone);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HighValue', 1, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 2, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createMetZoneMesg(): Mesg {
        const newMesg: Mesg = new Mesg('MetZone', MesgNum.metZone);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HighBpm', 1, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Calories', 2, FitFieldType.uint16, 10, 0, 'kcal / min', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FatCalories', 3, FitFieldType.uint8, 10, 0, 'kcal / min', false, ProfileType.Uint8));

        return newMesg;
    }

    private static createDiveSettingsMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('DiveSettings', MesgNum.diveSettings);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 0, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Model', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.TissueModelType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GfLow', 2, FitFieldType.uint8, 1, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GfHigh', 3, FitFieldType.uint8, 1, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WaterType', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.WaterType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WaterDensity', 5, FitFieldType.float32, 1, 0, 'kg/m^3', false, ProfileType.Float32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Po2Warn', 6, FitFieldType.uint8, 100, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Po2Critical', 7, FitFieldType.uint8, 100, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Po2Deco', 8, FitFieldType.uint8, 100, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SafetyStopEnabled', 9, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BottomDepth', 10, FitFieldType.float32, 1, 0, '', false, ProfileType.Float32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BottomTime', 11, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ApneaCountdownEnabled', 12, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ApneaCountdownTime', 13, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BacklightMode', 14, FitFieldType.enum, 1, 0, '', false, ProfileType.DiveBacklightMode));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BacklightBrightness', 15, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BacklightTimeout', 16, FitFieldType.uint8, 1, 0, '', false, ProfileType.BacklightTimeout));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RepeatDiveInterval', 17, FitFieldType.uint16, 1, 0, 's', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SafetyStopTime', 18, FitFieldType.uint16, 1, 0, 's', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HeartRateSourceType', 19, FitFieldType.enum, 1, 0, '', false, ProfileType.SourceType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HeartRateSource', 20, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('HeartRateAntplusDeviceType', 2, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(19, 1);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('HeartRateLocalDeviceType', 2, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(19, 5);
        subfieldIndex++;
        fieldIndex++;

        return newMesg;
    }

    private static createDiveAlarmMesg(): Mesg {
        const newMesg: Mesg = new Mesg('DiveAlarm', MesgNum.diveAlarm);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Depth', 0, FitFieldType.uint32, 1000, 0, 'm', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Time', 1, FitFieldType.sint32, 1, 0, 's', false, ProfileType.Sint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Enabled', 2, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AlarmType', 3, FitFieldType.enum, 1, 0, '', false, ProfileType.DiveAlarmType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sound', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.Tone));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DiveTypes', 5, FitFieldType.enum, 1, 0, '', false, ProfileType.SubSport));

        return newMesg;
    }

    private static createDiveGasMesg(): Mesg {
        const newMesg: Mesg = new Mesg('DiveGas', MesgNum.diveGas);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HeliumContent', 0, FitFieldType.uint8, 1, 0, 'percent', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OxygenContent', 1, FitFieldType.uint8, 1, 0, 'percent', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Status', 2, FitFieldType.enum, 1, 0, '', false, ProfileType.DiveGasStatus));

        return newMesg;
    }

    private static createGoalMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Goal', MesgNum.goal);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SubSport', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.SubSport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartDate', 2, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EndDate', 3, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Type', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.Goal));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Value', 5, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Repeat', 6, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TargetValue', 7, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Recurrence', 8, FitFieldType.enum, 1, 0, '', false, ProfileType.GoalRecurrence));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RecurrenceValue', 9, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Enabled', 10, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Source', 11, FitFieldType.enum, 1, 0, '', false, ProfileType.GoalSource));

        return newMesg;
    }

    private static createActivityMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Activity', MesgNum.activity);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalTimerTime', 0, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NumSessions', 1, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Type', 2, FitFieldType.enum, 1, 0, '', false, ProfileType.Activity));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Event', 3, FitFieldType.enum, 1, 0, '', false, ProfileType.Event));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventType', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.EventType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LocalTimestamp', 5, FitFieldType.uint32, 1, 0, '', false, ProfileType.LocalDateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventGroup', 6, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));

        return newMesg;
    }

    private static createSessionMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Session', MesgNum.session);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Event', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Event));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventType', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.EventType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartTime', 2, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartPositionLat', 3, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartPositionLong', 4, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 5, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SubSport', 6, FitFieldType.enum, 1, 0, '', false, ProfileType.SubSport));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalElapsedTime', 7, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalTimerTime', 8, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalDistance', 9, FitFieldType.uint32, 100, 0, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalCycles', 10, FitFieldType.uint32, 1, 0, 'cycles', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TotalStrides', 134, 1, 0, 'strides'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 11);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalCalories', 11, FitFieldType.uint16, 1, 0, 'kcal', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalFatCalories', 13, FitFieldType.uint16, 1, 0, 'kcal', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgSpeed', 14, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(124, false, 16, 1000, 0)); // enhanced_avg_speed
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxSpeed', 15, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(125, false, 16, 1000, 0)); // enhanced_max_speed
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgHeartRate', 16, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxHeartRate', 17, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgCadence', 18, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AvgRunningCadence', 2, 1, 0, 'strides/min'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 1);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxCadence', 19, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('MaxRunningCadence', 2, 1, 0, 'strides/min'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 1);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPower', 20, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPower', 21, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalAscent', 22, FitFieldType.uint16, 1, 0, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalDescent', 23, FitFieldType.uint16, 1, 0, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalTrainingEffect', 24, FitFieldType.uint8, 10, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FirstLapIndex', 25, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NumLaps', 26, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventGroup', 27, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Trigger', 28, FitFieldType.enum, 1, 0, '', false, ProfileType.SessionTrigger));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NecLat', 29, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NecLong', 30, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SwcLat', 31, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SwcLong', 32, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NormalizedPower', 34, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TrainingStressScore', 35, FitFieldType.uint16, 10, 0, 'tss', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('IntensityFactor', 36, FitFieldType.uint16, 1000, 0, 'if', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeftRightBalance', 37, FitFieldType.uint16, 1, 0, '', false, ProfileType.LeftRightBalance100));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStrokeCount', 41, FitFieldType.uint32, 10, 0, 'strokes/lap', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStrokeDistance', 42, FitFieldType.uint16, 100, 0, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SwimStroke', 43, FitFieldType.enum, 1, 0, 'swim_stroke', false, ProfileType.SwimStroke));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PoolLength', 44, FitFieldType.uint16, 100, 0, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ThresholdPower', 45, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PoolLengthUnit', 46, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayMeasure));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NumActiveLengths', 47, FitFieldType.uint16, 1, 0, 'lengths', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalWork', 48, FitFieldType.uint32, 1, 0, 'J', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgAltitude', 49, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(126, false, 16, 5, 500)); // enhanced_avg_altitude
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxAltitude', 50, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(128, false, 16, 5, 500)); // enhanced_max_altitude
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GpsAccuracy', 51, FitFieldType.uint8, 1, 0, 'm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgGrade', 52, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPosGrade', 53, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgNegGrade', 54, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPosGrade', 55, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxNegGrade', 56, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgTemperature', 57, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxTemperature', 58, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalMovingTime', 59, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPosVerticalSpeed', 60, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgNegVerticalSpeed', 61, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPosVerticalSpeed', 62, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxNegVerticalSpeed', 63, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MinHeartRate', 64, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInHrZone', 65, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInSpeedZone', 66, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInCadenceZone', 67, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInPowerZone', 68, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLapTime', 69, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BestLapIndex', 70, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MinAltitude', 71, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(127, false, 16, 5, 500)); // enhanced_min_altitude
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PlayerScore', 82, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OpponentScore', 83, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OpponentName', 84, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StrokeCount', 85, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ZoneCount', 86, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxBallSpeed', 87, FitFieldType.uint16, 100, 0, 'm/s', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgBallSpeed', 88, FitFieldType.uint16, 100, 0, 'm/s', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgVerticalOscillation', 89, FitFieldType.uint16, 10, 0, 'mm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStanceTimePercent', 90, FitFieldType.uint16, 100, 0, 'percent', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStanceTime', 91, FitFieldType.uint16, 10, 0, 'ms', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgFractionalCadence', 92, FitFieldType.uint8, 128, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxFractionalCadence', 93, FitFieldType.uint8, 128, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalFractionalCycles', 94, FitFieldType.uint8, 128, 0, 'cycles', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgTotalHemoglobinConc', 95, FitFieldType.uint16, 100, 0, 'g/dL', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MinTotalHemoglobinConc', 96, FitFieldType.uint16, 100, 0, 'g/dL', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxTotalHemoglobinConc', 97, FitFieldType.uint16, 100, 0, 'g/dL', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgSaturatedHemoglobinPercent', 98, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MinSaturatedHemoglobinPercent', 99, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxSaturatedHemoglobinPercent', 100, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftTorqueEffectiveness', 101, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightTorqueEffectiveness', 102, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPedalSmoothness', 103, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPedalSmoothness', 104, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgCombinedPedalSmoothness', 105, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SportIndex', 111, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeStanding', 112, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StandCount', 113, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPco', 114, FitFieldType.sint8, 1, 0, 'mm', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPco', 115, FitFieldType.sint8, 1, 0, 'mm', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPowerPhase', 116, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPowerPhasePeak', 117, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPowerPhase', 118, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPowerPhasePeak', 119, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPowerPosition', 120, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPowerPosition', 121, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgCadencePosition', 122, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxCadencePosition', 123, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedAvgSpeed', 124, FitFieldType.uint32, 1000, 0, 'm/s', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedMaxSpeed', 125, FitFieldType.uint32, 1000, 0, 'm/s', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedAvgAltitude', 126, FitFieldType.uint32, 5, 500, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedMinAltitude', 127, FitFieldType.uint32, 5, 500, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedMaxAltitude', 128, FitFieldType.uint32, 5, 500, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLevMotorPower', 129, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxLevMotorPower', 130, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LevBatteryConsumption', 131, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgVerticalRatio', 132, FitFieldType.uint16, 100, 0, 'percent', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStanceTimeBalance', 133, FitFieldType.uint16, 100, 0, 'percent', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStepLength', 134, FitFieldType.uint16, 10, 0, 'mm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalAnaerobicTrainingEffect', 137, FitFieldType.uint8, 10, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgVam', 139, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createLapMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Lap', MesgNum.lap);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Event', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Event));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventType', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.EventType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartTime', 2, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartPositionLat', 3, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartPositionLong', 4, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EndPositionLat', 5, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EndPositionLong', 6, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalElapsedTime', 7, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalTimerTime', 8, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalDistance', 9, FitFieldType.uint32, 100, 0, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalCycles', 10, FitFieldType.uint32, 1, 0, 'cycles', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TotalStrides', 134, 1, 0, 'strides'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 11);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalCalories', 11, FitFieldType.uint16, 1, 0, 'kcal', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalFatCalories', 12, FitFieldType.uint16, 1, 0, 'kcal', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgSpeed', 13, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(110, false, 16, 1000, 0)); // enhanced_avg_speed
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxSpeed', 14, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(111, false, 16, 1000, 0)); // enhanced_max_speed
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgHeartRate', 15, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxHeartRate', 16, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgCadence', 17, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AvgRunningCadence', 2, 1, 0, 'strides/min'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 1);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxCadence', 18, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('MaxRunningCadence', 2, 1, 0, 'strides/min'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 1);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPower', 19, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPower', 20, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalAscent', 21, FitFieldType.uint16, 1, 0, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalDescent', 22, FitFieldType.uint16, 1, 0, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Intensity', 23, FitFieldType.enum, 1, 0, '', false, ProfileType.Intensity));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LapTrigger', 24, FitFieldType.enum, 1, 0, '', false, ProfileType.LapTrigger));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 25, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventGroup', 26, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NumLengths', 32, FitFieldType.uint16, 1, 0, 'lengths', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NormalizedPower', 33, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeftRightBalance', 34, FitFieldType.uint16, 1, 0, '', false, ProfileType.LeftRightBalance100));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FirstLengthIndex', 35, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStrokeDistance', 37, FitFieldType.uint16, 100, 0, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SwimStroke', 38, FitFieldType.enum, 1, 0, '', false, ProfileType.SwimStroke));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SubSport', 39, FitFieldType.enum, 1, 0, '', false, ProfileType.SubSport));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NumActiveLengths', 40, FitFieldType.uint16, 1, 0, 'lengths', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalWork', 41, FitFieldType.uint32, 1, 0, 'J', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgAltitude', 42, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(112, false, 16, 5, 500)); // enhanced_avg_altitude
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxAltitude', 43, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(114, false, 16, 5, 500)); // enhanced_max_altitude
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GpsAccuracy', 44, FitFieldType.uint8, 1, 0, 'm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgGrade', 45, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPosGrade', 46, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgNegGrade', 47, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPosGrade', 48, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxNegGrade', 49, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgTemperature', 50, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxTemperature', 51, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalMovingTime', 52, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPosVerticalSpeed', 53, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgNegVerticalSpeed', 54, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPosVerticalSpeed', 55, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxNegVerticalSpeed', 56, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInHrZone', 57, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInSpeedZone', 58, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInCadenceZone', 59, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInPowerZone', 60, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RepetitionNum', 61, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MinAltitude', 62, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(113, false, 16, 5, 500)); // enhanced_min_altitude
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MinHeartRate', 63, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WktStepIndex', 71, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OpponentScore', 74, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StrokeCount', 75, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ZoneCount', 76, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgVerticalOscillation', 77, FitFieldType.uint16, 10, 0, 'mm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStanceTimePercent', 78, FitFieldType.uint16, 100, 0, 'percent', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStanceTime', 79, FitFieldType.uint16, 10, 0, 'ms', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgFractionalCadence', 80, FitFieldType.uint8, 128, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxFractionalCadence', 81, FitFieldType.uint8, 128, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalFractionalCycles', 82, FitFieldType.uint8, 128, 0, 'cycles', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PlayerScore', 83, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgTotalHemoglobinConc', 84, FitFieldType.uint16, 100, 0, 'g/dL', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MinTotalHemoglobinConc', 85, FitFieldType.uint16, 100, 0, 'g/dL', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxTotalHemoglobinConc', 86, FitFieldType.uint16, 100, 0, 'g/dL', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgSaturatedHemoglobinPercent', 87, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MinSaturatedHemoglobinPercent', 88, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxSaturatedHemoglobinPercent', 89, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftTorqueEffectiveness', 91, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightTorqueEffectiveness', 92, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPedalSmoothness', 93, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPedalSmoothness', 94, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgCombinedPedalSmoothness', 95, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeStanding', 98, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StandCount', 99, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPco', 100, FitFieldType.sint8, 1, 0, 'mm', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPco', 101, FitFieldType.sint8, 1, 0, 'mm', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPowerPhase', 102, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPowerPhasePeak', 103, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPowerPhase', 104, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPowerPhasePeak', 105, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPowerPosition', 106, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPowerPosition', 107, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgCadencePosition', 108, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxCadencePosition', 109, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedAvgSpeed', 110, FitFieldType.uint32, 1000, 0, 'm/s', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedMaxSpeed', 111, FitFieldType.uint32, 1000, 0, 'm/s', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedAvgAltitude', 112, FitFieldType.uint32, 5, 500, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedMinAltitude', 113, FitFieldType.uint32, 5, 500, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedMaxAltitude', 114, FitFieldType.uint32, 5, 500, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLevMotorPower', 115, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxLevMotorPower', 116, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LevBatteryConsumption', 117, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgVerticalRatio', 118, FitFieldType.uint16, 100, 0, 'percent', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStanceTimeBalance', 119, FitFieldType.uint16, 100, 0, 'percent', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgStepLength', 120, FitFieldType.uint16, 10, 0, 'mm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgVam', 121, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createLengthMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Length', MesgNum.Length);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Event', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Event));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventType', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.EventType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartTime', 2, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalElapsedTime', 3, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalTimerTime', 4, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalStrokes', 5, FitFieldType.uint16, 1, 0, 'strokes', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgSpeed', 6, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SwimStroke', 7, FitFieldType.enum, 1, 0, 'swim_stroke', false, ProfileType.SwimStroke));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgSwimmingCadence', 9, FitFieldType.uint8, 1, 0, 'strokes/min', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventGroup', 10, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalCalories', 11, FitFieldType.uint16, 1, 0, 'kcal', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LengthType', 12, FitFieldType.enum, 1, 0, '', false, ProfileType.LengthType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PlayerScore', 18, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OpponentScore', 19, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StrokeCount', 20, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ZoneCount', 21, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));

        return newMesg;
    }

    private static createRecordMesg(): Mesg {
        let fieldIndex: number;
        const newMesg: Mesg = new Mesg('Record', MesgNum.record);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PositionLat', 0, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PositionLong', 1, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Altitude', 2, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(78, false, 16, 5, 500)); // enhanced_altitude
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HeartRate', 3, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Cadence', 4, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Distance', 5, FitFieldType.uint32, 100, 0, 'm', true, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Speed', 6, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(73, false, 16, 1000, 0)); // enhanced_speed
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Power', 7, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CompressedSpeedDistance', 8, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(6, false, 12, 100, 0)); // speed
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(5, true, 12, 16, 0)); // distance
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Grade', 9, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Resistance', 10, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeFromCourse', 11, FitFieldType.sint32, 1000, 0, 's', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CycleLength', 12, FitFieldType.uint8, 100, 0, 'm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Temperature', 13, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Speed1s', 17, FitFieldType.uint8, 16, 0, 'm/s', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Cycles', 18, FitFieldType.uint8, 1, 0, 'cycles', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(19, true, 8, 1, 0)); // total_cycles
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalCycles', 19, FitFieldType.uint32, 1, 0, 'cycles', true, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CompressedAccumulatedPower', 28, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(29, true, 16, 1, 0)); // accumulated_power
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AccumulatedPower', 29, FitFieldType.uint32, 1, 0, 'watts', true, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeftRightBalance', 30, FitFieldType.uint8, 1, 0, '', false, ProfileType.LeftRightBalance));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GpsAccuracy', 31, FitFieldType.uint8, 1, 0, 'm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('VerticalSpeed', 32, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Calories', 33, FitFieldType.uint16, 1, 0, 'kcal', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('VerticalOscillation', 39, FitFieldType.uint16, 10, 0, 'mm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StanceTimePercent', 40, FitFieldType.uint16, 100, 0, 'percent', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StanceTime', 41, FitFieldType.uint16, 10, 0, 'ms', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActivityType', 42, FitFieldType.enum, 1, 0, '', false, ProfileType.ActivityType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeftTorqueEffectiveness', 43, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RightTorqueEffectiveness', 44, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeftPedalSmoothness', 45, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RightPedalSmoothness', 46, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CombinedPedalSmoothness', 47, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Time128', 48, FitFieldType.uint8, 128, 0, 's', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StrokeType', 49, FitFieldType.enum, 1, 0, '', false, ProfileType.StrokeType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Zone', 50, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BallSpeed', 51, FitFieldType.uint16, 100, 0, 'm/s', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Cadence256', 52, FitFieldType.uint16, 256, 0, 'rpm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FractionalCadence', 53, FitFieldType.uint8, 128, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalHemoglobinConc', 54, FitFieldType.uint16, 100, 0, 'g/dL', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalHemoglobinConcMin', 55, FitFieldType.uint16, 100, 0, 'g/dL', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalHemoglobinConcMax', 56, FitFieldType.uint16, 100, 0, 'g/dL', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SaturatedHemoglobinPercent', 57, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SaturatedHemoglobinPercentMin', 58, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SaturatedHemoglobinPercentMax', 59, FitFieldType.uint16, 10, 0, '%', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeviceIndex', 62, FitFieldType.uint8, 1, 0, '', false, ProfileType.DeviceIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeftPco', 67, FitFieldType.sint8, 1, 0, 'mm', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RightPco', 68, FitFieldType.sint8, 1, 0, 'mm', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeftPowerPhase', 69, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeftPowerPhasePeak', 70, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RightPowerPhase', 71, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RightPowerPhasePeak', 72, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedSpeed', 73, FitFieldType.uint32, 1000, 0, 'm/s', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedAltitude', 78, FitFieldType.uint32, 5, 500, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BatterySoc', 81, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MotorPower', 82, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('VerticalRatio', 83, FitFieldType.uint16, 100, 0, 'percent', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StanceTimeBalance', 84, FitFieldType.uint16, 100, 0, 'percent', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StepLength', 85, FitFieldType.uint16, 10, 0, 'mm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AbsolutePressure', 91, FitFieldType.uint32, 1, 0, 'Pa', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Depth', 92, FitFieldType.uint32, 1000, 0, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NextStopDepth', 93, FitFieldType.uint32, 1000, 0, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NextStopTime', 94, FitFieldType.uint32, 1, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeToSurface', 95, FitFieldType.uint32, 1, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NdlTime', 96, FitFieldType.uint32, 1, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CnsLoad', 97, FitFieldType.uint8, 1, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('N2Load', 98, FitFieldType.uint16, 1, 0, 'percent', false, ProfileType.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createEventMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Event', MesgNum.event);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Event', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Event));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventType', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.EventType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Data16', 2, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(3, false, 16, 1, 0)); // data
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Data', 3, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TimerTrigger', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 0);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CoursePointIndex', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 10);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('BatteryLevel', 132, 1000, 0, 'V'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 11);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('VirtualPartnerSpeed', 132, 1000, 0, 'm/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 12);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('HrHighAlert', 2, 1, 0, 'bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 13);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('HrLowAlert', 2, 1, 0, 'bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 14);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('SpeedHighAlert', 134, 1000, 0, 'm/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 15);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('SpeedLowAlert', 134, 1000, 0, 'm/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 16);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CadHighAlert', 132, 1, 0, 'rpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 17);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CadLowAlert', 132, 1, 0, 'rpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 18);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('PowerHighAlert', 132, 1, 0, 'watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 19);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('PowerLowAlert', 132, 1, 0, 'watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 20);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TimeDurationAlert', 134, 1000, 0, 's'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 23);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DistanceDurationAlert', 134, 100, 0, 'm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 24);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CalorieDurationAlert', 134, 1, 0, 'calories'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 25);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FitnessEquipmentState', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 27);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('SportPoint', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 33);
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(7, false, 16, 1, 0)); // score
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(8, false, 16, 1, 0)); // opponent_score
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GearChangeData', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 42);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 43);
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(11, false, 8, 1, 0)); // rear_gear_num
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(12, false, 8, 1, 0)); // rear_gear
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(9, false, 8, 1, 0)); // front_gear_num
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(10, false, 8, 1, 0)); // front_gear
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RiderPosition', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 44);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CommTimeout', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 47);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventGroup', 4, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Score', 7, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OpponentScore', 8, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FrontGearNum', 9, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FrontGear', 10, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RearGearNum', 11, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RearGear', 12, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeviceIndex', 13, FitFieldType.uint8, 1, 0, '', false, ProfileType.DeviceIndex));
        fieldIndex++;

        return newMesg;
    }

    private static createDeviceInfoMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('DeviceInfo', MesgNum.deviceInfo);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeviceIndex', 0, FitFieldType.uint8, 1, 0, '', false, ProfileType.DeviceIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeviceType', 1, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AntplusDeviceType', 2, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 1);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AntDeviceType', 2, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 0);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Manufacturer', 2, FitFieldType.uint16, 1, 0, '', false, ProfileType.Manufacturer));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SerialNumber', 3, FitFieldType.uint32z, 1, 0, '', false, ProfileType.Uint32z));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Product', 4, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FaveroProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 263);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GarminProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 15);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 13);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SoftwareVersion', 5, FitFieldType.uint16, 100, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HardwareVersion', 6, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CumOperatingTime', 7, FitFieldType.uint32, 1, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BatteryVoltage', 10, FitFieldType.uint16, 256, 0, 'V', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BatteryStatus', 11, FitFieldType.uint8, 1, 0, '', false, ProfileType.BatteryStatus));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SensorPosition', 18, FitFieldType.enum, 1, 0, '', false, ProfileType.BodyLocation));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Descriptor', 19, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AntTransmissionType', 20, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AntDeviceNumber', 21, FitFieldType.uint16z, 1, 0, '', false, ProfileType.Uint16z));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AntNetwork', 22, FitFieldType.enum, 1, 0, '', false, ProfileType.AntNetwork));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SourceType', 25, FitFieldType.enum, 1, 0, '', false, ProfileType.SourceType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ProductName', 27, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        fieldIndex++;

        return newMesg;
    }

    private static createTrainingFileMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('TrainingFile', MesgNum.trainingFile);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Type', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.File));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Manufacturer', 1, FitFieldType.uint16, 1, 0, '', false, ProfileType.Manufacturer));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Product', 2, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FaveroProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 263);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GarminProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 15);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 13);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SerialNumber', 3, FitFieldType.uint32z, 1, 0, '', false, ProfileType.Uint32z));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeCreated', 4, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        fieldIndex++;

        return newMesg;
    }

    private static createHrvMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Hrv', MesgNum.hrv);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Time', 0, FitFieldType.uint16, 1000, 0, 's', false, ProfileType.Uint16));

        return newMesg;
    }

    private static createWeatherConditionsMesg(): Mesg {
        const newMesg: Mesg = new Mesg('WeatherConditions', MesgNum.weatherConditions);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WeatherReport', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.WeatherReport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Temperature', 1, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Condition', 2, FitFieldType.enum, 1, 0, '', false, ProfileType.WeatherStatus));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WindDirection', 3, FitFieldType.uint16, 1, 0, 'degrees', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WindSpeed', 4, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PrecipitationProbability', 5, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TemperatureFeelsLike', 6, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RelativeHumidity', 7, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Location', 8, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ObservedAtTime', 9, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ObservedLocationLat', 10, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ObservedLocationLong', 11, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DayOfWeek', 12, FitFieldType.enum, 1, 0, '', false, ProfileType.DayOfWeek));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HighTemperature', 13, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LowTemperature', 14, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));

        return newMesg;
    }

    private static createWeatherAlertMesg(): Mesg {
        const newMesg: Mesg = new Mesg('WeatherAlert', MesgNum.weatherAlert);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ReportId', 0, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('IssueTime', 1, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ExpireTime', 2, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Severity', 3, FitFieldType.enum, 1, 0, '', false, ProfileType.WeatherSeverity));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Type', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.WeatherSevereType));

        return newMesg;
    }

    private static createGpsMetadataMesg(): Mesg {
        const newMesg: Mesg = new Mesg('GpsMetadata', MesgNum.gpsMetadata);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 0, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PositionLat', 1, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PositionLong', 2, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedAltitude', 3, FitFieldType.uint32, 5, 500, 'm', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EnhancedSpeed', 4, FitFieldType.uint32, 1000, 0, 'm/s', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Heading', 5, FitFieldType.uint16, 100, 0, 'degrees', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('UtcTimestamp', 6, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Velocity', 7, FitFieldType.sint16, 100, 0, 'm/s', false, ProfileType.Sint16));

        return newMesg;
    }

    private static createCameraEventMesg(): Mesg {
        const newMesg: Mesg = new Mesg('CameraEvent', MesgNum.cameraEvent);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 0, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CameraEventType', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.CameraEventType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CameraFileUuid', 2, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CameraOrientation', 3, FitFieldType.enum, 1, 0, '', false, ProfileType.CameraOrientationType));

        return newMesg;
    }

    private static createGyroscopeDataMesg(): Mesg {
        const newMesg: Mesg = new Mesg('GyroscopeData', MesgNum.gyroscopeData);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 0, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SampleTimeOffset', 1, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GyroX', 2, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GyroY', 3, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GyroZ', 4, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibratedGyroX', 5, FitFieldType.float32, 1, 0, 'deg/s', false, ProfileType.Float32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibratedGyroY', 6, FitFieldType.float32, 1, 0, 'deg/s', false, ProfileType.Float32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibratedGyroZ', 7, FitFieldType.float32, 1, 0, 'deg/s', false, ProfileType.Float32));

        return newMesg;
    }

    private static createAccelerometerDataMesg(): Mesg {
        const newMesg: Mesg = new Mesg('AccelerometerData', MesgNum.accelerometerData);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 0, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SampleTimeOffset', 1, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AccelX', 2, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AccelY', 3, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AccelZ', 4, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibratedAccelX', 5, FitFieldType.float32, 1, 0, 'g', false, ProfileType.Float32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibratedAccelY', 6, FitFieldType.float32, 1, 0, 'g', false, ProfileType.Float32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibratedAccelZ', 7, FitFieldType.float32, 1, 0, 'g', false, ProfileType.Float32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CompressedCalibratedAccelX', 8, FitFieldType.sint16, 1, 0, 'mG', false, ProfileType.Sint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CompressedCalibratedAccelY', 9, FitFieldType.sint16, 1, 0, 'mG', false, ProfileType.Sint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CompressedCalibratedAccelZ', 10, FitFieldType.sint16, 1, 0, 'mG', false, ProfileType.Sint16));

        return newMesg;
    }

    private static createMagnetometerDataMesg(): Mesg {
        const newMesg: Mesg = new Mesg('MagnetometerData', MesgNum.magnetometerData);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 0, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SampleTimeOffset', 1, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MagX', 2, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MagY', 3, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MagZ', 4, FitFieldType.uint16, 1, 0, 'counts', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibratedMagX', 5, FitFieldType.float32, 1, 0, 'G', false, ProfileType.Float32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibratedMagY', 6, FitFieldType.float32, 1, 0, 'G', false, ProfileType.Float32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibratedMagZ', 7, FitFieldType.float32, 1, 0, 'G', false, ProfileType.Float32));

        return newMesg;
    }

    private static createBarometerDataMesg(): Mesg {
        const newMesg: Mesg = new Mesg('BarometerData', MesgNum.barometerData);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 0, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SampleTimeOffset', 1, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BaroPres', 2, FitFieldType.uint32, 1, 0, 'Pa', false, ProfileType.Uint32));

        return newMesg;
    }

    private static createThreeDSensorCalibrationMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('ThreeDSensorCalibration', MesgNum.threeDSensorCalibration);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SensorType', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.SensorType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibrationFactor', 1, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AccelCalFactor', 134, 1, 0, 'g'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 0);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GyroCalFactor', 134, 1, 0, 'deg/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 1);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibrationDivisor', 2, FitFieldType.uint32, 1, 0, 'counts', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LevelShift', 3, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OffsetCal', 4, FitFieldType.sint32, 1, 0, '', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OrientationMatrix', 5, FitFieldType.sint32, 65535, 0, '', false, ProfileType.Sint32));
        fieldIndex++;

        return newMesg;
    }

    private static createOneDSensorCalibrationMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('OneDSensorCalibration', MesgNum.oneDSensorCalibration);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SensorType', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.SensorType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibrationFactor', 1, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('BaroCalFactor', 134, 1, 0, 'Pa'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 3);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CalibrationDivisor', 2, FitFieldType.uint32, 1, 0, 'counts', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LevelShift', 3, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('OffsetCal', 4, FitFieldType.sint32, 1, 0, '', false, ProfileType.Sint32));
        fieldIndex++;

        return newMesg;
    }

    private static createVideoFrameMesg(): Mesg {
        const newMesg: Mesg = new Mesg('VideoFrame', MesgNum.videoFrame);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 0, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FrameNumber', 1, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));

        return newMesg;
    }

    private static createObdiiDataMesg(): Mesg {
        const newMesg: Mesg = new Mesg('ObdiiData', MesgNum.obdiiData);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 0, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeOffset', 1, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Pid', 2, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RawData', 3, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PidDataSize', 4, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SystemTime', 5, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartTimestamp', 6, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartTimestampMs', 7, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));

        return newMesg;
    }

    private static createNmeaSentenceMesg(): Mesg {
        const newMesg: Mesg = new Mesg('NmeaSentence', MesgNum.nmeaSentence);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 0, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sentence', 1, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createAviationAttitudeMesg(): Mesg {
        const newMesg: Mesg = new Mesg('AviationAttitude', MesgNum.aviationAttitude);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMs', 0, FitFieldType.uint16, 1, 0, 'ms', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SystemTime', 1, FitFieldType.uint32, 1, 0, 'ms', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Pitch', 2, FitFieldType.sint16, 10430.38, 0, 'radians', false, ProfileType.Sint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Roll', 3, FitFieldType.sint16, 10430.38, 0, 'radians', false, ProfileType.Sint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AccelLateral', 4, FitFieldType.sint16, 100, 0, 'm/s^2', false, ProfileType.Sint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AccelNormal', 5, FitFieldType.sint16, 100, 0, 'm/s^2', false, ProfileType.Sint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TurnRate', 6, FitFieldType.sint16, 1024, 0, 'radians/second', false, ProfileType.Sint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Stage', 7, FitFieldType.enum, 1, 0, '', false, ProfileType.AttitudeStage));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AttitudeStageComplete', 8, FitFieldType.uint8, 1, 0, '%', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Track', 9, FitFieldType.uint16, 10430.38, 0, 'radians', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Validity', 10, FitFieldType.uint16, 1, 0, '', false, ProfileType.AttitudeValidity));

        return newMesg;
    }

    private static createVideoMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Video', MesgNum.video);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Url', 0, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HostingProvider', 1, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Duration', 2, FitFieldType.uint32, 1, 0, 'ms', false, ProfileType.Uint32));

        return newMesg;
    }

    private static createVideoTitleMesg(): Mesg {
        const newMesg: Mesg = new Mesg('VideoTitle', MesgNum.videoTitle);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageCount', 0, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Text', 1, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createVideoDescriptionMesg(): Mesg {
        const newMesg: Mesg = new Mesg('VideoDescription', MesgNum.videoDescription);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageCount', 0, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Text', 1, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createVideoClipMesg(): Mesg {
        const newMesg: Mesg = new Mesg('VideoClip', MesgNum.videoClip);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ClipNumber', 0, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartTimestamp', 1, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartTimestampMs', 2, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EndTimestamp', 3, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EndTimestampMs', 4, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ClipStart', 6, FitFieldType.uint32, 1, 0, 'ms', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ClipEnd', 7, FitFieldType.uint32, 1, 0, 'ms', false, ProfileType.Uint32));

        return newMesg;
    }

    private static createSetMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Set', MesgNum.set);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 254, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Duration', 0, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Repetitions', 3, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Weight', 4, FitFieldType.uint16, 16, 0, 'kg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SetType', 5, FitFieldType.uint8, 1, 0, '', false, ProfileType.SetType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartTime', 6, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Category', 7, FitFieldType.uint16, 1, 0, '', false, ProfileType.ExerciseCategory));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CategorySubtype', 8, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WeightDisplayUnit', 9, FitFieldType.uint16, 1, 0, '', false, ProfileType.FitBaseUnit));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 10, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WktStepIndex', 11, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));

        return newMesg;
    }

    private static createCourseMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Course', MesgNum.course);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 5, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Capabilities', 6, FitFieldType.uint32z, 1, 0, '', false, ProfileType.CourseCapabilities));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SubSport', 7, FitFieldType.enum, 1, 0, '', false, ProfileType.SubSport));

        return newMesg;
    }

    private static createCoursePointMesg(): Mesg {
        const newMesg: Mesg = new Mesg('CoursePoint', MesgNum.coursePoint);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 1, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PositionLat', 2, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PositionLong', 3, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Distance', 4, FitFieldType.uint32, 100, 0, 'm', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Type', 5, FitFieldType.enum, 1, 0, '', false, ProfileType.CoursePoint));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 6, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Favorite', 8, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));

        return newMesg;
    }

    private static createSegmentIdMesg(): Mesg {
        const newMesg: Mesg = new Mesg('SegmentId', MesgNum.segmentId);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 0, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Uuid', 1, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 2, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Enabled', 3, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('UserProfilePrimaryKey', 4, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeviceId', 5, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DefaultRaceLeader', 6, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeleteStatus', 7, FitFieldType.enum, 1, 0, '', false, ProfileType.SegmentDeleteStatus));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SelectionType', 8, FitFieldType.enum, 1, 0, '', false, ProfileType.SegmentSelectionType));

        return newMesg;
    }

    private static createSegmentLeaderboardEntryMesg(): Mesg {
        const newMesg: Mesg = new Mesg('SegmentLeaderboardEntry', MesgNum.segmentLeaderboardEntry);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 0, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Type', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.SegmentLeaderboardType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GroupPrimaryKey', 2, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActivityId', 3, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SegmentTime', 4, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActivityIdString', 5, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createSegmentPointMesg(): Mesg {
        const newMesg: Mesg = new Mesg('SegmentPoint', MesgNum.segmentPoint);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PositionLat', 1, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PositionLong', 2, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Distance', 3, FitFieldType.uint32, 100, 0, 'm', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Altitude', 4, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeaderTime', 5, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));

        return newMesg;
    }

    private static createSegmentLapMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('SegmentLap', MesgNum.segmentLap);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Event', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Event));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventType', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.EventType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartTime', 2, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartPositionLat', 3, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartPositionLong', 4, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EndPositionLat', 5, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EndPositionLong', 6, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalElapsedTime', 7, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalTimerTime', 8, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalDistance', 9, FitFieldType.uint32, 100, 0, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalCycles', 10, FitFieldType.uint32, 1, 0, 'cycles', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TotalStrokes', 134, 1, 0, 'strokes'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(23, 2);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalCalories', 11, FitFieldType.uint16, 1, 0, 'kcal', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalFatCalories', 12, FitFieldType.uint16, 1, 0, 'kcal', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgSpeed', 13, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxSpeed', 14, FitFieldType.uint16, 1000, 0, 'm/s', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgHeartRate', 15, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxHeartRate', 16, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgCadence', 17, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxCadence', 18, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPower', 19, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPower', 20, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalAscent', 21, FitFieldType.uint16, 1, 0, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalDescent', 22, FitFieldType.uint16, 1, 0, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 23, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventGroup', 24, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NecLat', 25, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NecLong', 26, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SwcLat', 27, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SwcLong', 28, FitFieldType.sint32, 1, 0, 'semicircles', false, ProfileType.Sint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Name', 29, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NormalizedPower', 30, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeftRightBalance', 31, FitFieldType.uint16, 1, 0, '', false, ProfileType.LeftRightBalance100));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SubSport', 32, FitFieldType.enum, 1, 0, '', false, ProfileType.SubSport));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalWork', 33, FitFieldType.uint32, 1, 0, 'J', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgAltitude', 34, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxAltitude', 35, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('GpsAccuracy', 36, FitFieldType.uint8, 1, 0, 'm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgGrade', 37, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPosGrade', 38, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgNegGrade', 39, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPosGrade', 40, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxNegGrade', 41, FitFieldType.sint16, 100, 0, '%', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgTemperature', 42, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxTemperature', 43, FitFieldType.sint8, 1, 0, 'C', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalMovingTime', 44, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPosVerticalSpeed', 45, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgNegVerticalSpeed', 46, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPosVerticalSpeed', 47, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxNegVerticalSpeed', 48, FitFieldType.sint16, 1000, 0, 'm/s', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInHrZone', 49, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInSpeedZone', 50, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInCadenceZone', 51, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeInPowerZone', 52, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RepetitionNum', 53, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MinAltitude', 54, FitFieldType.uint16, 5, 500, 'm', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MinHeartRate', 55, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActiveTime', 56, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WktStepIndex', 57, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SportEvent', 58, FitFieldType.enum, 1, 0, '', false, ProfileType.SportEvent));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftTorqueEffectiveness', 59, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightTorqueEffectiveness', 60, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPedalSmoothness', 61, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPedalSmoothness', 62, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgCombinedPedalSmoothness', 63, FitFieldType.uint8, 2, 0, 'percent', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Status', 64, FitFieldType.enum, 1, 0, '', false, ProfileType.SegmentLapStatus));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Uuid', 65, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgFractionalCadence', 66, FitFieldType.uint8, 128, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxFractionalCadence', 67, FitFieldType.uint8, 128, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TotalFractionalCycles', 68, FitFieldType.uint8, 128, 0, 'cycles', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FrontGearShiftCount', 69, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RearGearShiftCount', 70, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeStanding', 71, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StandCount', 72, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPco', 73, FitFieldType.sint8, 1, 0, 'mm', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPco', 74, FitFieldType.sint8, 1, 0, 'mm', false, ProfileType.Sint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPowerPhase', 75, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgLeftPowerPhasePeak', 76, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPowerPhase', 77, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgRightPowerPhasePeak', 78, FitFieldType.uint8, 0.7111111, 0, 'degrees', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgPowerPosition', 79, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxPowerPosition', 80, FitFieldType.uint16, 1, 0, 'watts', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgCadencePosition', 81, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxCadencePosition', 82, FitFieldType.uint8, 1, 0, 'rpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Manufacturer', 83, FitFieldType.uint16, 1, 0, '', false, ProfileType.Manufacturer));
        fieldIndex++;

        return newMesg;
    }

    private static createSegmentFileMesg(): Mesg {
        const newMesg: Mesg = new Mesg('SegmentFile', MesgNum.segmentFile);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FileUuid', 1, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Enabled', 3, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('UserProfilePrimaryKey', 4, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeaderType', 7, FitFieldType.enum, 1, 0, '', false, ProfileType.SegmentLeaderboardType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeaderGroupPrimaryKey', 8, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeaderActivityId', 9, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LeaderActivityIdString', 10, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DefaultRaceLeader', 11, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));

        return newMesg;
    }

    private static createWorkoutMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Workout', MesgNum.workout);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Capabilities', 5, FitFieldType.uint32z, 1, 0, '', false, ProfileType.WorkoutCapabilities));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NumValidSteps', 6, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WktName', 8, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SubSport', 11, FitFieldType.enum, 1, 0, '', false, ProfileType.SubSport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PoolLength', 14, FitFieldType.uint16, 100, 0, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PoolLengthUnit', 15, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayMeasure));

        return newMesg;
    }

    private static createWorkoutSessionMesg(): Mesg {
        const newMesg: Mesg = new Mesg('WorkoutSession', MesgNum.workoutSession);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 0, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SubSport', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.SubSport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NumValidSteps', 2, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FirstStepIndex', 3, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PoolLength', 4, FitFieldType.uint16, 100, 0, 'm', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PoolLengthUnit', 5, FitFieldType.enum, 1, 0, '', false, ProfileType.DisplayMeasure));

        return newMesg;
    }

    private static createWorkoutStepMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('WorkoutStep', MesgNum.workoutStep);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WktStepName', 0, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DurationType', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.WktStepDuration));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DurationValue', 2, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationTime', 134, 1000, 0, 's'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 0);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 28);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationDistance', 134, 100, 0, 'm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 1);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationHr', 134, 1, 0, '% or bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 2);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 3);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationCalories', 134, 1, 0, 'calories'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 4);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationStep', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 6);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 7);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 8);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 9);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 10);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 11);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 12);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 13);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationPower', 134, 1, 0, '% or watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 14);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 15);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationReps', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 29);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TargetType', 3, FitFieldType.enum, 1, 0, '', false, ProfileType.WktStepTarget));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TargetValue', 4, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TargetSpeedZone', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 0);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TargetHrZone', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 1);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TargetCadenceZone', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 3);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TargetPowerZone', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 4);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatSteps', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 6);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatTime', 134, 1000, 0, 's'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 7);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatDistance', 134, 100, 0, 'm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 8);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatCalories', 134, 1, 0, 'calories'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 9);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatHr', 134, 1, 0, '% or bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 10);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 11);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatPower', 134, 1, 0, '% or watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 12);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 13);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TargetStrokeType', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 11);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CustomTargetValueLow', 5, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetSpeedLow', 134, 1000, 0, 'm/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 0);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetHeartRateLow', 134, 1, 0, '% or bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 1);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetCadenceLow', 134, 1, 0, 'rpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 3);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetPowerLow', 134, 1, 0, '% or watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 4);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CustomTargetValueHigh', 6, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetSpeedHigh', 134, 1000, 0, 'm/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 0);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetHeartRateHigh', 134, 1, 0, '% or bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 1);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetCadenceHigh', 134, 1, 0, 'rpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 3);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetPowerHigh', 134, 1, 0, '% or watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 4);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Intensity', 7, FitFieldType.enum, 1, 0, '', false, ProfileType.Intensity));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Notes', 8, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Equipment', 9, FitFieldType.enum, 1, 0, '', false, ProfileType.WorkoutEquipment));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ExerciseCategory', 10, FitFieldType.uint16, 1, 0, '', false, ProfileType.ExerciseCategory));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ExerciseName', 11, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ExerciseWeight', 12, FitFieldType.uint16, 100, 0, 'kg', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WeightDisplayUnit', 13, FitFieldType.uint16, 1, 0, '', false, ProfileType.FitBaseUnit));
        fieldIndex++;

        return newMesg;
    }

    private static createExerciseTitleMesg(): Mesg {
        const newMesg: Mesg = new Mesg('ExerciseTitle', MesgNum.exerciseTitle);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ExerciseCategory', 0, FitFieldType.uint16, 1, 0, '', false, ProfileType.ExerciseCategory));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ExerciseName', 1, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('WktStepName', 2, FitFieldType.string, 1, 0, '', false, ProfileType.String));

        return newMesg;
    }

    private static createScheduleMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Schedule', MesgNum.schedule);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Manufacturer', 0, FitFieldType.uint16, 1, 0, '', false, ProfileType.Manufacturer));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Product', 1, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FaveroProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 263);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GarminProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 15);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 13);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SerialNumber', 2, FitFieldType.uint32z, 1, 0, '', false, ProfileType.Uint32z));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimeCreated', 3, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Completed', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Type', 5, FitFieldType.enum, 1, 0, '', false, ProfileType.Schedule));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ScheduledTime', 6, FitFieldType.uint32, 1, 0, '', false, ProfileType.LocalDateTime));
        fieldIndex++;

        return newMesg;
    }

    private static createTotalsMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Totals', MesgNum.totals);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 254, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimerTime', 0, FitFieldType.uint32, 1, 0, 's', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Distance', 1, FitFieldType.uint32, 1, 0, 'm', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Calories', 2, FitFieldType.uint32, 1, 0, 'kcal', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sport', 3, FitFieldType.enum, 1, 0, '', false, ProfileType.Sport));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ElapsedTime', 4, FitFieldType.uint32, 1, 0, 's', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Sessions', 5, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActiveTime', 6, FitFieldType.uint32, 1, 0, 's', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SportIndex', 9, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));

        return newMesg;
    }

    private static createWeightScaleMesg(): Mesg {
        const newMesg: Mesg = new Mesg('WeightScale', MesgNum.weightScale);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Weight', 0, FitFieldType.uint16, 100, 0, 'kg', false, ProfileType.Weight));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PercentFat', 1, FitFieldType.uint16, 100, 0, '%', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PercentHydration', 2, FitFieldType.uint16, 100, 0, '%', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('VisceralFatMass', 3, FitFieldType.uint16, 100, 0, 'kg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BoneMass', 4, FitFieldType.uint16, 100, 0, 'kg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MuscleMass', 5, FitFieldType.uint16, 100, 0, 'kg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BasalMet', 7, FitFieldType.uint16, 4, 0, 'kcal/day', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PhysiqueRating', 8, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActiveMet', 9, FitFieldType.uint16, 4, 0, 'kcal/day', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MetabolicAge', 10, FitFieldType.uint8, 1, 0, 'years', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('VisceralFatRating', 11, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('UserProfileIndex', 12, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));

        return newMesg;
    }

    private static createBloodPressureMesg(): Mesg {
        const newMesg: Mesg = new Mesg('BloodPressure', MesgNum.bloodPressure);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SystolicPressure', 0, FitFieldType.uint16, 1, 0, 'mmHg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DiastolicPressure', 1, FitFieldType.uint16, 1, 0, 'mmHg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MeanArterialPressure', 2, FitFieldType.uint16, 1, 0, 'mmHg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Map3SampleMean', 3, FitFieldType.uint16, 1, 0, 'mmHg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MapMorningValues', 4, FitFieldType.uint16, 1, 0, 'mmHg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MapEveningValues', 5, FitFieldType.uint16, 1, 0, 'mmHg', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HeartRate', 6, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HeartRateType', 7, FitFieldType.enum, 1, 0, '', false, ProfileType.HrType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Status', 8, FitFieldType.enum, 1, 0, '', false, ProfileType.BpStatus));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('UserProfileIndex', 9, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));

        return newMesg;
    }

    private static createMonitoringInfoMesg(): Mesg {
        const newMesg: Mesg = new Mesg('MonitoringInfo', MesgNum.monitoringInfo);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LocalTimestamp', 0, FitFieldType.uint32, 1, 0, 's', false, ProfileType.LocalDateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActivityType', 1, FitFieldType.enum, 1, 0, '', false, ProfileType.ActivityType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CyclesToDistance', 3, FitFieldType.uint16, 5000, 0, 'm/cycle', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CyclesToCalories', 4, FitFieldType.uint16, 5000, 0, 'kcal/cycle', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('RestingMetabolicRate', 5, FitFieldType.uint16, 1, 0, 'kcal / day', false, ProfileType.Uint16));

        return newMesg;
    }

    private static createMonitoringMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Monitoring', MesgNum.monitoring);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeviceIndex', 0, FitFieldType.uint8, 1, 0, '', false, ProfileType.DeviceIndex));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Calories', 1, FitFieldType.uint16, 1, 0, 'kcal', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Distance', 2, FitFieldType.uint32, 100, 0, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Cycles', 3, FitFieldType.uint32, 2, 0, 'cycles', false, ProfileType.Uint32));
        subfieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('Steps', 134, 1, 0, 'steps'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 6);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 1);
        subfieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('Strokes', 134, 2, 0, 'strokes'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 2);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 5);
        subfieldIndex++;
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActiveTime', 4, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActivityType', 5, FitFieldType.enum, 1, 0, '', false, ProfileType.ActivityType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActivitySubtype', 6, FitFieldType.enum, 1, 0, '', false, ProfileType.ActivitySubtype));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActivityLevel', 7, FitFieldType.enum, 1, 0, '', false, ProfileType.ActivityLevel));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Distance16', 8, FitFieldType.uint16, 1, 0, '100 * m', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Cycles16', 9, FitFieldType.uint16, 1, 0, '2 * cycles (steps)', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActiveTime16', 10, FitFieldType.uint16, 1, 0, 's', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('LocalTimestamp', 11, FitFieldType.uint32, 1, 0, '', false, ProfileType.LocalDateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Temperature', 12, FitFieldType.sint16, 100, 0, 'C', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TemperatureMin', 14, FitFieldType.sint16, 100, 0, 'C', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TemperatureMax', 15, FitFieldType.sint16, 100, 0, 'C', false, ProfileType.Sint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActivityTime', 16, FitFieldType.uint16, 1, 0, 'minutes', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ActiveCalories', 19, FitFieldType.uint16, 1, 0, 'kcal', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('CurrentActivityTypeIntensity', 24, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(5, false, 5, 1, 0)); // activity_type
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(28, false, 3, 1, 0)); // intensity
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TimestampMin8', 25, FitFieldType.uint8, 1, 0, 'min', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp16', 26, FitFieldType.uint16, 1, 0, 's', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('HeartRate', 27, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Intensity', 28, FitFieldType.uint8, 10, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DurationMin', 29, FitFieldType.uint16, 1, 0, 'min', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Duration', 30, FitFieldType.uint32, 1, 0, 's', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Ascent', 31, FitFieldType.uint32, 1000, 0, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Descent', 32, FitFieldType.uint32, 1000, 0, 'm', false, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ModerateActivityMinutes', 33, FitFieldType.uint16, 1, 0, 'minutes', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('VigorousActivityMinutes', 34, FitFieldType.uint16, 1, 0, 'minutes', false, ProfileType.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createHrMesg(): Mesg {
        let fieldIndex: number;
        const newMesg: Mesg = new Mesg('Hr', MesgNum.hr);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, '', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FractionalTimestamp', 0, FitFieldType.uint16, 32768, 0, 's', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Time256', 1, FitFieldType.uint8, 256, 0, 's', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(0, false, 8, 256, 0)); // fractional_timestamp
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FilteredBpm', 6, FitFieldType.uint8, 1, 0, 'bpm', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventTimestamp', 9, FitFieldType.uint32, 1024, 0, 's', true, ProfileType.Uint32));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EventTimestamp12', 10, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        fieldIndex++;

        return newMesg;
    }

    private static createStressLevelMesg(): Mesg {
        const newMesg: Mesg = new Mesg('StressLevel', MesgNum.stressLevel);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StressLevelValue', 0, FitFieldType.sint16, 1, 0, '', false, ProfileType.Sint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StressLevelTime', 1, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));

        return newMesg;
    }

    private static createMemoGlobMesg(): Mesg {
        const newMesg: Mesg = new Mesg('MemoGlob', MesgNum.memoGlob);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('PartIndex', 250, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Memo', 0, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageNumber', 1, FitFieldType.uint16, 1, 0, '', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MessageIndex', 2, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));

        return newMesg;
    }

    private static createAntChannelIdMesg(): Mesg {
        const newMesg: Mesg = new Mesg('AntChannelId', MesgNum.antChannelId);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ChannelNumber', 0, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeviceType', 1, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeviceNumber', 2, FitFieldType.uint16z, 1, 0, '', false, ProfileType.Uint16z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('TransmissionType', 3, FitFieldType.uint8z, 1, 0, '', false, ProfileType.Uint8z));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeviceIndex', 4, FitFieldType.uint8, 1, 0, '', false, ProfileType.DeviceIndex));

        return newMesg;
    }

    private static createAntRxMesg(): Mesg {
        let fieldIndex: number;
        const newMesg: Mesg = new Mesg('AntRx', MesgNum.antRx);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FractionalTimestamp', 0, FitFieldType.uint16, 32768, 0, 's', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MesgId', 1, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MesgData', 2, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(3, false, 8, 1, 0)); // channel_number
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ChannelNumber', 3, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Data', 4, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        fieldIndex++;

        return newMesg;
    }

    private static createAntTxMesg(): Mesg {
        let fieldIndex: number;
        const newMesg: Mesg = new Mesg('AntTx', MesgNum.antTx);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FractionalTimestamp', 0, FitFieldType.uint16, 32768, 0, 's', false, ProfileType.Uint16));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MesgId', 1, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MesgData', 2, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(3, false, 8, 1, 0)); // channel_number
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ChannelNumber', 3, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Data', 4, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        fieldIndex++;

        return newMesg;
    }

    private static createExdScreenConfigurationMesg(): Mesg {
        const newMesg: Mesg = new Mesg('ExdScreenConfiguration', MesgNum.exdScreenConfiguration);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ScreenIndex', 0, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FieldCount', 1, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Layout', 2, FitFieldType.enum, 1, 0, '', false, ProfileType.ExdLayout));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ScreenEnabled', 3, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));

        return newMesg;
    }

    private static createExdDataFieldConfigurationMesg(): Mesg {
        let fieldIndex: number;
        const newMesg: Mesg =
            new Mesg('ExdDataFieldConfiguration', MesgNum.exdDataFieldConfiguration);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ScreenIndex', 0, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ConceptField', 1, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(2, false, 4, 1, 0)); // field_id
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(3, false, 4, 1, 0)); // concept_count
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FieldId', 2, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ConceptCount', 3, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DisplayType', 4, FitFieldType.enum, 1, 0, '', false, ProfileType.ExdDisplayType));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Title', 5, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        fieldIndex++;

        return newMesg;
    }

    private static createExdDataConceptConfigurationMesg(): Mesg {
        let fieldIndex: number;
        const newMesg: Mesg =
            new Mesg('ExdDataConceptConfiguration', MesgNum.exdDataConceptConfiguration);
        fieldIndex = 0;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ScreenIndex', 0, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ConceptField', 1, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(2, false, 4, 1, 0)); // field_id
        // tslint:disable-next-line: max-line-length
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(3, false, 4, 1, 0)); // concept_index
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FieldId', 2, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ConceptIndex', 3, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DataPage', 4, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ConceptKey', 5, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Scaling', 6, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DataUnits', 8, FitFieldType.enum, 1, 0, '', false, ProfileType.ExdDataUnits));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Qualifier', 9, FitFieldType.enum, 1, 0, '', false, ProfileType.ExdQualifiers));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Descriptor', 10, FitFieldType.enum, 1, 0, '', false, ProfileType.ExdDescriptors));
        fieldIndex++;
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('IsSigned', 11, FitFieldType.enum, 1, 0, '', false, ProfileType.Bool));
        fieldIndex++;

        return newMesg;
    }

    private static createFieldDescriptionMesg(): Mesg {
        const newMesg: Mesg = new Mesg('FieldDescription', MesgNum.fieldDescription);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeveloperDataIndex', 0, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FieldDefinitionNumber', 1, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FitBaseTypeId', 2, FitFieldType.uint8, 1, 0, '', false, ProfileType.FitBaseType));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FieldName', 3, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Array', 4, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Components', 5, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Scale', 6, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Offset', 7, FitFieldType.sint8, 1, 0, '', false, ProfileType.Sint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Units', 8, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Bits', 9, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Accumulate', 10, FitFieldType.string, 1, 0, '', false, ProfileType.String));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('FitBaseUnitId', 13, FitFieldType.uint16, 1, 0, '', false, ProfileType.FitBaseUnit));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NativeMesgNum', 14, FitFieldType.uint16, 1, 0, '', false, ProfileType.MesgNum));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('NativeFieldNum', 15, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));

        return newMesg;
    }

    private static createDeveloperDataIdMesg(): Mesg {
        const newMesg: Mesg = new Mesg('DeveloperDataId', MesgNum.developerDataId);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeveloperId', 0, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ApplicationId', 1, FitFieldType.byte, 1, 0, '', false, ProfileType.Byte));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ManufacturerId', 2, FitFieldType.uint16, 1, 0, '', false, ProfileType.Manufacturer));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DeveloperDataIndex', 3, FitFieldType.uint8, 1, 0, '', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ApplicationVersion', 4, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));

        return newMesg;
    }

    private static createDiveSummaryMesg(): Mesg {
        const newMesg: Mesg = new Mesg('DiveSummary', MesgNum.diveSummary);
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('Timestamp', 253, FitFieldType.uint32, 1, 0, 's', false, ProfileType.DateTime));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ReferenceMesg', 0, FitFieldType.uint16, 1, 0, '', false, ProfileType.MesgNum));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('ReferenceIndex', 1, FitFieldType.uint16, 1, 0, '', false, ProfileType.MessageIndex));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('AvgDepth', 2, FitFieldType.uint32, 1000, 0, 'm', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('MaxDepth', 3, FitFieldType.uint32, 1000, 0, 'm', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('SurfaceInterval', 4, FitFieldType.uint32, 1, 0, 's', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartCns', 5, FitFieldType.uint8, 1, 0, 'percent', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EndCns', 6, FitFieldType.uint8, 1, 0, 'percent', false, ProfileType.Uint8));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('StartN2', 7, FitFieldType.uint16, 1, 0, 'percent', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('EndN2', 8, FitFieldType.uint16, 1, 0, 'percent', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('O2Toxicity', 9, FitFieldType.uint16, 1, 0, 'OTUs', false, ProfileType.Uint16));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('DiveNumber', 10, FitFieldType.uint32, 1, 0, '', false, ProfileType.Uint32));
        // tslint:disable-next-line: max-line-length
        newMesg.setField(new Field('BottomTime', 11, FitFieldType.uint32, 1000, 0, 's', false, ProfileType.Uint32));

        return newMesg;
    }

    private static createPadMesg(): Mesg {
        const newMesg: Mesg = new Mesg('Pad', MesgNum.pad);

        return newMesg;
    }

    //#endregion
} // class
