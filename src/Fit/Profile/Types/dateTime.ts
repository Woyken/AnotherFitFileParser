function getUTCMillisecondsTotal(date: Date): number {
    const milliseconds = date.getTime() - (date.getTimezoneOffset() * 60000);
    return milliseconds;
}

function dateFromUTCMilliseconds(miliseconds: number): Date {
    // Creating date from miliseconds treats it in local time, add offset to
    const date = new Date(miliseconds + new Date(miliseconds).getTimezoneOffset() * 60 * 1000);
    return date;
}

/// <summary>
/// The DateTime class implements the Fit date_time type which references
/// UTC 00:00 Dec 31 1989 in second resolution
/// </summary>
export class DateTime {
    //#region Fields
    /** This field should be from 0 to 1 (excluding 1) */
    private fractionalTimeStamp!: number;
    private timeStamp!: number;
    // if date_time is < 0x10000000 then it is system time (seconds from device power on)
    // 0x10000000 => uptime of 8years => earliest date you can express ~1997
    private min: number = 0x10000000;
    // .NET datetime uses 100ns ticks starting 12:00:00 midnight, January 1, 0001
    public offset: Date = new Date(Date.UTC(1989, 12, 31, 0, 0, 0));
    //#endregion // Fields

    //#region Properties

    //#endregion // Properties

    //#region Constructors
    public constructor(date: Date);
    public constructor(timeStamp: number, fractionalTimeStamp?: number);
    // tslint:disable-next-line: unified-signatures
    public constructor(dateTime: DateTime);
    public constructor(
        timeStampOrDateOrDateTime: number | Date | DateTime,
        fractionalTimeStamp?: number,
    ) {
        if (timeStampOrDateOrDateTime instanceof Date) {
            this.timeStamp =
                ((getUTCMillisecondsTotal(timeStampOrDateOrDateTime) -
                    getUTCMillisecondsTotal(this.offset))
                / 1000);
            this.fractionalTimeStamp =
                (((getUTCMillisecondsTotal(timeStampOrDateOrDateTime) -
                getUTCMillisecondsTotal(this.offset)) % 1000) / 1000.0);
            return;
        }
        if (fractionalTimeStamp === undefined && typeof timeStampOrDateOrDateTime === 'number') {
            this.timeStamp = timeStampOrDateOrDateTime;
            this.fractionalTimeStamp = 0.0;
            return;
        }
        if (typeof timeStampOrDateOrDateTime === 'number' &&
            typeof fractionalTimeStamp === 'number') {
            this.timeStamp = timeStampOrDateOrDateTime + Math.floor(fractionalTimeStamp);
            this.fractionalTimeStamp = fractionalTimeStamp - Math.floor(fractionalTimeStamp);
            return;
        }
        if (typeof timeStampOrDateOrDateTime !== 'number') {
            const ts = timeStampOrDateOrDateTime.getTimeStamp();
            const fts = timeStampOrDateOrDateTime.getFractionalTimeStamp();
            this.timeStamp = ts + Math.floor(fts);
            this.fractionalTimeStamp = fts - Math.floor(fts);
            return;
        }

    }

    //#endregion // Constructors

    //#region Methods
    public equals(dateTime: DateTime): boolean {
        return (this.getTimeStamp() === (dateTime.getTimeStamp()) &&
            (this.getFractionalTimeStamp() === (dateTime.getFractionalTimeStamp())));
    }

    public getTimeStamp(): number {
        return this.timeStamp;
    }

    public getFractionalTimeStamp(): number {
        return this.fractionalTimeStamp;
    }

    public convertSystemTimeToUTC(systemTimeOffset: number): void {
        if (this.timeStamp < this.min) {
            this.timeStamp += systemTimeOffset;
        }
    }

    public getDateTime(): Date {
        // tslint:disable-next-line: max-line-length
        return dateFromUTCMilliseconds(this.timeStamp * 1000 + getUTCMillisecondsTotal(this.offset) + (this.fractionalTimeStamp * 1000));
    }

    public toString(): string {
        return this.getDateTime()
            .toISOString();
    }

    public add(dateTime: DateTime): void {
        this.timeStamp += dateTime.getTimeStamp();
        this.fractionalTimeStamp += dateTime.getFractionalTimeStamp();

        // Adjust fractional part to be less that 1
        this.timeStamp += Math.floor(this.fractionalTimeStamp);
        this.fractionalTimeStamp -= Math.floor(this.fractionalTimeStamp);
    }

    public add1(timeStamp: number): void {
        this.add(new DateTime(timeStamp));
    }

    public add2(fractionalTimeStamp: number): void {
        this.add(new DateTime(0, fractionalTimeStamp));
    }

    // Returns 0 if DateTimes are equal
    // Returns -1 if t1 > target object (this)
    // Returns 1 if target object (this) > t1
    // If timeStamps are equal, fractional timestamps are compared
    public compareTo(t1: DateTime): number {
        // tslint:disable-next-line: max-line-length
        // fractional_timestamp is guaranteed to be less that 1 which allows simplified comparison below
        if (this.timeStamp === t1.getTimeStamp()) {
            // Timestamps are equal; must compare fractional part.
            return Math.sign(this.fractionalTimeStamp - (t1.getFractionalTimeStamp()));
        }
        if (this.timeStamp > t1.getTimeStamp()) {
            return 1;
        }
        return -1;

    }
    //#endregion // Methods
}
