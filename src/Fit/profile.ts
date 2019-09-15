import { Mesg } from './mesg';
import { Subfield } from './subfield';
import { Field } from './field';
import { FieldComponent } from './fieldComponent';
import { MesgNum } from './Profile/Types/mesgNum';

enum Type {
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

        return new Field('unknown', fieldNum, 0, 1, 0, '', false, Type.Enum);
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
            case MesgNum.FileId:
                newMesg = Profile.createFileIdMesg();
                break;

            case MesgNum.FileCreator:
                newMesg = Profile.createFileCreatorMesg();
                break;

            case MesgNum.TimestampCorrelation:
                newMesg = Profile.createTimestampCorrelationMesg();
                break;

            case MesgNum.Software:
                newMesg = Profile.createSoftwareMesg();
                break;

            case MesgNum.SlaveDevice:
                newMesg = Profile.createSlaveDeviceMesg();
                break;

            case MesgNum.Capabilities:
                newMesg = Profile.createCapabilitiesMesg();
                break;

            case MesgNum.FileCapabilities:
                newMesg = Profile.createFileCapabilitiesMesg();
                break;

            case MesgNum.MesgCapabilities:
                newMesg = Profile.createMesgCapabilitiesMesg();
                break;

            case MesgNum.FieldCapabilities:
                newMesg = Profile.createFieldCapabilitiesMesg();
                break;

            case MesgNum.DeviceSettings:
                newMesg = Profile.createDeviceSettingsMesg();
                break;

            case MesgNum.UserProfile:
                newMesg = Profile.createUserProfileMesg();
                break;

            case MesgNum.HrmProfile:
                newMesg = Profile.createHrmProfileMesg();
                break;

            case MesgNum.SdmProfile:
                newMesg = Profile.createSdmProfileMesg();
                break;

            case MesgNum.BikeProfile:
                newMesg = Profile.createBikeProfileMesg();
                break;

            case MesgNum.Connectivity:
                newMesg = Profile.createConnectivityMesg();
                break;

            case MesgNum.WatchfaceSettings:
                newMesg = Profile.createWatchfaceSettingsMesg();
                break;

            case MesgNum.OhrSettings:
                newMesg = Profile.createOhrSettingsMesg();
                break;

            case MesgNum.ZonesTarget:
                newMesg = Profile.createZonesTargetMesg();
                break;

            case MesgNum.Sport:
                newMesg = Profile.createSportMesg();
                break;

            case MesgNum.HrZone:
                newMesg = Profile.createHrZoneMesg();
                break;

            case MesgNum.SpeedZone:
                newMesg = Profile.createSpeedZoneMesg();
                break;

            case MesgNum.CadenceZone:
                newMesg = Profile.createCadenceZoneMesg();
                break;

            case MesgNum.PowerZone:
                newMesg = Profile.createPowerZoneMesg();
                break;

            case MesgNum.MetZone:
                newMesg = Profile.createMetZoneMesg();
                break;

            case MesgNum.DiveSettings:
                newMesg = Profile.createDiveSettingsMesg();
                break;

            case MesgNum.DiveAlarm:
                newMesg = Profile.createDiveAlarmMesg();
                break;

            case MesgNum.DiveGas:
                newMesg = Profile.createDiveGasMesg();
                break;

            case MesgNum.Goal:
                newMesg = Profile.createGoalMesg();
                break;

            case MesgNum.Activity:
                newMesg = Profile.createActivityMesg();
                break;

            case MesgNum.Session:
                newMesg = Profile.createSessionMesg();
                break;

            case MesgNum.Lap:
                newMesg = Profile.createLapMesg();
                break;

            case MesgNum.Length:
                newMesg = Profile.createLengthMesg();
                break;

            case MesgNum.Record:
                newMesg = Profile.createRecordMesg();
                break;

            case MesgNum.Event:
                newMesg = Profile.createEventMesg();
                break;

            case MesgNum.DeviceInfo:
                newMesg = Profile.createDeviceInfoMesg();
                break;

            case MesgNum.TrainingFile:
                newMesg = Profile.createTrainingFileMesg();
                break;

            case MesgNum.Hrv:
                newMesg = Profile.createHrvMesg();
                break;

            case MesgNum.WeatherConditions:
                newMesg = Profile.createWeatherConditionsMesg();
                break;

            case MesgNum.WeatherAlert:
                newMesg = Profile.createWeatherAlertMesg();
                break;

            case MesgNum.GpsMetadata:
                newMesg = Profile.createGpsMetadataMesg();
                break;

            case MesgNum.CameraEvent:
                newMesg = Profile.createCameraEventMesg();
                break;

            case MesgNum.GyroscopeData:
                newMesg = Profile.createGyroscopeDataMesg();
                break;

            case MesgNum.AccelerometerData:
                newMesg = Profile.createAccelerometerDataMesg();
                break;

            case MesgNum.MagnetometerData:
                newMesg = Profile.createMagnetometerDataMesg();
                break;

            case MesgNum.BarometerData:
                newMesg = Profile.createBarometerDataMesg();
                break;

            case MesgNum.ThreeDSensorCalibration:
                newMesg = Profile.createThreeDSensorCalibrationMesg();
                break;

            case MesgNum.OneDSensorCalibration:
                newMesg = Profile.createOneDSensorCalibrationMesg();
                break;

            case MesgNum.VideoFrame:
                newMesg = Profile.createVideoFrameMesg();
                break;

            case MesgNum.ObdiiData:
                newMesg = Profile.createObdiiDataMesg();
                break;

            case MesgNum.NmeaSentence:
                newMesg = Profile.createNmeaSentenceMesg();
                break;

            case MesgNum.AviationAttitude:
                newMesg = Profile.createAviationAttitudeMesg();
                break;

            case MesgNum.Video:
                newMesg = Profile.createVideoMesg();
                break;

            case MesgNum.VideoTitle:
                newMesg = Profile.createVideoTitleMesg();
                break;

            case MesgNum.VideoDescription:
                newMesg = Profile.createVideoDescriptionMesg();
                break;

            case MesgNum.VideoClip:
                newMesg = Profile.createVideoClipMesg();
                break;

            case MesgNum.Set:
                newMesg = Profile.createSetMesg();
                break;

            case MesgNum.Course:
                newMesg = Profile.createCourseMesg();
                break;

            case MesgNum.CoursePoint:
                newMesg = Profile.createCoursePointMesg();
                break;

            case MesgNum.SegmentId:
                newMesg = Profile.createSegmentIdMesg();
                break;

            case MesgNum.SegmentLeaderboardEntry:
                newMesg = Profile.createSegmentLeaderboardEntryMesg();
                break;

            case MesgNum.SegmentPoint:
                newMesg = Profile.createSegmentPointMesg();
                break;

            case MesgNum.SegmentLap:
                newMesg = Profile.createSegmentLapMesg();
                break;

            case MesgNum.SegmentFile:
                newMesg = Profile.createSegmentFileMesg();
                break;

            case MesgNum.Workout:
                newMesg = Profile.createWorkoutMesg();
                break;

            case MesgNum.WorkoutSession:
                newMesg = Profile.createWorkoutSessionMesg();
                break;

            case MesgNum.WorkoutStep:
                newMesg = Profile.createWorkoutStepMesg();
                break;

            case MesgNum.ExerciseTitle:
                newMesg = Profile.createExerciseTitleMesg();
                break;

            case MesgNum.Schedule:
                newMesg = Profile.createScheduleMesg();
                break;

            case MesgNum.Totals:
                newMesg = Profile.createTotalsMesg();
                break;

            case MesgNum.WeightScale:
                newMesg = Profile.createWeightScaleMesg();
                break;

            case MesgNum.BloodPressure:
                newMesg = Profile.createBloodPressureMesg();
                break;

            case MesgNum.MonitoringInfo:
                newMesg = Profile.createMonitoringInfoMesg();
                break;

            case MesgNum.Monitoring:
                newMesg = Profile.createMonitoringMesg();
                break;

            case MesgNum.Hr:
                newMesg = Profile.createHrMesg();
                break;

            case MesgNum.StressLevel:
                newMesg = Profile.createStressLevelMesg();
                break;

            case MesgNum.MemoGlob:
                newMesg = Profile.createMemoGlobMesg();
                break;

            case MesgNum.AntChannelId:
                newMesg = Profile.createAntChannelIdMesg();
                break;

            case MesgNum.AntRx:
                newMesg = Profile.createAntRxMesg();
                break;

            case MesgNum.AntTx:
                newMesg = Profile.createAntTxMesg();
                break;

            case MesgNum.ExdScreenConfiguration:
                newMesg = Profile.createExdScreenConfigurationMesg();
                break;

            case MesgNum.ExdDataFieldConfiguration:
                newMesg = Profile.createExdDataFieldConfigurationMesg();
                break;

            case MesgNum.ExdDataConceptConfiguration:
                newMesg = Profile.createExdDataConceptConfigurationMesg();
                break;

            case MesgNum.FieldDescription:
                newMesg = Profile.createFieldDescriptionMesg();
                break;

            case MesgNum.DeveloperDataId:
                newMesg = Profile.createDeveloperDataIdMesg();
                break;

            case MesgNum.DiveSummary:
                newMesg = Profile.createDiveSummaryMesg();
                break;

            case MesgNum.Pad:
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
        const newMesg: Mesg = new Mesg('FileId', MesgNum.FileId);
        fieldIndex = 0;
        newMesg.setField(new Field('Type', 0, 0, 1, 0, '', false, Type.File));
        fieldIndex++;
        newMesg.setField(new Field('Manufacturer', 1, 132, 1, 0, '', false, Type.Manufacturer));
        fieldIndex++;
        newMesg.setField(new Field('Product', 2, 132, 1, 0, '', false, Type.Uint16));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FaveroProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 263);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GarminProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 15);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 13);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('SerialNumber', 3, 140, 1, 0, '', false, Type.Uint32z));
        fieldIndex++;
        newMesg.setField(new Field('TimeCreated', 4, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Number', 5, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ProductName', 8, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createFileCreatorMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('FileCreator', MesgNum.FileCreator);
        fieldIndex = 0;
        newMesg.setField(new Field('SoftwareVersion', 0, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('HardwareVersion', 1, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;

        return newMesg;
    }

    private static createTimestampCorrelationMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('TimestampCorrelation', MesgNum.TimestampCorrelation);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('FractionalTimestamp', 0, 132, 32768, 0, 's', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SystemTimestamp', 1, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('FractionalSystemTimestamp', 2, 132, 32768, 0, 's', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('LocalTimestamp', 3, 134, 1, 0, 's', false, Type.LocalDateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 4, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SystemTimestampMs', 5, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createSoftwareMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Software', MesgNum.Software);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Version', 3, 132, 100, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('PartNumber', 5, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createSlaveDeviceMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('SlaveDevice', MesgNum.SlaveDevice);
        fieldIndex = 0;
        newMesg.setField(new Field('Manufacturer', 0, 132, 1, 0, '', false, Type.Manufacturer));
        fieldIndex++;
        newMesg.setField(new Field('Product', 1, 132, 1, 0, '', false, Type.Uint16));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FaveroProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 263);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GarminProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 15);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 13);
        subfieldIndex++;
        fieldIndex++;

        return newMesg;
    }

    private static createCapabilitiesMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Capabilities', MesgNum.Capabilities);
        fieldIndex = 0;
        newMesg.setField(new Field('Languages', 0, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('Sports', 1, 10, 1, 0, '', false, Type.SportBits0));
        fieldIndex++;
        newMesg.setField(new Field('WorkoutsSupported', 21, 140, 1, 0, '', false, Type.WorkoutCapabilities));
        fieldIndex++;
        newMesg.setField(new Field('ConnectivitySupported', 23, 140, 1, 0, '', false, Type.ConnectivityCapabilities));
        fieldIndex++;

        return newMesg;
    }

    private static createFileCapabilitiesMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('FileCapabilities', MesgNum.FileCapabilities);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Type', 0, 0, 1, 0, '', false, Type.File));
        fieldIndex++;
        newMesg.setField(new Field('Flags', 1, 10, 1, 0, '', false, Type.FileFlags));
        fieldIndex++;
        newMesg.setField(new Field('Directory', 2, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('MaxCount', 3, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxSize', 4, 134, 1, 0, 'bytes', false, Type.Uint32));
        fieldIndex++;

        return newMesg;
    }

    private static createMesgCapabilitiesMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('MesgCapabilities', MesgNum.MesgCapabilities);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('File', 0, 0, 1, 0, '', false, Type.File));
        fieldIndex++;
        newMesg.setField(new Field('MesgNum', 1, 132, 1, 0, '', false, Type.MesgNum));
        fieldIndex++;
        newMesg.setField(new Field('CountType', 2, 0, 1, 0, '', false, Type.MesgCount));
        fieldIndex++;
        newMesg.setField(new Field('Count', 3, 132, 1, 0, '', false, Type.Uint16));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('NumPerFile', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 0);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('MaxPerFile', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 1);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('MaxPerFileType', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 2);
        subfieldIndex++;
        fieldIndex++;

        return newMesg;
    }

    private static createFieldCapabilitiesMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('FieldCapabilities', MesgNum.FieldCapabilities);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('File', 0, 0, 1, 0, '', false, Type.File));
        fieldIndex++;
        newMesg.setField(new Field('MesgNum', 1, 132, 1, 0, '', false, Type.MesgNum));
        fieldIndex++;
        newMesg.setField(new Field('FieldNum', 2, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Count', 3, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createDeviceSettingsMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('DeviceSettings', MesgNum.DeviceSettings);
        fieldIndex = 0;
        newMesg.setField(new Field('ActiveTimeZone', 0, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('UtcOffset', 1, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeOffset', 2, 134, 1, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeMode', 4, 0, 1, 0, '', false, Type.TimeMode));
        fieldIndex++;
        newMesg.setField(new Field('TimeZoneOffset', 5, 1, 4, 0, 'hr', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('BacklightMode', 12, 0, 1, 0, '', false, Type.BacklightMode));
        fieldIndex++;
        newMesg.setField(new Field('ActivityTrackerEnabled', 36, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('ClockTime', 39, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('PagesEnabled', 40, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MoveAlertEnabled', 46, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('DateMode', 47, 0, 1, 0, '', false, Type.DateMode));
        fieldIndex++;
        newMesg.setField(new Field('DisplayOrientation', 55, 0, 1, 0, '', false, Type.DisplayOrientation));
        fieldIndex++;
        newMesg.setField(new Field('MountingSide', 56, 0, 1, 0, '', false, Type.Side));
        fieldIndex++;
        newMesg.setField(new Field('DefaultPage', 57, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AutosyncMinSteps', 58, 132, 1, 0, 'steps', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AutosyncMinTime', 59, 132, 1, 0, 'minutes', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('LactateThresholdAutodetectEnabled', 80, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('BleAutoUploadEnabled', 86, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('AutoSyncFrequency', 89, 0, 1, 0, '', false, Type.AutoSyncFrequency));
        fieldIndex++;
        newMesg.setField(new Field('AutoActivityDetect', 90, 134, 1, 0, '', false, Type.AutoActivityDetect));
        fieldIndex++;
        newMesg.setField(new Field('NumberOfScreens', 94, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('SmartNotificationDisplayOrientation', 95, 0, 1, 0, '', false, Type.DisplayOrientation));
        fieldIndex++;
        newMesg.setField(new Field('TapInterface', 134, 0, 1, 0, '', false, Type.Switch));
        fieldIndex++;

        return newMesg;
    }

    private static createUserProfileMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('UserProfile', MesgNum.UserProfile);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('FriendlyName', 0, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Gender', 1, 0, 1, 0, '', false, Type.Gender));
        fieldIndex++;
        newMesg.setField(new Field('Age', 2, 2, 1, 0, 'years', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Height', 3, 2, 100, 0, 'm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Weight', 4, 132, 10, 0, 'kg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Language', 5, 0, 1, 0, '', false, Type.Language));
        fieldIndex++;
        newMesg.setField(new Field('ElevSetting', 6, 0, 1, 0, '', false, Type.DisplayMeasure));
        fieldIndex++;
        newMesg.setField(new Field('WeightSetting', 7, 0, 1, 0, '', false, Type.DisplayMeasure));
        fieldIndex++;
        newMesg.setField(new Field('RestingHeartRate', 8, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('DefaultMaxRunningHeartRate', 9, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('DefaultMaxBikingHeartRate', 10, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('DefaultMaxHeartRate', 11, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('HrSetting', 12, 0, 1, 0, '', false, Type.DisplayHeart));
        fieldIndex++;
        newMesg.setField(new Field('SpeedSetting', 13, 0, 1, 0, '', false, Type.DisplayMeasure));
        fieldIndex++;
        newMesg.setField(new Field('DistSetting', 14, 0, 1, 0, '', false, Type.DisplayMeasure));
        fieldIndex++;
        newMesg.setField(new Field('PowerSetting', 16, 0, 1, 0, '', false, Type.DisplayPower));
        fieldIndex++;
        newMesg.setField(new Field('ActivityClass', 17, 0, 1, 0, '', false, Type.ActivityClass));
        fieldIndex++;
        newMesg.setField(new Field('PositionSetting', 18, 0, 1, 0, '', false, Type.DisplayPosition));
        fieldIndex++;
        newMesg.setField(new Field('TemperatureSetting', 21, 0, 1, 0, '', false, Type.DisplayMeasure));
        fieldIndex++;
        newMesg.setField(new Field('LocalId', 22, 132, 1, 0, '', false, Type.UserLocalId));
        fieldIndex++;
        newMesg.setField(new Field('GlobalId', 23, 13, 1, 0, '', false, Type.Byte));
        fieldIndex++;
        newMesg.setField(new Field('WakeTime', 28, 134, 1, 0, '', false, Type.LocaltimeIntoDay));
        fieldIndex++;
        newMesg.setField(new Field('SleepTime', 29, 134, 1, 0, '', false, Type.LocaltimeIntoDay));
        fieldIndex++;
        newMesg.setField(new Field('HeightSetting', 30, 0, 1, 0, '', false, Type.DisplayMeasure));
        fieldIndex++;
        newMesg.setField(new Field('UserRunningStepLength', 31, 132, 1000, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('UserWalkingStepLength', 32, 132, 1000, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('DepthSetting', 47, 0, 1, 0, '', false, Type.DisplayMeasure));
        fieldIndex++;
        newMesg.setField(new Field('DiveCount', 49, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;

        return newMesg;
    }

    private static createHrmProfileMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('HrmProfile', MesgNum.HrmProfile);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Enabled', 0, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('HrmAntId', 1, 139, 1, 0, '', false, Type.Uint16z));
        fieldIndex++;
        newMesg.setField(new Field('LogHrv', 2, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('HrmAntIdTransType', 3, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;

        return newMesg;
    }

    private static createSdmProfileMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('SdmProfile', MesgNum.SdmProfile);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Enabled', 0, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('SdmAntId', 1, 139, 1, 0, '', false, Type.Uint16z));
        fieldIndex++;
        newMesg.setField(new Field('SdmCalFactor', 2, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Odometer', 3, 134, 100, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('SpeedSource', 4, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('SdmAntIdTransType', 5, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('OdometerRollover', 7, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;

        return newMesg;
    }

    private static createBikeProfileMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('BikeProfile', MesgNum.BikeProfile);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Name', 0, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Sport', 1, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('SubSport', 2, 0, 1, 0, '', false, Type.SubSport));
        fieldIndex++;
        newMesg.setField(new Field('Odometer', 3, 134, 100, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('BikeSpdAntId', 4, 139, 1, 0, '', false, Type.Uint16z));
        fieldIndex++;
        newMesg.setField(new Field('BikeCadAntId', 5, 139, 1, 0, '', false, Type.Uint16z));
        fieldIndex++;
        newMesg.setField(new Field('BikeSpdcadAntId', 6, 139, 1, 0, '', false, Type.Uint16z));
        fieldIndex++;
        newMesg.setField(new Field('BikePowerAntId', 7, 139, 1, 0, '', false, Type.Uint16z));
        fieldIndex++;
        newMesg.setField(new Field('CustomWheelsize', 8, 132, 1000, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AutoWheelsize', 9, 132, 1000, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('BikeWeight', 10, 132, 10, 0, 'kg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('PowerCalFactor', 11, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AutoWheelCal', 12, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('AutoPowerZero', 13, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('Id', 14, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('SpdEnabled', 15, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('CadEnabled', 16, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('SpdcadEnabled', 17, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('PowerEnabled', 18, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('CrankLength', 19, 2, 2, -110, 'mm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Enabled', 20, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('BikeSpdAntIdTransType', 21, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('BikeCadAntIdTransType', 22, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('BikeSpdcadAntIdTransType', 23, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('BikePowerAntIdTransType', 24, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('OdometerRollover', 37, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('FrontGearNum', 38, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('FrontGear', 39, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('RearGearNum', 40, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('RearGear', 41, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('ShimanoDi2Enabled', 44, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;

        return newMesg;
    }

    private static createConnectivityMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Connectivity', MesgNum.Connectivity);
        fieldIndex = 0;
        newMesg.setField(new Field('BluetoothEnabled', 0, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('BluetoothLeEnabled', 1, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('AntEnabled', 2, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('Name', 3, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('LiveTrackingEnabled', 4, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('WeatherConditionsEnabled', 5, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('WeatherAlertsEnabled', 6, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('AutoActivityUploadEnabled', 7, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('CourseDownloadEnabled', 8, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('WorkoutDownloadEnabled', 9, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('GpsEphemerisDownloadEnabled', 10, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('IncidentDetectionEnabled', 11, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('GrouptrackEnabled', 12, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;

        return newMesg;
    }

    private static createWatchfaceSettingsMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('WatchfaceSettings', MesgNum.WatchfaceSettings);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Mode', 0, 0, 1, 0, '', false, Type.WatchfaceMode));
        fieldIndex++;
        newMesg.setField(new Field('Layout', 1, 13, 1, 0, '', false, Type.Byte));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DigitalLayout', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 0);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AnalogLayout', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 1);
        subfieldIndex++;
        fieldIndex++;

        return newMesg;
    }

    private static createOhrSettingsMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('OhrSettings', MesgNum.OhrSettings);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Enabled', 0, 0, 1, 0, '', false, Type.Switch));
        fieldIndex++;

        return newMesg;
    }

    private static createZonesTargetMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('ZonesTarget', MesgNum.ZonesTarget);
        fieldIndex = 0;
        newMesg.setField(new Field('MaxHeartRate', 1, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('ThresholdHeartRate', 2, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('FunctionalThresholdPower', 3, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('HrCalcType', 5, 0, 1, 0, '', false, Type.HrZoneCalc));
        fieldIndex++;
        newMesg.setField(new Field('PwrCalcType', 7, 0, 1, 0, '', false, Type.PwrZoneCalc));
        fieldIndex++;

        return newMesg;
    }

    private static createSportMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Sport', MesgNum.Sport);
        fieldIndex = 0;
        newMesg.setField(new Field('Sport', 0, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('SubSport', 1, 0, 1, 0, '', false, Type.SubSport));
        fieldIndex++;
        newMesg.setField(new Field('Name', 3, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createHrZoneMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('HrZone', MesgNum.HrZone);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('HighBpm', 1, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Name', 2, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createSpeedZoneMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('SpeedZone', MesgNum.SpeedZone);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('HighValue', 0, 132, 1000, 0, 'm/s', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Name', 1, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createCadenceZoneMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('CadenceZone', MesgNum.CadenceZone);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('HighValue', 0, 2, 1, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Name', 1, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createPowerZoneMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('PowerZone', MesgNum.PowerZone);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('HighValue', 1, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Name', 2, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createMetZoneMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('MetZone', MesgNum.MetZone);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('HighBpm', 1, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Calories', 2, 132, 10, 0, 'kcal / min', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('FatCalories', 3, 2, 10, 0, 'kcal / min', false, Type.Uint8));
        fieldIndex++;

        return newMesg;
    }

    private static createDiveSettingsMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('DiveSettings', MesgNum.DiveSettings);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Name', 0, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Model', 1, 0, 1, 0, '', false, Type.TissueModelType));
        fieldIndex++;
        newMesg.setField(new Field('GfLow', 2, 2, 1, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('GfHigh', 3, 2, 1, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('WaterType', 4, 0, 1, 0, '', false, Type.WaterType));
        fieldIndex++;
        newMesg.setField(new Field('WaterDensity', 5, 136, 1, 0, 'kg/m^3', false, Type.Float32));
        fieldIndex++;
        newMesg.setField(new Field('Po2Warn', 6, 2, 100, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Po2Critical', 7, 2, 100, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Po2Deco', 8, 2, 100, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('SafetyStopEnabled', 9, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('BottomDepth', 10, 136, 1, 0, '', false, Type.Float32));
        fieldIndex++;
        newMesg.setField(new Field('BottomTime', 11, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('ApneaCountdownEnabled', 12, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('ApneaCountdownTime', 13, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('BacklightMode', 14, 0, 1, 0, '', false, Type.DiveBacklightMode));
        fieldIndex++;
        newMesg.setField(new Field('BacklightBrightness', 15, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('BacklightTimeout', 16, 2, 1, 0, '', false, Type.BacklightTimeout));
        fieldIndex++;
        newMesg.setField(new Field('RepeatDiveInterval', 17, 132, 1, 0, 's', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SafetyStopTime', 18, 132, 1, 0, 's', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('HeartRateSourceType', 19, 0, 1, 0, '', false, Type.SourceType));
        fieldIndex++;
        newMesg.setField(new Field('HeartRateSource', 20, 2, 1, 0, '', false, Type.Uint8));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('HeartRateAntplusDeviceType', 2, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(19, 1);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('HeartRateLocalDeviceType', 2, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(19, 5);
        subfieldIndex++;
        fieldIndex++;

        return newMesg;
    }

    private static createDiveAlarmMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('DiveAlarm', MesgNum.DiveAlarm);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Depth', 0, 134, 1000, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Time', 1, 133, 1, 0, 's', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('Enabled', 2, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('AlarmType', 3, 0, 1, 0, '', false, Type.DiveAlarmType));
        fieldIndex++;
        newMesg.setField(new Field('Sound', 4, 0, 1, 0, '', false, Type.Tone));
        fieldIndex++;
        newMesg.setField(new Field('DiveTypes', 5, 0, 1, 0, '', false, Type.SubSport));
        fieldIndex++;

        return newMesg;
    }

    private static createDiveGasMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('DiveGas', MesgNum.DiveGas);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('HeliumContent', 0, 2, 1, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('OxygenContent', 1, 2, 1, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Status', 2, 0, 1, 0, '', false, Type.DiveGasStatus));
        fieldIndex++;

        return newMesg;
    }

    private static createGoalMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Goal', MesgNum.Goal);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Sport', 0, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('SubSport', 1, 0, 1, 0, '', false, Type.SubSport));
        fieldIndex++;
        newMesg.setField(new Field('StartDate', 2, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('EndDate', 3, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Type', 4, 0, 1, 0, '', false, Type.Goal));
        fieldIndex++;
        newMesg.setField(new Field('Value', 5, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Repeat', 6, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('TargetValue', 7, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Recurrence', 8, 0, 1, 0, '', false, Type.GoalRecurrence));
        fieldIndex++;
        newMesg.setField(new Field('RecurrenceValue', 9, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Enabled', 10, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('Source', 11, 0, 1, 0, '', false, Type.GoalSource));
        fieldIndex++;

        return newMesg;
    }

    private static createActivityMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Activity', MesgNum.Activity);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TotalTimerTime', 0, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('NumSessions', 1, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Type', 2, 0, 1, 0, '', false, Type.Activity));
        fieldIndex++;
        newMesg.setField(new Field('Event', 3, 0, 1, 0, '', false, Type.Event));
        fieldIndex++;
        newMesg.setField(new Field('EventType', 4, 0, 1, 0, '', false, Type.EventType));
        fieldIndex++;
        newMesg.setField(new Field('LocalTimestamp', 5, 134, 1, 0, '', false, Type.LocalDateTime));
        fieldIndex++;
        newMesg.setField(new Field('EventGroup', 6, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;

        return newMesg;
    }

    private static createSessionMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Session', MesgNum.Session);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Event', 0, 0, 1, 0, '', false, Type.Event));
        fieldIndex++;
        newMesg.setField(new Field('EventType', 1, 0, 1, 0, '', false, Type.EventType));
        fieldIndex++;
        newMesg.setField(new Field('StartTime', 2, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('StartPositionLat', 3, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('StartPositionLong', 4, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('Sport', 5, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('SubSport', 6, 0, 1, 0, '', false, Type.SubSport));
        fieldIndex++;
        newMesg.setField(new Field('TotalElapsedTime', 7, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalTimerTime', 8, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalDistance', 9, 134, 100, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalCycles', 10, 134, 1, 0, 'cycles', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TotalStrides', 134, 1, 0, 'strides'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 11);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('TotalCalories', 11, 132, 1, 0, 'kcal', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalFatCalories', 13, 132, 1, 0, 'kcal', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgSpeed', 14, 132, 1000, 0, 'm/s', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(124, false, 16, 1000, 0)); // enhanced_avg_speed
        fieldIndex++;
        newMesg.setField(new Field('MaxSpeed', 15, 132, 1000, 0, 'm/s', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(125, false, 16, 1000, 0)); // enhanced_max_speed
        fieldIndex++;
        newMesg.setField(new Field('AvgHeartRate', 16, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxHeartRate', 17, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgCadence', 18, 2, 1, 0, 'rpm', false, Type.Uint8));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AvgRunningCadence', 2, 1, 0, 'strides/min'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 1);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('MaxCadence', 19, 2, 1, 0, 'rpm', false, Type.Uint8));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('MaxRunningCadence', 2, 1, 0, 'strides/min'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 1);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('AvgPower', 20, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPower', 21, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalAscent', 22, 132, 1, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalDescent', 23, 132, 1, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalTrainingEffect', 24, 2, 10, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('FirstLapIndex', 25, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('NumLaps', 26, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('EventGroup', 27, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Trigger', 28, 0, 1, 0, '', false, Type.SessionTrigger));
        fieldIndex++;
        newMesg.setField(new Field('NecLat', 29, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('NecLong', 30, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('SwcLat', 31, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('SwcLong', 32, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('NormalizedPower', 34, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TrainingStressScore', 35, 132, 10, 0, 'tss', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('IntensityFactor', 36, 132, 1000, 0, 'if', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('LeftRightBalance', 37, 132, 1, 0, '', false, Type.LeftRightBalance100));
        fieldIndex++;
        newMesg.setField(new Field('AvgStrokeCount', 41, 134, 10, 0, 'strokes/lap', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('AvgStrokeDistance', 42, 132, 100, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SwimStroke', 43, 0, 1, 0, 'swim_stroke', false, Type.SwimStroke));
        fieldIndex++;
        newMesg.setField(new Field('PoolLength', 44, 132, 100, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ThresholdPower', 45, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('PoolLengthUnit', 46, 0, 1, 0, '', false, Type.DisplayMeasure));
        fieldIndex++;
        newMesg.setField(new Field('NumActiveLengths', 47, 132, 1, 0, 'lengths', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalWork', 48, 134, 1, 0, 'J', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('AvgAltitude', 49, 132, 5, 500, 'm', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(126, false, 16, 5, 500)); // enhanced_avg_altitude
        fieldIndex++;
        newMesg.setField(new Field('MaxAltitude', 50, 132, 5, 500, 'm', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(128, false, 16, 5, 500)); // enhanced_max_altitude
        fieldIndex++;
        newMesg.setField(new Field('GpsAccuracy', 51, 2, 1, 0, 'm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgGrade', 52, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgPosGrade', 53, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgNegGrade', 54, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPosGrade', 55, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxNegGrade', 56, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgTemperature', 57, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxTemperature', 58, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('TotalMovingTime', 59, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('AvgPosVerticalSpeed', 60, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgNegVerticalSpeed', 61, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPosVerticalSpeed', 62, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxNegVerticalSpeed', 63, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MinHeartRate', 64, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('TimeInHrZone', 65, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeInSpeedZone', 66, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeInCadenceZone', 67, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeInPowerZone', 68, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('AvgLapTime', 69, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('BestLapIndex', 70, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MinAltitude', 71, 132, 5, 500, 'm', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(127, false, 16, 5, 500)); // enhanced_min_altitude
        fieldIndex++;
        newMesg.setField(new Field('PlayerScore', 82, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('OpponentScore', 83, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('OpponentName', 84, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('StrokeCount', 85, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ZoneCount', 86, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxBallSpeed', 87, 132, 100, 0, 'm/s', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgBallSpeed', 88, 132, 100, 0, 'm/s', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgVerticalOscillation', 89, 132, 10, 0, 'mm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgStanceTimePercent', 90, 132, 100, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgStanceTime', 91, 132, 10, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgFractionalCadence', 92, 2, 128, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxFractionalCadence', 93, 2, 128, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('TotalFractionalCycles', 94, 2, 128, 0, 'cycles', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgTotalHemoglobinConc', 95, 132, 100, 0, 'g/dL', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MinTotalHemoglobinConc', 96, 132, 100, 0, 'g/dL', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxTotalHemoglobinConc', 97, 132, 100, 0, 'g/dL', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgSaturatedHemoglobinPercent', 98, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MinSaturatedHemoglobinPercent', 99, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxSaturatedHemoglobinPercent', 100, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftTorqueEffectiveness', 101, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightTorqueEffectiveness', 102, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPedalSmoothness', 103, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPedalSmoothness', 104, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgCombinedPedalSmoothness', 105, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('SportIndex', 111, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('TimeStanding', 112, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('StandCount', 113, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPco', 114, 1, 1, 0, 'mm', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPco', 115, 1, 1, 0, 'mm', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPowerPhase', 116, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPowerPhasePeak', 117, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPowerPhase', 118, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPowerPhasePeak', 119, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgPowerPosition', 120, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPowerPosition', 121, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgCadencePosition', 122, 2, 1, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxCadencePosition', 123, 2, 1, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedAvgSpeed', 124, 134, 1000, 0, 'm/s', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedMaxSpeed', 125, 134, 1000, 0, 'm/s', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedAvgAltitude', 126, 134, 5, 500, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedMinAltitude', 127, 134, 5, 500, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedMaxAltitude', 128, 134, 5, 500, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('AvgLevMotorPower', 129, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxLevMotorPower', 130, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('LevBatteryConsumption', 131, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgVerticalRatio', 132, 132, 100, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgStanceTimeBalance', 133, 132, 100, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgStepLength', 134, 132, 10, 0, 'mm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalAnaerobicTrainingEffect', 137, 2, 10, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgVam', 139, 132, 1000, 0, 'm/s', false, Type.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createLapMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Lap', MesgNum.Lap);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Event', 0, 0, 1, 0, '', false, Type.Event));
        fieldIndex++;
        newMesg.setField(new Field('EventType', 1, 0, 1, 0, '', false, Type.EventType));
        fieldIndex++;
        newMesg.setField(new Field('StartTime', 2, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('StartPositionLat', 3, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('StartPositionLong', 4, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('EndPositionLat', 5, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('EndPositionLong', 6, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalElapsedTime', 7, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalTimerTime', 8, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalDistance', 9, 134, 100, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalCycles', 10, 134, 1, 0, 'cycles', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TotalStrides', 134, 1, 0, 'strides'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 11);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('TotalCalories', 11, 132, 1, 0, 'kcal', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalFatCalories', 12, 132, 1, 0, 'kcal', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgSpeed', 13, 132, 1000, 0, 'm/s', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(110, false, 16, 1000, 0)); // enhanced_avg_speed
        fieldIndex++;
        newMesg.setField(new Field('MaxSpeed', 14, 132, 1000, 0, 'm/s', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(111, false, 16, 1000, 0)); // enhanced_max_speed
        fieldIndex++;
        newMesg.setField(new Field('AvgHeartRate', 15, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxHeartRate', 16, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgCadence', 17, 2, 1, 0, 'rpm', false, Type.Uint8));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AvgRunningCadence', 2, 1, 0, 'strides/min'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 1);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('MaxCadence', 18, 2, 1, 0, 'rpm', false, Type.Uint8));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('MaxRunningCadence', 2, 1, 0, 'strides/min'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 1);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('AvgPower', 19, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPower', 20, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalAscent', 21, 132, 1, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalDescent', 22, 132, 1, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Intensity', 23, 0, 1, 0, '', false, Type.Intensity));
        fieldIndex++;
        newMesg.setField(new Field('LapTrigger', 24, 0, 1, 0, '', false, Type.LapTrigger));
        fieldIndex++;
        newMesg.setField(new Field('Sport', 25, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('EventGroup', 26, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('NumLengths', 32, 132, 1, 0, 'lengths', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('NormalizedPower', 33, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('LeftRightBalance', 34, 132, 1, 0, '', false, Type.LeftRightBalance100));
        fieldIndex++;
        newMesg.setField(new Field('FirstLengthIndex', 35, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgStrokeDistance', 37, 132, 100, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SwimStroke', 38, 0, 1, 0, '', false, Type.SwimStroke));
        fieldIndex++;
        newMesg.setField(new Field('SubSport', 39, 0, 1, 0, '', false, Type.SubSport));
        fieldIndex++;
        newMesg.setField(new Field('NumActiveLengths', 40, 132, 1, 0, 'lengths', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalWork', 41, 134, 1, 0, 'J', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('AvgAltitude', 42, 132, 5, 500, 'm', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(112, false, 16, 5, 500)); // enhanced_avg_altitude
        fieldIndex++;
        newMesg.setField(new Field('MaxAltitude', 43, 132, 5, 500, 'm', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(114, false, 16, 5, 500)); // enhanced_max_altitude
        fieldIndex++;
        newMesg.setField(new Field('GpsAccuracy', 44, 2, 1, 0, 'm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgGrade', 45, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgPosGrade', 46, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgNegGrade', 47, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPosGrade', 48, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxNegGrade', 49, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgTemperature', 50, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxTemperature', 51, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('TotalMovingTime', 52, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('AvgPosVerticalSpeed', 53, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgNegVerticalSpeed', 54, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPosVerticalSpeed', 55, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxNegVerticalSpeed', 56, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('TimeInHrZone', 57, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeInSpeedZone', 58, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeInCadenceZone', 59, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeInPowerZone', 60, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('RepetitionNum', 61, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MinAltitude', 62, 132, 5, 500, 'm', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(113, false, 16, 5, 500)); // enhanced_min_altitude
        fieldIndex++;
        newMesg.setField(new Field('MinHeartRate', 63, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('WktStepIndex', 71, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('OpponentScore', 74, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('StrokeCount', 75, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ZoneCount', 76, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgVerticalOscillation', 77, 132, 10, 0, 'mm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgStanceTimePercent', 78, 132, 100, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgStanceTime', 79, 132, 10, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgFractionalCadence', 80, 2, 128, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxFractionalCadence', 81, 2, 128, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('TotalFractionalCycles', 82, 2, 128, 0, 'cycles', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('PlayerScore', 83, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgTotalHemoglobinConc', 84, 132, 100, 0, 'g/dL', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MinTotalHemoglobinConc', 85, 132, 100, 0, 'g/dL', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxTotalHemoglobinConc', 86, 132, 100, 0, 'g/dL', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgSaturatedHemoglobinPercent', 87, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MinSaturatedHemoglobinPercent', 88, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxSaturatedHemoglobinPercent', 89, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftTorqueEffectiveness', 91, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightTorqueEffectiveness', 92, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPedalSmoothness', 93, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPedalSmoothness', 94, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgCombinedPedalSmoothness', 95, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('TimeStanding', 98, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('StandCount', 99, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPco', 100, 1, 1, 0, 'mm', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPco', 101, 1, 1, 0, 'mm', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPowerPhase', 102, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPowerPhasePeak', 103, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPowerPhase', 104, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPowerPhasePeak', 105, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgPowerPosition', 106, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPowerPosition', 107, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgCadencePosition', 108, 2, 1, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxCadencePosition', 109, 2, 1, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedAvgSpeed', 110, 134, 1000, 0, 'm/s', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedMaxSpeed', 111, 134, 1000, 0, 'm/s', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedAvgAltitude', 112, 134, 5, 500, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedMinAltitude', 113, 134, 5, 500, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedMaxAltitude', 114, 134, 5, 500, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('AvgLevMotorPower', 115, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxLevMotorPower', 116, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('LevBatteryConsumption', 117, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgVerticalRatio', 118, 132, 100, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgStanceTimeBalance', 119, 132, 100, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgStepLength', 120, 132, 10, 0, 'mm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgVam', 121, 132, 1000, 0, 'm/s', false, Type.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createLengthMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Length', MesgNum.Length);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Event', 0, 0, 1, 0, '', false, Type.Event));
        fieldIndex++;
        newMesg.setField(new Field('EventType', 1, 0, 1, 0, '', false, Type.EventType));
        fieldIndex++;
        newMesg.setField(new Field('StartTime', 2, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TotalElapsedTime', 3, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalTimerTime', 4, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalStrokes', 5, 132, 1, 0, 'strokes', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgSpeed', 6, 132, 1000, 0, 'm/s', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SwimStroke', 7, 0, 1, 0, 'swim_stroke', false, Type.SwimStroke));
        fieldIndex++;
        newMesg.setField(new Field('AvgSwimmingCadence', 9, 2, 1, 0, 'strokes/min', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('EventGroup', 10, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('TotalCalories', 11, 132, 1, 0, 'kcal', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('LengthType', 12, 0, 1, 0, '', false, Type.LengthType));
        fieldIndex++;
        newMesg.setField(new Field('PlayerScore', 18, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('OpponentScore', 19, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('StrokeCount', 20, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ZoneCount', 21, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createRecordMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Record', MesgNum.Record);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('PositionLat', 0, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('PositionLong', 1, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('Altitude', 2, 132, 5, 500, 'm', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(78, false, 16, 5, 500)); // enhanced_altitude
        fieldIndex++;
        newMesg.setField(new Field('HeartRate', 3, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Cadence', 4, 2, 1, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Distance', 5, 134, 100, 0, 'm', true, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Speed', 6, 132, 1000, 0, 'm/s', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(73, false, 16, 1000, 0)); // enhanced_speed
        fieldIndex++;
        newMesg.setField(new Field('Power', 7, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('CompressedSpeedDistance', 8, 13, 1, 0, '', false, Type.Byte));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(6, false, 12, 100, 0)); // speed
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(5, true, 12, 16, 0)); // distance
        fieldIndex++;
        newMesg.setField(new Field('Grade', 9, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('Resistance', 10, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('TimeFromCourse', 11, 133, 1000, 0, 's', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('CycleLength', 12, 2, 100, 0, 'm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Temperature', 13, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('Speed1s', 17, 2, 16, 0, 'm/s', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Cycles', 18, 2, 1, 0, 'cycles', false, Type.Uint8));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(19, true, 8, 1, 0)); // total_cycles
        fieldIndex++;
        newMesg.setField(new Field('TotalCycles', 19, 134, 1, 0, 'cycles', true, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('CompressedAccumulatedPower', 28, 132, 1, 0, 'watts', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(29, true, 16, 1, 0)); // accumulated_power
        fieldIndex++;
        newMesg.setField(new Field('AccumulatedPower', 29, 134, 1, 0, 'watts', true, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('LeftRightBalance', 30, 2, 1, 0, '', false, Type.LeftRightBalance));
        fieldIndex++;
        newMesg.setField(new Field('GpsAccuracy', 31, 2, 1, 0, 'm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('VerticalSpeed', 32, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('Calories', 33, 132, 1, 0, 'kcal', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('VerticalOscillation', 39, 132, 10, 0, 'mm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('StanceTimePercent', 40, 132, 100, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('StanceTime', 41, 132, 10, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ActivityType', 42, 0, 1, 0, '', false, Type.ActivityType));
        fieldIndex++;
        newMesg.setField(new Field('LeftTorqueEffectiveness', 43, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('RightTorqueEffectiveness', 44, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('LeftPedalSmoothness', 45, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('RightPedalSmoothness', 46, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('CombinedPedalSmoothness', 47, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Time128', 48, 2, 128, 0, 's', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('StrokeType', 49, 0, 1, 0, '', false, Type.StrokeType));
        fieldIndex++;
        newMesg.setField(new Field('Zone', 50, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('BallSpeed', 51, 132, 100, 0, 'm/s', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Cadence256', 52, 132, 256, 0, 'rpm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('FractionalCadence', 53, 2, 128, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('TotalHemoglobinConc', 54, 132, 100, 0, 'g/dL', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalHemoglobinConcMin', 55, 132, 100, 0, 'g/dL', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalHemoglobinConcMax', 56, 132, 100, 0, 'g/dL', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SaturatedHemoglobinPercent', 57, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SaturatedHemoglobinPercentMin', 58, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SaturatedHemoglobinPercentMax', 59, 132, 10, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('DeviceIndex', 62, 2, 1, 0, '', false, Type.DeviceIndex));
        fieldIndex++;
        newMesg.setField(new Field('LeftPco', 67, 1, 1, 0, 'mm', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('RightPco', 68, 1, 1, 0, 'mm', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('LeftPowerPhase', 69, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('LeftPowerPhasePeak', 70, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('RightPowerPhase', 71, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('RightPowerPhasePeak', 72, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedSpeed', 73, 134, 1000, 0, 'm/s', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedAltitude', 78, 134, 5, 500, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('BatterySoc', 81, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MotorPower', 82, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('VerticalRatio', 83, 132, 100, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('StanceTimeBalance', 84, 132, 100, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('StepLength', 85, 132, 10, 0, 'mm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AbsolutePressure', 91, 134, 1, 0, 'Pa', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Depth', 92, 134, 1000, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('NextStopDepth', 93, 134, 1000, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('NextStopTime', 94, 134, 1, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeToSurface', 95, 134, 1, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('NdlTime', 96, 134, 1, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('CnsLoad', 97, 2, 1, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('N2Load', 98, 132, 1, 0, 'percent', false, Type.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createEventMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Event', MesgNum.Event);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Event', 0, 0, 1, 0, '', false, Type.Event));
        fieldIndex++;
        newMesg.setField(new Field('EventType', 1, 0, 1, 0, '', false, Type.EventType));
        fieldIndex++;
        newMesg.setField(new Field('Data16', 2, 132, 1, 0, '', false, Type.Uint16));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(3, false, 16, 1, 0)); // data
        fieldIndex++;
        newMesg.setField(new Field('Data', 3, 134, 1, 0, '', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TimerTrigger', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 0);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CoursePointIndex', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 10);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('BatteryLevel', 132, 1000, 0, 'V'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 11);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('VirtualPartnerSpeed', 132, 1000, 0, 'm/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 12);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('HrHighAlert', 2, 1, 0, 'bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 13);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('HrLowAlert', 2, 1, 0, 'bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 14);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('SpeedHighAlert', 134, 1000, 0, 'm/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 15);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('SpeedLowAlert', 134, 1000, 0, 'm/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 16);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CadHighAlert', 132, 1, 0, 'rpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 17);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CadLowAlert', 132, 1, 0, 'rpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 18);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('PowerHighAlert', 132, 1, 0, 'watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 19);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('PowerLowAlert', 132, 1, 0, 'watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 20);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TimeDurationAlert', 134, 1000, 0, 's'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 23);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DistanceDurationAlert', 134, 100, 0, 'm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 24);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CalorieDurationAlert', 134, 1, 0, 'calories'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 25);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FitnessEquipmentState', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 27);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('SportPoint', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 33);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(7, false, 16, 1, 0)); // score
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(8, false, 16, 1, 0)); // opponent_score
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GearChangeData', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 42);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 43);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(11, false, 8, 1, 0)); // rear_gear_num
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(12, false, 8, 1, 0)); // rear_gear
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(9, false, 8, 1, 0)); // front_gear_num
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addComponent(new FieldComponent(10, false, 8, 1, 0)); // front_gear
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RiderPosition', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 44);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CommTimeout', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 47);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('EventGroup', 4, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Score', 7, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('OpponentScore', 8, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('FrontGearNum', 9, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('FrontGear', 10, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('RearGearNum', 11, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('RearGear', 12, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('DeviceIndex', 13, 2, 1, 0, '', false, Type.DeviceIndex));
        fieldIndex++;

        return newMesg;
    }

    private static createDeviceInfoMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('DeviceInfo', MesgNum.DeviceInfo);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('DeviceIndex', 0, 2, 1, 0, '', false, Type.DeviceIndex));
        fieldIndex++;
        newMesg.setField(new Field('DeviceType', 1, 2, 1, 0, '', false, Type.Uint8));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AntplusDeviceType', 2, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 1);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AntDeviceType', 2, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(25, 0);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('Manufacturer', 2, 132, 1, 0, '', false, Type.Manufacturer));
        fieldIndex++;
        newMesg.setField(new Field('SerialNumber', 3, 140, 1, 0, '', false, Type.Uint32z));
        fieldIndex++;
        newMesg.setField(new Field('Product', 4, 132, 1, 0, '', false, Type.Uint16));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FaveroProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 263);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GarminProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 15);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(2, 13);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('SoftwareVersion', 5, 132, 100, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('HardwareVersion', 6, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('CumOperatingTime', 7, 134, 1, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('BatteryVoltage', 10, 132, 256, 0, 'V', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('BatteryStatus', 11, 2, 1, 0, '', false, Type.BatteryStatus));
        fieldIndex++;
        newMesg.setField(new Field('SensorPosition', 18, 0, 1, 0, '', false, Type.BodyLocation));
        fieldIndex++;
        newMesg.setField(new Field('Descriptor', 19, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('AntTransmissionType', 20, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('AntDeviceNumber', 21, 139, 1, 0, '', false, Type.Uint16z));
        fieldIndex++;
        newMesg.setField(new Field('AntNetwork', 22, 0, 1, 0, '', false, Type.AntNetwork));
        fieldIndex++;
        newMesg.setField(new Field('SourceType', 25, 0, 1, 0, '', false, Type.SourceType));
        fieldIndex++;
        newMesg.setField(new Field('ProductName', 27, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createTrainingFileMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('TrainingFile', MesgNum.TrainingFile);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Type', 0, 0, 1, 0, '', false, Type.File));
        fieldIndex++;
        newMesg.setField(new Field('Manufacturer', 1, 132, 1, 0, '', false, Type.Manufacturer));
        fieldIndex++;
        newMesg.setField(new Field('Product', 2, 132, 1, 0, '', false, Type.Uint16));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FaveroProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 263);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GarminProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 15);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 13);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('SerialNumber', 3, 140, 1, 0, '', false, Type.Uint32z));
        fieldIndex++;
        newMesg.setField(new Field('TimeCreated', 4, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;

        return newMesg;
    }

    private static createHrvMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Hrv', MesgNum.Hrv);
        fieldIndex = 0;
        newMesg.setField(new Field('Time', 0, 132, 1000, 0, 's', false, Type.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createWeatherConditionsMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('WeatherConditions', MesgNum.WeatherConditions);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('WeatherReport', 0, 0, 1, 0, '', false, Type.WeatherReport));
        fieldIndex++;
        newMesg.setField(new Field('Temperature', 1, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('Condition', 2, 0, 1, 0, '', false, Type.WeatherStatus));
        fieldIndex++;
        newMesg.setField(new Field('WindDirection', 3, 132, 1, 0, 'degrees', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('WindSpeed', 4, 132, 1000, 0, 'm/s', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('PrecipitationProbability', 5, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('TemperatureFeelsLike', 6, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('RelativeHumidity', 7, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Location', 8, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('ObservedAtTime', 9, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('ObservedLocationLat', 10, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('ObservedLocationLong', 11, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('DayOfWeek', 12, 0, 1, 0, '', false, Type.DayOfWeek));
        fieldIndex++;
        newMesg.setField(new Field('HighTemperature', 13, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('LowTemperature', 14, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;

        return newMesg;
    }

    private static createWeatherAlertMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('WeatherAlert', MesgNum.WeatherAlert);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('ReportId', 0, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('IssueTime', 1, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('ExpireTime', 2, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Severity', 3, 0, 1, 0, '', false, Type.WeatherSeverity));
        fieldIndex++;
        newMesg.setField(new Field('Type', 4, 0, 1, 0, '', false, Type.WeatherSevereType));
        fieldIndex++;

        return newMesg;
    }

    private static createGpsMetadataMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('GpsMetadata', MesgNum.GpsMetadata);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 0, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('PositionLat', 1, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('PositionLong', 2, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedAltitude', 3, 134, 5, 500, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EnhancedSpeed', 4, 134, 1000, 0, 'm/s', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Heading', 5, 132, 100, 0, 'degrees', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('UtcTimestamp', 6, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Velocity', 7, 131, 100, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;

        return newMesg;
    }

    private static createCameraEventMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('CameraEvent', MesgNum.CameraEvent);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 0, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('CameraEventType', 1, 0, 1, 0, '', false, Type.CameraEventType));
        fieldIndex++;
        newMesg.setField(new Field('CameraFileUuid', 2, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('CameraOrientation', 3, 0, 1, 0, '', false, Type.CameraOrientationType));
        fieldIndex++;

        return newMesg;
    }

    private static createGyroscopeDataMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('GyroscopeData', MesgNum.GyroscopeData);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 0, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SampleTimeOffset', 1, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('GyroX', 2, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('GyroY', 3, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('GyroZ', 4, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('CalibratedGyroX', 5, 136, 1, 0, 'deg/s', false, Type.Float32));
        fieldIndex++;
        newMesg.setField(new Field('CalibratedGyroY', 6, 136, 1, 0, 'deg/s', false, Type.Float32));
        fieldIndex++;
        newMesg.setField(new Field('CalibratedGyroZ', 7, 136, 1, 0, 'deg/s', false, Type.Float32));
        fieldIndex++;

        return newMesg;
    }

    private static createAccelerometerDataMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('AccelerometerData', MesgNum.AccelerometerData);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 0, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SampleTimeOffset', 1, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AccelX', 2, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AccelY', 3, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AccelZ', 4, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('CalibratedAccelX', 5, 136, 1, 0, 'g', false, Type.Float32));
        fieldIndex++;
        newMesg.setField(new Field('CalibratedAccelY', 6, 136, 1, 0, 'g', false, Type.Float32));
        fieldIndex++;
        newMesg.setField(new Field('CalibratedAccelZ', 7, 136, 1, 0, 'g', false, Type.Float32));
        fieldIndex++;
        newMesg.setField(new Field('CompressedCalibratedAccelX', 8, 131, 1, 0, 'mG', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('CompressedCalibratedAccelY', 9, 131, 1, 0, 'mG', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('CompressedCalibratedAccelZ', 10, 131, 1, 0, 'mG', false, Type.Sint16));
        fieldIndex++;

        return newMesg;
    }

    private static createMagnetometerDataMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('MagnetometerData', MesgNum.MagnetometerData);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 0, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SampleTimeOffset', 1, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MagX', 2, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MagY', 3, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MagZ', 4, 132, 1, 0, 'counts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('CalibratedMagX', 5, 136, 1, 0, 'G', false, Type.Float32));
        fieldIndex++;
        newMesg.setField(new Field('CalibratedMagY', 6, 136, 1, 0, 'G', false, Type.Float32));
        fieldIndex++;
        newMesg.setField(new Field('CalibratedMagZ', 7, 136, 1, 0, 'G', false, Type.Float32));
        fieldIndex++;

        return newMesg;
    }

    private static createBarometerDataMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('BarometerData', MesgNum.BarometerData);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 0, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SampleTimeOffset', 1, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('BaroPres', 2, 134, 1, 0, 'Pa', false, Type.Uint32));
        fieldIndex++;

        return newMesg;
    }

    private static createThreeDSensorCalibrationMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('ThreeDSensorCalibration', MesgNum.ThreeDSensorCalibration);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('SensorType', 0, 0, 1, 0, '', false, Type.SensorType));
        fieldIndex++;
        newMesg.setField(new Field('CalibrationFactor', 1, 134, 1, 0, '', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('AccelCalFactor', 134, 1, 0, 'g'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 0);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GyroCalFactor', 134, 1, 0, 'deg/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 1);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('CalibrationDivisor', 2, 134, 1, 0, 'counts', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('LevelShift', 3, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('OffsetCal', 4, 133, 1, 0, '', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('OrientationMatrix', 5, 133, 65535, 0, '', false, Type.Sint32));
        fieldIndex++;

        return newMesg;
    }

    private static createOneDSensorCalibrationMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('OneDSensorCalibration', MesgNum.OneDSensorCalibration);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('SensorType', 0, 0, 1, 0, '', false, Type.SensorType));
        fieldIndex++;
        newMesg.setField(new Field('CalibrationFactor', 1, 134, 1, 0, '', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('BaroCalFactor', 134, 1, 0, 'Pa'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 3);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('CalibrationDivisor', 2, 134, 1, 0, 'counts', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('LevelShift', 3, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('OffsetCal', 4, 133, 1, 0, '', false, Type.Sint32));
        fieldIndex++;

        return newMesg;
    }

    private static createVideoFrameMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('VideoFrame', MesgNum.VideoFrame);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 0, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('FrameNumber', 1, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;

        return newMesg;
    }

    private static createObdiiDataMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('ObdiiData', MesgNum.ObdiiData);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 0, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TimeOffset', 1, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Pid', 2, 13, 1, 0, '', false, Type.Byte));
        fieldIndex++;
        newMesg.setField(new Field('RawData', 3, 13, 1, 0, '', false, Type.Byte));
        fieldIndex++;
        newMesg.setField(new Field('PidDataSize', 4, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('SystemTime', 5, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('StartTimestamp', 6, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('StartTimestampMs', 7, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createNmeaSentenceMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('NmeaSentence', MesgNum.NmeaSentence);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 0, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Sentence', 1, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createAviationAttitudeMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('AviationAttitude', MesgNum.AviationAttitude);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimestampMs', 0, 132, 1, 0, 'ms', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SystemTime', 1, 134, 1, 0, 'ms', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Pitch', 2, 131, 10430.38, 0, 'radians', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('Roll', 3, 131, 10430.38, 0, 'radians', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AccelLateral', 4, 131, 100, 0, 'm/s^2', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AccelNormal', 5, 131, 100, 0, 'm/s^2', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('TurnRate', 6, 131, 1024, 0, 'radians/second', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('Stage', 7, 0, 1, 0, '', false, Type.AttitudeStage));
        fieldIndex++;
        newMesg.setField(new Field('AttitudeStageComplete', 8, 2, 1, 0, '%', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Track', 9, 132, 10430.38, 0, 'radians', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Validity', 10, 132, 1, 0, '', false, Type.AttitudeValidity));
        fieldIndex++;

        return newMesg;
    }

    private static createVideoMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Video', MesgNum.Video);
        fieldIndex = 0;
        newMesg.setField(new Field('Url', 0, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('HostingProvider', 1, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Duration', 2, 134, 1, 0, 'ms', false, Type.Uint32));
        fieldIndex++;

        return newMesg;
    }

    private static createVideoTitleMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('VideoTitle', MesgNum.VideoTitle);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('MessageCount', 0, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Text', 1, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createVideoDescriptionMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('VideoDescription', MesgNum.VideoDescription);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('MessageCount', 0, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Text', 1, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createVideoClipMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('VideoClip', MesgNum.VideoClip);
        fieldIndex = 0;
        newMesg.setField(new Field('ClipNumber', 0, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('StartTimestamp', 1, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('StartTimestampMs', 2, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('EndTimestamp', 3, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('EndTimestampMs', 4, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ClipStart', 6, 134, 1, 0, 'ms', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('ClipEnd', 7, 134, 1, 0, 'ms', false, Type.Uint32));
        fieldIndex++;

        return newMesg;
    }

    private static createSetMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Set', MesgNum.Set);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 254, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Duration', 0, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Repetitions', 3, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Weight', 4, 132, 16, 0, 'kg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('SetType', 5, 2, 1, 0, '', false, Type.SetType));
        fieldIndex++;
        newMesg.setField(new Field('StartTime', 6, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Category', 7, 132, 1, 0, '', false, Type.ExerciseCategory));
        fieldIndex++;
        newMesg.setField(new Field('CategorySubtype', 8, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('WeightDisplayUnit', 9, 132, 1, 0, '', false, Type.FitBaseUnit));
        fieldIndex++;
        newMesg.setField(new Field('MessageIndex', 10, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('WktStepIndex', 11, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;

        return newMesg;
    }

    private static createCourseMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Course', MesgNum.Course);
        fieldIndex = 0;
        newMesg.setField(new Field('Sport', 4, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('Name', 5, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Capabilities', 6, 140, 1, 0, '', false, Type.CourseCapabilities));
        fieldIndex++;
        newMesg.setField(new Field('SubSport', 7, 0, 1, 0, '', false, Type.SubSport));
        fieldIndex++;

        return newMesg;
    }

    private static createCoursePointMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('CoursePoint', MesgNum.CoursePoint);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Timestamp', 1, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('PositionLat', 2, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('PositionLong', 3, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('Distance', 4, 134, 100, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Type', 5, 0, 1, 0, '', false, Type.CoursePoint));
        fieldIndex++;
        newMesg.setField(new Field('Name', 6, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Favorite', 8, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;

        return newMesg;
    }

    private static createSegmentIdMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('SegmentId', MesgNum.SegmentId);
        fieldIndex = 0;
        newMesg.setField(new Field('Name', 0, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Uuid', 1, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Sport', 2, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('Enabled', 3, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('UserProfilePrimaryKey', 4, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('DeviceId', 5, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('DefaultRaceLeader', 6, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('DeleteStatus', 7, 0, 1, 0, '', false, Type.SegmentDeleteStatus));
        fieldIndex++;
        newMesg.setField(new Field('SelectionType', 8, 0, 1, 0, '', false, Type.SegmentSelectionType));
        fieldIndex++;

        return newMesg;
    }

    private static createSegmentLeaderboardEntryMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('SegmentLeaderboardEntry', MesgNum.SegmentLeaderboardEntry);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Name', 0, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Type', 1, 0, 1, 0, '', false, Type.SegmentLeaderboardType));
        fieldIndex++;
        newMesg.setField(new Field('GroupPrimaryKey', 2, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('ActivityId', 3, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('SegmentTime', 4, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('ActivityIdString', 5, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createSegmentPointMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('SegmentPoint', MesgNum.SegmentPoint);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('PositionLat', 1, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('PositionLong', 2, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('Distance', 3, 134, 100, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Altitude', 4, 132, 5, 500, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('LeaderTime', 5, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;

        return newMesg;
    }

    private static createSegmentLapMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('SegmentLap', MesgNum.SegmentLap);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Event', 0, 0, 1, 0, '', false, Type.Event));
        fieldIndex++;
        newMesg.setField(new Field('EventType', 1, 0, 1, 0, '', false, Type.EventType));
        fieldIndex++;
        newMesg.setField(new Field('StartTime', 2, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('StartPositionLat', 3, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('StartPositionLong', 4, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('EndPositionLat', 5, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('EndPositionLong', 6, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalElapsedTime', 7, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalTimerTime', 8, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalDistance', 9, 134, 100, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TotalCycles', 10, 134, 1, 0, 'cycles', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TotalStrokes', 134, 1, 0, 'strokes'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(23, 2);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('TotalCalories', 11, 132, 1, 0, 'kcal', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalFatCalories', 12, 132, 1, 0, 'kcal', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgSpeed', 13, 132, 1000, 0, 'm/s', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxSpeed', 14, 132, 1000, 0, 'm/s', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgHeartRate', 15, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxHeartRate', 16, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgCadence', 17, 2, 1, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxCadence', 18, 2, 1, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgPower', 19, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPower', 20, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalAscent', 21, 132, 1, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TotalDescent', 22, 132, 1, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Sport', 23, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('EventGroup', 24, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('NecLat', 25, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('NecLong', 26, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('SwcLat', 27, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('SwcLong', 28, 133, 1, 0, 'semicircles', false, Type.Sint32));
        fieldIndex++;
        newMesg.setField(new Field('Name', 29, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('NormalizedPower', 30, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('LeftRightBalance', 31, 132, 1, 0, '', false, Type.LeftRightBalance100));
        fieldIndex++;
        newMesg.setField(new Field('SubSport', 32, 0, 1, 0, '', false, Type.SubSport));
        fieldIndex++;
        newMesg.setField(new Field('TotalWork', 33, 134, 1, 0, 'J', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('AvgAltitude', 34, 132, 5, 500, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxAltitude', 35, 132, 5, 500, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('GpsAccuracy', 36, 2, 1, 0, 'm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgGrade', 37, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgPosGrade', 38, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgNegGrade', 39, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPosGrade', 40, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxNegGrade', 41, 131, 100, 0, '%', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgTemperature', 42, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxTemperature', 43, 1, 1, 0, 'C', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('TotalMovingTime', 44, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('AvgPosVerticalSpeed', 45, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgNegVerticalSpeed', 46, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPosVerticalSpeed', 47, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxNegVerticalSpeed', 48, 131, 1000, 0, 'm/s', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('TimeInHrZone', 49, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeInSpeedZone', 50, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeInCadenceZone', 51, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('TimeInPowerZone', 52, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('RepetitionNum', 53, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MinAltitude', 54, 132, 5, 500, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MinHeartRate', 55, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('ActiveTime', 56, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('WktStepIndex', 57, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('SportEvent', 58, 0, 1, 0, '', false, Type.SportEvent));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftTorqueEffectiveness', 59, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightTorqueEffectiveness', 60, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPedalSmoothness', 61, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPedalSmoothness', 62, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgCombinedPedalSmoothness', 63, 2, 2, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Status', 64, 0, 1, 0, '', false, Type.SegmentLapStatus));
        fieldIndex++;
        newMesg.setField(new Field('Uuid', 65, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('AvgFractionalCadence', 66, 2, 128, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxFractionalCadence', 67, 2, 128, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('TotalFractionalCycles', 68, 2, 128, 0, 'cycles', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('FrontGearShiftCount', 69, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('RearGearShiftCount', 70, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('TimeStanding', 71, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('StandCount', 72, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPco', 73, 1, 1, 0, 'mm', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPco', 74, 1, 1, 0, 'mm', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPowerPhase', 75, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgLeftPowerPhasePeak', 76, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPowerPhase', 77, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgRightPowerPhasePeak', 78, 2, 0.7111111, 0, 'degrees', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('AvgPowerPosition', 79, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MaxPowerPosition', 80, 132, 1, 0, 'watts', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('AvgCadencePosition', 81, 2, 1, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('MaxCadencePosition', 82, 2, 1, 0, 'rpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Manufacturer', 83, 132, 1, 0, '', false, Type.Manufacturer));
        fieldIndex++;

        return newMesg;
    }

    private static createSegmentFileMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('SegmentFile', MesgNum.SegmentFile);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('FileUuid', 1, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Enabled', 3, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('UserProfilePrimaryKey', 4, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('LeaderType', 7, 0, 1, 0, '', false, Type.SegmentLeaderboardType));
        fieldIndex++;
        newMesg.setField(new Field('LeaderGroupPrimaryKey', 8, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('LeaderActivityId', 9, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('LeaderActivityIdString', 10, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('DefaultRaceLeader', 11, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;

        return newMesg;
    }

    private static createWorkoutMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Workout', MesgNum.Workout);
        fieldIndex = 0;
        newMesg.setField(new Field('Sport', 4, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('Capabilities', 5, 140, 1, 0, '', false, Type.WorkoutCapabilities));
        fieldIndex++;
        newMesg.setField(new Field('NumValidSteps', 6, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('WktName', 8, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('SubSport', 11, 0, 1, 0, '', false, Type.SubSport));
        fieldIndex++;
        newMesg.setField(new Field('PoolLength', 14, 132, 100, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('PoolLengthUnit', 15, 0, 1, 0, '', false, Type.DisplayMeasure));
        fieldIndex++;

        return newMesg;
    }

    private static createWorkoutSessionMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('WorkoutSession', MesgNum.WorkoutSession);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Sport', 0, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('SubSport', 1, 0, 1, 0, '', false, Type.SubSport));
        fieldIndex++;
        newMesg.setField(new Field('NumValidSteps', 2, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('FirstStepIndex', 3, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('PoolLength', 4, 132, 100, 0, 'm', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('PoolLengthUnit', 5, 0, 1, 0, '', false, Type.DisplayMeasure));
        fieldIndex++;

        return newMesg;
    }

    private static createWorkoutStepMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('WorkoutStep', MesgNum.WorkoutStep);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('WktStepName', 0, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('DurationType', 1, 0, 1, 0, '', false, Type.WktStepDuration));
        fieldIndex++;
        newMesg.setField(new Field('DurationValue', 2, 134, 1, 0, '', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationTime', 134, 1000, 0, 's'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 0);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 28);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationDistance', 134, 100, 0, 'm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 1);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationHr', 134, 1, 0, '% or bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 2);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 3);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationCalories', 134, 1, 0, 'calories'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 4);
        subfieldIndex++;
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
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationPower', 134, 1, 0, '% or watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 14);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 15);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('DurationReps', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 29);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('TargetType', 3, 0, 1, 0, '', false, Type.WktStepTarget));
        fieldIndex++;
        newMesg.setField(new Field('TargetValue', 4, 134, 1, 0, '', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TargetSpeedZone', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 0);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TargetHrZone', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 1);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TargetCadenceZone', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 3);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TargetPowerZone', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 4);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatSteps', 134, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 6);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatTime', 134, 1000, 0, 's'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 7);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatDistance', 134, 100, 0, 'm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 8);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatCalories', 134, 1, 0, 'calories'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 9);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatHr', 134, 1, 0, '% or bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 10);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 11);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('RepeatPower', 134, 1, 0, '% or watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 12);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(1, 13);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('TargetStrokeType', 0, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 11);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('CustomTargetValueLow', 5, 134, 1, 0, '', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetSpeedLow', 134, 1000, 0, 'm/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 0);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetHeartRateLow', 134, 1, 0, '% or bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 1);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetCadenceLow', 134, 1, 0, 'rpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 3);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetPowerLow', 134, 1, 0, '% or watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 4);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('CustomTargetValueHigh', 6, 134, 1, 0, '', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetSpeedHigh', 134, 1000, 0, 'm/s'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 0);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetHeartRateHigh', 134, 1, 0, '% or bpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 1);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetCadenceHigh', 134, 1, 0, 'rpm'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 3);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('CustomTargetPowerHigh', 134, 1, 0, '% or watts'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(3, 4);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('Intensity', 7, 0, 1, 0, '', false, Type.Intensity));
        fieldIndex++;
        newMesg.setField(new Field('Notes', 8, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Equipment', 9, 0, 1, 0, '', false, Type.WorkoutEquipment));
        fieldIndex++;
        newMesg.setField(new Field('ExerciseCategory', 10, 132, 1, 0, '', false, Type.ExerciseCategory));
        fieldIndex++;
        newMesg.setField(new Field('ExerciseName', 11, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ExerciseWeight', 12, 132, 100, 0, 'kg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('WeightDisplayUnit', 13, 132, 1, 0, '', false, Type.FitBaseUnit));
        fieldIndex++;

        return newMesg;
    }

    private static createExerciseTitleMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('ExerciseTitle', MesgNum.ExerciseTitle);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('ExerciseCategory', 0, 132, 1, 0, '', false, Type.ExerciseCategory));
        fieldIndex++;
        newMesg.setField(new Field('ExerciseName', 1, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('WktStepName', 2, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createScheduleMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Schedule', MesgNum.Schedule);
        fieldIndex = 0;
        newMesg.setField(new Field('Manufacturer', 0, 132, 1, 0, '', false, Type.Manufacturer));
        fieldIndex++;
        newMesg.setField(new Field('Product', 1, 132, 1, 0, '', false, Type.Uint16));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('FaveroProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 263);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('GarminProduct', 132, 1, 0, ''));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 1);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 15);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(0, 13);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('SerialNumber', 2, 140, 1, 0, '', false, Type.Uint32z));
        fieldIndex++;
        newMesg.setField(new Field('TimeCreated', 3, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Completed', 4, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;
        newMesg.setField(new Field('Type', 5, 0, 1, 0, '', false, Type.Schedule));
        fieldIndex++;
        newMesg.setField(new Field('ScheduledTime', 6, 134, 1, 0, '', false, Type.LocalDateTime));
        fieldIndex++;

        return newMesg;
    }

    private static createTotalsMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Totals', MesgNum.Totals);
        fieldIndex = 0;
        newMesg.setField(new Field('MessageIndex', 254, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('TimerTime', 0, 134, 1, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Distance', 1, 134, 1, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Calories', 2, 134, 1, 0, 'kcal', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Sport', 3, 0, 1, 0, '', false, Type.Sport));
        fieldIndex++;
        newMesg.setField(new Field('ElapsedTime', 4, 134, 1, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Sessions', 5, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ActiveTime', 6, 134, 1, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('SportIndex', 9, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;

        return newMesg;
    }

    private static createWeightScaleMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('WeightScale', MesgNum.WeightScale);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('Weight', 0, 132, 100, 0, 'kg', false, Type.Weight));
        fieldIndex++;
        newMesg.setField(new Field('PercentFat', 1, 132, 100, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('PercentHydration', 2, 132, 100, 0, '%', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('VisceralFatMass', 3, 132, 100, 0, 'kg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('BoneMass', 4, 132, 100, 0, 'kg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MuscleMass', 5, 132, 100, 0, 'kg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('BasalMet', 7, 132, 4, 0, 'kcal/day', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('PhysiqueRating', 8, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('ActiveMet', 9, 132, 4, 0, 'kcal/day', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MetabolicAge', 10, 2, 1, 0, 'years', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('VisceralFatRating', 11, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('UserProfileIndex', 12, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;

        return newMesg;
    }

    private static createBloodPressureMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('BloodPressure', MesgNum.BloodPressure);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('SystolicPressure', 0, 132, 1, 0, 'mmHg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('DiastolicPressure', 1, 132, 1, 0, 'mmHg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MeanArterialPressure', 2, 132, 1, 0, 'mmHg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Map3SampleMean', 3, 132, 1, 0, 'mmHg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MapMorningValues', 4, 132, 1, 0, 'mmHg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MapEveningValues', 5, 132, 1, 0, 'mmHg', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('HeartRate', 6, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('HeartRateType', 7, 0, 1, 0, '', false, Type.HrType));
        fieldIndex++;
        newMesg.setField(new Field('Status', 8, 0, 1, 0, '', false, Type.BpStatus));
        fieldIndex++;
        newMesg.setField(new Field('UserProfileIndex', 9, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;

        return newMesg;
    }

    private static createMonitoringInfoMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('MonitoringInfo', MesgNum.MonitoringInfo);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('LocalTimestamp', 0, 134, 1, 0, 's', false, Type.LocalDateTime));
        fieldIndex++;
        newMesg.setField(new Field('ActivityType', 1, 0, 1, 0, '', false, Type.ActivityType));
        fieldIndex++;
        newMesg.setField(new Field('CyclesToDistance', 3, 132, 5000, 0, 'm/cycle', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('CyclesToCalories', 4, 132, 5000, 0, 'kcal/cycle', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('RestingMetabolicRate', 5, 132, 1, 0, 'kcal / day', false, Type.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createMonitoringMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Monitoring', MesgNum.Monitoring);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('DeviceIndex', 0, 2, 1, 0, '', false, Type.DeviceIndex));
        fieldIndex++;
        newMesg.setField(new Field('Calories', 1, 132, 1, 0, 'kcal', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Distance', 2, 134, 100, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Cycles', 3, 134, 2, 0, 'cycles', false, Type.Uint32));
        subfieldIndex = 0;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('Steps', 134, 1, 0, 'steps'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 6);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 1);
        subfieldIndex++;
        newMesg.FieldsList[fieldIndex].subfields.push(new Subfield('Strokes', 134, 2, 0, 'strokes'));
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 2);
        newMesg.FieldsList[fieldIndex].subfields[subfieldIndex].addMap(5, 5);
        subfieldIndex++;
        fieldIndex++;
        newMesg.setField(new Field('ActiveTime', 4, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('ActivityType', 5, 0, 1, 0, '', false, Type.ActivityType));
        fieldIndex++;
        newMesg.setField(new Field('ActivitySubtype', 6, 0, 1, 0, '', false, Type.ActivitySubtype));
        fieldIndex++;
        newMesg.setField(new Field('ActivityLevel', 7, 0, 1, 0, '', false, Type.ActivityLevel));
        fieldIndex++;
        newMesg.setField(new Field('Distance16', 8, 132, 1, 0, '100 * m', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Cycles16', 9, 132, 1, 0, '2 * cycles (steps)', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ActiveTime16', 10, 132, 1, 0, 's', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('LocalTimestamp', 11, 134, 1, 0, '', false, Type.LocalDateTime));
        fieldIndex++;
        newMesg.setField(new Field('Temperature', 12, 131, 100, 0, 'C', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('TemperatureMin', 14, 131, 100, 0, 'C', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('TemperatureMax', 15, 131, 100, 0, 'C', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('ActivityTime', 16, 132, 1, 0, 'minutes', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('ActiveCalories', 19, 132, 1, 0, 'kcal', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('CurrentActivityTypeIntensity', 24, 13, 1, 0, '', false, Type.Byte));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(5, false, 5, 1, 0)); // activity_type
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(28, false, 3, 1, 0)); // intensity
        fieldIndex++;
        newMesg.setField(new Field('TimestampMin8', 25, 2, 1, 0, 'min', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Timestamp16', 26, 132, 1, 0, 's', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('HeartRate', 27, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Intensity', 28, 2, 10, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('DurationMin', 29, 132, 1, 0, 'min', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Duration', 30, 134, 1, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Ascent', 31, 134, 1000, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Descent', 32, 134, 1000, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('ModerateActivityMinutes', 33, 132, 1, 0, 'minutes', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('VigorousActivityMinutes', 34, 132, 1, 0, 'minutes', false, Type.Uint16));
        fieldIndex++;

        return newMesg;
    }

    private static createHrMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Hr', MesgNum.Hr);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, '', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('FractionalTimestamp', 0, 132, 32768, 0, 's', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('Time256', 1, 2, 256, 0, 's', false, Type.Uint8));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(0, false, 8, 256, 0)); // fractional_timestamp
        fieldIndex++;
        newMesg.setField(new Field('FilteredBpm', 6, 2, 1, 0, 'bpm', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('EventTimestamp', 9, 134, 1024, 0, 's', true, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('EventTimestamp12', 10, 13, 1, 0, '', false, Type.Byte));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(9, true, 12, 1024, 0)); // event_timestamp
        fieldIndex++;

        return newMesg;
    }

    private static createStressLevelMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('StressLevel', MesgNum.StressLevel);
        fieldIndex = 0;
        newMesg.setField(new Field('StressLevelValue', 0, 131, 1, 0, '', false, Type.Sint16));
        fieldIndex++;
        newMesg.setField(new Field('StressLevelTime', 1, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;

        return newMesg;
    }

    private static createMemoGlobMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('MemoGlob', MesgNum.MemoGlob);
        fieldIndex = 0;
        newMesg.setField(new Field('PartIndex', 250, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('Memo', 0, 13, 1, 0, '', false, Type.Byte));
        fieldIndex++;
        newMesg.setField(new Field('MessageNumber', 1, 132, 1, 0, '', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MessageIndex', 2, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;

        return newMesg;
    }

    private static createAntChannelIdMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('AntChannelId', MesgNum.AntChannelId);
        fieldIndex = 0;
        newMesg.setField(new Field('ChannelNumber', 0, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('DeviceType', 1, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('DeviceNumber', 2, 139, 1, 0, '', false, Type.Uint16z));
        fieldIndex++;
        newMesg.setField(new Field('TransmissionType', 3, 10, 1, 0, '', false, Type.Uint8z));
        fieldIndex++;
        newMesg.setField(new Field('DeviceIndex', 4, 2, 1, 0, '', false, Type.DeviceIndex));
        fieldIndex++;

        return newMesg;
    }

    private static createAntRxMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('AntRx', MesgNum.AntRx);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('FractionalTimestamp', 0, 132, 32768, 0, 's', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MesgId', 1, 13, 1, 0, '', false, Type.Byte));
        fieldIndex++;
        newMesg.setField(new Field('MesgData', 2, 13, 1, 0, '', false, Type.Byte));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(3, false, 8, 1, 0)); // channel_number
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        fieldIndex++;
        newMesg.setField(new Field('ChannelNumber', 3, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Data', 4, 13, 1, 0, '', false, Type.Byte));
        fieldIndex++;

        return newMesg;
    }

    private static createAntTxMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('AntTx', MesgNum.AntTx);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('FractionalTimestamp', 0, 132, 32768, 0, 's', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('MesgId', 1, 13, 1, 0, '', false, Type.Byte));
        fieldIndex++;
        newMesg.setField(new Field('MesgData', 2, 13, 1, 0, '', false, Type.Byte));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(3, false, 8, 1, 0)); // channel_number
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(4, false, 8, 1, 0)); // data
        fieldIndex++;
        newMesg.setField(new Field('ChannelNumber', 3, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Data', 4, 13, 1, 0, '', false, Type.Byte));
        fieldIndex++;

        return newMesg;
    }

    private static createExdScreenConfigurationMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('ExdScreenConfiguration', MesgNum.ExdScreenConfiguration);
        fieldIndex = 0;
        newMesg.setField(new Field('ScreenIndex', 0, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('FieldCount', 1, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Layout', 2, 0, 1, 0, '', false, Type.ExdLayout));
        fieldIndex++;
        newMesg.setField(new Field('ScreenEnabled', 3, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;

        return newMesg;
    }

    private static createExdDataFieldConfigurationMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('ExdDataFieldConfiguration', MesgNum.ExdDataFieldConfiguration);
        fieldIndex = 0;
        newMesg.setField(new Field('ScreenIndex', 0, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('ConceptField', 1, 13, 1, 0, '', false, Type.Byte));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(2, false, 4, 1, 0)); // field_id
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(3, false, 4, 1, 0)); // concept_count
        fieldIndex++;
        newMesg.setField(new Field('FieldId', 2, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('ConceptCount', 3, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('DisplayType', 4, 0, 1, 0, '', false, Type.ExdDisplayType));
        fieldIndex++;
        newMesg.setField(new Field('Title', 5, 7, 1, 0, '', false, Type.String));
        fieldIndex++;

        return newMesg;
    }

    private static createExdDataConceptConfigurationMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('ExdDataConceptConfiguration', MesgNum.ExdDataConceptConfiguration);
        fieldIndex = 0;
        newMesg.setField(new Field('ScreenIndex', 0, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('ConceptField', 1, 13, 1, 0, '', false, Type.Byte));
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(2, false, 4, 1, 0)); // field_id
        newMesg.FieldsList[fieldIndex].components.push(new FieldComponent(3, false, 4, 1, 0)); // concept_index
        fieldIndex++;
        newMesg.setField(new Field('FieldId', 2, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('ConceptIndex', 3, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('DataPage', 4, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('ConceptKey', 5, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Scaling', 6, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('DataUnits', 8, 0, 1, 0, '', false, Type.ExdDataUnits));
        fieldIndex++;
        newMesg.setField(new Field('Qualifier', 9, 0, 1, 0, '', false, Type.ExdQualifiers));
        fieldIndex++;
        newMesg.setField(new Field('Descriptor', 10, 0, 1, 0, '', false, Type.ExdDescriptors));
        fieldIndex++;
        newMesg.setField(new Field('IsSigned', 11, 0, 1, 0, '', false, Type.Bool));
        fieldIndex++;

        return newMesg;
    }

    private static createFieldDescriptionMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('FieldDescription', MesgNum.FieldDescription);
        fieldIndex = 0;
        newMesg.setField(new Field('DeveloperDataIndex', 0, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('FieldDefinitionNumber', 1, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('FitBaseTypeId', 2, 2, 1, 0, '', false, Type.FitBaseType));
        fieldIndex++;
        newMesg.setField(new Field('FieldName', 3, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Array', 4, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Components', 5, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Scale', 6, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('Offset', 7, 1, 1, 0, '', false, Type.Sint8));
        fieldIndex++;
        newMesg.setField(new Field('Units', 8, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Bits', 9, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('Accumulate', 10, 7, 1, 0, '', false, Type.String));
        fieldIndex++;
        newMesg.setField(new Field('FitBaseUnitId', 13, 132, 1, 0, '', false, Type.FitBaseUnit));
        fieldIndex++;
        newMesg.setField(new Field('NativeMesgNum', 14, 132, 1, 0, '', false, Type.MesgNum));
        fieldIndex++;
        newMesg.setField(new Field('NativeFieldNum', 15, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;

        return newMesg;
    }

    private static createDeveloperDataIdMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('DeveloperDataId', MesgNum.DeveloperDataId);
        fieldIndex = 0;
        newMesg.setField(new Field('DeveloperId', 0, 13, 1, 0, '', false, Type.Byte));
        fieldIndex++;
        newMesg.setField(new Field('ApplicationId', 1, 13, 1, 0, '', false, Type.Byte));
        fieldIndex++;
        newMesg.setField(new Field('ManufacturerId', 2, 132, 1, 0, '', false, Type.Manufacturer));
        fieldIndex++;
        newMesg.setField(new Field('DeveloperDataIndex', 3, 2, 1, 0, '', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('ApplicationVersion', 4, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;

        return newMesg;
    }

    private static createDiveSummaryMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('DiveSummary', MesgNum.DiveSummary);
        fieldIndex = 0;
        newMesg.setField(new Field('Timestamp', 253, 134, 1, 0, 's', false, Type.DateTime));
        fieldIndex++;
        newMesg.setField(new Field('ReferenceMesg', 0, 132, 1, 0, '', false, Type.MesgNum));
        fieldIndex++;
        newMesg.setField(new Field('ReferenceIndex', 1, 132, 1, 0, '', false, Type.MessageIndex));
        fieldIndex++;
        newMesg.setField(new Field('AvgDepth', 2, 134, 1000, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('MaxDepth', 3, 134, 1000, 0, 'm', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('SurfaceInterval', 4, 134, 1, 0, 's', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('StartCns', 5, 2, 1, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('EndCns', 6, 2, 1, 0, 'percent', false, Type.Uint8));
        fieldIndex++;
        newMesg.setField(new Field('StartN2', 7, 132, 1, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('EndN2', 8, 132, 1, 0, 'percent', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('O2Toxicity', 9, 132, 1, 0, 'OTUs', false, Type.Uint16));
        fieldIndex++;
        newMesg.setField(new Field('DiveNumber', 10, 134, 1, 0, '', false, Type.Uint32));
        fieldIndex++;
        newMesg.setField(new Field('BottomTime', 11, 134, 1000, 0, 's', false, Type.Uint32));
        fieldIndex++;

        return newMesg;
    }

    private static createPadMesg(): Mesg {
        let fieldIndex: number;
        let subfieldIndex: number;
        const newMesg: Mesg = new Mesg('Pad', MesgNum.Pad);
        fieldIndex = 0;

        return newMesg;
    }

    //#endregion
} // class
