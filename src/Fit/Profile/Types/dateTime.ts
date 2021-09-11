const garminTimeOffset = 631065600000;

export function createDateFromTimestamp(timestamp: number) {
    return new Date(timestamp * 1000 + garminTimeOffset);
}
