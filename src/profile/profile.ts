// some unit conversion constants
const metersInOneKilometer = 1000;
const secondsInOneHour = 3600;
// according to https://en.wikipedia.org/wiki/Mile
const metersInOneMile = 1609.344;

export const FIT = {
  scConst: 180 / Math.pow(2, 31),
  options: {
    speedUnits: {
      // native speed unit: meters per second [m/s]
      "m/s": {
        multiplier: 1,
        offset: 0,
      },
      // miles per hour [mph]
      mph: {
        multiplier: secondsInOneHour / metersInOneMile,
        offset: 0,
      },
      // kilometers per hour [km/h]
      "km/h": {
        multiplier: secondsInOneHour / metersInOneKilometer,
        offset: 0,
      },
    },
    lengthUnits: {
      // native length unit: meters [m]
      m: {
        multiplier: 1,
        offset: 0,
      },
      // (international) mile [mi]
      mi: {
        multiplier: 1 / metersInOneMile,
        offset: 0,
      },
      // kilometer [km]
      km: {
        multiplier: 1 / metersInOneKilometer,
        offset: 0,
      },
    },
    temperatureUnits: {
      // native temperature unit: degree Celsius [°C]
      "°C": {
        multiplier: 1,
        offset: 0,
      },
      // kelvin [K]
      kelvin: {
        multiplier: 1,
        offset: -273.15,
      },
      // degree fahrenheit [°F]
      fahrenheit: {
        multiplier: 9 / 5,
        offset: 32,
      },
    },
  },
};
