// Some sort of header goes here
// Parsed from
// SDK version: 21.6
// On Sat, 18 Sep 2021 09:56:17 GMT
// Parsed 164 types (3288 values), 87 messages (1092 fields)

export const baseTypesList = {
  0x00: { name: "enum", id: 0x00, fmt: "B", invalidValue: 0xff },
  0x01: { name: "sint8", id: 0x01, fmt: "b", invalidValue: 0x7f },
  0x02: { name: "uint8", id: 0x02, fmt: "B", invalidValue: 0xff },
  0x83: { name: "sint16", id: 0x83, fmt: "h", invalidValue: 0x7fff },
  0x84: { name: "uint16", id: 0x84, fmt: "H", invalidValue: 0xffff },
  0x85: { name: "sint32", id: 0x85, fmt: "i", invalidValue: 0x7fffffff },
  0x86: { name: "uint32", id: 0x86, fmt: "I", invalidValue: 0xffffffff },
  0x07: { name: "string", id: 0x07, fmt: "s", invalidValue: 0x00 },
  0x88: { name: "float32", id: 0x88, fmt: "f", invalidValue: NaN },
  0x89: { name: "float64", id: 0x89, fmt: "d", invalidValue: NaN },
  0x0a: { name: "uint8z", id: 0x0a, fmt: "B", invalidValue: 0x0 },
  0x8b: { name: "uint16z", id: 0x8b, fmt: "H", invalidValue: 0x0 },
  0x8c: { name: "uint32z", id: 0x8c, fmt: "I", invalidValue: 0x0 },
  0x0d: { name: "byte", id: 0x0d, fmt: "B", invalidValue: 0xff },
  0x8e: { name: "sint64", id: 0x8e, fmt: "q", invalidValue: 0x7fffffffffffffff },
  0x8f: { name: "uint64", id: 0x8f, fmt: "Q", invalidValue: 0xffffffffffffffff },
  0x90: { name: "uint64z", id: 0x90, fmt: "Q", invalidValue: 0 },
} as const;

export const profileTypeList = {
  file: {
    name: 'file',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      /** Read only, single file. Must be in root directory. */
      0x1: 'device',
      /** Read/write, single file. Directory=Settings */
      0x2: 'settings',
      /** Read/write, multiple files, file number = sport type. Directory=Sports */
      0x3: 'sport',
      /** Read/erase, multiple files. Directory=Activities */
      0x4: 'activity',
      /** Read/write/erase, multiple files. Directory=Workouts */
      0x5: 'workout',
      /** Read/write/erase, multiple files. Directory=Courses */
      0x6: 'course',
      /** Read/write, single file. Directory=Schedules */
      0x7: 'schedules',
      /** Read only, single file. Circular buffer. All message definitions at start of file. Directory=Weight */
      0x9: 'weight',
      /** Read only, single file. Directory=Totals */
      0xa: 'totals',
      /** Read/write, single file. Directory=Goals */
      0xb: 'goals',
      /** Read only. Directory=Blood Pressure */
      0xe: 'blood_pressure',
      /** Read only. Directory=Monitoring. File number=sub type. */
      0xf: 'monitoring_a',
      /** Read/erase, multiple files. Directory=Activities */
      0x14: 'activity_summary',
      0x1c: 'monitoring_daily',
      /** Read only. Directory=Monitoring. File number=identifier */
      0x20: 'monitoring_b',
      /** Read/write/erase. Multiple Files.  Directory=Segments */
      0x22: 'segment',
      /** Read/write/erase. Single File.  Directory=Segments */
      0x23: 'segment_list',
      /** Read/write/erase. Single File. Directory=Settings */
      0x28: 'exd_configuration',
      /** 0xF7 - 0xFE reserved for manufacturer specific file types */
      0xf7: 'mfg_range_min',
      /** 0xF7 - 0xFE reserved for manufacturer specific file types */
      0xfe: 'mfg_range_max'
    }
  },
  mesg_num: {
    name: 'mesg_num',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'file_id',
      0x1: 'capabilities',
      0x2: 'device_settings',
      0x3: 'user_profile',
      0x4: 'hrm_profile',
      0x5: 'sdm_profile',
      0x6: 'bike_profile',
      0x7: 'zones_target',
      0x8: 'hr_zone',
      0x9: 'power_zone',
      0xa: 'met_zone',
      0xc: 'sport',
      0xf: 'goal',
      0x12: 'session',
      0x13: 'lap',
      0x14: 'record',
      0x15: 'event',
      0x17: 'device_info',
      0x1a: 'workout',
      0x1b: 'workout_step',
      0x1c: 'schedule',
      0x1e: 'weight_scale',
      0x1f: 'course',
      0x20: 'course_point',
      0x21: 'totals',
      0x22: 'activity',
      0x23: 'software',
      0x25: 'file_capabilities',
      0x26: 'mesg_capabilities',
      0x27: 'field_capabilities',
      0x31: 'file_creator',
      0x33: 'blood_pressure',
      0x35: 'speed_zone',
      0x37: 'monitoring',
      0x48: 'training_file',
      0x4e: 'hrv',
      0x50: 'ant_rx',
      0x51: 'ant_tx',
      0x52: 'ant_channel_id',
      0x65: 'length',
      0x67: 'monitoring_info',
      0x69: 'pad',
      0x6a: 'slave_device',
      0x7f: 'connectivity',
      0x80: 'weather_conditions',
      0x81: 'weather_alert',
      0x83: 'cadence_zone',
      0x84: 'hr',
      0x8e: 'segment_lap',
      0x91: 'memo_glob',
      0x94: 'segment_id',
      0x95: 'segment_leaderboard_entry',
      0x96: 'segment_point',
      0x97: 'segment_file',
      0x9e: 'workout_session',
      0x9f: 'watchface_settings',
      0xa0: 'gps_metadata',
      0xa1: 'camera_event',
      0xa2: 'timestamp_correlation',
      0xa4: 'gyroscope_data',
      0xa5: 'accelerometer_data',
      0xa7: 'three_d_sensor_calibration',
      0xa9: 'video_frame',
      0xae: 'obdii_data',
      0xb1: 'nmea_sentence',
      0xb2: 'aviation_attitude',
      0xb8: 'video',
      0xb9: 'video_title',
      0xba: 'video_description',
      0xbb: 'video_clip',
      0xbc: 'ohr_settings',
      0xc8: 'exd_screen_configuration',
      0xc9: 'exd_data_field_configuration',
      0xca: 'exd_data_concept_configuration',
      0xce: 'field_description',
      0xcf: 'developer_data_id',
      0xd0: 'magnetometer_data',
      0xd1: 'barometer_data',
      0xd2: 'one_d_sensor_calibration',
      0xe1: 'set',
      0xe3: 'stress_level',
      0x102: 'dive_settings',
      0x103: 'dive_gas',
      0x106: 'dive_alarm',
      0x108: 'exercise_title',
      0x10c: 'dive_summary',
      0x11d: 'jump',
      0x13d: 'climb_pro',
      /** 0xFF00 - 0xFFFE reserved for manufacturer specific messages */
      0xff00: 'mfg_range_min',
      /** 0xFF00 - 0xFFFE reserved for manufacturer specific messages */
      0xfffe: 'mfg_range_max'
    }
  },
  checksum: {
    name: 'checksum',
    baseTypeid: 0x02,
    baseType: 'uint8',
    values: {
      /** Allows clear of checksum for flash memory where can only write 1 to 0 without erasing sector. */
      0x0: 'clear',
      /** Set to mark checksum as valid if computes to invalid values 0 or 0xFF.  Checksum can also be set to ok to save encoding computation time. */
      0x1: 'ok'
    }
  },
  file_flags: {
    name: 'file_flags',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x2: 'read',
      0x4: 'write',
      0x8: 'erase'
    }
  },
  mesg_count: {
    name: 'mesg_count',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'num_per_file',
      0x1: 'max_per_file',
      0x2: 'max_per_file_type'
    }
  },
  /** seconds since UTC 00:00 Dec 31 1989 */
  date_time: {
    name: 'date_time',
    baseTypeid: 0x86,
    baseType: 'uint32',
    values: {
      /** if date_time is < 0x10000000 then it is system time (seconds from device power on) */
      0x10000000: 'min'
    }
  },
  /** seconds since 00:00 Dec 31 1989 in local time zone */
  local_date_time: {
    name: 'local_date_time',
    baseTypeid: 0x86,
    baseType: 'uint32',
    values: {
      /** if date_time is < 0x10000000 then it is system time (seconds from device power on) */
      0x10000000: 'min'
    }
  },
  message_index: {
    name: 'message_index',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      /** message is selected if set */
      0x8000: 'selected',
      /** reserved (default 0) */
      0x7000: 'reserved',
      /** index */
      0xfff: 'mask'
    }
  },
  device_index: {
    name: 'device_index',
    baseTypeid: 0x02,
    baseType: 'uint8',
    values: {
      /** Creator of the file is always device index 0. */
      0x0: 'creator'
    }
  },
  gender: {
    name: 'gender',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'female',
      0x1: 'male'
    }
  },
  language: {
    name: 'language',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'english',
      0x1: 'french',
      0x2: 'italian',
      0x3: 'german',
      0x4: 'spanish',
      0x5: 'croatian',
      0x6: 'czech',
      0x7: 'danish',
      0x8: 'dutch',
      0x9: 'finnish',
      0xa: 'greek',
      0xb: 'hungarian',
      0xc: 'norwegian',
      0xd: 'polish',
      0xe: 'portuguese',
      0xf: 'slovakian',
      0x10: 'slovenian',
      0x11: 'swedish',
      0x12: 'russian',
      0x13: 'turkish',
      0x14: 'latvian',
      0x15: 'ukrainian',
      0x16: 'arabic',
      0x17: 'farsi',
      0x18: 'bulgarian',
      0x19: 'romanian',
      0x1a: 'chinese',
      0x1b: 'japanese',
      0x1c: 'korean',
      0x1d: 'taiwanese',
      0x1e: 'thai',
      0x1f: 'hebrew',
      0x20: 'brazilian_portuguese',
      0x21: 'indonesian',
      0x22: 'malaysian',
      0x23: 'vietnamese',
      0x24: 'burmese',
      0x25: 'mongolian',
      0xfe: 'custom'
    }
  },
  /** Bit field corresponding to language enum type (1 << language). */
  language_bits_0: {
    name: 'language_bits_0',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'english',
      0x2: 'french',
      0x4: 'italian',
      0x8: 'german',
      0x10: 'spanish',
      0x20: 'croatian',
      0x40: 'czech',
      0x80: 'danish'
    }
  },
  language_bits_1: {
    name: 'language_bits_1',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'dutch',
      0x2: 'finnish',
      0x4: 'greek',
      0x8: 'hungarian',
      0x10: 'norwegian',
      0x20: 'polish',
      0x40: 'portuguese',
      0x80: 'slovakian'
    }
  },
  language_bits_2: {
    name: 'language_bits_2',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'slovenian',
      0x2: 'swedish',
      0x4: 'russian',
      0x8: 'turkish',
      0x10: 'latvian',
      0x20: 'ukrainian',
      0x40: 'arabic',
      0x80: 'farsi'
    }
  },
  language_bits_3: {
    name: 'language_bits_3',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'bulgarian',
      0x2: 'romanian',
      0x4: 'chinese',
      0x8: 'japanese',
      0x10: 'korean',
      0x20: 'taiwanese',
      0x40: 'thai',
      0x80: 'hebrew'
    }
  },
  language_bits_4: {
    name: 'language_bits_4',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'brazilian_portuguese',
      0x2: 'indonesian',
      0x4: 'malaysian',
      0x8: 'vietnamese',
      0x10: 'burmese',
      0x20: 'mongolian'
    }
  },
  time_zone: {
    name: 'time_zone',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'almaty',
      0x1: 'bangkok',
      0x2: 'bombay',
      0x3: 'brasilia',
      0x4: 'cairo',
      0x5: 'cape_verde_is',
      0x6: 'darwin',
      0x7: 'eniwetok',
      0x8: 'fiji',
      0x9: 'hong_kong',
      0xa: 'islamabad',
      0xb: 'kabul',
      0xc: 'magadan',
      0xd: 'mid_atlantic',
      0xe: 'moscow',
      0xf: 'muscat',
      0x10: 'newfoundland',
      0x11: 'samoa',
      0x12: 'sydney',
      0x13: 'tehran',
      0x14: 'tokyo',
      0x15: 'us_alaska',
      0x16: 'us_atlantic',
      0x17: 'us_central',
      0x18: 'us_eastern',
      0x19: 'us_hawaii',
      0x1a: 'us_mountain',
      0x1b: 'us_pacific',
      0x1c: 'other',
      0x1d: 'auckland',
      0x1e: 'kathmandu',
      0x1f: 'europe_western_wet',
      0x20: 'europe_central_cet',
      0x21: 'europe_eastern_eet',
      0x22: 'jakarta',
      0x23: 'perth',
      0x24: 'adelaide',
      0x25: 'brisbane',
      0x26: 'tasmania',
      0x27: 'iceland',
      0x28: 'amsterdam',
      0x29: 'athens',
      0x2a: 'barcelona',
      0x2b: 'berlin',
      0x2c: 'brussels',
      0x2d: 'budapest',
      0x2e: 'copenhagen',
      0x2f: 'dublin',
      0x30: 'helsinki',
      0x31: 'lisbon',
      0x32: 'london',
      0x33: 'madrid',
      0x34: 'munich',
      0x35: 'oslo',
      0x36: 'paris',
      0x37: 'prague',
      0x38: 'reykjavik',
      0x39: 'rome',
      0x3a: 'stockholm',
      0x3b: 'vienna',
      0x3c: 'warsaw',
      0x3d: 'zurich',
      0x3e: 'quebec',
      0x3f: 'ontario',
      0x40: 'manitoba',
      0x41: 'saskatchewan',
      0x42: 'alberta',
      0x43: 'british_columbia',
      0x44: 'boise',
      0x45: 'boston',
      0x46: 'chicago',
      0x47: 'dallas',
      0x48: 'denver',
      0x49: 'kansas_city',
      0x4a: 'las_vegas',
      0x4b: 'los_angeles',
      0x4c: 'miami',
      0x4d: 'minneapolis',
      0x4e: 'new_york',
      0x4f: 'new_orleans',
      0x50: 'phoenix',
      0x51: 'santa_fe',
      0x52: 'seattle',
      0x53: 'washington_dc',
      0x54: 'us_arizona',
      0x55: 'chita',
      0x56: 'ekaterinburg',
      0x57: 'irkutsk',
      0x58: 'kaliningrad',
      0x59: 'krasnoyarsk',
      0x5a: 'novosibirsk',
      0x5b: 'petropavlovsk_kamchatskiy',
      0x5c: 'samara',
      0x5d: 'vladivostok',
      0x5e: 'mexico_central',
      0x5f: 'mexico_mountain',
      0x60: 'mexico_pacific',
      0x61: 'cape_town',
      0x62: 'winkhoek',
      0x63: 'lagos',
      0x64: 'riyahd',
      0x65: 'venezuela',
      0x66: 'australia_lh',
      0x67: 'santiago',
      0xfd: 'manual',
      0xfe: 'automatic'
    }
  },
  display_measure: {
    name: 'display_measure',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'metric',
      0x1: 'statute',
      0x2: 'nautical'
    }
  },
  display_heart: {
    name: 'display_heart',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'bpm',
      0x1: 'max',
      0x2: 'reserve'
    }
  },
  display_power: {
    name: 'display_power',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'watts',
      0x1: 'percent_ftp'
    }
  },
  display_position: {
    name: 'display_position',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      /** dd.dddddd */
      0x0: 'degree',
      /** dddmm.mmm */
      0x1: 'degree_minute',
      /** dddmmss */
      0x2: 'degree_minute_second',
      /** Austrian Grid (BMN) */
      0x3: 'austrian_grid',
      /** British National Grid */
      0x4: 'british_grid',
      /** Dutch grid system */
      0x5: 'dutch_grid',
      /** Hungarian grid system */
      0x6: 'hungarian_grid',
      /** Finnish grid system Zone3 KKJ27 */
      0x7: 'finnish_grid',
      /** Gausss Krueger (German) */
      0x8: 'german_grid',
      /** Icelandic Grid */
      0x9: 'icelandic_grid',
      /** Indonesian Equatorial LCO */
      0xa: 'indonesian_equatorial',
      /** Indonesian Irian LCO */
      0xb: 'indonesian_irian',
      /** Indonesian Southern LCO */
      0xc: 'indonesian_southern',
      /** India zone 0 */
      0xd: 'india_zone_0',
      /** India zone IA */
      0xe: 'india_zone_IA',
      /** India zone IB */
      0xf: 'india_zone_IB',
      /** India zone IIA */
      0x10: 'india_zone_IIA',
      /** India zone IIB */
      0x11: 'india_zone_IIB',
      /** India zone IIIA */
      0x12: 'india_zone_IIIA',
      /** India zone IIIB */
      0x13: 'india_zone_IIIB',
      /** India zone IVA */
      0x14: 'india_zone_IVA',
      /** India zone IVB */
      0x15: 'india_zone_IVB',
      /** Irish Transverse Mercator */
      0x16: 'irish_transverse',
      /** Irish Grid */
      0x17: 'irish_grid',
      /** Loran TD */
      0x18: 'loran',
      /** Maidenhead grid system */
      0x19: 'maidenhead_grid',
      /** MGRS grid system */
      0x1a: 'mgrs_grid',
      /** New Zealand grid system */
      0x1b: 'new_zealand_grid',
      /** New Zealand Transverse Mercator */
      0x1c: 'new_zealand_transverse',
      /** Qatar National Grid */
      0x1d: 'qatar_grid',
      /** Modified RT-90 (Sweden) */
      0x1e: 'modified_swedish_grid',
      /** RT-90 (Sweden) */
      0x1f: 'swedish_grid',
      /** South African Grid */
      0x20: 'south_african_grid',
      /** Swiss CH-1903 grid */
      0x21: 'swiss_grid',
      /** Taiwan Grid */
      0x22: 'taiwan_grid',
      /** United States National Grid */
      0x23: 'united_states_grid',
      /** UTM/UPS grid system */
      0x24: 'utm_ups_grid',
      /** West Malayan RSO */
      0x25: 'west_malayan',
      /** Borneo RSO */
      0x26: 'borneo_rso',
      /** Estonian grid system */
      0x27: 'estonian_grid',
      /** Latvian Transverse Mercator */
      0x28: 'latvian_grid',
      /** Reference Grid 99 TM (Swedish) */
      0x29: 'swedish_ref_99_grid'
    }
  },
  switch: {
    name: 'switch',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'off',
      0x1: 'on',
      0x2: 'auto'
    }
  },
  sport: {
    name: 'sport',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'generic',
      0x1: 'running',
      0x2: 'cycling',
      /** Mulitsport transition */
      0x3: 'transition',
      0x4: 'fitness_equipment',
      0x5: 'swimming',
      0x6: 'basketball',
      0x7: 'soccer',
      0x8: 'tennis',
      0x9: 'american_football',
      0xa: 'training',
      0xb: 'walking',
      0xc: 'cross_country_skiing',
      0xd: 'alpine_skiing',
      0xe: 'snowboarding',
      0xf: 'rowing',
      0x10: 'mountaineering',
      0x11: 'hiking',
      0x12: 'multisport',
      0x13: 'paddling',
      0x14: 'flying',
      0x15: 'e_biking',
      0x16: 'motorcycling',
      0x17: 'boating',
      0x18: 'driving',
      0x19: 'golf',
      0x1a: 'hang_gliding',
      0x1b: 'horseback_riding',
      0x1c: 'hunting',
      0x1d: 'fishing',
      0x1e: 'inline_skating',
      0x1f: 'rock_climbing',
      0x20: 'sailing',
      0x21: 'ice_skating',
      0x22: 'sky_diving',
      0x23: 'snowshoeing',
      0x24: 'snowmobiling',
      0x25: 'stand_up_paddleboarding',
      0x26: 'surfing',
      0x27: 'wakeboarding',
      0x28: 'water_skiing',
      0x29: 'kayaking',
      0x2a: 'rafting',
      0x2b: 'windsurfing',
      0x2c: 'kitesurfing',
      0x2d: 'tactical',
      0x2e: 'jumpmaster',
      0x2f: 'boxing',
      0x30: 'floor_climbing',
      0x35: 'diving',
      /** All is for goals only to include all sports. */
      0xfe: 'all'
    }
  },
  /** Bit field corresponding to sport enum type (1 << sport). */
  sport_bits_0: {
    name: 'sport_bits_0',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'generic',
      0x2: 'running',
      0x4: 'cycling',
      /** Mulitsport transition */
      0x8: 'transition',
      0x10: 'fitness_equipment',
      0x20: 'swimming',
      0x40: 'basketball',
      0x80: 'soccer'
    }
  },
  /** Bit field corresponding to sport enum type (1 << (sport-8)). */
  sport_bits_1: {
    name: 'sport_bits_1',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'tennis',
      0x2: 'american_football',
      0x4: 'training',
      0x8: 'walking',
      0x10: 'cross_country_skiing',
      0x20: 'alpine_skiing',
      0x40: 'snowboarding',
      0x80: 'rowing'
    }
  },
  /** Bit field corresponding to sport enum type (1 << (sport-16)). */
  sport_bits_2: {
    name: 'sport_bits_2',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'mountaineering',
      0x2: 'hiking',
      0x4: 'multisport',
      0x8: 'paddling',
      0x10: 'flying',
      0x20: 'e_biking',
      0x40: 'motorcycling',
      0x80: 'boating'
    }
  },
  /** Bit field corresponding to sport enum type (1 << (sport-24)). */
  sport_bits_3: {
    name: 'sport_bits_3',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'driving',
      0x2: 'golf',
      0x4: 'hang_gliding',
      0x8: 'horseback_riding',
      0x10: 'hunting',
      0x20: 'fishing',
      0x40: 'inline_skating',
      0x80: 'rock_climbing'
    }
  },
  /** Bit field corresponding to sport enum type (1 << (sport-32)). */
  sport_bits_4: {
    name: 'sport_bits_4',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'sailing',
      0x2: 'ice_skating',
      0x4: 'sky_diving',
      0x8: 'snowshoeing',
      0x10: 'snowmobiling',
      0x20: 'stand_up_paddleboarding',
      0x40: 'surfing',
      0x80: 'wakeboarding'
    }
  },
  /** Bit field corresponding to sport enum type (1 << (sport-40)). */
  sport_bits_5: {
    name: 'sport_bits_5',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'water_skiing',
      0x2: 'kayaking',
      0x4: 'rafting',
      0x8: 'windsurfing',
      0x10: 'kitesurfing',
      0x20: 'tactical',
      0x40: 'jumpmaster',
      0x80: 'boxing'
    }
  },
  /** Bit field corresponding to sport enum type (1 << (sport-48)). */
  sport_bits_6: {
    name: 'sport_bits_6',
    baseTypeid: 0x0A,
    baseType: 'uint8z',
    values: {
      0x1: 'floor_climbing'
    }
  },
  sub_sport: {
    name: 'sub_sport',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'generic',
      /** Run/Fitness Equipment */
      0x1: 'treadmill',
      /** Run */
      0x2: 'street',
      /** Run */
      0x3: 'trail',
      /** Run */
      0x4: 'track',
      /** Cycling */
      0x5: 'spin',
      /** Cycling/Fitness Equipment */
      0x6: 'indoor_cycling',
      /** Cycling */
      0x7: 'road',
      /** Cycling */
      0x8: 'mountain',
      /** Cycling */
      0x9: 'downhill',
      /** Cycling */
      0xa: 'recumbent',
      /** Cycling */
      0xb: 'cyclocross',
      /** Cycling */
      0xc: 'hand_cycling',
      /** Cycling */
      0xd: 'track_cycling',
      /** Fitness Equipment */
      0xe: 'indoor_rowing',
      /** Fitness Equipment */
      0xf: 'elliptical',
      /** Fitness Equipment */
      0x10: 'stair_climbing',
      /** Swimming */
      0x11: 'lap_swimming',
      /** Swimming */
      0x12: 'open_water',
      /** Training */
      0x13: 'flexibility_training',
      /** Training */
      0x14: 'strength_training',
      /** Tennis */
      0x15: 'warm_up',
      /** Tennis */
      0x16: 'match',
      /** Tennis */
      0x17: 'exercise',
      0x18: 'challenge',
      /** Fitness Equipment */
      0x19: 'indoor_skiing',
      /** Training */
      0x1a: 'cardio_training',
      /** Walking/Fitness Equipment */
      0x1b: 'indoor_walking',
      /** E-Biking */
      0x1c: 'e_bike_fitness',
      /** Cycling */
      0x1d: 'bmx',
      /** Walking */
      0x1e: 'casual_walking',
      /** Walking */
      0x1f: 'speed_walking',
      /** Transition */
      0x20: 'bike_to_run_transition',
      /** Transition */
      0x21: 'run_to_bike_transition',
      /** Transition */
      0x22: 'swim_to_bike_transition',
      /** Motorcycling */
      0x23: 'atv',
      /** Motorcycling */
      0x24: 'motocross',
      /** Alpine Skiing/Snowboarding */
      0x25: 'backcountry',
      /** Alpine Skiing/Snowboarding */
      0x26: 'resort',
      /** Flying */
      0x27: 'rc_drone',
      /** Flying */
      0x28: 'wingsuit',
      /** Kayaking/Rafting */
      0x29: 'whitewater',
      /** Cross Country Skiing */
      0x2a: 'skate_skiing',
      /** Training */
      0x2b: 'yoga',
      /** Fitness Equipment */
      0x2c: 'pilates',
      /** Run */
      0x2d: 'indoor_running',
      /** Cycling */
      0x2e: 'gravel_cycling',
      /** Cycling */
      0x2f: 'e_bike_mountain',
      /** Cycling */
      0x30: 'commuting',
      /** Cycling */
      0x31: 'mixed_surface',
      0x32: 'navigate',
      0x33: 'track_me',
      0x34: 'map',
      /** Diving */
      0x35: 'single_gas_diving',
      /** Diving */
      0x36: 'multi_gas_diving',
      /** Diving */
      0x37: 'gauge_diving',
      /** Diving */
      0x38: 'apnea_diving',
      /** Diving */
      0x39: 'apnea_hunting',
      0x3a: 'virtual_activity',
      /** Used for events where participants run, crawl through mud, climb over walls, etc. */
      0x3b: 'obstacle',
      /** Sailing */
      0x41: 'sail_race',
      0xfe: 'all'
    }
  },
  sport_event: {
    name: 'sport_event',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'uncategorized',
      0x1: 'geocaching',
      0x2: 'fitness',
      0x3: 'recreation',
      0x4: 'race',
      0x5: 'special_event',
      0x6: 'training',
      0x7: 'transportation',
      0x8: 'touring'
    }
  },
  activity: {
    name: 'activity',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'manual',
      0x1: 'auto_multi_sport'
    }
  },
  intensity: {
    name: 'intensity',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'active',
      0x1: 'rest',
      0x2: 'warmup',
      0x3: 'cooldown',
      0x4: 'recovery',
      0x5: 'interval',
      0x6: 'other'
    }
  },
  session_trigger: {
    name: 'session_trigger',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'activity_end',
      /** User changed sport. */
      0x1: 'manual',
      /** Auto multi-sport feature is enabled and user pressed lap button to advance session. */
      0x2: 'auto_multi_sport',
      /** Auto sport change caused by user linking to fitness equipment. */
      0x3: 'fitness_equipment'
    }
  },
  autolap_trigger: {
    name: 'autolap_trigger',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'time',
      0x1: 'distance',
      0x2: 'position_start',
      0x3: 'position_lap',
      0x4: 'position_waypoint',
      0x5: 'position_marked',
      0x6: 'off'
    }
  },
  lap_trigger: {
    name: 'lap_trigger',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'manual',
      0x1: 'time',
      0x2: 'distance',
      0x3: 'position_start',
      0x4: 'position_lap',
      0x5: 'position_waypoint',
      0x6: 'position_marked',
      0x7: 'session_end',
      0x8: 'fitness_equipment'
    }
  },
  time_mode: {
    name: 'time_mode',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'hour12',
      /** Does not use a leading zero and has a colon */
      0x1: 'hour24',
      /** Uses a leading zero and does not have a colon */
      0x2: 'military',
      0x3: 'hour_12_with_seconds',
      0x4: 'hour_24_with_seconds',
      0x5: 'utc'
    }
  },
  backlight_mode: {
    name: 'backlight_mode',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'off',
      0x1: 'manual',
      0x2: 'key_and_messages',
      0x3: 'auto_brightness',
      0x4: 'smart_notifications',
      0x5: 'key_and_messages_night',
      0x6: 'key_and_messages_and_smart_notifications'
    }
  },
  date_mode: {
    name: 'date_mode',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'day_month',
      0x1: 'month_day'
    }
  },
  /** Timeout in seconds. */
  backlight_timeout: {
    name: 'backlight_timeout',
    baseTypeid: 0x02,
    baseType: 'uint8',
    values: {
      /** Backlight stays on forever. */
      0x0: 'infinite'
    }
  },
  event: {
    name: 'event',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      /** Group 0.  Start / stop_all */
      0x0: 'timer',
      /** start / stop */
      0x3: 'workout',
      /** Start at beginning of workout.  Stop at end of each step. */
      0x4: 'workout_step',
      /** stop_all group 0 */
      0x5: 'power_down',
      /** stop_all group 0 */
      0x6: 'power_up',
      /** start / stop group 0 */
      0x7: 'off_course',
      /** Stop at end of each session. */
      0x8: 'session',
      /** Stop at end of each lap. */
      0x9: 'lap',
      /** marker */
      0xa: 'course_point',
      /** marker */
      0xb: 'battery',
      /** Group 1. Start at beginning of activity if VP enabled, when VP pace is changed during activity or VP enabled mid activity.  stop_disable when VP disabled. */
      0xc: 'virtual_partner_pace',
      /** Group 0.  Start / stop when in alert condition. */
      0xd: 'hr_high_alert',
      /** Group 0.  Start / stop when in alert condition. */
      0xe: 'hr_low_alert',
      /** Group 0.  Start / stop when in alert condition. */
      0xf: 'speed_high_alert',
      /** Group 0.  Start / stop when in alert condition. */
      0x10: 'speed_low_alert',
      /** Group 0.  Start / stop when in alert condition. */
      0x11: 'cad_high_alert',
      /** Group 0.  Start / stop when in alert condition. */
      0x12: 'cad_low_alert',
      /** Group 0.  Start / stop when in alert condition. */
      0x13: 'power_high_alert',
      /** Group 0.  Start / stop when in alert condition. */
      0x14: 'power_low_alert',
      /** marker */
      0x15: 'recovery_hr',
      /** marker */
      0x16: 'battery_low',
      /** Group 1.  Start if enabled mid activity (not required at start of activity). Stop when duration is reached.  stop_disable if disabled. */
      0x17: 'time_duration_alert',
      /** Group 1.  Start if enabled mid activity (not required at start of activity). Stop when duration is reached.  stop_disable if disabled. */
      0x18: 'distance_duration_alert',
      /** Group 1.  Start if enabled mid activity (not required at start of activity). Stop when duration is reached.  stop_disable if disabled. */
      0x19: 'calorie_duration_alert',
      /** Group 1..  Stop at end of activity. */
      0x1a: 'activity',
      /** marker */
      0x1b: 'fitness_equipment',
      /** Stop at end of each length. */
      0x1c: 'length',
      /** marker */
      0x20: 'user_marker',
      /** marker */
      0x21: 'sport_point',
      /** start/stop/marker */
      0x24: 'calibration',
      /** marker */
      0x2a: 'front_gear_change',
      /** marker */
      0x2b: 'rear_gear_change',
      /** marker */
      0x2c: 'rider_position_change',
      /** Group 0.  Start / stop when in alert condition. */
      0x2d: 'elev_high_alert',
      /** Group 0.  Start / stop when in alert condition. */
      0x2e: 'elev_low_alert',
      /** marker */
      0x2f: 'comm_timeout',
      /** start/stop/marker */
      0x4b: 'radar_threat_alert'
    }
  },
  event_type: {
    name: 'event_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'start',
      0x1: 'stop',
      0x2: 'consecutive_depreciated',
      0x3: 'marker',
      0x4: 'stop_all',
      0x5: 'begin_depreciated',
      0x6: 'end_depreciated',
      0x7: 'end_all_depreciated',
      0x8: 'stop_disable',
      0x9: 'stop_disable_all'
    }
  },
  /** timer event data */
  timer_trigger: {
    name: 'timer_trigger',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'manual',
      0x1: 'auto',
      0x2: 'fitness_equipment'
    }
  },
  /** fitness equipment event data */
  fitness_equipment_state: {
    name: 'fitness_equipment_state',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'ready',
      0x1: 'in_use',
      0x2: 'paused',
      /** lost connection to fitness equipment */
      0x3: 'unknown'
    }
  },
  tone: {
    name: 'tone',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'off',
      0x1: 'tone',
      0x2: 'vibrate',
      0x3: 'tone_and_vibrate'
    }
  },
  autoscroll: {
    name: 'autoscroll',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'none',
      0x1: 'slow',
      0x2: 'medium',
      0x3: 'fast'
    }
  },
  activity_class: {
    name: 'activity_class',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      /** 0 to 100 */
      0x7f: 'level',
      0x64: 'level_max',
      0x80: 'athlete'
    }
  },
  hr_zone_calc: {
    name: 'hr_zone_calc',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'custom',
      0x1: 'percent_max_hr',
      0x2: 'percent_hrr'
    }
  },
  pwr_zone_calc: {
    name: 'pwr_zone_calc',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'custom',
      0x1: 'percent_ftp'
    }
  },
  wkt_step_duration: {
    name: 'wkt_step_duration',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'time',
      0x1: 'distance',
      0x2: 'hr_less_than',
      0x3: 'hr_greater_than',
      0x4: 'calories',
      0x5: 'open',
      0x6: 'repeat_until_steps_cmplt',
      0x7: 'repeat_until_time',
      0x8: 'repeat_until_distance',
      0x9: 'repeat_until_calories',
      0xa: 'repeat_until_hr_less_than',
      0xb: 'repeat_until_hr_greater_than',
      0xc: 'repeat_until_power_less_than',
      0xd: 'repeat_until_power_greater_than',
      0xe: 'power_less_than',
      0xf: 'power_greater_than',
      0x10: 'training_peaks_tss',
      0x11: 'repeat_until_power_last_lap_less_than',
      0x12: 'repeat_until_max_power_last_lap_less_than',
      0x13: 'power_3s_less_than',
      0x14: 'power_10s_less_than',
      0x15: 'power_30s_less_than',
      0x16: 'power_3s_greater_than',
      0x17: 'power_10s_greater_than',
      0x18: 'power_30s_greater_than',
      0x19: 'power_lap_less_than',
      0x1a: 'power_lap_greater_than',
      0x1b: 'repeat_until_training_peaks_tss',
      0x1c: 'repetition_time',
      0x1d: 'reps',
      0x1f: 'time_only'
    }
  },
  wkt_step_target: {
    name: 'wkt_step_target',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'speed',
      0x1: 'heart_rate',
      0x2: 'open',
      0x3: 'cadence',
      0x4: 'power',
      0x5: 'grade',
      0x6: 'resistance',
      0x7: 'power_3s',
      0x8: 'power_10s',
      0x9: 'power_30s',
      0xa: 'power_lap',
      0xb: 'swim_stroke',
      0xc: 'speed_lap',
      0xd: 'heart_rate_lap'
    }
  },
  goal: {
    name: 'goal',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'time',
      0x1: 'distance',
      0x2: 'calories',
      0x3: 'frequency',
      0x4: 'steps',
      0x5: 'ascent',
      0x6: 'active_minutes'
    }
  },
  goal_recurrence: {
    name: 'goal_recurrence',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'off',
      0x1: 'daily',
      0x2: 'weekly',
      0x3: 'monthly',
      0x4: 'yearly',
      0x5: 'custom'
    }
  },
  goal_source: {
    name: 'goal_source',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      /** Device generated */
      0x0: 'auto',
      /** Social network sourced goal */
      0x1: 'community',
      /** Manually generated */
      0x2: 'user'
    }
  },
  schedule: {
    name: 'schedule',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'workout',
      0x1: 'course'
    }
  },
  course_point: {
    name: 'course_point',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'generic',
      0x1: 'summit',
      0x2: 'valley',
      0x3: 'water',
      0x4: 'food',
      0x5: 'danger',
      0x6: 'left',
      0x7: 'right',
      0x8: 'straight',
      0x9: 'first_aid',
      0xa: 'fourth_category',
      0xb: 'third_category',
      0xc: 'second_category',
      0xd: 'first_category',
      0xe: 'hors_category',
      0xf: 'sprint',
      0x10: 'left_fork',
      0x11: 'right_fork',
      0x12: 'middle_fork',
      0x13: 'slight_left',
      0x14: 'sharp_left',
      0x15: 'slight_right',
      0x16: 'sharp_right',
      0x17: 'u_turn',
      0x18: 'segment_start',
      0x19: 'segment_end'
    }
  },
  manufacturer: {
    name: 'manufacturer',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x1: 'garmin',
      /** Do not use.  Used by FR405 for ANTFS man id. */
      0x2: 'garmin_fr405_antfs',
      0x3: 'zephyr',
      0x4: 'dayton',
      0x5: 'idt',
      0x6: 'srm',
      0x7: 'quarq',
      0x8: 'ibike',
      0x9: 'saris',
      0xa: 'spark_hk',
      0xb: 'tanita',
      0xc: 'echowell',
      0xd: 'dynastream_oem',
      0xe: 'nautilus',
      0xf: 'dynastream',
      0x10: 'timex',
      0x11: 'metrigear',
      0x12: 'xelic',
      0x13: 'beurer',
      0x14: 'cardiosport',
      0x15: 'a_and_d',
      0x16: 'hmm',
      0x17: 'suunto',
      0x18: 'thita_elektronik',
      0x19: 'gpulse',
      0x1a: 'clean_mobile',
      0x1b: 'pedal_brain',
      0x1c: 'peaksware',
      0x1d: 'saxonar',
      0x1e: 'lemond_fitness',
      0x1f: 'dexcom',
      0x20: 'wahoo_fitness',
      0x21: 'octane_fitness',
      0x22: 'archinoetics',
      0x23: 'the_hurt_box',
      0x24: 'citizen_systems',
      0x25: 'magellan',
      0x26: 'osynce',
      0x27: 'holux',
      0x28: 'concept2',
      0x29: 'shimano',
      0x2a: 'one_giant_leap',
      0x2b: 'ace_sensor',
      0x2c: 'brim_brothers',
      0x2d: 'xplova',
      0x2e: 'perception_digital',
      0x2f: 'bf1systems',
      0x30: 'pioneer',
      0x31: 'spantec',
      0x32: 'metalogics',
      0x33: '4iiiis',
      0x34: 'seiko_epson',
      0x35: 'seiko_epson_oem',
      0x36: 'ifor_powell',
      0x37: 'maxwell_guider',
      0x38: 'star_trac',
      0x39: 'breakaway',
      0x3a: 'alatech_technology_ltd',
      0x3b: 'mio_technology_europe',
      0x3c: 'rotor',
      0x3d: 'geonaute',
      0x3e: 'id_bike',
      0x3f: 'specialized',
      0x40: 'wtek',
      0x41: 'physical_enterprises',
      0x42: 'north_pole_engineering',
      0x43: 'bkool',
      0x44: 'cateye',
      0x45: 'stages_cycling',
      0x46: 'sigmasport',
      0x47: 'tomtom',
      0x48: 'peripedal',
      0x49: 'wattbike',
      0x4c: 'moxy',
      0x4d: 'ciclosport',
      0x4e: 'powerbahn',
      0x4f: 'acorn_projects_aps',
      0x50: 'lifebeam',
      0x51: 'bontrager',
      0x52: 'wellgo',
      0x53: 'scosche',
      0x54: 'magura',
      0x55: 'woodway',
      0x56: 'elite',
      0x57: 'nielsen_kellerman',
      0x58: 'dk_city',
      0x59: 'tacx',
      0x5a: 'direction_technology',
      0x5b: 'magtonic',
      0x5c: '1partcarbon',
      0x5d: 'inside_ride_technologies',
      0x5e: 'sound_of_motion',
      0x5f: 'stryd',
      /** Indoorcycling Group */
      0x60: 'icg',
      0x61: 'MiPulse',
      0x62: 'bsx_athletics',
      0x63: 'look',
      0x64: 'campagnolo_srl',
      0x65: 'body_bike_smart',
      0x66: 'praxisworks',
      /** Limits Technology Ltd. */
      0x67: 'limits_technology',
      /** TopAction Technology Inc. */
      0x68: 'topaction_technology',
      0x69: 'cosinuss',
      0x6a: 'fitcare',
      0x6b: 'magene',
      0x6c: 'giant_manufacturing_co',
      /** Tigrasport */
      0x6d: 'tigrasport',
      0x6e: 'salutron',
      0x6f: 'technogym',
      0x70: 'bryton_sensors',
      0x71: 'latitude_limited',
      0x72: 'soaring_technology',
      0x73: 'igpsport',
      0x74: 'thinkrider',
      0x75: 'gopher_sport',
      0x76: 'waterrower',
      0x77: 'orangetheory',
      0x78: 'inpeak',
      0x79: 'kinetic',
      0x7a: 'johnson_health_tech',
      0x7b: 'polar_electro',
      0x7c: 'seesense',
      0x7d: 'nci_technology',
      0x7e: 'iqsquare',
      0x7f: 'leomo',
      0x80: 'ifit_com',
      0x81: 'coros_byte',
      0x82: 'versa_design',
      0x83: 'chileaf',
      0x84: 'cycplus',
      0x85: 'gravaa_byte',
      0x86: 'sigeyi',
      0x87: 'coospo',
      0xff: 'development',
      0x101: 'healthandlife',
      0x102: 'lezyne',
      0x103: 'scribe_labs',
      0x104: 'zwift',
      0x105: 'watteam',
      0x106: 'recon',
      0x107: 'favero_electronics',
      0x108: 'dynovelo',
      0x109: 'strava',
      /** Amer Sports */
      0x10a: 'precor',
      0x10b: 'bryton',
      0x10c: 'sram',
      /** MiTAC Global Corporation (Mio Technology) */
      0x10d: 'navman',
      /** COBI GmbH */
      0x10e: 'cobi',
      0x10f: 'spivi',
      0x110: 'mio_magellan',
      0x111: 'evesports',
      0x112: 'sensitivus_gauge',
      0x113: 'podoon',
      0x114: 'life_time_fitness',
      /** Falco eMotors Inc. */
      0x115: 'falco_e_motors',
      0x116: 'minoura',
      0x117: 'cycliq',
      0x118: 'luxottica',
      0x119: 'trainer_road',
      0x11a: 'the_sufferfest',
      0x11b: 'fullspeedahead',
      0x11c: 'virtualtraining',
      0x11d: 'feedbacksports',
      0x11e: 'omata',
      0x11f: 'vdo',
      0x120: 'magneticdays',
      0x121: 'hammerhead',
      0x122: 'kinetic_by_kurt',
      0x123: 'shapelog',
      0x124: 'dabuziduo',
      0x125: 'jetblack',
      0x126: 'coros',
      0x127: 'virtugo',
      0x128: 'velosense',
      0x129: 'cycligentinc',
      0x12a: 'trailforks',
      0x12b: 'mahle_ebikemotion',
      0x12c: 'nurvv',
      0x12d: 'microprogram',
      0x12e: 'zone5cloud',
      0x12f: 'greenteg',
      0x130: 'yamaha_motors',
      0x131: 'whoop',
      0x132: 'gravaa',
      0x133: 'onelap',
      0x134: 'monark_exercise',
      0x135: 'form',
      0x136: 'decathlon',
      0x137: 'syncros',
      0x167f: 'actigraphcorp'
    }
  },
  garmin_product: {
    name: 'garmin_product',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x1: 'hrm1',
      /** AXH01 HRM chipset */
      0x2: 'axh01',
      0x3: 'axb01',
      0x4: 'axb02',
      0x5: 'hrm2ss',
      0x6: 'dsi_alf02',
      0x7: 'hrm3ss',
      /** hrm_run model for HRM ANT+ messaging */
      0x8: 'hrm_run_single_byte_product_id',
      /** BSM model for ANT+ messaging */
      0x9: 'bsm',
      /** BCM model for ANT+ messaging */
      0xa: 'bcm',
      /** AXS01 HRM Bike Chipset model for ANT+ messaging */
      0xb: 'axs01',
      /** hrm_tri model for HRM ANT+ messaging */
      0xc: 'hrm_tri_single_byte_product_id',
      /** hrm4 run model for HRM ANT+ messaging */
      0xd: 'hrm4_run_single_byte_product_id',
      /** fr225 model for HRM ANT+ messaging */
      0xe: 'fr225_single_byte_product_id',
      /** gen3_bsm model for Bike Speed ANT+ messaging */
      0xf: 'gen3_bsm_single_byte_product_id',
      /** gen3_bcm model for Bike Cadence ANT+ messaging */
      0x10: 'gen3_bcm_single_byte_product_id',
      0x1d9: 'fr301_china',
      0x1da: 'fr301_japan',
      0x1db: 'fr301_korea',
      0x1ee: 'fr301_taiwan',
      /** Forerunner 405 */
      0x2cd: 'fr405',
      /** Forerunner 50 */
      0x30e: 'fr50',
      0x3db: 'fr405_japan',
      /** Forerunner 60 */
      0x3dc: 'fr60',
      0x3f3: 'dsi_alf01',
      /** Forerunner 310 */
      0x3fa: 'fr310xt',
      0x40c: 'edge500',
      /** Forerunner 110 */
      0x464: 'fr110',
      0x491: 'edge800',
      0x4af: 'edge500_taiwan',
      0x4bd: 'edge500_japan',
      0x4e5: 'chirp',
      0x4fa: 'fr110_japan',
      0x52d: 'edge200',
      0x530: 'fr910xt',
      0x535: 'edge800_taiwan',
      0x536: 'edge800_japan',
      0x53d: 'alf04',
      0x541: 'fr610',
      0x550: 'fr210_japan',
      0x564: 'vector_ss',
      0x565: 'vector_cp',
      0x56a: 'edge800_china',
      0x56b: 'edge500_china',
      0x57d: 'approach_g10',
      0x582: 'fr610_japan',
      0x58e: 'edge500_korea',
      0x59c: 'fr70',
      0x5a6: 'fr310xt_4t',
      0x5b5: 'amx',
      0x5ca: 'fr10',
      0x5d9: 'edge800_korea',
      0x5db: 'swim',
      0x601: 'fr910xt_china',
      0x60f: 'fenix',
      0x613: 'edge200_taiwan',
      0x619: 'edge510',
      0x61f: 'edge810',
      0x622: 'tempe',
      0x640: 'fr910xt_japan',
      0x657: 'fr620',
      0x660: 'fr220',
      0x680: 'fr910xt_korea',
      0x698: 'fr10_japan',
      0x6b9: 'edge810_japan',
      0x6c7: 'virb_elite',
      /** Also Edge Touring Plus */
      0x6c8: 'edge_touring',
      0x6ce: 'edge510_japan',
      /** Also HRM-Swim */
      0x6cf: 'hrm_tri',
      0x6d8: 'hrm_run',
      0x6e5: 'fr920xt',
      0x71d: 'edge510_asia',
      0x71e: 'edge810_china',
      0x71f: 'edge810_taiwan',
      0x72c: 'edge1000',
      0x72d: 'vivo_fit',
      0x73d: 'virb_remote',
      0x75d: 'vivo_ki',
      0x76f: 'fr15',
      0x773: 'vivo_active',
      0x77e: 'edge510_korea',
      0x788: 'fr620_japan',
      0x789: 'fr620_china',
      0x78a: 'fr220_japan',
      0x78b: 'fr220_china',
      0x790: 'approach_s6',
      0x7a4: 'vivo_smart',
      0x7af: 'fenix2',
      0x7c4: 'epix',
      0x802: 'fenix3',
      0x804: 'edge1000_taiwan',
      0x805: 'edge1000_japan',
      0x80d: 'fr15_japan',
      0x813: 'edge520',
      0x816: 'edge1000_china',
      0x818: 'fr620_russia',
      0x819: 'fr220_russia',
      0x81f: 'vector_s',
      0x834: 'edge1000_korea',
      0x852: 'fr920xt_taiwan',
      0x853: 'fr920xt_china',
      0x854: 'fr920xt_japan',
      0x856: 'virbx',
      0x857: 'vivo_smart_apac',
      0x85c: 'etrex_touch',
      0x863: 'edge25',
      0x864: 'fr25',
      0x866: 'vivo_fit2',
      0x869: 'fr225',
      0x86c: 'fr630',
      0x86d: 'fr230',
      0x86e: 'fr735xt',
      0x870: 'vivo_active_apac',
      0x871: 'vector_2',
      0x872: 'vector_2s',
      0x87c: 'virbxe',
      0x87d: 'fr620_taiwan',
      0x87e: 'fr220_taiwan',
      0x87f: 'truswing',
      0x88b: 'd2airvenu',
      0x88c: 'fenix3_china',
      0x88d: 'fenix3_twn',
      0x890: 'varia_headlight',
      0x891: 'varia_taillight_old',
      0x89c: 'edge_explore_1000',
      0x8ab: 'fr225_asia',
      0x8b1: 'varia_radar_taillight',
      0x8b2: 'varia_radar_display',
      0x8be: 'edge20',
      0x8d4: 'edge520_asia',
      0x8d5: 'edge520_japan',
      0x8d6: 'd2_bravo',
      0x8da: 'approach_s20',
      0x8df: 'vivo_smart2',
      0x8e2: 'edge1000_thai',
      0x8e4: 'varia_remote',
      0x8f0: 'edge25_asia',
      0x8f1: 'edge25_jpn',
      0x8f2: 'edge20_asia',
      0x8f4: 'approach_x40',
      0x8f5: 'fenix3_japan',
      0x8f6: 'vivo_smart_emea',
      0x906: 'fr630_asia',
      0x907: 'fr630_jpn',
      0x909: 'fr230_jpn',
      0x917: 'hrm4_run',
      0x91c: 'epix_japan',
      0x921: 'vivo_active_hr',
      0x92b: 'vivo_smart_gps_hr',
      0x92c: 'vivo_smart_hr',
      0x939: 'vivo_smart_hr_asia',
      0x93a: 'vivo_smart_gps_hr_asia',
      0x940: 'vivo_move',
      0x94b: 'varia_taillight',
      0x95c: 'fr235_asia',
      0x95d: 'fr235_japan',
      0x95e: 'varia_vision',
      0x966: 'vivo_fit3',
      0x967: 'fenix3_korea',
      0x968: 'fenix3_sea',
      0x96d: 'fenix3_hr',
      0x971: 'virb_ultra_30',
      0x97d: 'index_smart_scale',
      0x97f: 'fr235',
      0x980: 'fenix3_chronos',
      0x989: 'oregon7xx',
      0x98c: 'rino7xx',
      0x999: 'epix_korea',
      0x9a9: 'fenix3_hr_chn',
      0x9aa: 'fenix3_hr_twn',
      0x9ab: 'fenix3_hr_jpn',
      0x9ac: 'fenix3_hr_sea',
      0x9ad: 'fenix3_hr_kor',
      0x9c0: 'nautix',
      0x9c1: 'vivo_active_hr_apac',
      0x9d0: 'oregon7xx_ww',
      0x9e2: 'edge_820',
      0x9e3: 'edge_explore_820',
      0x9e5: 'fr735xt_apac',
      0x9e6: 'fr735xt_japan',
      0x9f0: 'fenix5s',
      0x9f3: 'd2_bravo_titanium',
      /** Varia UT 800 SW */
      0xa07: 'varia_ut800',
      0xa21: 'running_dynamics_pod',
      0xa27: 'edge_820_china',
      0xa28: 'edge_820_japan',
      0xa2c: 'fenix5x',
      0xa2e: 'vivo_fit_jr',
      0xa3e: 'vivo_smart3',
      0xa3f: 'vivo_sport',
      0xa44: 'edge_820_taiwan',
      0xa45: 'edge_820_korea',
      0xa46: 'edge_820_sea',
      0xa5a: 'fr35_hebrew',
      0xa60: 'approach_s60',
      0xa6b: 'fr35_apac',
      0xa6c: 'fr35_japan',
      0xa73: 'fenix3_chronos_asia',
      0xa7f: 'virb_360',
      0xa83: 'fr935',
      0xa89: 'fenix5',
      0xa8c: 'vivoactive3',
      0xaad: 'fr235_china_nfc',
      0xad1: 'foretrex_601_701',
      0xad4: 'vivo_move_hr',
      0xa99: 'edge_1030',
      0xae3: 'vector_3',
      0xaec: 'fenix5_asia',
      0xaed: 'fenix5s_asia',
      0xaee: 'fenix5x_asia',
      0xaf6: 'approach_z80',
      0xafe: 'fr35_korea',
      0xb03: 'd2charlie',
      0xb0f: 'vivo_smart3_apac',
      0xb10: 'vivo_sport_apac',
      0xb11: 'fr935_asia',
      0xb2b: 'descent',
      0xb3e: 'vivo_fit4',
      0xb46: 'fr645',
      0xb48: 'fr645m',
      0xb4b: 'fr30',
      0xb54: 'fenix5s_plus',
      0xb5d: 'Edge_130',
      0xb6c: 'edge_1030_asia',
      0xb6f: 'vivosmart_4',
      0xb81: 'vivo_move_hr_asia',
      0xb92: 'approach_x10',
      0xba1: 'fr30_asia',
      0xbac: 'vivoactive3m_w',
      0xbbb: 'fr645_asia',
      0xbbc: 'fr645m_asia',
      0xbc3: 'edge_explore',
      0xbd4: 'gpsmap66',
      0xbe9: 'approach_s10',
      0xbfa: 'vivoactive3m_l',
      0xc0d: 'approach_g80',
      0xc14: 'edge_130_asia',
      0xc17: 'edge_1030_bontrager',
      0xc26: 'fenix5_plus',
      0xc27: 'fenix5x_plus',
      0xc28: 'edge_520_plus',
      0xc29: 'fr945',
      0xc31: 'edge_530',
      0xc32: 'edge_830',
      0xc36: 'instinct_esports',
      0xc3e: 'fenix5s_plus_apac',
      0xc3f: 'fenix5x_plus_apac',
      0xc46: 'edge_520_plus_apac',
      0xc48: 'fr235l_asia',
      0xc49: 'fr245_asia',
      0xc5b: 'vivo_active3m_apac',
      /** gen3 bike speed sensor */
      0xc78: 'gen3_bsm',
      /** gen3 bike cadence sensor */
      0xc79: 'gen3_bcm',
      0xc92: 'vivo_smart4_asia',
      0xc98: 'vivoactive4_small',
      0xc99: 'vivoactive4_large',
      0xc9a: 'venu',
      0xcae: 'marq_driver',
      0xcaf: 'marq_aviator',
      0xcb0: 'marq_captain',
      0xcb1: 'marq_commander',
      0xcb2: 'marq_expedition',
      0xcb3: 'marq_athlete',
      0xcba: 'descent_mk2',
      0xcd4: 'gpsmap66i',
      0xcd7: 'fenix6S_sport',
      0xcd8: 'fenix6S',
      0xcd9: 'fenix6_sport',
      0xcda: 'fenix6',
      0xcdb: 'fenix6x',
      /** HRM-Dual */
      0xce3: 'hrm_dual',
      /** HRM-Pro */
      0xce4: 'hrm_pro',
      0xcec: 'vivo_move3_premium',
      0xcf2: 'approach_s40',
      0xcf9: 'fr245m_asia',
      0xd15: 'edge_530_apac',
      0xd16: 'edge_830_apac',
      0xd32: 'vivo_move3',
      0xd3b: 'vivo_active4_small_asia',
      0xd3c: 'vivo_active4_large_asia',
      0xd3d: 'vivo_active4_oled_asia',
      0xd4d: 'swim2',
      0xd5c: 'marq_driver_asia',
      0xd5d: 'marq_aviator_asia',
      0xd5e: 'vivo_move3_asia',
      0xd71: 'fr945_asia',
      0xd76: 'vivo_active3t_chn',
      0xd78: 'marq_captain_asia',
      0xd79: 'marq_commander_asia',
      0xd7a: 'marq_expedition_asia',
      0xd7b: 'marq_athlete_asia',
      0xd8d: 'fr45_asia',
      0xd91: 'vivoactive3_daimler',
      0xdaa: 'legacy_rey',
      0xdab: 'legacy_darth_vader',
      0xdac: 'legacy_captain_marvel',
      0xdad: 'legacy_first_avenger',
      0xdb8: 'fenix6s_sport_asia',
      0xdb9: 'fenix6s_asia',
      0xdba: 'fenix6_sport_asia',
      0xdbb: 'fenix6_asia',
      0xdbc: 'fenix6x_asia',
      0xdcf: 'legacy_captain_marvel_asia',
      0xdd0: 'legacy_first_avenger_asia',
      0xdd1: 'legacy_rey_asia',
      0xdd2: 'legacy_darth_vader_asia',
      0xdd6: 'descent_mk2s',
      0xde6: 'edge_130_plus',
      0xdf2: 'edge_1030_plus',
      /** Rally 100/200 Power Meter Series */
      0xdfa: 'rally_200',
      0xe05: 'fr745',
      0xe10: 'venusq',
      0xe1f: 'lily',
      0xe28: 'marq_adventurer',
      0xe36: 'enduro',
      0xe40: 'marq_adventurer_asia',
      0xe37: 'swim2_apac',
      /** Mk2 and Mk2i */
      0xe76: 'descent_mk2_asia',
      0xe77: 'venu2',
      0xe78: 'venu2s',
      0xe99: 'venu_daimler_asia',
      0xe9b: 'marq_golfer',
      0xe9c: 'venu_daimler',
      0xed2: 'fr745_asia',
      0xee1: 'lily_asia',
      0xee4: 'edge_1030_plus_asia',
      0xee5: 'edge_130_plus_asia',
      0xeef: 'approach_s12',
      0xf20: 'enduro_asia',
      0xefd: 'venusq_asia',
      0xf0a: 'marq_golfer_asia',
      0xf57: 'approach_g12',
      0xf5a: 'descent_mk2s_asia',
      0xf5e: 'approach_s42',
      0xf6d: 'venu2s_asia',
      0xf6e: 'venu2_asia',
      0xf92: 'approach_S12_asia',
      0xfa1: 'approach_g12_asia',
      0xfa2: 'approach_s42_asia',
      /** SDM4 footpod */
      0x2717: 'sdm4',
      0x271e: 'edge_remote',
      0x5035: 'tacx_training_app_win',
      0x5036: 'tacx_training_app_mac',
      0x4e97: 'training_center',
      0x755d: 'tacx_training_app_android',
      0x755e: 'tacx_training_app_ios',
      0x755f: 'tacx_training_app_legacy',
      0xfffb: 'connectiq_simulator',
      0xfffc: 'android_antplus_plugin',
      /** Garmin Connect website */
      0xfffe: 'connect'
    }
  },
  antplus_device_type: {
    name: 'antplus_device_type',
    baseTypeid: 0x02,
    baseType: 'uint8',
    values: {
      0x1: 'antfs',
      0xb: 'bike_power',
      0xc: 'environment_sensor_legacy',
      0xf: 'multi_sport_speed_distance',
      0x10: 'control',
      0x11: 'fitness_equipment',
      0x12: 'blood_pressure',
      0x13: 'geocache_node',
      0x14: 'light_electric_vehicle',
      0x19: 'env_sensor',
      0x1a: 'racquet',
      0x1b: 'control_hub',
      0x1f: 'muscle_oxygen',
      0x23: 'bike_light_main',
      0x24: 'bike_light_shared',
      0x26: 'exd',
      0x28: 'bike_radar',
      0x2e: 'bike_aero',
      0x77: 'weight_scale',
      0x78: 'heart_rate',
      0x79: 'bike_speed_cadence',
      0x7a: 'bike_cadence',
      0x7b: 'bike_speed',
      0x7c: 'stride_speed_distance'
    }
  },
  ant_network: {
    name: 'ant_network',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'public',
      0x1: 'antplus',
      0x2: 'antfs',
      0x3: 'private'
    }
  },
  workout_capabilities: {
    name: 'workout_capabilities',
    baseTypeid: 0x8C,
    baseType: 'uint32z',
    values: {
      0x1: 'interval',
      0x2: 'custom',
      0x4: 'fitness_equipment',
      0x8: 'firstbeat',
      0x10: 'new_leaf',
      /** For backwards compatibility.  Watch should add missing id fields then clear flag. */
      0x20: 'tcx',
      /** Speed source required for workout step. */
      0x80: 'speed',
      /** Heart rate source required for workout step. */
      0x100: 'heart_rate',
      /** Distance source required for workout step. */
      0x200: 'distance',
      /** Cadence source required for workout step. */
      0x400: 'cadence',
      /** Power source required for workout step. */
      0x800: 'power',
      /** Grade source required for workout step. */
      0x1000: 'grade',
      /** Resistance source required for workout step. */
      0x2000: 'resistance',
      0x4000: 'protected'
    }
  },
  battery_status: {
    name: 'battery_status',
    baseTypeid: 0x02,
    baseType: 'uint8',
    values: {
      0x1: 'new',
      0x2: 'good',
      0x3: 'ok',
      0x4: 'low',
      0x5: 'critical',
      0x6: 'charging',
      0x7: 'unknown'
    }
  },
  hr_type: {
    name: 'hr_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'normal',
      0x1: 'irregular'
    }
  },
  course_capabilities: {
    name: 'course_capabilities',
    baseTypeid: 0x8C,
    baseType: 'uint32z',
    values: {
      0x1: 'processed',
      0x2: 'valid',
      0x4: 'time',
      0x8: 'distance',
      0x10: 'position',
      0x20: 'heart_rate',
      0x40: 'power',
      0x80: 'cadence',
      0x100: 'training',
      0x200: 'navigation',
      0x400: 'bikeway'
    }
  },
  weight: {
    name: 'weight',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0xfffe: 'calculating'
    }
  },
  /** 0 - 100 indicates% of max hr; >100 indicates bpm (255 max) plus 100 */
  workout_hr: {
    name: 'workout_hr',
    baseTypeid: 0x86,
    baseType: 'uint32',
    values: {
      0x64: 'bpm_offset'
    }
  },
  /** 0 - 1000 indicates % of functional threshold power; >1000 indicates watts plus 1000. */
  workout_power: {
    name: 'workout_power',
    baseTypeid: 0x86,
    baseType: 'uint32',
    values: {
      0x3e8: 'watts_offset'
    }
  },
  bp_status: {
    name: 'bp_status',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'no_error',
      0x1: 'error_incomplete_data',
      0x2: 'error_no_measurement',
      0x3: 'error_data_out_of_range',
      0x4: 'error_irregular_heart_rate'
    }
  },
  user_local_id: {
    name: 'user_local_id',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'local_min',
      0xf: 'local_max',
      0x10: 'stationary_min',
      0xff: 'stationary_max',
      0x100: 'portable_min',
      0xfffe: 'portable_max'
    }
  },
  swim_stroke: {
    name: 'swim_stroke',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'freestyle',
      0x1: 'backstroke',
      0x2: 'breaststroke',
      0x3: 'butterfly',
      0x4: 'drill',
      0x5: 'mixed',
      /** IM is a mixed interval containing the same number of lengths for each of: Butterfly, Backstroke, Breaststroke, Freestyle, swam in that order. */
      0x6: 'im'
    }
  },
  activity_type: {
    name: 'activity_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'generic',
      0x1: 'running',
      0x2: 'cycling',
      /** Mulitsport transition */
      0x3: 'transition',
      0x4: 'fitness_equipment',
      0x5: 'swimming',
      0x6: 'walking',
      0x8: 'sedentary',
      /** All is for goals only to include all sports. */
      0xfe: 'all'
    }
  },
  activity_subtype: {
    name: 'activity_subtype',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'generic',
      /** Run */
      0x1: 'treadmill',
      /** Run */
      0x2: 'street',
      /** Run */
      0x3: 'trail',
      /** Run */
      0x4: 'track',
      /** Cycling */
      0x5: 'spin',
      /** Cycling */
      0x6: 'indoor_cycling',
      /** Cycling */
      0x7: 'road',
      /** Cycling */
      0x8: 'mountain',
      /** Cycling */
      0x9: 'downhill',
      /** Cycling */
      0xa: 'recumbent',
      /** Cycling */
      0xb: 'cyclocross',
      /** Cycling */
      0xc: 'hand_cycling',
      /** Cycling */
      0xd: 'track_cycling',
      /** Fitness Equipment */
      0xe: 'indoor_rowing',
      /** Fitness Equipment */
      0xf: 'elliptical',
      /** Fitness Equipment */
      0x10: 'stair_climbing',
      /** Swimming */
      0x11: 'lap_swimming',
      /** Swimming */
      0x12: 'open_water',
      0xfe: 'all'
    }
  },
  activity_level: {
    name: 'activity_level',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'low',
      0x1: 'medium',
      0x2: 'high'
    }
  },
  side: {
    name: 'side',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'right',
      0x1: 'left'
    }
  },
  left_right_balance: {
    name: 'left_right_balance',
    baseTypeid: 0x02,
    baseType: 'uint8',
    values: {
      /** % contribution */
      0x7f: 'mask',
      /** data corresponds to right if set, otherwise unknown */
      0x80: 'right'
    }
  },
  left_right_balance_100: {
    name: 'left_right_balance_100',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      /** % contribution scaled by 100 */
      0x3fff: 'mask',
      /** data corresponds to right if set, otherwise unknown */
      0x8000: 'right'
    }
  },
  length_type: {
    name: 'length_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      /** Rest period. Length with no strokes */
      0x0: 'idle',
      /** Length with strokes. */
      0x1: 'active'
    }
  },
  day_of_week: {
    name: 'day_of_week',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'sunday',
      0x1: 'monday',
      0x2: 'tuesday',
      0x3: 'wednesday',
      0x4: 'thursday',
      0x5: 'friday',
      0x6: 'saturday'
    }
  },
  connectivity_capabilities: {
    name: 'connectivity_capabilities',
    baseTypeid: 0x8C,
    baseType: 'uint32z',
    values: {
      0x1: 'bluetooth',
      0x2: 'bluetooth_le',
      0x4: 'ant',
      0x8: 'activity_upload',
      0x10: 'course_download',
      0x20: 'workout_download',
      0x40: 'live_track',
      0x80: 'weather_conditions',
      0x100: 'weather_alerts',
      0x200: 'gps_ephemeris_download',
      0x400: 'explicit_archive',
      0x800: 'setup_incomplete',
      0x1000: 'continue_sync_after_software_update',
      0x2000: 'connect_iq_app_download',
      0x4000: 'golf_course_download',
      /** Indicates device is in control of initiating all syncs */
      0x8000: 'device_initiates_sync',
      0x10000: 'connect_iq_watch_app_download',
      0x20000: 'connect_iq_widget_download',
      0x40000: 'connect_iq_watch_face_download',
      0x80000: 'connect_iq_data_field_download',
      /** Device supports delete and reorder of apps via GCM */
      0x100000: 'connect_iq_app_managment',
      0x200000: 'swing_sensor',
      0x400000: 'swing_sensor_remote',
      /** Device supports incident detection */
      0x800000: 'incident_detection',
      0x1000000: 'audio_prompts',
      /** Device supports reporting wifi verification via GCM */
      0x2000000: 'wifi_verification',
      /** Device supports True Up */
      0x4000000: 'true_up',
      /** Device supports Find My Watch */
      0x8000000: 'find_my_watch',
      0x10000000: 'remote_manual_sync',
      /** Device supports LiveTrack auto start */
      0x20000000: 'live_track_auto_start',
      /** Device supports LiveTrack Messaging */
      0x40000000: 'live_track_messaging',
      /** Device supports instant input feature */
      0x80000000: 'instant_input'
    }
  },
  weather_report: {
    name: 'weather_report',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'current',
      // /** Deprecated use hourly_forecast instead */
      // 0x1: 'forecast',
      0x1: 'hourly_forecast',
      0x2: 'daily_forecast'
    }
  },
  weather_status: {
    name: 'weather_status',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'clear',
      0x1: 'partly_cloudy',
      0x2: 'mostly_cloudy',
      0x3: 'rain',
      0x4: 'snow',
      0x5: 'windy',
      0x6: 'thunderstorms',
      0x7: 'wintry_mix',
      0x8: 'fog',
      0xb: 'hazy',
      0xc: 'hail',
      0xd: 'scattered_showers',
      0xe: 'scattered_thunderstorms',
      0xf: 'unknown_precipitation',
      0x10: 'light_rain',
      0x11: 'heavy_rain',
      0x12: 'light_snow',
      0x13: 'heavy_snow',
      0x14: 'light_rain_snow',
      0x15: 'heavy_rain_snow',
      0x16: 'cloudy'
    }
  },
  weather_severity: {
    name: 'weather_severity',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'unknown',
      0x1: 'warning',
      0x2: 'watch',
      0x3: 'advisory',
      0x4: 'statement'
    }
  },
  weather_severe_type: {
    name: 'weather_severe_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'unspecified',
      0x1: 'tornado',
      0x2: 'tsunami',
      0x3: 'hurricane',
      0x4: 'extreme_wind',
      0x5: 'typhoon',
      0x6: 'inland_hurricane',
      0x7: 'hurricane_force_wind',
      0x8: 'waterspout',
      0x9: 'severe_thunderstorm',
      0xa: 'wreckhouse_winds',
      0xb: 'les_suetes_wind',
      0xc: 'avalanche',
      0xd: 'flash_flood',
      0xe: 'tropical_storm',
      0xf: 'inland_tropical_storm',
      0x10: 'blizzard',
      0x11: 'ice_storm',
      0x12: 'freezing_rain',
      0x13: 'debris_flow',
      0x14: 'flash_freeze',
      0x15: 'dust_storm',
      0x16: 'high_wind',
      0x17: 'winter_storm',
      0x18: 'heavy_freezing_spray',
      0x19: 'extreme_cold',
      0x1a: 'wind_chill',
      0x1b: 'cold_wave',
      0x1c: 'heavy_snow_alert',
      0x1d: 'lake_effect_blowing_snow',
      0x1e: 'snow_squall',
      0x1f: 'lake_effect_snow',
      0x20: 'winter_weather',
      0x21: 'sleet',
      0x22: 'snowfall',
      0x23: 'snow_and_blowing_snow',
      0x24: 'blowing_snow',
      0x25: 'snow_alert',
      0x26: 'arctic_outflow',
      0x27: 'freezing_drizzle',
      0x28: 'storm',
      0x29: 'storm_surge',
      0x2a: 'rainfall',
      0x2b: 'areal_flood',
      0x2c: 'coastal_flood',
      0x2d: 'lakeshore_flood',
      0x2e: 'excessive_heat',
      0x2f: 'heat',
      0x30: 'weather',
      0x31: 'high_heat_and_humidity',
      0x32: 'humidex_and_health',
      0x33: 'humidex',
      0x34: 'gale',
      0x35: 'freezing_spray',
      0x36: 'special_marine',
      0x37: 'squall',
      0x38: 'strong_wind',
      0x39: 'lake_wind',
      0x3a: 'marine_weather',
      0x3b: 'wind',
      0x3c: 'small_craft_hazardous_seas',
      0x3d: 'hazardous_seas',
      0x3e: 'small_craft',
      0x3f: 'small_craft_winds',
      0x40: 'small_craft_rough_bar',
      0x41: 'high_water_level',
      0x42: 'ashfall',
      0x43: 'freezing_fog',
      0x44: 'dense_fog',
      0x45: 'dense_smoke',
      0x46: 'blowing_dust',
      0x47: 'hard_freeze',
      0x48: 'freeze',
      0x49: 'frost',
      0x4a: 'fire_weather',
      0x4b: 'flood',
      0x4c: 'rip_tide',
      0x4d: 'high_surf',
      0x4e: 'smog',
      0x4f: 'air_quality',
      0x50: 'brisk_wind',
      0x51: 'air_stagnation',
      0x52: 'low_water',
      0x53: 'hydrological',
      0x54: 'special_weather'
    }
  },
  /** number of seconds into the day since 00:00:00 UTC */
  time_into_day: {
    name: 'time_into_day',
    baseTypeid: 0x86,
    baseType: 'uint32',
  },
  /** number of seconds into the day since local 00:00:00 */
  localtime_into_day: {
    name: 'localtime_into_day',
    baseTypeid: 0x86,
    baseType: 'uint32',
  },
  stroke_type: {
    name: 'stroke_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'no_event',
      /** stroke was detected but cannot be identified */
      0x1: 'other',
      0x2: 'serve',
      0x3: 'forehand',
      0x4: 'backhand',
      0x5: 'smash'
    }
  },
  body_location: {
    name: 'body_location',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'left_leg',
      0x1: 'left_calf',
      0x2: 'left_shin',
      0x3: 'left_hamstring',
      0x4: 'left_quad',
      0x5: 'left_glute',
      0x6: 'right_leg',
      0x7: 'right_calf',
      0x8: 'right_shin',
      0x9: 'right_hamstring',
      0xa: 'right_quad',
      0xb: 'right_glute',
      0xc: 'torso_back',
      0xd: 'left_lower_back',
      0xe: 'left_upper_back',
      0xf: 'right_lower_back',
      0x10: 'right_upper_back',
      0x11: 'torso_front',
      0x12: 'left_abdomen',
      0x13: 'left_chest',
      0x14: 'right_abdomen',
      0x15: 'right_chest',
      0x16: 'left_arm',
      0x17: 'left_shoulder',
      0x18: 'left_bicep',
      0x19: 'left_tricep',
      /** Left anterior forearm */
      0x1a: 'left_brachioradialis',
      /** Left posterior forearm */
      0x1b: 'left_forearm_extensors',
      0x1c: 'right_arm',
      0x1d: 'right_shoulder',
      0x1e: 'right_bicep',
      0x1f: 'right_tricep',
      /** Right anterior forearm */
      0x20: 'right_brachioradialis',
      /** Right posterior forearm */
      0x21: 'right_forearm_extensors',
      0x22: 'neck',
      0x23: 'throat',
      0x24: 'waist_mid_back',
      0x25: 'waist_front',
      0x26: 'waist_left',
      0x27: 'waist_right'
    }
  },
  segment_lap_status: {
    name: 'segment_lap_status',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'end',
      0x1: 'fail'
    }
  },
  segment_leaderboard_type: {
    name: 'segment_leaderboard_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'overall',
      0x1: 'personal_best',
      0x2: 'connections',
      0x3: 'group',
      0x4: 'challenger',
      0x5: 'kom',
      0x6: 'qom',
      0x7: 'pr',
      0x8: 'goal',
      0x9: 'rival',
      0xa: 'club_leader'
    }
  },
  segment_delete_status: {
    name: 'segment_delete_status',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'do_not_delete',
      0x1: 'delete_one',
      0x2: 'delete_all'
    }
  },
  segment_selection_type: {
    name: 'segment_selection_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'starred',
      0x1: 'suggested'
    }
  },
  source_type: {
    name: 'source_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      /** External device connected with ANT */
      0x0: 'ant',
      /** External device connected with ANT+ */
      0x1: 'antplus',
      /** External device connected with BT */
      0x2: 'bluetooth',
      /** External device connected with BLE */
      0x3: 'bluetooth_low_energy',
      /** External device connected with Wifi */
      0x4: 'wifi',
      /** Onboard device */
      0x5: 'local'
    }
  },
  local_device_type: {
    name: 'local_device_type',
    baseTypeid: 0x02,
    baseType: 'uint8',
  },
  display_orientation: {
    name: 'display_orientation',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      /** automatic if the device supports it */
      0x0: 'auto',
      0x1: 'portrait',
      0x2: 'landscape',
      /** portrait mode but rotated 180 degrees */
      0x3: 'portrait_flipped',
      /** landscape mode but rotated 180 degrees */
      0x4: 'landscape_flipped'
    }
  },
  workout_equipment: {
    name: 'workout_equipment',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'none',
      0x1: 'swim_fins',
      0x2: 'swim_kickboard',
      0x3: 'swim_paddles',
      0x4: 'swim_pull_buoy',
      0x5: 'swim_snorkel'
    }
  },
  watchface_mode: {
    name: 'watchface_mode',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'digital',
      0x1: 'analog',
      0x2: 'connect_iq',
      0x3: 'disabled'
    }
  },
  digital_watchface_layout: {
    name: 'digital_watchface_layout',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'traditional',
      0x1: 'modern',
      0x2: 'bold'
    }
  },
  analog_watchface_layout: {
    name: 'analog_watchface_layout',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'minimal',
      0x1: 'traditional',
      0x2: 'modern'
    }
  },
  rider_position_type: {
    name: 'rider_position_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'seated',
      0x1: 'standing',
      0x2: 'transition_to_seated',
      0x3: 'transition_to_standing'
    }
  },
  power_phase_type: {
    name: 'power_phase_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'power_phase_start_angle',
      0x1: 'power_phase_end_angle',
      0x2: 'power_phase_arc_length',
      0x3: 'power_phase_center'
    }
  },
  camera_event_type: {
    name: 'camera_event_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      /** Start of video recording */
      0x0: 'video_start',
      /** Mark of video file split (end of one file, beginning of the other) */
      0x1: 'video_split',
      /** End of video recording */
      0x2: 'video_end',
      /** Still photo taken */
      0x3: 'photo_taken',
      0x4: 'video_second_stream_start',
      0x5: 'video_second_stream_split',
      0x6: 'video_second_stream_end',
      /** Mark of video file split start */
      0x7: 'video_split_start',
      0x8: 'video_second_stream_split_start',
      /** Mark when a video recording has been paused */
      0xb: 'video_pause',
      0xc: 'video_second_stream_pause',
      /** Mark when a video recording has been resumed */
      0xd: 'video_resume',
      0xe: 'video_second_stream_resume'
    }
  },
  sensor_type: {
    name: 'sensor_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'accelerometer',
      0x1: 'gyroscope',
      /** Magnetometer */
      0x2: 'compass',
      0x3: 'barometer'
    }
  },
  bike_light_network_config_type: {
    name: 'bike_light_network_config_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'auto',
      0x4: 'individual',
      0x5: 'high_visibility',
      0x6: 'trail'
    }
  },
  comm_timeout_type: {
    name: 'comm_timeout_type',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      /** Timeout pairing to any device */
      0x0: 'wildcard_pairing_timeout',
      /** Timeout pairing to previously paired device */
      0x1: 'pairing_timeout',
      /** Temporary loss of communications */
      0x2: 'connection_lost',
      /** Connection closed due to extended bad communications */
      0x3: 'connection_timeout'
    }
  },
  camera_orientation_type: {
    name: 'camera_orientation_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'camera_orientation_0',
      0x1: 'camera_orientation_90',
      0x2: 'camera_orientation_180',
      0x3: 'camera_orientation_270'
    }
  },
  attitude_stage: {
    name: 'attitude_stage',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'failed',
      0x1: 'aligning',
      0x2: 'degraded',
      0x3: 'valid'
    }
  },
  attitude_validity: {
    name: 'attitude_validity',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x1: 'track_angle_heading_valid',
      0x2: 'pitch_valid',
      0x4: 'roll_valid',
      0x8: 'lateral_body_accel_valid',
      0x10: 'normal_body_accel_valid',
      0x20: 'turn_rate_valid',
      0x40: 'hw_fail',
      0x80: 'mag_invalid',
      0x100: 'no_gps',
      0x200: 'gps_invalid',
      0x400: 'solution_coasting',
      0x800: 'true_track_angle',
      0x1000: 'magnetic_heading'
    }
  },
  auto_sync_frequency: {
    name: 'auto_sync_frequency',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'never',
      0x1: 'occasionally',
      0x2: 'frequent',
      0x3: 'once_a_day',
      0x4: 'remote'
    }
  },
  exd_layout: {
    name: 'exd_layout',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'full_screen',
      0x1: 'half_vertical',
      0x2: 'half_horizontal',
      0x3: 'half_vertical_right_split',
      0x4: 'half_horizontal_bottom_split',
      0x5: 'full_quarter_split',
      0x6: 'half_vertical_left_split',
      0x7: 'half_horizontal_top_split',
      /** The EXD may display the configured concepts in any layout it sees fit. */
      0x8: 'dynamic'
    }
  },
  exd_display_type: {
    name: 'exd_display_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'numerical',
      0x1: 'simple',
      0x2: 'graph',
      0x3: 'bar',
      0x4: 'circle_graph',
      0x5: 'virtual_partner',
      0x6: 'balance',
      0x7: 'string_list',
      0x8: 'string',
      0x9: 'simple_dynamic_icon',
      0xa: 'gauge'
    }
  },
  exd_data_units: {
    name: 'exd_data_units',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'no_units',
      0x1: 'laps',
      0x2: 'miles_per_hour',
      0x3: 'kilometers_per_hour',
      0x4: 'feet_per_hour',
      0x5: 'meters_per_hour',
      0x6: 'degrees_celsius',
      0x7: 'degrees_farenheit',
      0x8: 'zone',
      0x9: 'gear',
      0xa: 'rpm',
      0xb: 'bpm',
      0xc: 'degrees',
      0xd: 'millimeters',
      0xe: 'meters',
      0xf: 'kilometers',
      0x10: 'feet',
      0x11: 'yards',
      0x12: 'kilofeet',
      0x13: 'miles',
      0x14: 'time',
      0x15: 'enum_turn_type',
      0x16: 'percent',
      0x17: 'watts',
      0x18: 'watts_per_kilogram',
      0x19: 'enum_battery_status',
      0x1a: 'enum_bike_light_beam_angle_mode',
      0x1b: 'enum_bike_light_battery_status',
      0x1c: 'enum_bike_light_network_config_type',
      0x1d: 'lights',
      0x1e: 'seconds',
      0x1f: 'minutes',
      0x20: 'hours',
      0x21: 'calories',
      0x22: 'kilojoules',
      0x23: 'milliseconds',
      0x24: 'second_per_mile',
      0x25: 'second_per_kilometer',
      0x26: 'centimeter',
      0x27: 'enum_course_point',
      0x28: 'bradians',
      0x29: 'enum_sport',
      0x2a: 'inches_hg',
      0x2b: 'mm_hg',
      0x2c: 'mbars',
      0x2d: 'hecto_pascals',
      0x2e: 'feet_per_min',
      0x2f: 'meters_per_min',
      0x30: 'meters_per_sec',
      0x31: 'eight_cardinal'
    }
  },
  exd_qualifiers: {
    name: 'exd_qualifiers',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'no_qualifier',
      0x1: 'instantaneous',
      0x2: 'average',
      0x3: 'lap',
      0x4: 'maximum',
      0x5: 'maximum_average',
      0x6: 'maximum_lap',
      0x7: 'last_lap',
      0x8: 'average_lap',
      0x9: 'to_destination',
      0xa: 'to_go',
      0xb: 'to_next',
      0xc: 'next_course_point',
      0xd: 'total',
      0xe: 'three_second_average',
      0xf: 'ten_second_average',
      0x10: 'thirty_second_average',
      0x11: 'percent_maximum',
      0x12: 'percent_maximum_average',
      0x13: 'lap_percent_maximum',
      0x14: 'elapsed',
      0x15: 'sunrise',
      0x16: 'sunset',
      0x17: 'compared_to_virtual_partner',
      0x18: 'maximum_24h',
      0x19: 'minimum_24h',
      0x1a: 'minimum',
      0x1b: 'first',
      0x1c: 'second',
      0x1d: 'third',
      0x1e: 'shifter',
      0x1f: 'last_sport',
      0x20: 'moving',
      0x21: 'stopped',
      0x22: 'estimated_total',
      0xf2: 'zone_9',
      0xf3: 'zone_8',
      0xf4: 'zone_7',
      0xf5: 'zone_6',
      0xf6: 'zone_5',
      0xf7: 'zone_4',
      0xf8: 'zone_3',
      0xf9: 'zone_2',
      0xfa: 'zone_1'
    }
  },
  exd_descriptors: {
    name: 'exd_descriptors',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'bike_light_battery_status',
      0x1: 'beam_angle_status',
      0x2: 'batery_level',
      0x3: 'light_network_mode',
      0x4: 'number_lights_connected',
      0x5: 'cadence',
      0x6: 'distance',
      0x7: 'estimated_time_of_arrival',
      0x8: 'heading',
      0x9: 'time',
      0xa: 'battery_level',
      0xb: 'trainer_resistance',
      0xc: 'trainer_target_power',
      0xd: 'time_seated',
      0xe: 'time_standing',
      0xf: 'elevation',
      0x10: 'grade',
      0x11: 'ascent',
      0x12: 'descent',
      0x13: 'vertical_speed',
      0x14: 'di2_battery_level',
      0x15: 'front_gear',
      0x16: 'rear_gear',
      0x17: 'gear_ratio',
      0x18: 'heart_rate',
      0x19: 'heart_rate_zone',
      0x1a: 'time_in_heart_rate_zone',
      0x1b: 'heart_rate_reserve',
      0x1c: 'calories',
      0x1d: 'gps_accuracy',
      0x1e: 'gps_signal_strength',
      0x1f: 'temperature',
      0x20: 'time_of_day',
      0x21: 'balance',
      0x22: 'pedal_smoothness',
      0x23: 'power',
      0x24: 'functional_threshold_power',
      0x25: 'intensity_factor',
      0x26: 'work',
      0x27: 'power_ratio',
      0x28: 'normalized_power',
      0x29: 'training_stress_Score',
      0x2a: 'time_on_zone',
      0x2b: 'speed',
      0x2c: 'laps',
      0x2d: 'reps',
      0x2e: 'workout_step',
      0x2f: 'course_distance',
      0x30: 'navigation_distance',
      0x31: 'course_estimated_time_of_arrival',
      0x32: 'navigation_estimated_time_of_arrival',
      0x33: 'course_time',
      0x34: 'navigation_time',
      0x35: 'course_heading',
      0x36: 'navigation_heading',
      0x37: 'power_zone',
      0x38: 'torque_effectiveness',
      0x39: 'timer_time',
      0x3a: 'power_weight_ratio',
      0x3b: 'left_platform_center_offset',
      0x3c: 'right_platform_center_offset',
      0x3d: 'left_power_phase_start_angle',
      0x3e: 'right_power_phase_start_angle',
      0x3f: 'left_power_phase_finish_angle',
      0x40: 'right_power_phase_finish_angle',
      /** Combined gear information */
      0x41: 'gears',
      0x42: 'pace',
      0x43: 'training_effect',
      0x44: 'vertical_oscillation',
      0x45: 'vertical_ratio',
      0x46: 'ground_contact_time',
      0x47: 'left_ground_contact_time_balance',
      0x48: 'right_ground_contact_time_balance',
      0x49: 'stride_length',
      0x4a: 'running_cadence',
      0x4b: 'performance_condition',
      0x4c: 'course_type',
      0x4d: 'time_in_power_zone',
      0x4e: 'navigation_turn',
      0x4f: 'course_location',
      0x50: 'navigation_location',
      0x51: 'compass',
      0x52: 'gear_combo',
      0x53: 'muscle_oxygen',
      0x54: 'icon',
      0x55: 'compass_heading',
      0x56: 'gps_heading',
      0x57: 'gps_elevation',
      0x58: 'anaerobic_training_effect',
      0x59: 'course',
      0x5a: 'off_course',
      0x5b: 'glide_ratio',
      0x5c: 'vertical_distance',
      0x5d: 'vmg',
      0x5e: 'ambient_pressure',
      0x5f: 'pressure',
      0x60: 'vam'
    }
  },
  auto_activity_detect: {
    name: 'auto_activity_detect',
    baseTypeid: 0x86,
    baseType: 'uint32',
    values: {
      0x0: 'none',
      0x1: 'running',
      0x2: 'cycling',
      0x4: 'swimming',
      0x8: 'walking',
      0x20: 'elliptical',
      0x400: 'sedentary'
    }
  },
  supported_exd_screen_layouts: {
    name: 'supported_exd_screen_layouts',
    baseTypeid: 0x8C,
    baseType: 'uint32z',
    values: {
      0x1: 'full_screen',
      0x2: 'half_vertical',
      0x4: 'half_horizontal',
      0x8: 'half_vertical_right_split',
      0x10: 'half_horizontal_bottom_split',
      0x20: 'full_quarter_split',
      0x40: 'half_vertical_left_split',
      0x80: 'half_horizontal_top_split'
    }
  },
  fit_base_type: {
    name: 'fit_base_type',
    baseTypeid: 0x02,
    baseType: 'uint8',
    values: {
      0x0: 'enum',
      0x1: 'sint8',
      0x2: 'uint8',
      0x83: 'sint16',
      0x84: 'uint16',
      0x85: 'sint32',
      0x86: 'uint32',
      0x7: 'string',
      0x88: 'float32',
      0x89: 'float64',
      0xa: 'uint8z',
      0x8b: 'uint16z',
      0x8c: 'uint32z',
      0xd: 'byte',
      0x8e: 'sint64',
      0x8f: 'uint64',
      0x90: 'uint64z'
    }
  },
  turn_type: {
    name: 'turn_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'arriving_idx',
      0x1: 'arriving_left_idx',
      0x2: 'arriving_right_idx',
      0x3: 'arriving_via_idx',
      0x4: 'arriving_via_left_idx',
      0x5: 'arriving_via_right_idx',
      0x6: 'bear_keep_left_idx',
      0x7: 'bear_keep_right_idx',
      0x8: 'continue_idx',
      0x9: 'exit_left_idx',
      0xa: 'exit_right_idx',
      0xb: 'ferry_idx',
      0xc: 'roundabout_45_idx',
      0xd: 'roundabout_90_idx',
      0xe: 'roundabout_135_idx',
      0xf: 'roundabout_180_idx',
      0x10: 'roundabout_225_idx',
      0x11: 'roundabout_270_idx',
      0x12: 'roundabout_315_idx',
      0x13: 'roundabout_360_idx',
      0x14: 'roundabout_neg_45_idx',
      0x15: 'roundabout_neg_90_idx',
      0x16: 'roundabout_neg_135_idx',
      0x17: 'roundabout_neg_180_idx',
      0x18: 'roundabout_neg_225_idx',
      0x19: 'roundabout_neg_270_idx',
      0x1a: 'roundabout_neg_315_idx',
      0x1b: 'roundabout_neg_360_idx',
      0x1c: 'roundabout_generic_idx',
      0x1d: 'roundabout_neg_generic_idx',
      0x1e: 'sharp_turn_left_idx',
      0x1f: 'sharp_turn_right_idx',
      0x20: 'turn_left_idx',
      0x21: 'turn_right_idx',
      0x22: 'uturn_left_idx',
      0x23: 'uturn_right_idx',
      0x24: 'icon_inv_idx',
      0x25: 'icon_idx_cnt'
    }
  },
  bike_light_beam_angle_mode: {
    name: 'bike_light_beam_angle_mode',
    baseTypeid: 0x02,
    baseType: 'uint8',
    values: {
      0x0: 'manual',
      0x1: 'auto'
    }
  },
  fit_base_unit: {
    name: 'fit_base_unit',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'other',
      0x1: 'kilogram',
      0x2: 'pound'
    }
  },
  set_type: {
    name: 'set_type',
    baseTypeid: 0x02,
    baseType: 'uint8',
    values: {
      0x0: 'rest',
      0x1: 'active'
    }
  },
  exercise_category: {
    name: 'exercise_category',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'bench_press',
      0x1: 'calf_raise',
      0x2: 'cardio',
      0x3: 'carry',
      0x4: 'chop',
      0x5: 'core',
      0x6: 'crunch',
      0x7: 'curl',
      0x8: 'deadlift',
      0x9: 'flye',
      0xa: 'hip_raise',
      0xb: 'hip_stability',
      0xc: 'hip_swing',
      0xd: 'hyperextension',
      0xe: 'lateral_raise',
      0xf: 'leg_curl',
      0x10: 'leg_raise',
      0x11: 'lunge',
      0x12: 'olympic_lift',
      0x13: 'plank',
      0x14: 'plyo',
      0x15: 'pull_up',
      0x16: 'push_up',
      0x17: 'row',
      0x18: 'shoulder_press',
      0x19: 'shoulder_stability',
      0x1a: 'shrug',
      0x1b: 'sit_up',
      0x1c: 'squat',
      0x1d: 'total_body',
      0x1e: 'triceps_extension',
      0x1f: 'warm_up',
      0x20: 'run',
      0xfffe: 'unknown'
    }
  },
  bench_press_exercise_name: {
    name: 'bench_press_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'alternating_dumbbell_chest_press_on_swiss_ball',
      0x1: 'barbell_bench_press',
      0x2: 'barbell_board_bench_press',
      0x3: 'barbell_floor_press',
      0x4: 'close_grip_barbell_bench_press',
      0x5: 'decline_dumbbell_bench_press',
      0x6: 'dumbbell_bench_press',
      0x7: 'dumbbell_floor_press',
      0x8: 'incline_barbell_bench_press',
      0x9: 'incline_dumbbell_bench_press',
      0xa: 'incline_smith_machine_bench_press',
      0xb: 'isometric_barbell_bench_press',
      0xc: 'kettlebell_chest_press',
      0xd: 'neutral_grip_dumbbell_bench_press',
      0xe: 'neutral_grip_dumbbell_incline_bench_press',
      0xf: 'one_arm_floor_press',
      0x10: 'weighted_one_arm_floor_press',
      0x11: 'partial_lockout',
      0x12: 'reverse_grip_barbell_bench_press',
      0x13: 'reverse_grip_incline_bench_press',
      0x14: 'single_arm_cable_chest_press',
      0x15: 'single_arm_dumbbell_bench_press',
      0x16: 'smith_machine_bench_press',
      0x17: 'swiss_ball_dumbbell_chest_press',
      0x18: 'triple_stop_barbell_bench_press',
      0x19: 'wide_grip_barbell_bench_press',
      0x1a: 'alternating_dumbbell_chest_press'
    }
  },
  calf_raise_exercise_name: {
    name: 'calf_raise_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: '3_way_calf_raise',
      0x1: '3_way_weighted_calf_raise',
      0x2: '3_way_single_leg_calf_raise',
      0x3: '3_way_weighted_single_leg_calf_raise',
      0x4: 'donkey_calf_raise',
      0x5: 'weighted_donkey_calf_raise',
      0x6: 'seated_calf_raise',
      0x7: 'weighted_seated_calf_raise',
      0x8: 'seated_dumbbell_toe_raise',
      0x9: 'single_leg_bent_knee_calf_raise',
      0xa: 'weighted_single_leg_bent_knee_calf_raise',
      0xb: 'single_leg_decline_push_up',
      0xc: 'single_leg_donkey_calf_raise',
      0xd: 'weighted_single_leg_donkey_calf_raise',
      0xe: 'single_leg_hip_raise_with_knee_hold',
      0xf: 'single_leg_standing_calf_raise',
      0x10: 'single_leg_standing_dumbbell_calf_raise',
      0x11: 'standing_barbell_calf_raise',
      0x12: 'standing_calf_raise',
      0x13: 'weighted_standing_calf_raise',
      0x14: 'standing_dumbbell_calf_raise'
    }
  },
  cardio_exercise_name: {
    name: 'cardio_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'bob_and_weave_circle',
      0x1: 'weighted_bob_and_weave_circle',
      0x2: 'cardio_core_crawl',
      0x3: 'weighted_cardio_core_crawl',
      0x4: 'double_under',
      0x5: 'weighted_double_under',
      0x6: 'jump_rope',
      0x7: 'weighted_jump_rope',
      0x8: 'jump_rope_crossover',
      0x9: 'weighted_jump_rope_crossover',
      0xa: 'jump_rope_jog',
      0xb: 'weighted_jump_rope_jog',
      0xc: 'jumping_jacks',
      0xd: 'weighted_jumping_jacks',
      0xe: 'ski_moguls',
      0xf: 'weighted_ski_moguls',
      0x10: 'split_jacks',
      0x11: 'weighted_split_jacks',
      0x12: 'squat_jacks',
      0x13: 'weighted_squat_jacks',
      0x14: 'triple_under',
      0x15: 'weighted_triple_under'
    }
  },
  carry_exercise_name: {
    name: 'carry_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'bar_holds',
      0x1: 'farmers_walk',
      0x2: 'farmers_walk_on_toes',
      0x3: 'hex_dumbbell_hold',
      0x4: 'overhead_carry'
    }
  },
  chop_exercise_name: {
    name: 'chop_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'cable_pull_through',
      0x1: 'cable_rotational_lift',
      0x2: 'cable_woodchop',
      0x3: 'cross_chop_to_knee',
      0x4: 'weighted_cross_chop_to_knee',
      0x5: 'dumbbell_chop',
      0x6: 'half_kneeling_rotation',
      0x7: 'weighted_half_kneeling_rotation',
      0x8: 'half_kneeling_rotational_chop',
      0x9: 'half_kneeling_rotational_reverse_chop',
      0xa: 'half_kneeling_stability_chop',
      0xb: 'half_kneeling_stability_reverse_chop',
      0xc: 'kneeling_rotational_chop',
      0xd: 'kneeling_rotational_reverse_chop',
      0xe: 'kneeling_stability_chop',
      0xf: 'kneeling_woodchopper',
      0x10: 'medicine_ball_wood_chops',
      0x11: 'power_squat_chops',
      0x12: 'weighted_power_squat_chops',
      0x13: 'standing_rotational_chop',
      0x14: 'standing_split_rotational_chop',
      0x15: 'standing_split_rotational_reverse_chop',
      0x16: 'standing_stability_reverse_chop'
    }
  },
  core_exercise_name: {
    name: 'core_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'abs_jabs',
      0x1: 'weighted_abs_jabs',
      0x2: 'alternating_plate_reach',
      0x3: 'barbell_rollout',
      0x4: 'weighted_barbell_rollout',
      0x5: 'body_bar_oblique_twist',
      0x6: 'cable_core_press',
      0x7: 'cable_side_bend',
      0x8: 'side_bend',
      0x9: 'weighted_side_bend',
      0xa: 'crescent_circle',
      0xb: 'weighted_crescent_circle',
      0xc: 'cycling_russian_twist',
      0xd: 'weighted_cycling_russian_twist',
      0xe: 'elevated_feet_russian_twist',
      0xf: 'weighted_elevated_feet_russian_twist',
      0x10: 'half_turkish_get_up',
      0x11: 'kettlebell_windmill',
      0x12: 'kneeling_ab_wheel',
      0x13: 'weighted_kneeling_ab_wheel',
      0x14: 'modified_front_lever',
      0x15: 'open_knee_tucks',
      0x16: 'weighted_open_knee_tucks',
      0x17: 'side_abs_leg_lift',
      0x18: 'weighted_side_abs_leg_lift',
      0x19: 'swiss_ball_jackknife',
      0x1a: 'weighted_swiss_ball_jackknife',
      0x1b: 'swiss_ball_pike',
      0x1c: 'weighted_swiss_ball_pike',
      0x1d: 'swiss_ball_rollout',
      0x1e: 'weighted_swiss_ball_rollout',
      0x1f: 'triangle_hip_press',
      0x20: 'weighted_triangle_hip_press',
      0x21: 'trx_suspended_jackknife',
      0x22: 'weighted_trx_suspended_jackknife',
      0x23: 'u_boat',
      0x24: 'weighted_u_boat',
      0x25: 'windmill_switches',
      0x26: 'weighted_windmill_switches',
      0x27: 'alternating_slide_out',
      0x28: 'weighted_alternating_slide_out',
      0x29: 'ghd_back_extensions',
      0x2a: 'weighted_ghd_back_extensions',
      0x2b: 'overhead_walk',
      0x2c: 'inchworm',
      0x2d: 'weighted_modified_front_lever',
      0x2e: 'russian_twist',
      // /** Deprecated do not use */
      // 0x2f: 'abdominal_leg_rotations',
      0x30: 'arm_and_leg_extension_on_knees',
      0x31: 'bicycle',
      0x32: 'bicep_curl_with_leg_extension',
      0x33: 'cat_cow',
      0x34: 'corkscrew',
      0x35: 'criss_cross',
      // /** Deprecated do not use */
      // 0x36: 'criss_cross_with_ball',
      0x37: 'double_leg_stretch',
      0x38: 'knee_folds',
      0x39: 'lower_lift',
      0x3a: 'neck_pull',
      0x3b: 'pelvic_clocks',
      0x3c: 'roll_over',
      0x3d: 'roll_up',
      0x3e: 'rolling',
      0x3f: 'rowing_1',
      0x40: 'rowing_2',
      0x41: 'scissors',
      0x42: 'single_leg_circles',
      0x43: 'single_leg_stretch',
      // /** Deprecated do not use */
      // 0x44: 'snake_twist_1_and_2',
      0x45: 'swan',
      0x46: 'swimming',
      0x47: 'teaser',
      0x48: 'the_hundred'
    }
  },
  crunch_exercise_name: {
    name: 'crunch_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'bicycle_crunch',
      0x1: 'cable_crunch',
      0x2: 'circular_arm_crunch',
      0x3: 'crossed_arms_crunch',
      0x4: 'weighted_crossed_arms_crunch',
      0x5: 'cross_leg_reverse_crunch',
      0x6: 'weighted_cross_leg_reverse_crunch',
      0x7: 'crunch_chop',
      0x8: 'weighted_crunch_chop',
      0x9: 'double_crunch',
      0xa: 'weighted_double_crunch',
      0xb: 'elbow_to_knee_crunch',
      0xc: 'weighted_elbow_to_knee_crunch',
      0xd: 'flutter_kicks',
      0xe: 'weighted_flutter_kicks',
      0xf: 'foam_roller_reverse_crunch_on_bench',
      0x10: 'weighted_foam_roller_reverse_crunch_on_bench',
      0x11: 'foam_roller_reverse_crunch_with_dumbbell',
      0x12: 'foam_roller_reverse_crunch_with_medicine_ball',
      0x13: 'frog_press',
      0x14: 'hanging_knee_raise_oblique_crunch',
      0x15: 'weighted_hanging_knee_raise_oblique_crunch',
      0x16: 'hip_crossover',
      0x17: 'weighted_hip_crossover',
      0x18: 'hollow_rock',
      0x19: 'weighted_hollow_rock',
      0x1a: 'incline_reverse_crunch',
      0x1b: 'weighted_incline_reverse_crunch',
      0x1c: 'kneeling_cable_crunch',
      0x1d: 'kneeling_cross_crunch',
      0x1e: 'weighted_kneeling_cross_crunch',
      0x1f: 'kneeling_oblique_cable_crunch',
      0x20: 'knees_to_elbow',
      0x21: 'leg_extensions',
      0x22: 'weighted_leg_extensions',
      0x23: 'leg_levers',
      0x24: 'mcgill_curl_up',
      0x25: 'weighted_mcgill_curl_up',
      0x26: 'modified_pilates_roll_up_with_ball',
      0x27: 'weighted_modified_pilates_roll_up_with_ball',
      0x28: 'pilates_crunch',
      0x29: 'weighted_pilates_crunch',
      0x2a: 'pilates_roll_up_with_ball',
      0x2b: 'weighted_pilates_roll_up_with_ball',
      0x2c: 'raised_legs_crunch',
      0x2d: 'weighted_raised_legs_crunch',
      0x2e: 'reverse_crunch',
      0x2f: 'weighted_reverse_crunch',
      0x30: 'reverse_crunch_on_a_bench',
      0x31: 'weighted_reverse_crunch_on_a_bench',
      0x32: 'reverse_curl_and_lift',
      0x33: 'weighted_reverse_curl_and_lift',
      0x34: 'rotational_lift',
      0x35: 'weighted_rotational_lift',
      0x36: 'seated_alternating_reverse_crunch',
      0x37: 'weighted_seated_alternating_reverse_crunch',
      0x38: 'seated_leg_u',
      0x39: 'weighted_seated_leg_u',
      0x3a: 'side_to_side_crunch_and_weave',
      0x3b: 'weighted_side_to_side_crunch_and_weave',
      0x3c: 'single_leg_reverse_crunch',
      0x3d: 'weighted_single_leg_reverse_crunch',
      0x3e: 'skater_crunch_cross',
      0x3f: 'weighted_skater_crunch_cross',
      0x40: 'standing_cable_crunch',
      0x41: 'standing_side_crunch',
      0x42: 'step_climb',
      0x43: 'weighted_step_climb',
      0x44: 'swiss_ball_crunch',
      0x45: 'swiss_ball_reverse_crunch',
      0x46: 'weighted_swiss_ball_reverse_crunch',
      0x47: 'swiss_ball_russian_twist',
      0x48: 'weighted_swiss_ball_russian_twist',
      0x49: 'swiss_ball_side_crunch',
      0x4a: 'weighted_swiss_ball_side_crunch',
      0x4b: 'thoracic_crunches_on_foam_roller',
      0x4c: 'weighted_thoracic_crunches_on_foam_roller',
      0x4d: 'triceps_crunch',
      0x4e: 'weighted_bicycle_crunch',
      0x4f: 'weighted_crunch',
      0x50: 'weighted_swiss_ball_crunch',
      0x51: 'toes_to_bar',
      0x52: 'weighted_toes_to_bar',
      0x53: 'crunch',
      0x54: 'straight_leg_crunch_with_ball'
    }
  },
  curl_exercise_name: {
    name: 'curl_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'alternating_dumbbell_biceps_curl',
      0x1: 'alternating_dumbbell_biceps_curl_on_swiss_ball',
      0x2: 'alternating_incline_dumbbell_biceps_curl',
      0x3: 'barbell_biceps_curl',
      0x4: 'barbell_reverse_wrist_curl',
      0x5: 'barbell_wrist_curl',
      0x6: 'behind_the_back_barbell_reverse_wrist_curl',
      0x7: 'behind_the_back_one_arm_cable_curl',
      0x8: 'cable_biceps_curl',
      0x9: 'cable_hammer_curl',
      0xa: 'cheating_barbell_biceps_curl',
      0xb: 'close_grip_ez_bar_biceps_curl',
      0xc: 'cross_body_dumbbell_hammer_curl',
      0xd: 'dead_hang_biceps_curl',
      0xe: 'decline_hammer_curl',
      0xf: 'dumbbell_biceps_curl_with_static_hold',
      0x10: 'dumbbell_hammer_curl',
      0x11: 'dumbbell_reverse_wrist_curl',
      0x12: 'dumbbell_wrist_curl',
      0x13: 'ez_bar_preacher_curl',
      0x14: 'forward_bend_biceps_curl',
      0x15: 'hammer_curl_to_press',
      0x16: 'incline_dumbbell_biceps_curl',
      0x17: 'incline_offset_thumb_dumbbell_curl',
      0x18: 'kettlebell_biceps_curl',
      0x19: 'lying_concentration_cable_curl',
      0x1a: 'one_arm_preacher_curl',
      0x1b: 'plate_pinch_curl',
      0x1c: 'preacher_curl_with_cable',
      0x1d: 'reverse_ez_bar_curl',
      0x1e: 'reverse_grip_wrist_curl',
      0x1f: 'reverse_grip_barbell_biceps_curl',
      0x20: 'seated_alternating_dumbbell_biceps_curl',
      0x21: 'seated_dumbbell_biceps_curl',
      0x22: 'seated_reverse_dumbbell_curl',
      0x23: 'split_stance_offset_pinky_dumbbell_curl',
      0x24: 'standing_alternating_dumbbell_curls',
      0x25: 'standing_dumbbell_biceps_curl',
      0x26: 'standing_ez_bar_biceps_curl',
      0x27: 'static_curl',
      0x28: 'swiss_ball_dumbbell_overhead_triceps_extension',
      0x29: 'swiss_ball_ez_bar_preacher_curl',
      0x2a: 'twisting_standing_dumbbell_biceps_curl',
      0x2b: 'wide_grip_ez_bar_biceps_curl'
    }
  },
  deadlift_exercise_name: {
    name: 'deadlift_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'barbell_deadlift',
      0x1: 'barbell_straight_leg_deadlift',
      0x2: 'dumbbell_deadlift',
      0x3: 'dumbbell_single_leg_deadlift_to_row',
      0x4: 'dumbbell_straight_leg_deadlift',
      0x5: 'kettlebell_floor_to_shelf',
      0x6: 'one_arm_one_leg_deadlift',
      0x7: 'rack_pull',
      0x8: 'rotational_dumbbell_straight_leg_deadlift',
      0x9: 'single_arm_deadlift',
      0xa: 'single_leg_barbell_deadlift',
      0xb: 'single_leg_barbell_straight_leg_deadlift',
      0xc: 'single_leg_deadlift_with_barbell',
      0xd: 'single_leg_rdl_circuit',
      0xe: 'single_leg_romanian_deadlift_with_dumbbell',
      0xf: 'sumo_deadlift',
      0x10: 'sumo_deadlift_high_pull',
      0x11: 'trap_bar_deadlift',
      0x12: 'wide_grip_barbell_deadlift'
    }
  },
  flye_exercise_name: {
    name: 'flye_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'cable_crossover',
      0x1: 'decline_dumbbell_flye',
      0x2: 'dumbbell_flye',
      0x3: 'incline_dumbbell_flye',
      0x4: 'kettlebell_flye',
      0x5: 'kneeling_rear_flye',
      0x6: 'single_arm_standing_cable_reverse_flye',
      0x7: 'swiss_ball_dumbbell_flye',
      0x8: 'arm_rotations',
      0x9: 'hug_a_tree'
    }
  },
  hip_raise_exercise_name: {
    name: 'hip_raise_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'barbell_hip_thrust_on_floor',
      0x1: 'barbell_hip_thrust_with_bench',
      0x2: 'bent_knee_swiss_ball_reverse_hip_raise',
      0x3: 'weighted_bent_knee_swiss_ball_reverse_hip_raise',
      0x4: 'bridge_with_leg_extension',
      0x5: 'weighted_bridge_with_leg_extension',
      0x6: 'clam_bridge',
      0x7: 'front_kick_tabletop',
      0x8: 'weighted_front_kick_tabletop',
      0x9: 'hip_extension_and_cross',
      0xa: 'weighted_hip_extension_and_cross',
      0xb: 'hip_raise',
      0xc: 'weighted_hip_raise',
      0xd: 'hip_raise_with_feet_on_swiss_ball',
      0xe: 'weighted_hip_raise_with_feet_on_swiss_ball',
      0xf: 'hip_raise_with_head_on_bosu_ball',
      0x10: 'weighted_hip_raise_with_head_on_bosu_ball',
      0x11: 'hip_raise_with_head_on_swiss_ball',
      0x12: 'weighted_hip_raise_with_head_on_swiss_ball',
      0x13: 'hip_raise_with_knee_squeeze',
      0x14: 'weighted_hip_raise_with_knee_squeeze',
      0x15: 'incline_rear_leg_extension',
      0x16: 'weighted_incline_rear_leg_extension',
      0x17: 'kettlebell_swing',
      0x18: 'marching_hip_raise',
      0x19: 'weighted_marching_hip_raise',
      0x1a: 'marching_hip_raise_with_feet_on_a_swiss_ball',
      0x1b: 'weighted_marching_hip_raise_with_feet_on_a_swiss_ball',
      0x1c: 'reverse_hip_raise',
      0x1d: 'weighted_reverse_hip_raise',
      0x1e: 'single_leg_hip_raise',
      0x1f: 'weighted_single_leg_hip_raise',
      0x20: 'single_leg_hip_raise_with_foot_on_bench',
      0x21: 'weighted_single_leg_hip_raise_with_foot_on_bench',
      0x22: 'single_leg_hip_raise_with_foot_on_bosu_ball',
      0x23: 'weighted_single_leg_hip_raise_with_foot_on_bosu_ball',
      0x24: 'single_leg_hip_raise_with_foot_on_foam_roller',
      0x25: 'weighted_single_leg_hip_raise_with_foot_on_foam_roller',
      0x26: 'single_leg_hip_raise_with_foot_on_medicine_ball',
      0x27: 'weighted_single_leg_hip_raise_with_foot_on_medicine_ball',
      0x28: 'single_leg_hip_raise_with_head_on_bosu_ball',
      0x29: 'weighted_single_leg_hip_raise_with_head_on_bosu_ball',
      0x2a: 'weighted_clam_bridge',
      0x2b: 'single_leg_swiss_ball_hip_raise_and_leg_curl',
      0x2c: 'clams',
      // /** Deprecated do not use */
      // 0x2d: 'inner_thigh_circles',
      // /** Deprecated do not use */
      // 0x2e: 'inner_thigh_side_lift',
      0x2f: 'leg_circles',
      0x30: 'leg_lift',
      0x31: 'leg_lift_in_external_rotation'
    }
  },
  hip_stability_exercise_name: {
    name: 'hip_stability_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'band_side_lying_leg_raise',
      0x1: 'dead_bug',
      0x2: 'weighted_dead_bug',
      0x3: 'external_hip_raise',
      0x4: 'weighted_external_hip_raise',
      0x5: 'fire_hydrant_kicks',
      0x6: 'weighted_fire_hydrant_kicks',
      0x7: 'hip_circles',
      0x8: 'weighted_hip_circles',
      0x9: 'inner_thigh_lift',
      0xa: 'weighted_inner_thigh_lift',
      0xb: 'lateral_walks_with_band_at_ankles',
      0xc: 'pretzel_side_kick',
      0xd: 'weighted_pretzel_side_kick',
      0xe: 'prone_hip_internal_rotation',
      0xf: 'weighted_prone_hip_internal_rotation',
      0x10: 'quadruped',
      0x11: 'quadruped_hip_extension',
      0x12: 'weighted_quadruped_hip_extension',
      0x13: 'quadruped_with_leg_lift',
      0x14: 'weighted_quadruped_with_leg_lift',
      0x15: 'side_lying_leg_raise',
      0x16: 'weighted_side_lying_leg_raise',
      0x17: 'sliding_hip_adduction',
      0x18: 'weighted_sliding_hip_adduction',
      0x19: 'standing_adduction',
      0x1a: 'weighted_standing_adduction',
      0x1b: 'standing_cable_hip_abduction',
      0x1c: 'standing_hip_abduction',
      0x1d: 'weighted_standing_hip_abduction',
      0x1e: 'standing_rear_leg_raise',
      0x1f: 'weighted_standing_rear_leg_raise',
      0x20: 'supine_hip_internal_rotation',
      0x21: 'weighted_supine_hip_internal_rotation'
    }
  },
  hip_swing_exercise_name: {
    name: 'hip_swing_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'single_arm_kettlebell_swing',
      0x1: 'single_arm_dumbbell_swing',
      0x2: 'step_out_swing'
    }
  },
  hyperextension_exercise_name: {
    name: 'hyperextension_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'back_extension_with_opposite_arm_and_leg_reach',
      0x1: 'weighted_back_extension_with_opposite_arm_and_leg_reach',
      0x2: 'base_rotations',
      0x3: 'weighted_base_rotations',
      0x4: 'bent_knee_reverse_hyperextension',
      0x5: 'weighted_bent_knee_reverse_hyperextension',
      0x6: 'hollow_hold_and_roll',
      0x7: 'weighted_hollow_hold_and_roll',
      0x8: 'kicks',
      0x9: 'weighted_kicks',
      0xa: 'knee_raises',
      0xb: 'weighted_knee_raises',
      0xc: 'kneeling_superman',
      0xd: 'weighted_kneeling_superman',
      0xe: 'lat_pull_down_with_row',
      0xf: 'medicine_ball_deadlift_to_reach',
      0x10: 'one_arm_one_leg_row',
      0x11: 'one_arm_row_with_band',
      0x12: 'overhead_lunge_with_medicine_ball',
      0x13: 'plank_knee_tucks',
      0x14: 'weighted_plank_knee_tucks',
      0x15: 'side_step',
      0x16: 'weighted_side_step',
      0x17: 'single_leg_back_extension',
      0x18: 'weighted_single_leg_back_extension',
      0x19: 'spine_extension',
      0x1a: 'weighted_spine_extension',
      0x1b: 'static_back_extension',
      0x1c: 'weighted_static_back_extension',
      0x1d: 'superman_from_floor',
      0x1e: 'weighted_superman_from_floor',
      0x1f: 'swiss_ball_back_extension',
      0x20: 'weighted_swiss_ball_back_extension',
      0x21: 'swiss_ball_hyperextension',
      0x22: 'weighted_swiss_ball_hyperextension',
      0x23: 'swiss_ball_opposite_arm_and_leg_lift',
      0x24: 'weighted_swiss_ball_opposite_arm_and_leg_lift',
      0x25: 'superman_on_swiss_ball',
      0x26: 'cobra',
      // /** Deprecated do not use */
      // 0x27: 'supine_floor_barre'
    }
  },
  lateral_raise_exercise_name: {
    name: 'lateral_raise_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: '45_degree_cable_external_rotation',
      0x1: 'alternating_lateral_raise_with_static_hold',
      0x2: 'bar_muscle_up',
      0x3: 'bent_over_lateral_raise',
      0x4: 'cable_diagonal_raise',
      0x5: 'cable_front_raise',
      0x6: 'calorie_row',
      0x7: 'combo_shoulder_raise',
      0x8: 'dumbbell_diagonal_raise',
      0x9: 'dumbbell_v_raise',
      0xa: 'front_raise',
      0xb: 'leaning_dumbbell_lateral_raise',
      0xc: 'lying_dumbbell_raise',
      0xd: 'muscle_up',
      0xe: 'one_arm_cable_lateral_raise',
      0xf: 'overhand_grip_rear_lateral_raise',
      0x10: 'plate_raises',
      0x11: 'ring_dip',
      0x12: 'weighted_ring_dip',
      0x13: 'ring_muscle_up',
      0x14: 'weighted_ring_muscle_up',
      0x15: 'rope_climb',
      0x16: 'weighted_rope_climb',
      0x17: 'scaption',
      0x18: 'seated_lateral_raise',
      0x19: 'seated_rear_lateral_raise',
      0x1a: 'side_lying_lateral_raise',
      0x1b: 'standing_lift',
      0x1c: 'suspended_row',
      0x1d: 'underhand_grip_rear_lateral_raise',
      0x1e: 'wall_slide',
      0x1f: 'weighted_wall_slide',
      0x20: 'arm_circles',
      0x21: 'shaving_the_head'
    }
  },
  leg_curl_exercise_name: {
    name: 'leg_curl_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'leg_curl',
      0x1: 'weighted_leg_curl',
      0x2: 'good_morning',
      0x3: 'seated_barbell_good_morning',
      0x4: 'single_leg_barbell_good_morning',
      0x5: 'single_leg_sliding_leg_curl',
      0x6: 'sliding_leg_curl',
      0x7: 'split_barbell_good_morning',
      0x8: 'split_stance_extension',
      0x9: 'staggered_stance_good_morning',
      0xa: 'swiss_ball_hip_raise_and_leg_curl',
      0xb: 'zercher_good_morning'
    }
  },
  leg_raise_exercise_name: {
    name: 'leg_raise_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'hanging_knee_raise',
      0x1: 'hanging_leg_raise',
      0x2: 'weighted_hanging_leg_raise',
      0x3: 'hanging_single_leg_raise',
      0x4: 'weighted_hanging_single_leg_raise',
      0x5: 'kettlebell_leg_raises',
      0x6: 'leg_lowering_drill',
      0x7: 'weighted_leg_lowering_drill',
      0x8: 'lying_straight_leg_raise',
      0x9: 'weighted_lying_straight_leg_raise',
      0xa: 'medicine_ball_leg_drops',
      0xb: 'quadruped_leg_raise',
      0xc: 'weighted_quadruped_leg_raise',
      0xd: 'reverse_leg_raise',
      0xe: 'weighted_reverse_leg_raise',
      0xf: 'reverse_leg_raise_on_swiss_ball',
      0x10: 'weighted_reverse_leg_raise_on_swiss_ball',
      0x11: 'single_leg_lowering_drill',
      0x12: 'weighted_single_leg_lowering_drill',
      0x13: 'weighted_hanging_knee_raise',
      0x14: 'lateral_stepover',
      0x15: 'weighted_lateral_stepover'
    }
  },
  lunge_exercise_name: {
    name: 'lunge_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'overhead_lunge',
      0x1: 'lunge_matrix',
      0x2: 'weighted_lunge_matrix',
      0x3: 'alternating_barbell_forward_lunge',
      0x4: 'alternating_dumbbell_lunge_with_reach',
      0x5: 'back_foot_elevated_dumbbell_split_squat',
      0x6: 'barbell_box_lunge',
      0x7: 'barbell_bulgarian_split_squat',
      0x8: 'barbell_crossover_lunge',
      0x9: 'barbell_front_split_squat',
      0xa: 'barbell_lunge',
      0xb: 'barbell_reverse_lunge',
      0xc: 'barbell_side_lunge',
      0xd: 'barbell_split_squat',
      0xe: 'core_control_rear_lunge',
      0xf: 'diagonal_lunge',
      0x10: 'drop_lunge',
      0x11: 'dumbbell_box_lunge',
      0x12: 'dumbbell_bulgarian_split_squat',
      0x13: 'dumbbell_crossover_lunge',
      0x14: 'dumbbell_diagonal_lunge',
      0x15: 'dumbbell_lunge',
      0x16: 'dumbbell_lunge_and_rotation',
      0x17: 'dumbbell_overhead_bulgarian_split_squat',
      0x18: 'dumbbell_reverse_lunge_to_high_knee_and_press',
      0x19: 'dumbbell_side_lunge',
      0x1a: 'elevated_front_foot_barbell_split_squat',
      0x1b: 'front_foot_elevated_dumbbell_split_squat',
      0x1c: 'gunslinger_lunge',
      0x1d: 'lawnmower_lunge',
      0x1e: 'low_lunge_with_isometric_adduction',
      0x1f: 'low_side_to_side_lunge',
      0x20: 'lunge',
      0x21: 'weighted_lunge',
      0x22: 'lunge_with_arm_reach',
      0x23: 'lunge_with_diagonal_reach',
      0x24: 'lunge_with_side_bend',
      0x25: 'offset_dumbbell_lunge',
      0x26: 'offset_dumbbell_reverse_lunge',
      0x27: 'overhead_bulgarian_split_squat',
      0x28: 'overhead_dumbbell_reverse_lunge',
      0x29: 'overhead_dumbbell_split_squat',
      0x2a: 'overhead_lunge_with_rotation',
      0x2b: 'reverse_barbell_box_lunge',
      0x2c: 'reverse_box_lunge',
      0x2d: 'reverse_dumbbell_box_lunge',
      0x2e: 'reverse_dumbbell_crossover_lunge',
      0x2f: 'reverse_dumbbell_diagonal_lunge',
      0x30: 'reverse_lunge_with_reach_back',
      0x31: 'weighted_reverse_lunge_with_reach_back',
      0x32: 'reverse_lunge_with_twist_and_overhead_reach',
      0x33: 'weighted_reverse_lunge_with_twist_and_overhead_reach',
      0x34: 'reverse_sliding_box_lunge',
      0x35: 'weighted_reverse_sliding_box_lunge',
      0x36: 'reverse_sliding_lunge',
      0x37: 'weighted_reverse_sliding_lunge',
      0x38: 'runners_lunge_to_balance',
      0x39: 'weighted_runners_lunge_to_balance',
      0x3a: 'shifting_side_lunge',
      0x3b: 'side_and_crossover_lunge',
      0x3c: 'weighted_side_and_crossover_lunge',
      0x3d: 'side_lunge',
      0x3e: 'weighted_side_lunge',
      0x3f: 'side_lunge_and_press',
      0x40: 'side_lunge_jump_off',
      0x41: 'side_lunge_sweep',
      0x42: 'weighted_side_lunge_sweep',
      0x43: 'side_lunge_to_crossover_tap',
      0x44: 'weighted_side_lunge_to_crossover_tap',
      0x45: 'side_to_side_lunge_chops',
      0x46: 'weighted_side_to_side_lunge_chops',
      0x47: 'siff_jump_lunge',
      0x48: 'weighted_siff_jump_lunge',
      0x49: 'single_arm_reverse_lunge_and_press',
      0x4a: 'sliding_lateral_lunge',
      0x4b: 'weighted_sliding_lateral_lunge',
      0x4c: 'walking_barbell_lunge',
      0x4d: 'walking_dumbbell_lunge',
      0x4e: 'walking_lunge',
      0x4f: 'weighted_walking_lunge',
      0x50: 'wide_grip_overhead_barbell_split_squat'
    }
  },
  olympic_lift_exercise_name: {
    name: 'olympic_lift_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'barbell_hang_power_clean',
      0x1: 'barbell_hang_squat_clean',
      0x2: 'barbell_power_clean',
      0x3: 'barbell_power_snatch',
      0x4: 'barbell_squat_clean',
      0x5: 'clean_and_jerk',
      0x6: 'barbell_hang_power_snatch',
      0x7: 'barbell_hang_pull',
      0x8: 'barbell_high_pull',
      0x9: 'barbell_snatch',
      0xa: 'barbell_split_jerk',
      0xb: 'clean',
      0xc: 'dumbbell_clean',
      0xd: 'dumbbell_hang_pull',
      0xe: 'one_hand_dumbbell_split_snatch',
      0xf: 'push_jerk',
      0x10: 'single_arm_dumbbell_snatch',
      0x11: 'single_arm_hang_snatch',
      0x12: 'single_arm_kettlebell_snatch',
      0x13: 'split_jerk',
      0x14: 'squat_clean_and_jerk'
    }
  },
  plank_exercise_name: {
    name: 'plank_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: '45_degree_plank',
      0x1: 'weighted_45_degree_plank',
      0x2: '90_degree_static_hold',
      0x3: 'weighted_90_degree_static_hold',
      0x4: 'bear_crawl',
      0x5: 'weighted_bear_crawl',
      0x6: 'cross_body_mountain_climber',
      0x7: 'weighted_cross_body_mountain_climber',
      0x8: 'elbow_plank_pike_jacks',
      0x9: 'weighted_elbow_plank_pike_jacks',
      0xa: 'elevated_feet_plank',
      0xb: 'weighted_elevated_feet_plank',
      0xc: 'elevator_abs',
      0xd: 'weighted_elevator_abs',
      0xe: 'extended_plank',
      0xf: 'weighted_extended_plank',
      0x10: 'full_plank_passe_twist',
      0x11: 'weighted_full_plank_passe_twist',
      0x12: 'inching_elbow_plank',
      0x13: 'weighted_inching_elbow_plank',
      0x14: 'inchworm_to_side_plank',
      0x15: 'weighted_inchworm_to_side_plank',
      0x16: 'kneeling_plank',
      0x17: 'weighted_kneeling_plank',
      0x18: 'kneeling_side_plank_with_leg_lift',
      0x19: 'weighted_kneeling_side_plank_with_leg_lift',
      0x1a: 'lateral_roll',
      0x1b: 'weighted_lateral_roll',
      0x1c: 'lying_reverse_plank',
      0x1d: 'weighted_lying_reverse_plank',
      0x1e: 'medicine_ball_mountain_climber',
      0x1f: 'weighted_medicine_ball_mountain_climber',
      0x20: 'modified_mountain_climber_and_extension',
      0x21: 'weighted_modified_mountain_climber_and_extension',
      0x22: 'mountain_climber',
      0x23: 'weighted_mountain_climber',
      0x24: 'mountain_climber_on_sliding_discs',
      0x25: 'weighted_mountain_climber_on_sliding_discs',
      0x26: 'mountain_climber_with_feet_on_bosu_ball',
      0x27: 'weighted_mountain_climber_with_feet_on_bosu_ball',
      0x28: 'mountain_climber_with_hands_on_bench',
      0x29: 'mountain_climber_with_hands_on_swiss_ball',
      0x2a: 'weighted_mountain_climber_with_hands_on_swiss_ball',
      0x2b: 'plank',
      0x2c: 'plank_jacks_with_feet_on_sliding_discs',
      0x2d: 'weighted_plank_jacks_with_feet_on_sliding_discs',
      0x2e: 'plank_knee_twist',
      0x2f: 'weighted_plank_knee_twist',
      0x30: 'plank_pike_jumps',
      0x31: 'weighted_plank_pike_jumps',
      0x32: 'plank_pikes',
      0x33: 'weighted_plank_pikes',
      0x34: 'plank_to_stand_up',
      0x35: 'weighted_plank_to_stand_up',
      0x36: 'plank_with_arm_raise',
      0x37: 'weighted_plank_with_arm_raise',
      0x38: 'plank_with_knee_to_elbow',
      0x39: 'weighted_plank_with_knee_to_elbow',
      0x3a: 'plank_with_oblique_crunch',
      0x3b: 'weighted_plank_with_oblique_crunch',
      0x3c: 'plyometric_side_plank',
      0x3d: 'weighted_plyometric_side_plank',
      0x3e: 'rolling_side_plank',
      0x3f: 'weighted_rolling_side_plank',
      0x40: 'side_kick_plank',
      0x41: 'weighted_side_kick_plank',
      0x42: 'side_plank',
      0x43: 'weighted_side_plank',
      0x44: 'side_plank_and_row',
      0x45: 'weighted_side_plank_and_row',
      0x46: 'side_plank_lift',
      0x47: 'weighted_side_plank_lift',
      0x48: 'side_plank_with_elbow_on_bosu_ball',
      0x49: 'weighted_side_plank_with_elbow_on_bosu_ball',
      0x4a: 'side_plank_with_feet_on_bench',
      0x4b: 'weighted_side_plank_with_feet_on_bench',
      0x4c: 'side_plank_with_knee_circle',
      0x4d: 'weighted_side_plank_with_knee_circle',
      0x4e: 'side_plank_with_knee_tuck',
      0x4f: 'weighted_side_plank_with_knee_tuck',
      0x50: 'side_plank_with_leg_lift',
      0x51: 'weighted_side_plank_with_leg_lift',
      0x52: 'side_plank_with_reach_under',
      0x53: 'weighted_side_plank_with_reach_under',
      0x54: 'single_leg_elevated_feet_plank',
      0x55: 'weighted_single_leg_elevated_feet_plank',
      0x56: 'single_leg_flex_and_extend',
      0x57: 'weighted_single_leg_flex_and_extend',
      0x58: 'single_leg_side_plank',
      0x59: 'weighted_single_leg_side_plank',
      0x5a: 'spiderman_plank',
      0x5b: 'weighted_spiderman_plank',
      0x5c: 'straight_arm_plank',
      0x5d: 'weighted_straight_arm_plank',
      0x5e: 'straight_arm_plank_with_shoulder_touch',
      0x5f: 'weighted_straight_arm_plank_with_shoulder_touch',
      0x60: 'swiss_ball_plank',
      0x61: 'weighted_swiss_ball_plank',
      0x62: 'swiss_ball_plank_leg_lift',
      0x63: 'weighted_swiss_ball_plank_leg_lift',
      0x64: 'swiss_ball_plank_leg_lift_and_hold',
      0x65: 'swiss_ball_plank_with_feet_on_bench',
      0x66: 'weighted_swiss_ball_plank_with_feet_on_bench',
      0x67: 'swiss_ball_prone_jackknife',
      0x68: 'weighted_swiss_ball_prone_jackknife',
      0x69: 'swiss_ball_side_plank',
      0x6a: 'weighted_swiss_ball_side_plank',
      0x6b: 'three_way_plank',
      0x6c: 'weighted_three_way_plank',
      0x6d: 'towel_plank_and_knee_in',
      0x6e: 'weighted_towel_plank_and_knee_in',
      0x6f: 't_stabilization',
      0x70: 'weighted_t_stabilization',
      0x71: 'turkish_get_up_to_side_plank',
      0x72: 'weighted_turkish_get_up_to_side_plank',
      0x73: 'two_point_plank',
      0x74: 'weighted_two_point_plank',
      0x75: 'weighted_plank',
      0x76: 'wide_stance_plank_with_diagonal_arm_lift',
      0x77: 'weighted_wide_stance_plank_with_diagonal_arm_lift',
      0x78: 'wide_stance_plank_with_diagonal_leg_lift',
      0x79: 'weighted_wide_stance_plank_with_diagonal_leg_lift',
      0x7a: 'wide_stance_plank_with_leg_lift',
      0x7b: 'weighted_wide_stance_plank_with_leg_lift',
      0x7c: 'wide_stance_plank_with_opposite_arm_and_leg_lift',
      0x7d: 'weighted_mountain_climber_with_hands_on_bench',
      0x7e: 'weighted_swiss_ball_plank_leg_lift_and_hold',
      0x7f: 'weighted_wide_stance_plank_with_opposite_arm_and_leg_lift',
      0x80: 'plank_with_feet_on_swiss_ball',
      0x81: 'side_plank_to_plank_with_reach_under',
      0x82: 'bridge_with_glute_lower_lift',
      0x83: 'bridge_one_leg_bridge',
      0x84: 'plank_with_arm_variations',
      0x85: 'plank_with_leg_lift',
      0x86: 'reverse_plank_with_leg_pull'
    }
  },
  plyo_exercise_name: {
    name: 'plyo_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'alternating_jump_lunge',
      0x1: 'weighted_alternating_jump_lunge',
      0x2: 'barbell_jump_squat',
      0x3: 'body_weight_jump_squat',
      0x4: 'weighted_jump_squat',
      0x5: 'cross_knee_strike',
      0x6: 'weighted_cross_knee_strike',
      0x7: 'depth_jump',
      0x8: 'weighted_depth_jump',
      0x9: 'dumbbell_jump_squat',
      0xa: 'dumbbell_split_jump',
      0xb: 'front_knee_strike',
      0xc: 'weighted_front_knee_strike',
      0xd: 'high_box_jump',
      0xe: 'weighted_high_box_jump',
      0xf: 'isometric_explosive_body_weight_jump_squat',
      0x10: 'weighted_isometric_explosive_jump_squat',
      0x11: 'lateral_leap_and_hop',
      0x12: 'weighted_lateral_leap_and_hop',
      0x13: 'lateral_plyo_squats',
      0x14: 'weighted_lateral_plyo_squats',
      0x15: 'lateral_slide',
      0x16: 'weighted_lateral_slide',
      0x17: 'medicine_ball_overhead_throws',
      0x18: 'medicine_ball_side_throw',
      0x19: 'medicine_ball_slam',
      0x1a: 'side_to_side_medicine_ball_throws',
      0x1b: 'side_to_side_shuffle_jump',
      0x1c: 'weighted_side_to_side_shuffle_jump',
      0x1d: 'squat_jump_onto_box',
      0x1e: 'weighted_squat_jump_onto_box',
      0x1f: 'squat_jumps_in_and_out',
      0x20: 'weighted_squat_jumps_in_and_out'
    }
  },
  pull_up_exercise_name: {
    name: 'pull_up_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'banded_pull_ups',
      0x1: '30_degree_lat_pulldown',
      0x2: 'band_assisted_chin_up',
      0x3: 'close_grip_chin_up',
      0x4: 'weighted_close_grip_chin_up',
      0x5: 'close_grip_lat_pulldown',
      0x6: 'crossover_chin_up',
      0x7: 'weighted_crossover_chin_up',
      0x8: 'ez_bar_pullover',
      0x9: 'hanging_hurdle',
      0xa: 'weighted_hanging_hurdle',
      0xb: 'kneeling_lat_pulldown',
      0xc: 'kneeling_underhand_grip_lat_pulldown',
      0xd: 'lat_pulldown',
      0xe: 'mixed_grip_chin_up',
      0xf: 'weighted_mixed_grip_chin_up',
      0x10: 'mixed_grip_pull_up',
      0x11: 'weighted_mixed_grip_pull_up',
      0x12: 'reverse_grip_pulldown',
      0x13: 'standing_cable_pullover',
      0x14: 'straight_arm_pulldown',
      0x15: 'swiss_ball_ez_bar_pullover',
      0x16: 'towel_pull_up',
      0x17: 'weighted_towel_pull_up',
      0x18: 'weighted_pull_up',
      0x19: 'wide_grip_lat_pulldown',
      0x1a: 'wide_grip_pull_up',
      0x1b: 'weighted_wide_grip_pull_up',
      0x1c: 'burpee_pull_up',
      0x1d: 'weighted_burpee_pull_up',
      0x1e: 'jumping_pull_ups',
      0x1f: 'weighted_jumping_pull_ups',
      0x20: 'kipping_pull_up',
      0x21: 'weighted_kipping_pull_up',
      0x22: 'l_pull_up',
      0x23: 'weighted_l_pull_up',
      0x24: 'suspended_chin_up',
      0x25: 'weighted_suspended_chin_up',
      0x26: 'pull_up'
    }
  },
  push_up_exercise_name: {
    name: 'push_up_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'chest_press_with_band',
      0x1: 'alternating_staggered_push_up',
      0x2: 'weighted_alternating_staggered_push_up',
      0x3: 'alternating_hands_medicine_ball_push_up',
      0x4: 'weighted_alternating_hands_medicine_ball_push_up',
      0x5: 'bosu_ball_push_up',
      0x6: 'weighted_bosu_ball_push_up',
      0x7: 'clapping_push_up',
      0x8: 'weighted_clapping_push_up',
      0x9: 'close_grip_medicine_ball_push_up',
      0xa: 'weighted_close_grip_medicine_ball_push_up',
      0xb: 'close_hands_push_up',
      0xc: 'weighted_close_hands_push_up',
      0xd: 'decline_push_up',
      0xe: 'weighted_decline_push_up',
      0xf: 'diamond_push_up',
      0x10: 'weighted_diamond_push_up',
      0x11: 'explosive_crossover_push_up',
      0x12: 'weighted_explosive_crossover_push_up',
      0x13: 'explosive_push_up',
      0x14: 'weighted_explosive_push_up',
      0x15: 'feet_elevated_side_to_side_push_up',
      0x16: 'weighted_feet_elevated_side_to_side_push_up',
      0x17: 'hand_release_push_up',
      0x18: 'weighted_hand_release_push_up',
      0x19: 'handstand_push_up',
      0x1a: 'weighted_handstand_push_up',
      0x1b: 'incline_push_up',
      0x1c: 'weighted_incline_push_up',
      0x1d: 'isometric_explosive_push_up',
      0x1e: 'weighted_isometric_explosive_push_up',
      0x1f: 'judo_push_up',
      0x20: 'weighted_judo_push_up',
      0x21: 'kneeling_push_up',
      0x22: 'weighted_kneeling_push_up',
      0x23: 'medicine_ball_chest_pass',
      0x24: 'medicine_ball_push_up',
      0x25: 'weighted_medicine_ball_push_up',
      0x26: 'one_arm_push_up',
      0x27: 'weighted_one_arm_push_up',
      0x28: 'weighted_push_up',
      0x29: 'push_up_and_row',
      0x2a: 'weighted_push_up_and_row',
      0x2b: 'push_up_plus',
      0x2c: 'weighted_push_up_plus',
      0x2d: 'push_up_with_feet_on_swiss_ball',
      0x2e: 'weighted_push_up_with_feet_on_swiss_ball',
      0x2f: 'push_up_with_one_hand_on_medicine_ball',
      0x30: 'weighted_push_up_with_one_hand_on_medicine_ball',
      0x31: 'shoulder_push_up',
      0x32: 'weighted_shoulder_push_up',
      0x33: 'single_arm_medicine_ball_push_up',
      0x34: 'weighted_single_arm_medicine_ball_push_up',
      0x35: 'spiderman_push_up',
      0x36: 'weighted_spiderman_push_up',
      0x37: 'stacked_feet_push_up',
      0x38: 'weighted_stacked_feet_push_up',
      0x39: 'staggered_hands_push_up',
      0x3a: 'weighted_staggered_hands_push_up',
      0x3b: 'suspended_push_up',
      0x3c: 'weighted_suspended_push_up',
      0x3d: 'swiss_ball_push_up',
      0x3e: 'weighted_swiss_ball_push_up',
      0x3f: 'swiss_ball_push_up_plus',
      0x40: 'weighted_swiss_ball_push_up_plus',
      0x41: 't_push_up',
      0x42: 'weighted_t_push_up',
      0x43: 'triple_stop_push_up',
      0x44: 'weighted_triple_stop_push_up',
      0x45: 'wide_hands_push_up',
      0x46: 'weighted_wide_hands_push_up',
      0x47: 'parallette_handstand_push_up',
      0x48: 'weighted_parallette_handstand_push_up',
      0x49: 'ring_handstand_push_up',
      0x4a: 'weighted_ring_handstand_push_up',
      0x4b: 'ring_push_up',
      0x4c: 'weighted_ring_push_up',
      0x4d: 'push_up',
      0x4e: 'pilates_pushup'
    }
  },
  row_exercise_name: {
    name: 'row_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'barbell_straight_leg_deadlift_to_row',
      0x1: 'cable_row_standing',
      0x2: 'dumbbell_row',
      0x3: 'elevated_feet_inverted_row',
      0x4: 'weighted_elevated_feet_inverted_row',
      0x5: 'face_pull',
      0x6: 'face_pull_with_external_rotation',
      0x7: 'inverted_row_with_feet_on_swiss_ball',
      0x8: 'weighted_inverted_row_with_feet_on_swiss_ball',
      0x9: 'kettlebell_row',
      0xa: 'modified_inverted_row',
      0xb: 'weighted_modified_inverted_row',
      0xc: 'neutral_grip_alternating_dumbbell_row',
      0xd: 'one_arm_bent_over_row',
      0xe: 'one_legged_dumbbell_row',
      0xf: 'renegade_row',
      0x10: 'reverse_grip_barbell_row',
      0x11: 'rope_handle_cable_row',
      0x12: 'seated_cable_row',
      0x13: 'seated_dumbbell_row',
      0x14: 'single_arm_cable_row',
      0x15: 'single_arm_cable_row_and_rotation',
      0x16: 'single_arm_inverted_row',
      0x17: 'weighted_single_arm_inverted_row',
      0x18: 'single_arm_neutral_grip_dumbbell_row',
      0x19: 'single_arm_neutral_grip_dumbbell_row_and_rotation',
      0x1a: 'suspended_inverted_row',
      0x1b: 'weighted_suspended_inverted_row',
      0x1c: 't_bar_row',
      0x1d: 'towel_grip_inverted_row',
      0x1e: 'weighted_towel_grip_inverted_row',
      0x1f: 'underhand_grip_cable_row',
      0x20: 'v_grip_cable_row',
      0x21: 'wide_grip_seated_cable_row'
    }
  },
  shoulder_press_exercise_name: {
    name: 'shoulder_press_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'alternating_dumbbell_shoulder_press',
      0x1: 'arnold_press',
      0x2: 'barbell_front_squat_to_push_press',
      0x3: 'barbell_push_press',
      0x4: 'barbell_shoulder_press',
      0x5: 'dead_curl_press',
      0x6: 'dumbbell_alternating_shoulder_press_and_twist',
      0x7: 'dumbbell_hammer_curl_to_lunge_to_press',
      0x8: 'dumbbell_push_press',
      0x9: 'floor_inverted_shoulder_press',
      0xa: 'weighted_floor_inverted_shoulder_press',
      0xb: 'inverted_shoulder_press',
      0xc: 'weighted_inverted_shoulder_press',
      0xd: 'one_arm_push_press',
      0xe: 'overhead_barbell_press',
      0xf: 'overhead_dumbbell_press',
      0x10: 'seated_barbell_shoulder_press',
      0x11: 'seated_dumbbell_shoulder_press',
      0x12: 'single_arm_dumbbell_shoulder_press',
      0x13: 'single_arm_step_up_and_press',
      0x14: 'smith_machine_overhead_press',
      0x15: 'split_stance_hammer_curl_to_press',
      0x16: 'swiss_ball_dumbbell_shoulder_press',
      0x17: 'weight_plate_front_raise'
    }
  },
  shoulder_stability_exercise_name: {
    name: 'shoulder_stability_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: '90_degree_cable_external_rotation',
      0x1: 'band_external_rotation',
      0x2: 'band_internal_rotation',
      0x3: 'bent_arm_lateral_raise_and_external_rotation',
      0x4: 'cable_external_rotation',
      0x5: 'dumbbell_face_pull_with_external_rotation',
      0x6: 'floor_i_raise',
      0x7: 'weighted_floor_i_raise',
      0x8: 'floor_t_raise',
      0x9: 'weighted_floor_t_raise',
      0xa: 'floor_y_raise',
      0xb: 'weighted_floor_y_raise',
      0xc: 'incline_i_raise',
      0xd: 'weighted_incline_i_raise',
      0xe: 'incline_l_raise',
      0xf: 'weighted_incline_l_raise',
      0x10: 'incline_t_raise',
      0x11: 'weighted_incline_t_raise',
      0x12: 'incline_w_raise',
      0x13: 'weighted_incline_w_raise',
      0x14: 'incline_y_raise',
      0x15: 'weighted_incline_y_raise',
      0x16: 'lying_external_rotation',
      0x17: 'seated_dumbbell_external_rotation',
      0x18: 'standing_l_raise',
      0x19: 'swiss_ball_i_raise',
      0x1a: 'weighted_swiss_ball_i_raise',
      0x1b: 'swiss_ball_t_raise',
      0x1c: 'weighted_swiss_ball_t_raise',
      0x1d: 'swiss_ball_w_raise',
      0x1e: 'weighted_swiss_ball_w_raise',
      0x1f: 'swiss_ball_y_raise',
      0x20: 'weighted_swiss_ball_y_raise'
    }
  },
  shrug_exercise_name: {
    name: 'shrug_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'barbell_jump_shrug',
      0x1: 'barbell_shrug',
      0x2: 'barbell_upright_row',
      0x3: 'behind_the_back_smith_machine_shrug',
      0x4: 'dumbbell_jump_shrug',
      0x5: 'dumbbell_shrug',
      0x6: 'dumbbell_upright_row',
      0x7: 'incline_dumbbell_shrug',
      0x8: 'overhead_barbell_shrug',
      0x9: 'overhead_dumbbell_shrug',
      0xa: 'scaption_and_shrug',
      0xb: 'scapular_retraction',
      0xc: 'serratus_chair_shrug',
      0xd: 'weighted_serratus_chair_shrug',
      0xe: 'serratus_shrug',
      0xf: 'weighted_serratus_shrug',
      0x10: 'wide_grip_jump_shrug'
    }
  },
  sit_up_exercise_name: {
    name: 'sit_up_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'alternating_sit_up',
      0x1: 'weighted_alternating_sit_up',
      0x2: 'bent_knee_v_up',
      0x3: 'weighted_bent_knee_v_up',
      0x4: 'butterfly_sit_up',
      0x5: 'weighted_butterfly_situp',
      0x6: 'cross_punch_roll_up',
      0x7: 'weighted_cross_punch_roll_up',
      0x8: 'crossed_arms_sit_up',
      0x9: 'weighted_crossed_arms_sit_up',
      0xa: 'get_up_sit_up',
      0xb: 'weighted_get_up_sit_up',
      0xc: 'hovering_sit_up',
      0xd: 'weighted_hovering_sit_up',
      0xe: 'kettlebell_sit_up',
      0xf: 'medicine_ball_alternating_v_up',
      0x10: 'medicine_ball_sit_up',
      0x11: 'medicine_ball_v_up',
      0x12: 'modified_sit_up',
      0x13: 'negative_sit_up',
      0x14: 'one_arm_full_sit_up',
      0x15: 'reclining_circle',
      0x16: 'weighted_reclining_circle',
      0x17: 'reverse_curl_up',
      0x18: 'weighted_reverse_curl_up',
      0x19: 'single_leg_swiss_ball_jackknife',
      0x1a: 'weighted_single_leg_swiss_ball_jackknife',
      0x1b: 'the_teaser',
      0x1c: 'the_teaser_weighted',
      0x1d: 'three_part_roll_down',
      0x1e: 'weighted_three_part_roll_down',
      0x1f: 'v_up',
      0x20: 'weighted_v_up',
      0x21: 'weighted_russian_twist_on_swiss_ball',
      0x22: 'weighted_sit_up',
      0x23: 'x_abs',
      0x24: 'weighted_x_abs',
      0x25: 'sit_up'
    }
  },
  squat_exercise_name: {
    name: 'squat_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'leg_press',
      0x1: 'back_squat_with_body_bar',
      0x2: 'back_squats',
      0x3: 'weighted_back_squats',
      0x4: 'balancing_squat',
      0x5: 'weighted_balancing_squat',
      0x6: 'barbell_back_squat',
      0x7: 'barbell_box_squat',
      0x8: 'barbell_front_squat',
      0x9: 'barbell_hack_squat',
      0xa: 'barbell_hang_squat_snatch',
      0xb: 'barbell_lateral_step_up',
      0xc: 'barbell_quarter_squat',
      0xd: 'barbell_siff_squat',
      0xe: 'barbell_squat_snatch',
      0xf: 'barbell_squat_with_heels_raised',
      0x10: 'barbell_stepover',
      0x11: 'barbell_step_up',
      0x12: 'bench_squat_with_rotational_chop',
      0x13: 'weighted_bench_squat_with_rotational_chop',
      0x14: 'body_weight_wall_squat',
      0x15: 'weighted_wall_squat',
      0x16: 'box_step_squat',
      0x17: 'weighted_box_step_squat',
      0x18: 'braced_squat',
      0x19: 'crossed_arm_barbell_front_squat',
      0x1a: 'crossover_dumbbell_step_up',
      0x1b: 'dumbbell_front_squat',
      0x1c: 'dumbbell_split_squat',
      0x1d: 'dumbbell_squat',
      0x1e: 'dumbbell_squat_clean',
      0x1f: 'dumbbell_stepover',
      0x20: 'dumbbell_step_up',
      0x21: 'elevated_single_leg_squat',
      0x22: 'weighted_elevated_single_leg_squat',
      0x23: 'figure_four_squats',
      0x24: 'weighted_figure_four_squats',
      0x25: 'goblet_squat',
      0x26: 'kettlebell_squat',
      0x27: 'kettlebell_swing_overhead',
      0x28: 'kettlebell_swing_with_flip_to_squat',
      0x29: 'lateral_dumbbell_step_up',
      0x2a: 'one_legged_squat',
      0x2b: 'overhead_dumbbell_squat',
      0x2c: 'overhead_squat',
      0x2d: 'partial_single_leg_squat',
      0x2e: 'weighted_partial_single_leg_squat',
      0x2f: 'pistol_squat',
      0x30: 'weighted_pistol_squat',
      0x31: 'plie_slides',
      0x32: 'weighted_plie_slides',
      0x33: 'plie_squat',
      0x34: 'weighted_plie_squat',
      0x35: 'prisoner_squat',
      0x36: 'weighted_prisoner_squat',
      0x37: 'single_leg_bench_get_up',
      0x38: 'weighted_single_leg_bench_get_up',
      0x39: 'single_leg_bench_squat',
      0x3a: 'weighted_single_leg_bench_squat',
      0x3b: 'single_leg_squat_on_swiss_ball',
      0x3c: 'weighted_single_leg_squat_on_swiss_ball',
      0x3d: 'squat',
      0x3e: 'weighted_squat',
      0x3f: 'squats_with_band',
      0x40: 'staggered_squat',
      0x41: 'weighted_staggered_squat',
      0x42: 'step_up',
      0x43: 'weighted_step_up',
      0x44: 'suitcase_squats',
      0x45: 'sumo_squat',
      0x46: 'sumo_squat_slide_in',
      0x47: 'weighted_sumo_squat_slide_in',
      0x48: 'sumo_squat_to_high_pull',
      0x49: 'sumo_squat_to_stand',
      0x4a: 'weighted_sumo_squat_to_stand',
      0x4b: 'sumo_squat_with_rotation',
      0x4c: 'weighted_sumo_squat_with_rotation',
      0x4d: 'swiss_ball_body_weight_wall_squat',
      0x4e: 'weighted_swiss_ball_wall_squat',
      0x4f: 'thrusters',
      0x50: 'uneven_squat',
      0x51: 'weighted_uneven_squat',
      0x52: 'waist_slimming_squat',
      0x53: 'wall_ball',
      0x54: 'wide_stance_barbell_squat',
      0x55: 'wide_stance_goblet_squat',
      0x56: 'zercher_squat',
      // /** Deprecated do not use */
      // 0x57: 'kbs_overhead',
      0x58: 'squat_and_side_kick',
      0x59: 'squat_jumps_in_n_out',
      0x5a: 'pilates_plie_squats_parallel_turned_out_flat_and_heels',
      0x5b: 'releve_straight_leg_and_knee_bent_with_one_leg_variation'
    }
  },
  total_body_exercise_name: {
    name: 'total_body_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'burpee',
      0x1: 'weighted_burpee',
      0x2: 'burpee_box_jump',
      0x3: 'weighted_burpee_box_jump',
      0x4: 'high_pull_burpee',
      0x5: 'man_makers',
      0x6: 'one_arm_burpee',
      0x7: 'squat_thrusts',
      0x8: 'weighted_squat_thrusts',
      0x9: 'squat_plank_push_up',
      0xa: 'weighted_squat_plank_push_up',
      0xb: 'standing_t_rotation_balance',
      0xc: 'weighted_standing_t_rotation_balance'
    }
  },
  triceps_extension_exercise_name: {
    name: 'triceps_extension_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'bench_dip',
      0x1: 'weighted_bench_dip',
      0x2: 'body_weight_dip',
      0x3: 'cable_kickback',
      0x4: 'cable_lying_triceps_extension',
      0x5: 'cable_overhead_triceps_extension',
      0x6: 'dumbbell_kickback',
      0x7: 'dumbbell_lying_triceps_extension',
      0x8: 'ez_bar_overhead_triceps_extension',
      0x9: 'incline_dip',
      0xa: 'weighted_incline_dip',
      0xb: 'incline_ez_bar_lying_triceps_extension',
      0xc: 'lying_dumbbell_pullover_to_extension',
      0xd: 'lying_ez_bar_triceps_extension',
      0xe: 'lying_triceps_extension_to_close_grip_bench_press',
      0xf: 'overhead_dumbbell_triceps_extension',
      0x10: 'reclining_triceps_press',
      0x11: 'reverse_grip_pressdown',
      0x12: 'reverse_grip_triceps_pressdown',
      0x13: 'rope_pressdown',
      0x14: 'seated_barbell_overhead_triceps_extension',
      0x15: 'seated_dumbbell_overhead_triceps_extension',
      0x16: 'seated_ez_bar_overhead_triceps_extension',
      0x17: 'seated_single_arm_overhead_dumbbell_extension',
      0x18: 'single_arm_dumbbell_overhead_triceps_extension',
      0x19: 'single_dumbbell_seated_overhead_triceps_extension',
      0x1a: 'single_leg_bench_dip_and_kick',
      0x1b: 'weighted_single_leg_bench_dip_and_kick',
      0x1c: 'single_leg_dip',
      0x1d: 'weighted_single_leg_dip',
      0x1e: 'static_lying_triceps_extension',
      0x1f: 'suspended_dip',
      0x20: 'weighted_suspended_dip',
      0x21: 'swiss_ball_dumbbell_lying_triceps_extension',
      0x22: 'swiss_ball_ez_bar_lying_triceps_extension',
      0x23: 'swiss_ball_ez_bar_overhead_triceps_extension',
      0x24: 'tabletop_dip',
      0x25: 'weighted_tabletop_dip',
      0x26: 'triceps_extension_on_floor',
      0x27: 'triceps_pressdown',
      0x28: 'weighted_dip'
    }
  },
  warm_up_exercise_name: {
    name: 'warm_up_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'quadruped_rocking',
      0x1: 'neck_tilts',
      0x2: 'ankle_circles',
      0x3: 'ankle_dorsiflexion_with_band',
      0x4: 'ankle_internal_rotation',
      0x5: 'arm_circles',
      0x6: 'bent_over_reach_to_sky',
      0x7: 'cat_camel',
      0x8: 'elbow_to_foot_lunge',
      0x9: 'forward_and_backward_leg_swings',
      0xa: 'groiners',
      0xb: 'inverted_hamstring_stretch',
      0xc: 'lateral_duck_under',
      0xd: 'neck_rotations',
      0xe: 'opposite_arm_and_leg_balance',
      0xf: 'reach_roll_and_lift',
      // /** Deprecated do not use */
      // 0x10: 'scorpion',
      0x11: 'shoulder_circles',
      0x12: 'side_to_side_leg_swings',
      0x13: 'sleeper_stretch',
      0x14: 'slide_out',
      0x15: 'swiss_ball_hip_crossover',
      0x16: 'swiss_ball_reach_roll_and_lift',
      0x17: 'swiss_ball_windshield_wipers',
      0x18: 'thoracic_rotation',
      0x19: 'walking_high_kicks',
      0x1a: 'walking_high_knees',
      0x1b: 'walking_knee_hugs',
      0x1c: 'walking_leg_cradles',
      0x1d: 'walkout',
      0x1e: 'walkout_from_push_up_position'
    }
  },
  run_exercise_name: {
    name: 'run_exercise_name',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0x0: 'run',
      0x1: 'walk',
      0x2: 'jog',
      0x3: 'sprint'
    }
  },
  water_type: {
    name: 'water_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'fresh',
      0x1: 'salt',
      0x2: 'en13319',
      0x3: 'custom'
    }
  },
  tissue_model_type: {
    name: 'tissue_model_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      /** Buhlmann's decompression algorithm, version C */
      0x0: 'zhl_16c'
    }
  },
  dive_gas_status: {
    name: 'dive_gas_status',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'disabled',
      0x1: 'enabled',
      0x2: 'backup_only'
    }
  },
  dive_alarm_type: {
    name: 'dive_alarm_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'depth',
      0x1: 'time'
    }
  },
  dive_backlight_mode: {
    name: 'dive_backlight_mode',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'at_depth',
      0x1: 'always_on'
    }
  },
  favero_product: {
    name: 'favero_product',
    baseTypeid: 0x84,
    baseType: 'uint16',
    values: {
      0xa: 'assioma_uno',
      0xc: 'assioma_duo'
    }
  },
  climb_pro_event: {
    name: 'climb_pro_event',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'approach',
      0x1: 'start',
      0x2: 'complete'
    }
  },
  tap_sensitivity: {
    name: 'tap_sensitivity',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'high',
      0x1: 'medium',
      0x2: 'low'
    }
  },
  radar_threat_level_type: {
    name: 'radar_threat_level_type',
    baseTypeid: 0x00,
    baseType: 'enum',
    values: {
      0x0: 'threat_unknown',
      0x1: 'threat_none',
      0x2: 'threat_approaching'
    }
  }
} as const

export const messageList = {
  /** Must be first message in file. */
  0: {
    id: 0,
    name: 'file_id',
    groupName: 'COMMON MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'file',
        type: profileTypeList['file'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'manufacturer',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'manufacturer',
        type: profileTypeList['manufacturer'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'product',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [
          {
            id: 2,
            name: 'favero_product',
            typeId: 'favero_product',
            type: profileTypeList['favero_product'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 1,
                name: 'manufacturer',
                rawValue: 263,
                value: 'favero_electronics',
              }
            ],
            components: [
            ],
          },
          {
            id: 2,
            name: 'garmin_product',
            typeId: 'garmin_product',
            type: profileTypeList['garmin_product'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 1,
                name: 'manufacturer',
                rawValue: 1,
                value: 'garmin',
              },
              {
                id: 1,
                name: 'manufacturer',
                rawValue: 15,
                value: 'dynastream',
              },
              {
                id: 1,
                name: 'manufacturer',
                rawValue: 13,
                value: 'dynastream_oem',
              },
              {
                id: 1,
                name: 'manufacturer',
                rawValue: 89,
                value: 'tacx',
              }
            ],
            components: [
            ],
          }

        ],
      },
      3: {
        id: 3,
        name: 'serial_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32z',
        type: baseTypesList[0x8C],
        components: [
        ],
        subfields: [

        ],
      },
      /** Only set for files that are can be created/erased. */
      4: {
        id: 4,
        name: 'time_created',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Only set for files that are not created/erased. */
      5: {
        id: 5,
        name: 'number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Optional free form string to indicate the devices name or model */
      8: {
        id: 8,
        name: 'product_name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  49: {
    id: 49,
    name: 'file_creator',
    groupName: 'COMMON MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'software_version',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'hardware_version',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  162: {
    id: 162,
    name: 'timestamp_correlation',
    groupName: 'COMMON MESSAGES',
    fields: {
      /** Whole second part of UTC timestamp at the time the system timestamp was recorded. */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Fractional part of the UTC timestamp at the time the system timestamp was recorded. */
      0: {
        id: 0,
        name: 'fractional_timestamp',
        scale: 32768,
        offset: undefined,
        units: 's',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Whole second part of the system timestamp */
      1: {
        id: 1,
        name: 'system_timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Fractional part of the system timestamp */
      2: {
        id: 2,
        name: 'fractional_system_timestamp',
        scale: 32768,
        offset: undefined,
        units: 's',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** timestamp epoch expressed in local time used to convert timestamps to local time */
      3: {
        id: 3,
        name: 'local_timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'local_date_time',
        type: profileTypeList['local_date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Millisecond part of the UTC timestamp at the time the system timestamp was recorded. */
      4: {
        id: 4,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Millisecond part of the system timestamp */
      5: {
        id: 5,
        name: 'system_timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  35: {
    id: 35,
    name: 'software',
    groupName: 'DEVICE FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'version',
        scale: 100,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'part_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  106: {
    id: 106,
    name: 'slave_device',
    groupName: 'DEVICE FILE MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'manufacturer',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'manufacturer',
        type: profileTypeList['manufacturer'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'product',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [
          {
            id: 1,
            name: 'favero_product',
            typeId: 'favero_product',
            type: profileTypeList['favero_product'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'manufacturer',
                rawValue: 263,
                value: 'favero_electronics',
              }
            ],
            components: [
            ],
          },
          {
            id: 1,
            name: 'garmin_product',
            typeId: 'garmin_product',
            type: profileTypeList['garmin_product'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'manufacturer',
                rawValue: 1,
                value: 'garmin',
              },
              {
                id: 0,
                name: 'manufacturer',
                rawValue: 15,
                value: 'dynastream',
              },
              {
                id: 0,
                name: 'manufacturer',
                rawValue: 13,
                value: 'dynastream_oem',
              },
              {
                id: 0,
                name: 'manufacturer',
                rawValue: 89,
                value: 'tacx',
              }
            ],
            components: [
            ],
          }

        ],
      }
    },
  },
  1: {
    id: 1,
    name: 'capabilities',
    groupName: 'DEVICE FILE MESSAGES',
    fields: {
      /** Use language_bits_x types where x is index of array. */
      0: {
        id: 0,
        name: 'languages',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      /** Use sport_bits_x types where x is index of array. */
      1: {
        id: 1,
        name: 'sports',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport_bits_0',
        type: profileTypeList['sport_bits_0'],
        components: [
        ],
        subfields: [

        ],
      },
      21: {
        id: 21,
        name: 'workouts_supported',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'workout_capabilities',
        type: profileTypeList['workout_capabilities'],
        components: [
        ],
        subfields: [

        ],
      },
      23: {
        id: 23,
        name: 'connectivity_supported',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'connectivity_capabilities',
        type: profileTypeList['connectivity_capabilities'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  37: {
    id: 37,
    name: 'file_capabilities',
    groupName: 'DEVICE FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'file',
        type: profileTypeList['file'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'flags',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'file_flags',
        type: profileTypeList['file_flags'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'directory',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'max_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'max_size',
        scale: undefined,
        offset: undefined,
        units: 'bytes',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  38: {
    id: 38,
    name: 'mesg_capabilities',
    groupName: 'DEVICE FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'file',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'file',
        type: profileTypeList['file'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'mesg_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'mesg_num',
        type: profileTypeList['mesg_num'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'count_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'mesg_count',
        type: profileTypeList['mesg_count'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [
          {
            id: 3,
            name: 'num_per_file',
            typeId: 'uint16',
            type: baseTypesList[0x84],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 2,
                name: 'count_type',
                rawValue: 0,
                value: 'num_per_file',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'max_per_file',
            typeId: 'uint16',
            type: baseTypesList[0x84],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 2,
                name: 'count_type',
                rawValue: 1,
                value: 'max_per_file',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'max_per_file_type',
            typeId: 'uint16',
            type: baseTypesList[0x84],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 2,
                name: 'count_type',
                rawValue: 2,
                value: 'max_per_file_type',
              }
            ],
            components: [
            ],
          }

        ],
      }
    },
  },
  39: {
    id: 39,
    name: 'field_capabilities',
    groupName: 'DEVICE FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'file',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'file',
        type: profileTypeList['file'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'mesg_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'mesg_num',
        type: profileTypeList['mesg_num'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'field_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  2: {
    id: 2,
    name: 'device_settings',
    groupName: 'SETTINGS FILE MESSAGES',
    fields: {
      /** Index into time zone arrays. */
      0: {
        id: 0,
        name: 'active_time_zone',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Offset from system time. Required to convert timestamp from system time to UTC. */
      1: {
        id: 1,
        name: 'utc_offset',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Offset from system time. */
      2: {
        id: 2,
        name: 'time_offset',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Display mode for the time */
      4: {
        id: 4,
        name: 'time_mode',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'time_mode',
        type: profileTypeList['time_mode'],
        components: [
        ],
        subfields: [

        ],
      },
      /** timezone offset in 1/4 hour increments */
      5: {
        id: 5,
        name: 'time_zone_offset',
        scale: 4,
        offset: undefined,
        units: 'hr',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Mode for backlight */
      12: {
        id: 12,
        name: 'backlight_mode',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'backlight_mode',
        type: profileTypeList['backlight_mode'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Enabled state of the activity tracker functionality */
      36: {
        id: 36,
        name: 'activity_tracker_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      /** UTC timestamp used to set the devices clock and date */
      39: {
        id: 39,
        name: 'clock_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Bitfield  to configure enabled screens for each supported loop */
      40: {
        id: 40,
        name: 'pages_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Enabled state of the move alert */
      46: {
        id: 46,
        name: 'move_alert_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      /** Display mode for the date */
      47: {
        id: 47,
        name: 'date_mode',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_mode',
        type: profileTypeList['date_mode'],
        components: [
        ],
        subfields: [

        ],
      },
      55: {
        id: 55,
        name: 'display_orientation',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_orientation',
        type: profileTypeList['display_orientation'],
        components: [
        ],
        subfields: [

        ],
      },
      56: {
        id: 56,
        name: 'mounting_side',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'side',
        type: profileTypeList['side'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Bitfield to indicate one page as default for each supported loop */
      57: {
        id: 57,
        name: 'default_page',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Minimum steps before an autosync can occur */
      58: {
        id: 58,
        name: 'autosync_min_steps',
        scale: undefined,
        offset: undefined,
        units: 'steps',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Minimum minutes before an autosync can occur */
      59: {
        id: 59,
        name: 'autosync_min_time',
        scale: undefined,
        offset: undefined,
        units: 'minutes',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Enable auto-detect setting for the lactate threshold feature. */
      80: {
        id: 80,
        name: 'lactate_threshold_autodetect_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      /** Automatically upload using BLE */
      86: {
        id: 86,
        name: 'ble_auto_upload_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      /** Helps to conserve battery by changing modes */
      89: {
        id: 89,
        name: 'auto_sync_frequency',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'auto_sync_frequency',
        type: profileTypeList['auto_sync_frequency'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Allows setting specific activities auto-activity detect enabled/disabled settings */
      90: {
        id: 90,
        name: 'auto_activity_detect',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'auto_activity_detect',
        type: profileTypeList['auto_activity_detect'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Number of screens configured to display */
      94: {
        id: 94,
        name: 'number_of_screens',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Smart Notification display orientation */
      95: {
        id: 95,
        name: 'smart_notification_display_orientation',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_orientation',
        type: profileTypeList['display_orientation'],
        components: [
        ],
        subfields: [

        ],
      },
      134: {
        id: 134,
        name: 'tap_interface',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'switch',
        type: profileTypeList['switch'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Used to hold the tap threshold setting */
      174: {
        id: 174,
        name: 'tap_sensitivity',
        scale: undefined,
        offset: 1,
        units: 'undefined',
        typeId: 'tap_sensitivity',
        type: profileTypeList['tap_sensitivity'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  3: {
    id: 3,
    name: 'user_profile',
    groupName: 'SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'friendly_name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'gender',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'gender',
        type: profileTypeList['gender'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'age',
        scale: undefined,
        offset: undefined,
        units: 'years',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'height',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'weight',
        scale: 10,
        offset: undefined,
        units: 'kg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'language',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'language',
        type: profileTypeList['language'],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'elev_setting',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_measure',
        type: profileTypeList['display_measure'],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'weight_setting',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_measure',
        type: profileTypeList['display_measure'],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'resting_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'default_max_running_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'default_max_biking_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'default_max_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      12: {
        id: 12,
        name: 'hr_setting',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_heart',
        type: profileTypeList['display_heart'],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'speed_setting',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_measure',
        type: profileTypeList['display_measure'],
        components: [
        ],
        subfields: [

        ],
      },
      14: {
        id: 14,
        name: 'dist_setting',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_measure',
        type: profileTypeList['display_measure'],
        components: [
        ],
        subfields: [

        ],
      },
      16: {
        id: 16,
        name: 'power_setting',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_power',
        type: profileTypeList['display_power'],
        components: [
        ],
        subfields: [

        ],
      },
      17: {
        id: 17,
        name: 'activity_class',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'activity_class',
        type: profileTypeList['activity_class'],
        components: [
        ],
        subfields: [

        ],
      },
      18: {
        id: 18,
        name: 'position_setting',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_position',
        type: profileTypeList['display_position'],
        components: [
        ],
        subfields: [

        ],
      },
      21: {
        id: 21,
        name: 'temperature_setting',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_measure',
        type: profileTypeList['display_measure'],
        components: [
        ],
        subfields: [

        ],
      },
      22: {
        id: 22,
        name: 'local_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'user_local_id',
        type: profileTypeList['user_local_id'],
        components: [
        ],
        subfields: [

        ],
      },
      23: {
        id: 23,
        name: 'global_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [

        ],
      },
      /** Typical wake time */
      28: {
        id: 28,
        name: 'wake_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'localtime_into_day',
        type: profileTypeList['localtime_into_day'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Typical bed time */
      29: {
        id: 29,
        name: 'sleep_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'localtime_into_day',
        type: profileTypeList['localtime_into_day'],
        components: [
        ],
        subfields: [

        ],
      },
      30: {
        id: 30,
        name: 'height_setting',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_measure',
        type: profileTypeList['display_measure'],
        components: [
        ],
        subfields: [

        ],
      },
      /** User defined running step length set to 0 for auto length */
      31: {
        id: 31,
        name: 'user_running_step_length',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** User defined walking step length set to 0 for auto length */
      32: {
        id: 32,
        name: 'user_walking_step_length',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      47: {
        id: 47,
        name: 'depth_setting',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_measure',
        type: profileTypeList['display_measure'],
        components: [
        ],
        subfields: [

        ],
      },
      49: {
        id: 49,
        name: 'dive_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  4: {
    id: 4,
    name: 'hrm_profile',
    groupName: 'SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'hrm_ant_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16z',
        type: baseTypesList[0x8B],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'log_hrv',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'hrm_ant_id_trans_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  5: {
    id: 5,
    name: 'sdm_profile',
    groupName: 'SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'sdm_ant_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16z',
        type: baseTypesList[0x8B],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'sdm_cal_factor',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'odometer',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Use footpod for speed source instead of GPS */
      4: {
        id: 4,
        name: 'speed_source',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'sdm_ant_id_trans_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      /** Rollover counter that can be used to extend the odometer */
      7: {
        id: 7,
        name: 'odometer_rollover',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  6: {
    id: 6,
    name: 'bike_profile',
    groupName: 'SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'sub_sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sub_sport',
        type: profileTypeList['sub_sport'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'odometer',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'bike_spd_ant_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16z',
        type: baseTypesList[0x8B],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'bike_cad_ant_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16z',
        type: baseTypesList[0x8B],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'bike_spdcad_ant_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16z',
        type: baseTypesList[0x8B],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'bike_power_ant_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16z',
        type: baseTypesList[0x8B],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'custom_wheelsize',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'auto_wheelsize',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'bike_weight',
        scale: 10,
        offset: undefined,
        units: 'kg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'power_cal_factor',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      12: {
        id: 12,
        name: 'auto_wheel_cal',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'auto_power_zero',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      14: {
        id: 14,
        name: 'id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      15: {
        id: 15,
        name: 'spd_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      16: {
        id: 16,
        name: 'cad_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      17: {
        id: 17,
        name: 'spdcad_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      18: {
        id: 18,
        name: 'power_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      19: {
        id: 19,
        name: 'crank_length',
        scale: 2,
        offset: -110,
        units: 'mm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      20: {
        id: 20,
        name: 'enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      21: {
        id: 21,
        name: 'bike_spd_ant_id_trans_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      22: {
        id: 22,
        name: 'bike_cad_ant_id_trans_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      23: {
        id: 23,
        name: 'bike_spdcad_ant_id_trans_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      24: {
        id: 24,
        name: 'bike_power_ant_id_trans_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      /** Rollover counter that can be used to extend the odometer */
      37: {
        id: 37,
        name: 'odometer_rollover',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Number of front gears */
      38: {
        id: 38,
        name: 'front_gear_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      /** Number of teeth on each gear 0 is innermost */
      39: {
        id: 39,
        name: 'front_gear',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      /** Number of rear gears */
      40: {
        id: 40,
        name: 'rear_gear_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      /** Number of teeth on each gear 0 is innermost */
      41: {
        id: 41,
        name: 'rear_gear',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      44: {
        id: 44,
        name: 'shimano_di2_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  127: {
    id: 127,
    name: 'connectivity',
    groupName: 'SETTINGS FILE MESSAGES',
    fields: {
      /** Use Bluetooth for connectivity features */
      0: {
        id: 0,
        name: 'bluetooth_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      /** Use Bluetooth Low Energy for connectivity features */
      1: {
        id: 1,
        name: 'bluetooth_le_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      /** Use ANT for connectivity features */
      2: {
        id: 2,
        name: 'ant_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'live_tracking_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'weather_conditions_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'weather_alerts_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'auto_activity_upload_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'course_download_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'workout_download_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'gps_ephemeris_download_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'incident_detection_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      12: {
        id: 12,
        name: 'grouptrack_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  159: {
    id: 159,
    name: 'watchface_settings',
    groupName: 'SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'mode',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'watchface_mode',
        type: profileTypeList['watchface_mode'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'layout',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [
          {
            id: 1,
            name: 'digital_layout',
            typeId: 'digital_watchface_layout',
            type: profileTypeList['digital_watchface_layout'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'mode',
                rawValue: 0,
                value: 'digital',
              }
            ],
            components: [
            ],
          },
          {
            id: 1,
            name: 'analog_layout',
            typeId: 'analog_watchface_layout',
            type: profileTypeList['analog_watchface_layout'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'mode',
                rawValue: 1,
                value: 'analog',
              }
            ],
            components: [
            ],
          }

        ],
      }
    },
  },
  188: {
    id: 188,
    name: 'ohr_settings',
    groupName: 'SETTINGS FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'switch',
        type: profileTypeList['switch'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  7: {
    id: 7,
    name: 'zones_target',
    groupName: 'SPORT SETTINGS FILE MESSAGES',
    fields: {
      1: {
        id: 1,
        name: 'max_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'threshold_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'functional_threshold_power',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'hr_calc_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'hr_zone_calc',
        type: profileTypeList['hr_zone_calc'],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'pwr_calc_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'pwr_zone_calc',
        type: profileTypeList['pwr_zone_calc'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  12: {
    id: 12,
    name: 'sport',
    groupName: 'SPORT SETTINGS FILE MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'sub_sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sub_sport',
        type: profileTypeList['sub_sport'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  8: {
    id: 8,
    name: 'hr_zone',
    groupName: 'SPORT SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'high_bpm',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  53: {
    id: 53,
    name: 'speed_zone',
    groupName: 'SPORT SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'high_value',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  131: {
    id: 131,
    name: 'cadence_zone',
    groupName: 'SPORT SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'high_value',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  9: {
    id: 9,
    name: 'power_zone',
    groupName: 'SPORT SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'high_value',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  10: {
    id: 10,
    name: 'met_zone',
    groupName: 'SPORT SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'high_bpm',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'calories',
        scale: 10,
        offset: undefined,
        units: 'kcal / min',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'fat_calories',
        scale: 10,
        offset: undefined,
        units: 'kcal / min',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  258: {
    id: 258,
    name: 'dive_settings',
    groupName: 'SPORT SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'model',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'tissue_model_type',
        type: profileTypeList['tissue_model_type'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'gf_low',
        scale: undefined,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'gf_high',
        scale: undefined,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'water_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'water_type',
        type: profileTypeList['water_type'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Fresh water is usually 1000; salt water is usually 1025 */
      5: {
        id: 5,
        name: 'water_density',
        scale: undefined,
        offset: undefined,
        units: 'kg/m^3',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** Typically 1.40 */
      6: {
        id: 6,
        name: 'po2_warn',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Typically 1.60 */
      7: {
        id: 7,
        name: 'po2_critical',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'po2_deco',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'safety_stop_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'bottom_depth',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'bottom_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      12: {
        id: 12,
        name: 'apnea_countdown_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'apnea_countdown_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      14: {
        id: 14,
        name: 'backlight_mode',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'dive_backlight_mode',
        type: profileTypeList['dive_backlight_mode'],
        components: [
        ],
        subfields: [

        ],
      },
      15: {
        id: 15,
        name: 'backlight_brightness',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      16: {
        id: 16,
        name: 'backlight_timeout',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'backlight_timeout',
        type: profileTypeList['backlight_timeout'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Time between surfacing and ending the activity */
      17: {
        id: 17,
        name: 'repeat_dive_interval',
        scale: 1,
        offset: undefined,
        units: 's',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Time at safety stop (if enabled) */
      18: {
        id: 18,
        name: 'safety_stop_time',
        scale: 1,
        offset: undefined,
        units: 's',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      19: {
        id: 19,
        name: 'heart_rate_source_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'source_type',
        type: profileTypeList['source_type'],
        components: [
        ],
        subfields: [

        ],
      },
      20: {
        id: 20,
        name: 'heart_rate_source',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [
          {
            id: 20,
            name: 'heart_rate_antplus_device_type',
            typeId: 'antplus_device_type',
            type: profileTypeList['antplus_device_type'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 19,
                name: 'heart_rate_source_type',
                rawValue: 1,
                value: 'antplus',
              }
            ],
            components: [
            ],
          },
          {
            id: 20,
            name: 'heart_rate_local_device_type',
            typeId: 'local_device_type',
            type: profileTypeList['local_device_type'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 19,
                name: 'heart_rate_source_type',
                rawValue: 5,
                value: 'local',
              }
            ],
            components: [
            ],
          }

        ],
      }
    },
  },
  262: {
    id: 262,
    name: 'dive_alarm',
    groupName: 'SPORT SETTINGS FILE MESSAGES',
    fields: {
      /** Index of the alarm */
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'depth',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'time',
        scale: 1,
        offset: undefined,
        units: 's',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'alarm_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'dive_alarm_type',
        type: profileTypeList['dive_alarm_type'],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'sound',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'tone',
        type: profileTypeList['tone'],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'dive_types',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sub_sport',
        type: profileTypeList['sub_sport'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  259: {
    id: 259,
    name: 'dive_gas',
    groupName: 'SPORT SETTINGS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'helium_content',
        scale: undefined,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'oxygen_content',
        scale: undefined,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'status',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'dive_gas_status',
        type: profileTypeList['dive_gas_status'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  15: {
    id: 15,
    name: 'goal',
    groupName: 'GOALS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'sub_sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sub_sport',
        type: profileTypeList['sub_sport'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'start_date',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'end_date',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'goal',
        type: profileTypeList['goal'],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'value',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'repeat',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'target_value',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'recurrence',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'goal_recurrence',
        type: profileTypeList['goal_recurrence'],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'recurrence_value',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'source',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'goal_source',
        type: profileTypeList['goal_source'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  34: {
    id: 34,
    name: 'activity',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Exclude pauses */
      0: {
        id: 0,
        name: 'total_timer_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'num_sessions',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'activity',
        type: profileTypeList['activity'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'event',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event',
        type: profileTypeList['event'],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'event_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event_type',
        type: profileTypeList['event_type'],
        components: [
        ],
        subfields: [

        ],
      },
      /** timestamp epoch expressed in local time, used to convert activity timestamps to local time  */
      5: {
        id: 5,
        name: 'local_timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'local_date_time',
        type: profileTypeList['local_date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'event_group',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  18: {
    id: 18,
    name: 'session',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Selected bit is set for the current session. */
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Sesson end time. */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** session */
      0: {
        id: 0,
        name: 'event',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event',
        type: profileTypeList['event'],
        components: [
        ],
        subfields: [

        ],
      },
      /** stop */
      1: {
        id: 1,
        name: 'event_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event_type',
        type: profileTypeList['event_type'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'start_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'start_position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'start_position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'sub_sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sub_sport',
        type: profileTypeList['sub_sport'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Time (includes pauses) */
      7: {
        id: 7,
        name: 'total_elapsed_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Timer Time (excludes pauses) */
      8: {
        id: 8,
        name: 'total_timer_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'total_distance',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'total_cycles',
        scale: undefined,
        offset: undefined,
        units: 'cycles',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 10,
            name: 'total_strides',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'strides',
            refFields: [
              {
                id: 5,
                name: 'sport',
                rawValue: 1,
                value: 'running',
              },
              {
                id: 5,
                name: 'sport',
                rawValue: 11,
                value: 'walking',
              }
            ],
            components: [
            ],
          },
          {
            id: 10,
            name: 'total_strokes',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'strokes',
            refFields: [
              {
                id: 5,
                name: 'sport',
                rawValue: 2,
                value: 'cycling',
              },
              {
                id: 5,
                name: 'sport',
                rawValue: 5,
                value: 'swimming',
              },
              {
                id: 5,
                name: 'sport',
                rawValue: 15,
                value: 'rowing',
              },
              {
                id: 5,
                name: 'sport',
                rawValue: 37,
                value: 'stand_up_paddleboarding',
              }
            ],
            components: [
            ],
          }

        ],
      },
      11: {
        id: 11,
        name: 'total_calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'total_fat_calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** total_distance / total_timer_time */
      14: {
        id: 14,
        name: 'avg_speed',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '124',
            name: 'enhanced_avg_speed',
            scale: '1000',
            offset: 'undefined',
            units: 'm/s',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      15: {
        id: 15,
        name: 'max_speed',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '125',
            name: 'enhanced_max_speed',
            scale: '1000',
            offset: 'undefined',
            units: 'm/s',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      /** average heart rate (excludes pause time) */
      16: {
        id: 16,
        name: 'avg_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      17: {
        id: 17,
        name: 'max_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** total_cycles / total_timer_time if non_zero_avg_cadence otherwise total_cycles / total_elapsed_time */
      18: {
        id: 18,
        name: 'avg_cadence',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [
          {
            id: 18,
            name: 'avg_running_cadence',
            typeId: 'uint8',
            type: baseTypesList[0x02],
            scale: undefined,
            offset: undefined,
            units: 'strides/min',
            refFields: [
              {
                id: 5,
                name: 'sport',
                rawValue: 1,
                value: 'running',
              }
            ],
            components: [
            ],
          }

        ],
      },
      19: {
        id: 19,
        name: 'max_cadence',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [
          {
            id: 19,
            name: 'max_running_cadence',
            typeId: 'uint8',
            type: baseTypesList[0x02],
            scale: undefined,
            offset: undefined,
            units: 'strides/min',
            refFields: [
              {
                id: 5,
                name: 'sport',
                rawValue: 1,
                value: 'running',
              }
            ],
            components: [
            ],
          }

        ],
      },
      /** total_power / total_timer_time if non_zero_avg_power otherwise total_power / total_elapsed_time */
      20: {
        id: 20,
        name: 'avg_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      21: {
        id: 21,
        name: 'max_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      22: {
        id: 22,
        name: 'total_ascent',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      23: {
        id: 23,
        name: 'total_descent',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      24: {
        id: 24,
        name: 'total_training_effect',
        scale: 10,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      25: {
        id: 25,
        name: 'first_lap_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      26: {
        id: 26,
        name: 'num_laps',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      27: {
        id: 27,
        name: 'event_group',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      28: {
        id: 28,
        name: 'trigger',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'session_trigger',
        type: profileTypeList['session_trigger'],
        components: [
        ],
        subfields: [

        ],
      },
      /** North east corner latitude */
      29: {
        id: 29,
        name: 'nec_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** North east corner longitude */
      30: {
        id: 30,
        name: 'nec_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** South west corner latitude */
      31: {
        id: 31,
        name: 'swc_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** South west corner longitude */
      32: {
        id: 32,
        name: 'swc_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** # of lengths of swim pool */
      33: {
        id: 33,
        name: 'num_lengths',
        scale: undefined,
        offset: undefined,
        units: 'lengths',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      34: {
        id: 34,
        name: 'normalized_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      35: {
        id: 35,
        name: 'training_stress_score',
        scale: 10,
        offset: undefined,
        units: 'tss',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      36: {
        id: 36,
        name: 'intensity_factor',
        scale: 1000,
        offset: undefined,
        units: 'if',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      37: {
        id: 37,
        name: 'left_right_balance',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'left_right_balance_100',
        type: profileTypeList['left_right_balance_100'],
        components: [
        ],
        subfields: [

        ],
      },
      41: {
        id: 41,
        name: 'avg_stroke_count',
        scale: 10,
        offset: undefined,
        units: 'strokes/lap',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      42: {
        id: 42,
        name: 'avg_stroke_distance',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      43: {
        id: 43,
        name: 'swim_stroke',
        scale: undefined,
        offset: undefined,
        units: 'swim_stroke',
        typeId: 'swim_stroke',
        type: profileTypeList['swim_stroke'],
        components: [
        ],
        subfields: [

        ],
      },
      44: {
        id: 44,
        name: 'pool_length',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      45: {
        id: 45,
        name: 'threshold_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      46: {
        id: 46,
        name: 'pool_length_unit',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_measure',
        type: profileTypeList['display_measure'],
        components: [
        ],
        subfields: [

        ],
      },
      /** # of active lengths of swim pool */
      47: {
        id: 47,
        name: 'num_active_lengths',
        scale: undefined,
        offset: undefined,
        units: 'lengths',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      48: {
        id: 48,
        name: 'total_work',
        scale: undefined,
        offset: undefined,
        units: 'J',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      49: {
        id: 49,
        name: 'avg_altitude',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '126',
            name: 'enhanced_avg_altitude',
            scale: '5',
            offset: '500',
            units: 'm',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      50: {
        id: 50,
        name: 'max_altitude',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '128',
            name: 'enhanced_max_altitude',
            scale: '5',
            offset: '500',
            units: 'm',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      51: {
        id: 51,
        name: 'gps_accuracy',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      52: {
        id: 52,
        name: 'avg_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      53: {
        id: 53,
        name: 'avg_pos_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      54: {
        id: 54,
        name: 'avg_neg_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      55: {
        id: 55,
        name: 'max_pos_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      56: {
        id: 56,
        name: 'max_neg_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      57: {
        id: 57,
        name: 'avg_temperature',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      58: {
        id: 58,
        name: 'max_temperature',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      59: {
        id: 59,
        name: 'total_moving_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      60: {
        id: 60,
        name: 'avg_pos_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      61: {
        id: 61,
        name: 'avg_neg_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      62: {
        id: 62,
        name: 'max_pos_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      63: {
        id: 63,
        name: 'max_neg_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      64: {
        id: 64,
        name: 'min_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      65: {
        id: 65,
        name: 'time_in_hr_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      66: {
        id: 66,
        name: 'time_in_speed_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      67: {
        id: 67,
        name: 'time_in_cadence_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      68: {
        id: 68,
        name: 'time_in_power_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      69: {
        id: 69,
        name: 'avg_lap_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      70: {
        id: 70,
        name: 'best_lap_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      71: {
        id: 71,
        name: 'min_altitude',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '127',
            name: 'enhanced_min_altitude',
            scale: '5',
            offset: '500',
            units: 'm',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      82: {
        id: 82,
        name: 'player_score',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      83: {
        id: 83,
        name: 'opponent_score',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      84: {
        id: 84,
        name: 'opponent_name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      /** stroke_type enum used as the index */
      85: {
        id: 85,
        name: 'stroke_count',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** zone number used as the index */
      86: {
        id: 86,
        name: 'zone_count',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      87: {
        id: 87,
        name: 'max_ball_speed',
        scale: 100,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      88: {
        id: 88,
        name: 'avg_ball_speed',
        scale: 100,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      89: {
        id: 89,
        name: 'avg_vertical_oscillation',
        scale: 10,
        offset: undefined,
        units: 'mm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      90: {
        id: 90,
        name: 'avg_stance_time_percent',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      91: {
        id: 91,
        name: 'avg_stance_time',
        scale: 10,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of the avg_cadence */
      92: {
        id: 92,
        name: 'avg_fractional_cadence',
        scale: 128,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of the max_cadence */
      93: {
        id: 93,
        name: 'max_fractional_cadence',
        scale: 128,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of the total_cycles */
      94: {
        id: 94,
        name: 'total_fractional_cycles',
        scale: 128,
        offset: undefined,
        units: 'cycles',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Avg saturated and unsaturated hemoglobin */
      95: {
        id: 95,
        name: 'avg_total_hemoglobin_conc',
        scale: 100,
        offset: undefined,
        units: 'g/dL',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Min saturated and unsaturated hemoglobin */
      96: {
        id: 96,
        name: 'min_total_hemoglobin_conc',
        scale: 100,
        offset: undefined,
        units: 'g/dL',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Max saturated and unsaturated hemoglobin */
      97: {
        id: 97,
        name: 'max_total_hemoglobin_conc',
        scale: 100,
        offset: undefined,
        units: 'g/dL',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Avg percentage of hemoglobin saturated with oxygen */
      98: {
        id: 98,
        name: 'avg_saturated_hemoglobin_percent',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Min percentage of hemoglobin saturated with oxygen */
      99: {
        id: 99,
        name: 'min_saturated_hemoglobin_percent',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Max percentage of hemoglobin saturated with oxygen */
      100: {
        id: 100,
        name: 'max_saturated_hemoglobin_percent',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      101: {
        id: 101,
        name: 'avg_left_torque_effectiveness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      102: {
        id: 102,
        name: 'avg_right_torque_effectiveness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      103: {
        id: 103,
        name: 'avg_left_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      104: {
        id: 104,
        name: 'avg_right_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      105: {
        id: 105,
        name: 'avg_combined_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      111: {
        id: 111,
        name: 'sport_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Total time spend in the standing position */
      112: {
        id: 112,
        name: 'time_standing',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Number of transitions to the standing state */
      113: {
        id: 113,
        name: 'stand_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average platform center offset Left */
      114: {
        id: 114,
        name: 'avg_left_pco',
        scale: undefined,
        offset: undefined,
        units: 'mm',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average platform center offset Right */
      115: {
        id: 115,
        name: 'avg_right_pco',
        scale: undefined,
        offset: undefined,
        units: 'mm',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average left power phase angles. Indexes defined by power_phase_type. */
      116: {
        id: 116,
        name: 'avg_left_power_phase',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average left power phase peak angles. Data value indexes defined by power_phase_type. */
      117: {
        id: 117,
        name: 'avg_left_power_phase_peak',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average right power phase angles. Data value indexes defined by power_phase_type. */
      118: {
        id: 118,
        name: 'avg_right_power_phase',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average right power phase peak angles data value indexes  defined by power_phase_type. */
      119: {
        id: 119,
        name: 'avg_right_power_phase_peak',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average power by position. Data value indexes defined by rider_position_type. */
      120: {
        id: 120,
        name: 'avg_power_position',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Maximum power by position. Data value indexes defined by rider_position_type. */
      121: {
        id: 121,
        name: 'max_power_position',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average cadence by position. Data value indexes defined by rider_position_type. */
      122: {
        id: 122,
        name: 'avg_cadence_position',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Maximum cadence by position. Data value indexes defined by rider_position_type. */
      123: {
        id: 123,
        name: 'max_cadence_position',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** total_distance / total_timer_time */
      124: {
        id: 124,
        name: 'enhanced_avg_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      125: {
        id: 125,
        name: 'enhanced_max_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      126: {
        id: 126,
        name: 'enhanced_avg_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      127: {
        id: 127,
        name: 'enhanced_min_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      128: {
        id: 128,
        name: 'enhanced_max_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** lev average motor power during session */
      129: {
        id: 129,
        name: 'avg_lev_motor_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** lev maximum motor power during session */
      130: {
        id: 130,
        name: 'max_lev_motor_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** lev battery consumption during session */
      131: {
        id: 131,
        name: 'lev_battery_consumption',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      132: {
        id: 132,
        name: 'avg_vertical_ratio',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      133: {
        id: 133,
        name: 'avg_stance_time_balance',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      134: {
        id: 134,
        name: 'avg_step_length',
        scale: 10,
        offset: undefined,
        units: 'mm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      137: {
        id: 137,
        name: 'total_anaerobic_training_effect',
        scale: 10,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      139: {
        id: 139,
        name: 'avg_vam',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** The grit score estimates how challenging a route could be for a cyclist in terms of time spent going over sharp turns or large grade slopes. */
      181: {
        id: 181,
        name: 'total_grit',
        scale: undefined,
        offset: undefined,
        units: 'kGrit',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** The flow score estimates how long distance wise a cyclist deaccelerates over intervals where deacceleration is unnecessary such as smooth turns or small grade angle intervals. */
      182: {
        id: 182,
        name: 'total_flow',
        scale: undefined,
        offset: undefined,
        units: 'Flow',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      183: {
        id: 183,
        name: 'jump_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** The grit score estimates how challenging a route could be for a cyclist in terms of time spent going over sharp turns or large grade slopes. */
      186: {
        id: 186,
        name: 'avg_grit',
        scale: undefined,
        offset: undefined,
        units: 'kGrit',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** The flow score estimates how long distance wise a cyclist deaccelerates over intervals where deacceleration is unnecessary such as smooth turns or small grade angle intervals. */
      187: {
        id: 187,
        name: 'avg_flow',
        scale: undefined,
        offset: undefined,
        units: 'Flow',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of total_ascent */
      199: {
        id: 199,
        name: 'total_fractional_ascent',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of total_descent */
      200: {
        id: 200,
        name: 'total_fractional_descent',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      208: {
        id: 208,
        name: 'avg_core_temperature',
        scale: 100,
        offset: undefined,
        units: 'C',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      209: {
        id: 209,
        name: 'min_core_temperature',
        scale: 100,
        offset: undefined,
        units: 'C',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      210: {
        id: 210,
        name: 'max_core_temperature',
        scale: 100,
        offset: undefined,
        units: 'C',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  19: {
    id: 19,
    name: 'lap',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Lap end time. */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'event',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event',
        type: profileTypeList['event'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'event_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event_type',
        type: profileTypeList['event_type'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'start_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'start_position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'start_position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'end_position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'end_position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** Time (includes pauses) */
      7: {
        id: 7,
        name: 'total_elapsed_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Timer Time (excludes pauses) */
      8: {
        id: 8,
        name: 'total_timer_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'total_distance',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'total_cycles',
        scale: undefined,
        offset: undefined,
        units: 'cycles',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 10,
            name: 'total_strides',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'strides',
            refFields: [
              {
                id: 25,
                name: 'sport',
                rawValue: 1,
                value: 'running',
              },
              {
                id: 25,
                name: 'sport',
                rawValue: 11,
                value: 'walking',
              }
            ],
            components: [
            ],
          },
          {
            id: 10,
            name: 'total_strokes',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'strokes',
            refFields: [
              {
                id: 25,
                name: 'sport',
                rawValue: 2,
                value: 'cycling',
              },
              {
                id: 25,
                name: 'sport',
                rawValue: 5,
                value: 'swimming',
              },
              {
                id: 25,
                name: 'sport',
                rawValue: 15,
                value: 'rowing',
              },
              {
                id: 25,
                name: 'sport',
                rawValue: 37,
                value: 'stand_up_paddleboarding',
              }
            ],
            components: [
            ],
          }

        ],
      },
      11: {
        id: 11,
        name: 'total_calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** If New Leaf */
      12: {
        id: 12,
        name: 'total_fat_calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'avg_speed',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '110',
            name: 'enhanced_avg_speed',
            scale: '1000',
            offset: 'undefined',
            units: 'm/s',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      14: {
        id: 14,
        name: 'max_speed',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '111',
            name: 'enhanced_max_speed',
            scale: '1000',
            offset: 'undefined',
            units: 'm/s',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      15: {
        id: 15,
        name: 'avg_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      16: {
        id: 16,
        name: 'max_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** total_cycles / total_timer_time if non_zero_avg_cadence otherwise total_cycles / total_elapsed_time */
      17: {
        id: 17,
        name: 'avg_cadence',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [
          {
            id: 17,
            name: 'avg_running_cadence',
            typeId: 'uint8',
            type: baseTypesList[0x02],
            scale: undefined,
            offset: undefined,
            units: 'strides/min',
            refFields: [
              {
                id: 25,
                name: 'sport',
                rawValue: 1,
                value: 'running',
              }
            ],
            components: [
            ],
          }

        ],
      },
      18: {
        id: 18,
        name: 'max_cadence',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [
          {
            id: 18,
            name: 'max_running_cadence',
            typeId: 'uint8',
            type: baseTypesList[0x02],
            scale: undefined,
            offset: undefined,
            units: 'strides/min',
            refFields: [
              {
                id: 25,
                name: 'sport',
                rawValue: 1,
                value: 'running',
              }
            ],
            components: [
            ],
          }

        ],
      },
      /** total_power / total_timer_time if non_zero_avg_power otherwise total_power / total_elapsed_time */
      19: {
        id: 19,
        name: 'avg_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      20: {
        id: 20,
        name: 'max_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      21: {
        id: 21,
        name: 'total_ascent',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      22: {
        id: 22,
        name: 'total_descent',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      23: {
        id: 23,
        name: 'intensity',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'intensity',
        type: profileTypeList['intensity'],
        components: [
        ],
        subfields: [

        ],
      },
      24: {
        id: 24,
        name: 'lap_trigger',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'lap_trigger',
        type: profileTypeList['lap_trigger'],
        components: [
        ],
        subfields: [

        ],
      },
      25: {
        id: 25,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      26: {
        id: 26,
        name: 'event_group',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** # of lengths of swim pool */
      32: {
        id: 32,
        name: 'num_lengths',
        scale: undefined,
        offset: undefined,
        units: 'lengths',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      33: {
        id: 33,
        name: 'normalized_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      34: {
        id: 34,
        name: 'left_right_balance',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'left_right_balance_100',
        type: profileTypeList['left_right_balance_100'],
        components: [
        ],
        subfields: [

        ],
      },
      35: {
        id: 35,
        name: 'first_length_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      37: {
        id: 37,
        name: 'avg_stroke_distance',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      38: {
        id: 38,
        name: 'swim_stroke',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'swim_stroke',
        type: profileTypeList['swim_stroke'],
        components: [
        ],
        subfields: [

        ],
      },
      39: {
        id: 39,
        name: 'sub_sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sub_sport',
        type: profileTypeList['sub_sport'],
        components: [
        ],
        subfields: [

        ],
      },
      /** # of active lengths of swim pool */
      40: {
        id: 40,
        name: 'num_active_lengths',
        scale: undefined,
        offset: undefined,
        units: 'lengths',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      41: {
        id: 41,
        name: 'total_work',
        scale: undefined,
        offset: undefined,
        units: 'J',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      42: {
        id: 42,
        name: 'avg_altitude',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '112',
            name: 'enhanced_avg_altitude',
            scale: '5',
            offset: '500',
            units: 'm',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      43: {
        id: 43,
        name: 'max_altitude',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '114',
            name: 'enhanced_max_altitude',
            scale: '5',
            offset: '500',
            units: 'm',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      44: {
        id: 44,
        name: 'gps_accuracy',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      45: {
        id: 45,
        name: 'avg_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      46: {
        id: 46,
        name: 'avg_pos_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      47: {
        id: 47,
        name: 'avg_neg_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      48: {
        id: 48,
        name: 'max_pos_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      49: {
        id: 49,
        name: 'max_neg_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      50: {
        id: 50,
        name: 'avg_temperature',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      51: {
        id: 51,
        name: 'max_temperature',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      52: {
        id: 52,
        name: 'total_moving_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      53: {
        id: 53,
        name: 'avg_pos_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      54: {
        id: 54,
        name: 'avg_neg_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      55: {
        id: 55,
        name: 'max_pos_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      56: {
        id: 56,
        name: 'max_neg_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      57: {
        id: 57,
        name: 'time_in_hr_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      58: {
        id: 58,
        name: 'time_in_speed_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      59: {
        id: 59,
        name: 'time_in_cadence_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      60: {
        id: 60,
        name: 'time_in_power_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      61: {
        id: 61,
        name: 'repetition_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      62: {
        id: 62,
        name: 'min_altitude',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '113',
            name: 'enhanced_min_altitude',
            scale: '5',
            offset: '500',
            units: 'm',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      63: {
        id: 63,
        name: 'min_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      71: {
        id: 71,
        name: 'wkt_step_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      74: {
        id: 74,
        name: 'opponent_score',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** stroke_type enum used as the index */
      75: {
        id: 75,
        name: 'stroke_count',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** zone number used as the index */
      76: {
        id: 76,
        name: 'zone_count',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      77: {
        id: 77,
        name: 'avg_vertical_oscillation',
        scale: 10,
        offset: undefined,
        units: 'mm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      78: {
        id: 78,
        name: 'avg_stance_time_percent',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      79: {
        id: 79,
        name: 'avg_stance_time',
        scale: 10,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of the avg_cadence */
      80: {
        id: 80,
        name: 'avg_fractional_cadence',
        scale: 128,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of the max_cadence */
      81: {
        id: 81,
        name: 'max_fractional_cadence',
        scale: 128,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of the total_cycles */
      82: {
        id: 82,
        name: 'total_fractional_cycles',
        scale: 128,
        offset: undefined,
        units: 'cycles',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      83: {
        id: 83,
        name: 'player_score',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Avg saturated and unsaturated hemoglobin */
      84: {
        id: 84,
        name: 'avg_total_hemoglobin_conc',
        scale: 100,
        offset: undefined,
        units: 'g/dL',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Min saturated and unsaturated hemoglobin */
      85: {
        id: 85,
        name: 'min_total_hemoglobin_conc',
        scale: 100,
        offset: undefined,
        units: 'g/dL',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Max saturated and unsaturated hemoglobin */
      86: {
        id: 86,
        name: 'max_total_hemoglobin_conc',
        scale: 100,
        offset: undefined,
        units: 'g/dL',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Avg percentage of hemoglobin saturated with oxygen */
      87: {
        id: 87,
        name: 'avg_saturated_hemoglobin_percent',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Min percentage of hemoglobin saturated with oxygen */
      88: {
        id: 88,
        name: 'min_saturated_hemoglobin_percent',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Max percentage of hemoglobin saturated with oxygen */
      89: {
        id: 89,
        name: 'max_saturated_hemoglobin_percent',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      91: {
        id: 91,
        name: 'avg_left_torque_effectiveness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      92: {
        id: 92,
        name: 'avg_right_torque_effectiveness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      93: {
        id: 93,
        name: 'avg_left_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      94: {
        id: 94,
        name: 'avg_right_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      95: {
        id: 95,
        name: 'avg_combined_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Total time spent in the standing position */
      98: {
        id: 98,
        name: 'time_standing',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Number of transitions to the standing state */
      99: {
        id: 99,
        name: 'stand_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average left platform center offset */
      100: {
        id: 100,
        name: 'avg_left_pco',
        scale: undefined,
        offset: undefined,
        units: 'mm',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average right platform center offset */
      101: {
        id: 101,
        name: 'avg_right_pco',
        scale: undefined,
        offset: undefined,
        units: 'mm',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average left power phase angles. Data value indexes defined by power_phase_type. */
      102: {
        id: 102,
        name: 'avg_left_power_phase',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average left power phase peak angles. Data value indexes  defined by power_phase_type. */
      103: {
        id: 103,
        name: 'avg_left_power_phase_peak',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average right power phase angles. Data value indexes defined by power_phase_type. */
      104: {
        id: 104,
        name: 'avg_right_power_phase',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average right power phase peak angles. Data value indexes  defined by power_phase_type. */
      105: {
        id: 105,
        name: 'avg_right_power_phase_peak',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average power by position. Data value indexes defined by rider_position_type. */
      106: {
        id: 106,
        name: 'avg_power_position',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Maximum power by position. Data value indexes defined by rider_position_type. */
      107: {
        id: 107,
        name: 'max_power_position',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average cadence by position. Data value indexes defined by rider_position_type. */
      108: {
        id: 108,
        name: 'avg_cadence_position',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Maximum cadence by position. Data value indexes defined by rider_position_type. */
      109: {
        id: 109,
        name: 'max_cadence_position',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      110: {
        id: 110,
        name: 'enhanced_avg_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      111: {
        id: 111,
        name: 'enhanced_max_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      112: {
        id: 112,
        name: 'enhanced_avg_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      113: {
        id: 113,
        name: 'enhanced_min_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      114: {
        id: 114,
        name: 'enhanced_max_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** lev average motor power during lap */
      115: {
        id: 115,
        name: 'avg_lev_motor_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** lev maximum motor power during lap */
      116: {
        id: 116,
        name: 'max_lev_motor_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** lev battery consumption during lap */
      117: {
        id: 117,
        name: 'lev_battery_consumption',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      118: {
        id: 118,
        name: 'avg_vertical_ratio',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      119: {
        id: 119,
        name: 'avg_stance_time_balance',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      120: {
        id: 120,
        name: 'avg_step_length',
        scale: 10,
        offset: undefined,
        units: 'mm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      121: {
        id: 121,
        name: 'avg_vam',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** The grit score estimates how challenging a route could be for a cyclist in terms of time spent going over sharp turns or large grade slopes. */
      149: {
        id: 149,
        name: 'total_grit',
        scale: undefined,
        offset: undefined,
        units: 'kGrit',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** The flow score estimates how long distance wise a cyclist deaccelerates over intervals where deacceleration is unnecessary such as smooth turns or small grade angle intervals. */
      150: {
        id: 150,
        name: 'total_flow',
        scale: undefined,
        offset: undefined,
        units: 'Flow',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      151: {
        id: 151,
        name: 'jump_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** The grit score estimates how challenging a route could be for a cyclist in terms of time spent going over sharp turns or large grade slopes. */
      153: {
        id: 153,
        name: 'avg_grit',
        scale: undefined,
        offset: undefined,
        units: 'kGrit',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** The flow score estimates how long distance wise a cyclist deaccelerates over intervals where deacceleration is unnecessary such as smooth turns or small grade angle intervals. */
      154: {
        id: 154,
        name: 'avg_flow',
        scale: undefined,
        offset: undefined,
        units: 'Flow',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of total_ascent */
      156: {
        id: 156,
        name: 'total_fractional_ascent',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of total_descent */
      157: {
        id: 157,
        name: 'total_fractional_descent',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      158: {
        id: 158,
        name: 'avg_core_temperature',
        scale: 100,
        offset: undefined,
        units: 'C',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      159: {
        id: 159,
        name: 'min_core_temperature',
        scale: 100,
        offset: undefined,
        units: 'C',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      160: {
        id: 160,
        name: 'max_core_temperature',
        scale: 100,
        offset: undefined,
        units: 'C',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  101: {
    id: 101,
    name: 'length',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'event',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event',
        type: profileTypeList['event'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'event_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event_type',
        type: profileTypeList['event_type'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'start_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'total_elapsed_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'total_timer_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'total_strokes',
        scale: undefined,
        offset: undefined,
        units: 'strokes',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'avg_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'swim_stroke',
        scale: undefined,
        offset: undefined,
        units: 'swim_stroke',
        typeId: 'swim_stroke',
        type: profileTypeList['swim_stroke'],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'avg_swimming_cadence',
        scale: undefined,
        offset: undefined,
        units: 'strokes/min',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'event_group',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'total_calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      12: {
        id: 12,
        name: 'length_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'length_type',
        type: profileTypeList['length_type'],
        components: [
        ],
        subfields: [

        ],
      },
      18: {
        id: 18,
        name: 'player_score',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      19: {
        id: 19,
        name: 'opponent_score',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** stroke_type enum used as the index */
      20: {
        id: 20,
        name: 'stroke_count',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** zone number used as the index */
      21: {
        id: 21,
        name: 'zone_count',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  20: {
    id: 20,
    name: 'record',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'altitude',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '78',
            name: 'enhanced_altitude',
            scale: '5',
            offset: '500',
            units: 'm',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'cadence',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'distance',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'speed',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '73',
            name: 'enhanced_speed',
            scale: '1000',
            offset: 'undefined',
            units: 'm/s',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'compressed_speed_distance',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
          {
            id: '6',
            name: 'speed',
            scale: '100',
            offset: 'undefined',
            units: 'm/s',
            accumulate: 'false',
            bits: '12',
            bitOffset: '0',
          },
          {
            id: '5',
            name: 'distance',
            scale: '16',
            offset: 'undefined',
            units: 'm',
            accumulate: 'true',
            bits: '12',
            bitOffset: '12',
          }
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Relative. 0 is none  254 is Max. */
      10: {
        id: 10,
        name: 'resistance',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'time_from_course',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      12: {
        id: 12,
        name: 'cycle_length',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'temperature',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Speed at 1s intervals.  Timestamp field indicates time of last array element. */
      17: {
        id: 17,
        name: 'speed_1s',
        scale: 16,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      18: {
        id: 18,
        name: 'cycles',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
          {
            id: '19',
            name: 'total_cycles',
            scale: 'undefined',
            offset: 'undefined',
            units: 'cycles',
            accumulate: 'true',
            bits: '8',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      19: {
        id: 19,
        name: 'total_cycles',
        scale: undefined,
        offset: undefined,
        units: 'cycles',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      28: {
        id: 28,
        name: 'compressed_accumulated_power',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '29',
            name: 'accumulated_power',
            scale: 'undefined',
            offset: 'undefined',
            units: 'watts',
            accumulate: 'true',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      29: {
        id: 29,
        name: 'accumulated_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      30: {
        id: 30,
        name: 'left_right_balance',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'left_right_balance',
        type: profileTypeList['left_right_balance'],
        components: [
        ],
        subfields: [

        ],
      },
      31: {
        id: 31,
        name: 'gps_accuracy',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      32: {
        id: 32,
        name: 'vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      33: {
        id: 33,
        name: 'calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      39: {
        id: 39,
        name: 'vertical_oscillation',
        scale: 10,
        offset: undefined,
        units: 'mm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      40: {
        id: 40,
        name: 'stance_time_percent',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      41: {
        id: 41,
        name: 'stance_time',
        scale: 10,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      42: {
        id: 42,
        name: 'activity_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'activity_type',
        type: profileTypeList['activity_type'],
        components: [
        ],
        subfields: [

        ],
      },
      43: {
        id: 43,
        name: 'left_torque_effectiveness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      44: {
        id: 44,
        name: 'right_torque_effectiveness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      45: {
        id: 45,
        name: 'left_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      46: {
        id: 46,
        name: 'right_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      47: {
        id: 47,
        name: 'combined_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      48: {
        id: 48,
        name: 'time128',
        scale: 128,
        offset: undefined,
        units: 's',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      49: {
        id: 49,
        name: 'stroke_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'stroke_type',
        type: profileTypeList['stroke_type'],
        components: [
        ],
        subfields: [

        ],
      },
      50: {
        id: 50,
        name: 'zone',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      51: {
        id: 51,
        name: 'ball_speed',
        scale: 100,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Log cadence and fractional cadence for backwards compatability */
      52: {
        id: 52,
        name: 'cadence256',
        scale: 256,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      53: {
        id: 53,
        name: 'fractional_cadence',
        scale: 128,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Total saturated and unsaturated hemoglobin */
      54: {
        id: 54,
        name: 'total_hemoglobin_conc',
        scale: 100,
        offset: undefined,
        units: 'g/dL',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Min saturated and unsaturated hemoglobin */
      55: {
        id: 55,
        name: 'total_hemoglobin_conc_min',
        scale: 100,
        offset: undefined,
        units: 'g/dL',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Max saturated and unsaturated hemoglobin */
      56: {
        id: 56,
        name: 'total_hemoglobin_conc_max',
        scale: 100,
        offset: undefined,
        units: 'g/dL',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Percentage of hemoglobin saturated with oxygen */
      57: {
        id: 57,
        name: 'saturated_hemoglobin_percent',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Min percentage of hemoglobin saturated with oxygen */
      58: {
        id: 58,
        name: 'saturated_hemoglobin_percent_min',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Max percentage of hemoglobin saturated with oxygen */
      59: {
        id: 59,
        name: 'saturated_hemoglobin_percent_max',
        scale: 10,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      62: {
        id: 62,
        name: 'device_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'device_index',
        type: profileTypeList['device_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Left platform center offset */
      67: {
        id: 67,
        name: 'left_pco',
        scale: undefined,
        offset: undefined,
        units: 'mm',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Right platform center offset */
      68: {
        id: 68,
        name: 'right_pco',
        scale: undefined,
        offset: undefined,
        units: 'mm',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Left power phase angles. Data value indexes defined by power_phase_type. */
      69: {
        id: 69,
        name: 'left_power_phase',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Left power phase peak angles. Data value indexes defined by power_phase_type. */
      70: {
        id: 70,
        name: 'left_power_phase_peak',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Right power phase angles. Data value indexes defined by power_phase_type. */
      71: {
        id: 71,
        name: 'right_power_phase',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Right power phase peak angles. Data value indexes defined by power_phase_type. */
      72: {
        id: 72,
        name: 'right_power_phase_peak',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      73: {
        id: 73,
        name: 'enhanced_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      78: {
        id: 78,
        name: 'enhanced_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** lev battery state of charge */
      81: {
        id: 81,
        name: 'battery_soc',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** lev motor power */
      82: {
        id: 82,
        name: 'motor_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      83: {
        id: 83,
        name: 'vertical_ratio',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      84: {
        id: 84,
        name: 'stance_time_balance',
        scale: 100,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      85: {
        id: 85,
        name: 'step_length',
        scale: 10,
        offset: undefined,
        units: 'mm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Includes atmospheric pressure */
      91: {
        id: 91,
        name: 'absolute_pressure',
        scale: undefined,
        offset: undefined,
        units: 'Pa',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** 0 if above water */
      92: {
        id: 92,
        name: 'depth',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** 0 if above water */
      93: {
        id: 93,
        name: 'next_stop_depth',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      94: {
        id: 94,
        name: 'next_stop_time',
        scale: 1,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      95: {
        id: 95,
        name: 'time_to_surface',
        scale: 1,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      96: {
        id: 96,
        name: 'ndl_time',
        scale: 1,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      97: {
        id: 97,
        name: 'cns_load',
        scale: undefined,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      98: {
        id: 98,
        name: 'n2_load',
        scale: 1,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** The grit score estimates how challenging a route could be for a cyclist in terms of time spent going over sharp turns or large grade slopes. */
      114: {
        id: 114,
        name: 'grit',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** The flow score estimates how long distance wise a cyclist deaccelerates over intervals where deacceleration is unnecessary such as smooth turns or small grade angle intervals. */
      115: {
        id: 115,
        name: 'flow',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      117: {
        id: 117,
        name: 'ebike_travel_range',
        scale: undefined,
        offset: undefined,
        units: 'km',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      118: {
        id: 118,
        name: 'ebike_battery_level',
        scale: undefined,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      119: {
        id: 119,
        name: 'ebike_assist_mode',
        scale: undefined,
        offset: undefined,
        units: 'depends on sensor',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      120: {
        id: 120,
        name: 'ebike_assist_level_percent',
        scale: undefined,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      139: {
        id: 139,
        name: 'core_temperature',
        scale: 100,
        offset: undefined,
        units: 'C',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  21: {
    id: 21,
    name: 'event',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'event',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event',
        type: profileTypeList['event'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'event_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event_type',
        type: profileTypeList['event_type'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'data16',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '3',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'data',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 3,
            name: 'timer_trigger',
            typeId: 'timer_trigger',
            type: profileTypeList['timer_trigger'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 0,
                value: 'timer',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'course_point_index',
            typeId: 'message_index',
            type: profileTypeList['message_index'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 10,
                value: 'course_point',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'battery_level',
            typeId: 'uint16',
            type: baseTypesList[0x84],
            scale: 1000,
            offset: undefined,
            units: 'V',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 11,
                value: 'battery',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'virtual_partner_speed',
            typeId: 'uint16',
            type: baseTypesList[0x84],
            scale: 1000,
            offset: undefined,
            units: 'm/s',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 12,
                value: 'virtual_partner_pace',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'hr_high_alert',
            typeId: 'uint8',
            type: baseTypesList[0x02],
            scale: undefined,
            offset: undefined,
            units: 'bpm',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 13,
                value: 'hr_high_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'hr_low_alert',
            typeId: 'uint8',
            type: baseTypesList[0x02],
            scale: undefined,
            offset: undefined,
            units: 'bpm',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 14,
                value: 'hr_low_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'speed_high_alert',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 1000,
            offset: undefined,
            units: 'm/s',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 15,
                value: 'speed_high_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'speed_low_alert',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 1000,
            offset: undefined,
            units: 'm/s',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 16,
                value: 'speed_low_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'cad_high_alert',
            typeId: 'uint16',
            type: baseTypesList[0x84],
            scale: undefined,
            offset: undefined,
            units: 'rpm',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 17,
                value: 'cad_high_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'cad_low_alert',
            typeId: 'uint16',
            type: baseTypesList[0x84],
            scale: undefined,
            offset: undefined,
            units: 'rpm',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 18,
                value: 'cad_low_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'power_high_alert',
            typeId: 'uint16',
            type: baseTypesList[0x84],
            scale: undefined,
            offset: undefined,
            units: 'watts',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 19,
                value: 'power_high_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'power_low_alert',
            typeId: 'uint16',
            type: baseTypesList[0x84],
            scale: undefined,
            offset: undefined,
            units: 'watts',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 20,
                value: 'power_low_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'time_duration_alert',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 1000,
            offset: undefined,
            units: 's',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 23,
                value: 'time_duration_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'distance_duration_alert',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 100,
            offset: undefined,
            units: 'm',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 24,
                value: 'distance_duration_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'calorie_duration_alert',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'calories',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 25,
                value: 'calorie_duration_alert',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'fitness_equipment_state',
            typeId: 'fitness_equipment_state',
            type: profileTypeList['fitness_equipment_state'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 27,
                value: 'fitness_equipment',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'sport_point',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 33,
                value: 'sport_point',
              }
            ],
            components: [
              {
                id: '7',
                name: 'score',
                scale: '1',
                offset: 'undefined',
                units: 'undefined',
                accumulate: 'undefined',
                bits: '16',
                bitOffset: '0',
              },
              {
                id: '8',
                name: 'opponent_score',
                scale: '1',
                offset: 'undefined',
                units: 'undefined',
                accumulate: 'undefined',
                bits: '16',
                bitOffset: '16',
              }
            ],
          },
          {
            id: 3,
            name: 'gear_change_data',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 42,
                value: 'front_gear_change',
              },
              {
                id: 0,
                name: 'event',
                rawValue: 43,
                value: 'rear_gear_change',
              }
            ],
            components: [
              {
                id: '11',
                name: 'rear_gear_num',
                scale: '1',
                offset: 'undefined',
                units: 'undefined',
                accumulate: 'undefined',
                bits: '8',
                bitOffset: '0',
              },
              {
                id: '12',
                name: 'rear_gear',
                scale: '1',
                offset: 'undefined',
                units: 'undefined',
                accumulate: 'undefined',
                bits: '8',
                bitOffset: '8',
              },
              {
                id: '9',
                name: 'front_gear_num',
                scale: '1',
                offset: 'undefined',
                units: 'undefined',
                accumulate: 'undefined',
                bits: '8',
                bitOffset: '16',
              },
              {
                id: '10',
                name: 'front_gear',
                scale: '1',
                offset: 'undefined',
                units: 'undefined',
                accumulate: 'undefined',
                bits: '8',
                bitOffset: '24',
              }
            ],
          },
          {
            id: 3,
            name: 'rider_position',
            typeId: 'rider_position_type',
            type: profileTypeList['rider_position_type'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 44,
                value: 'rider_position_change',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'comm_timeout',
            typeId: 'comm_timeout_type',
            type: profileTypeList['comm_timeout_type'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 47,
                value: 'comm_timeout',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'radar_threat_alert',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'event',
                rawValue: 75,
                value: 'radar_threat_alert',
              }
            ],
            components: [
              {
                id: '21',
                name: 'radar_threat_level_max',
                scale: '1',
                offset: 'undefined',
                units: 'undefined',
                accumulate: 'undefined',
                bits: '8',
                bitOffset: '0',
              },
              {
                id: '22',
                name: 'radar_threat_count',
                scale: '1',
                offset: 'undefined',
                units: 'undefined',
                accumulate: 'undefined',
                bits: '8',
                bitOffset: '8',
              }
            ],
          }

        ],
      },
      4: {
        id: 4,
        name: 'event_group',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Do not populate directly. Autogenerated by decoder for sport_point subfield components */
      7: {
        id: 7,
        name: 'score',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Do not populate directly. Autogenerated by decoder for sport_point subfield components */
      8: {
        id: 8,
        name: 'opponent_score',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Do not populate directly. Autogenerated by decoder for gear_change subfield components.  Front gear number. 1 is innermost. */
      9: {
        id: 9,
        name: 'front_gear_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      /** Do not populate directly. Autogenerated by decoder for gear_change subfield components.  Number of front teeth. */
      10: {
        id: 10,
        name: 'front_gear',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      /** Do not populate directly. Autogenerated by decoder for gear_change subfield components.  Rear gear number. 1 is innermost. */
      11: {
        id: 11,
        name: 'rear_gear_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      /** Do not populate directly. Autogenerated by decoder for gear_change subfield components.  Number of rear teeth. */
      12: {
        id: 12,
        name: 'rear_gear',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'device_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'device_index',
        type: profileTypeList['device_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Do not populate directly. Autogenerated by decoder for threat_alert subfield components. */
      21: {
        id: 21,
        name: 'radar_threat_level_max',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'radar_threat_level_type',
        type: profileTypeList['radar_threat_level_type'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Do not populate directly. Autogenerated by decoder for threat_alert subfield components. */
      22: {
        id: 22,
        name: 'radar_threat_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  23: {
    id: 23,
    name: 'device_info',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'device_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'device_index',
        type: profileTypeList['device_index'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'device_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [
          {
            id: 1,
            name: 'antplus_device_type',
            typeId: 'antplus_device_type',
            type: profileTypeList['antplus_device_type'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 25,
                name: 'source_type',
                rawValue: 1,
                value: 'antplus',
              }
            ],
            components: [
            ],
          },
          {
            id: 1,
            name: 'ant_device_type',
            typeId: 'uint8',
            type: baseTypesList[0x02],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 25,
                name: 'source_type',
                rawValue: 0,
                value: 'ant',
              }
            ],
            components: [
            ],
          }

        ],
      },
      2: {
        id: 2,
        name: 'manufacturer',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'manufacturer',
        type: profileTypeList['manufacturer'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'serial_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32z',
        type: baseTypesList[0x8C],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'product',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [
          {
            id: 4,
            name: 'favero_product',
            typeId: 'favero_product',
            type: profileTypeList['favero_product'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 2,
                name: 'manufacturer',
                rawValue: 263,
                value: 'favero_electronics',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'garmin_product',
            typeId: 'garmin_product',
            type: profileTypeList['garmin_product'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 2,
                name: 'manufacturer',
                rawValue: 1,
                value: 'garmin',
              },
              {
                id: 2,
                name: 'manufacturer',
                rawValue: 15,
                value: 'dynastream',
              },
              {
                id: 2,
                name: 'manufacturer',
                rawValue: 13,
                value: 'dynastream_oem',
              },
              {
                id: 2,
                name: 'manufacturer',
                rawValue: 89,
                value: 'tacx',
              }
            ],
            components: [
            ],
          }

        ],
      },
      5: {
        id: 5,
        name: 'software_version',
        scale: 100,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'hardware_version',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Reset by new battery or charge. */
      7: {
        id: 7,
        name: 'cum_operating_time',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'battery_voltage',
        scale: 256,
        offset: undefined,
        units: 'V',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'battery_status',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'battery_status',
        type: profileTypeList['battery_status'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Indicates the location of the sensor */
      18: {
        id: 18,
        name: 'sensor_position',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'body_location',
        type: profileTypeList['body_location'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Used to describe the sensor or location */
      19: {
        id: 19,
        name: 'descriptor',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      20: {
        id: 20,
        name: 'ant_transmission_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      21: {
        id: 21,
        name: 'ant_device_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16z',
        type: baseTypesList[0x8B],
        components: [
        ],
        subfields: [

        ],
      },
      22: {
        id: 22,
        name: 'ant_network',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'ant_network',
        type: profileTypeList['ant_network'],
        components: [
        ],
        subfields: [

        ],
      },
      25: {
        id: 25,
        name: 'source_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'source_type',
        type: profileTypeList['source_type'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Optional free form string to indicate the devices name or model */
      27: {
        id: 27,
        name: 'product_name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  /** Corresponds to file_id of workout or course. */
  72: {
    id: 72,
    name: 'training_file',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'file',
        type: profileTypeList['file'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'manufacturer',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'manufacturer',
        type: profileTypeList['manufacturer'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'product',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [
          {
            id: 2,
            name: 'favero_product',
            typeId: 'favero_product',
            type: profileTypeList['favero_product'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 1,
                name: 'manufacturer',
                rawValue: 263,
                value: 'favero_electronics',
              }
            ],
            components: [
            ],
          },
          {
            id: 2,
            name: 'garmin_product',
            typeId: 'garmin_product',
            type: profileTypeList['garmin_product'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 1,
                name: 'manufacturer',
                rawValue: 1,
                value: 'garmin',
              },
              {
                id: 1,
                name: 'manufacturer',
                rawValue: 15,
                value: 'dynastream',
              },
              {
                id: 1,
                name: 'manufacturer',
                rawValue: 13,
                value: 'dynastream_oem',
              },
              {
                id: 1,
                name: 'manufacturer',
                rawValue: 89,
                value: 'tacx',
              }
            ],
            components: [
            ],
          }

        ],
      },
      3: {
        id: 3,
        name: 'serial_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32z',
        type: baseTypesList[0x8C],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'time_created',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  /** Heart rate variability */
  78: {
    id: 78,
    name: 'hrv',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Time between beats */
      0: {
        id: 0,
        name: 'time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  128: {
    id: 128,
    name: 'weather_conditions',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** time of update for current conditions, else forecast time */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Current or forecast */
      0: {
        id: 0,
        name: 'weather_report',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'weather_report',
        type: profileTypeList['weather_report'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'temperature',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Corresponds to GSC Response weatherIcon field */
      2: {
        id: 2,
        name: 'condition',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'weather_status',
        type: profileTypeList['weather_status'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'wind_direction',
        scale: undefined,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'wind_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** range 0-100 */
      5: {
        id: 5,
        name: 'precipitation_probability',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Heat Index if  GCS heatIdx above or equal to 90F or wind chill if GCS windChill below or equal to 32F */
      6: {
        id: 6,
        name: 'temperature_feels_like',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'relative_humidity',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** string corresponding to GCS response location string */
      8: {
        id: 8,
        name: 'location',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'observed_at_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'observed_location_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'observed_location_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      12: {
        id: 12,
        name: 'day_of_week',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'day_of_week',
        type: profileTypeList['day_of_week'],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'high_temperature',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      14: {
        id: 14,
        name: 'low_temperature',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  129: {
    id: 129,
    name: 'weather_alert',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Unique identifier from GCS report ID string, length is 12 */
      0: {
        id: 0,
        name: 'report_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      /** Time alert was issued */
      1: {
        id: 1,
        name: 'issue_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Time alert expires */
      2: {
        id: 2,
        name: 'expire_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Warning, Watch, Advisory, Statement */
      3: {
        id: 3,
        name: 'severity',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'weather_severity',
        type: profileTypeList['weather_severity'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Tornado, Severe Thunderstorm, etc. */
      4: {
        id: 4,
        name: 'type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'weather_severe_type',
        type: profileTypeList['weather_severe_type'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  160: {
    id: 160,
    name: 'gps_metadata',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Whole second part of the timestamp. */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Millisecond part of the timestamp. */
      0: {
        id: 0,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'enhanced_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'enhanced_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'heading',
        scale: 100,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Used to correlate UTC to system time if the timestamp of the message is in system time.  This UTC time is derived from the GPS data. */
      6: {
        id: 6,
        name: 'utc_timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** velocity[0] is lon velocity.  Velocity[1] is lat velocity.  Velocity[2] is altitude velocity. */
      7: {
        id: 7,
        name: 'velocity',
        scale: 100,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  161: {
    id: 161,
    name: 'camera_event',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Whole second part of the timestamp. */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Millisecond part of the timestamp. */
      0: {
        id: 0,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'camera_event_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'camera_event_type',
        type: profileTypeList['camera_event_type'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'camera_file_uuid',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'camera_orientation',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'camera_orientation_type',
        type: profileTypeList['camera_orientation_type'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  164: {
    id: 164,
    name: 'gyroscope_data',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Whole second part of the timestamp */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Millisecond part of the timestamp. */
      0: {
        id: 0,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Each time in the array describes the time at which the gyro sample with the corrosponding index was taken. Limited to 30 samples in each message. The samples may span across seconds. Array size must match the number of samples in gyro_x and gyro_y and gyro_z */
      1: {
        id: 1,
        name: 'sample_time_offset',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** These are the raw ADC reading. Maximum number of samples is 30 in each message. The samples may span across seconds. A conversion will need to be done on this data once read. */
      2: {
        id: 2,
        name: 'gyro_x',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** These are the raw ADC reading. Maximum number of samples is 30 in each message. The samples may span across seconds. A conversion will need to be done on this data once read. */
      3: {
        id: 3,
        name: 'gyro_y',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** These are the raw ADC reading. Maximum number of samples is 30 in each message. The samples may span across seconds. A conversion will need to be done on this data once read. */
      4: {
        id: 4,
        name: 'gyro_z',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated gyro reading */
      5: {
        id: 5,
        name: 'calibrated_gyro_x',
        scale: undefined,
        offset: undefined,
        units: 'deg/s',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated gyro reading */
      6: {
        id: 6,
        name: 'calibrated_gyro_y',
        scale: undefined,
        offset: undefined,
        units: 'deg/s',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated gyro reading */
      7: {
        id: 7,
        name: 'calibrated_gyro_z',
        scale: undefined,
        offset: undefined,
        units: 'deg/s',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  165: {
    id: 165,
    name: 'accelerometer_data',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Whole second part of the timestamp */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Millisecond part of the timestamp. */
      0: {
        id: 0,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Each time in the array describes the time at which the accelerometer sample with the corrosponding index was taken. Limited to 30 samples in each message. The samples may span across seconds. Array size must match the number of samples in accel_x and accel_y and accel_z */
      1: {
        id: 1,
        name: 'sample_time_offset',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** These are the raw ADC reading. Maximum number of samples is 30 in each message. The samples may span across seconds. A conversion will need to be done on this data once read. */
      2: {
        id: 2,
        name: 'accel_x',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** These are the raw ADC reading. Maximum number of samples is 30 in each message. The samples may span across seconds. A conversion will need to be done on this data once read. */
      3: {
        id: 3,
        name: 'accel_y',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** These are the raw ADC reading. Maximum number of samples is 30 in each message. The samples may span across seconds. A conversion will need to be done on this data once read. */
      4: {
        id: 4,
        name: 'accel_z',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated accel reading */
      5: {
        id: 5,
        name: 'calibrated_accel_x',
        scale: undefined,
        offset: undefined,
        units: 'g',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated accel reading */
      6: {
        id: 6,
        name: 'calibrated_accel_y',
        scale: undefined,
        offset: undefined,
        units: 'g',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated accel reading */
      7: {
        id: 7,
        name: 'calibrated_accel_z',
        scale: undefined,
        offset: undefined,
        units: 'g',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated accel reading */
      8: {
        id: 8,
        name: 'compressed_calibrated_accel_x',
        scale: undefined,
        offset: undefined,
        units: 'mG',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated accel reading */
      9: {
        id: 9,
        name: 'compressed_calibrated_accel_y',
        scale: undefined,
        offset: undefined,
        units: 'mG',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated accel reading */
      10: {
        id: 10,
        name: 'compressed_calibrated_accel_z',
        scale: undefined,
        offset: undefined,
        units: 'mG',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  208: {
    id: 208,
    name: 'magnetometer_data',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Whole second part of the timestamp */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Millisecond part of the timestamp. */
      0: {
        id: 0,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Each time in the array describes the time at which the compass sample with the corrosponding index was taken. Limited to 30 samples in each message. The samples may span across seconds. Array size must match the number of samples in cmps_x and cmps_y and cmps_z */
      1: {
        id: 1,
        name: 'sample_time_offset',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** These are the raw ADC reading. Maximum number of samples is 30 in each message. The samples may span across seconds. A conversion will need to be done on this data once read. */
      2: {
        id: 2,
        name: 'mag_x',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** These are the raw ADC reading. Maximum number of samples is 30 in each message. The samples may span across seconds. A conversion will need to be done on this data once read. */
      3: {
        id: 3,
        name: 'mag_y',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** These are the raw ADC reading. Maximum number of samples is 30 in each message. The samples may span across seconds. A conversion will need to be done on this data once read. */
      4: {
        id: 4,
        name: 'mag_z',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated Magnetometer reading */
      5: {
        id: 5,
        name: 'calibrated_mag_x',
        scale: undefined,
        offset: undefined,
        units: 'G',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated Magnetometer reading */
      6: {
        id: 6,
        name: 'calibrated_mag_y',
        scale: undefined,
        offset: undefined,
        units: 'G',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibrated Magnetometer reading */
      7: {
        id: 7,
        name: 'calibrated_mag_z',
        scale: undefined,
        offset: undefined,
        units: 'G',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  209: {
    id: 209,
    name: 'barometer_data',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Whole second part of the timestamp */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Millisecond part of the timestamp. */
      0: {
        id: 0,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Each time in the array describes the time at which the barometer sample with the corrosponding index was taken. The samples may span across seconds. Array size must match the number of samples in baro_cal */
      1: {
        id: 1,
        name: 'sample_time_offset',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** These are the raw ADC reading. The samples may span across seconds. A conversion will need to be done on this data once read. */
      2: {
        id: 2,
        name: 'baro_pres',
        scale: undefined,
        offset: undefined,
        units: 'Pa',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  167: {
    id: 167,
    name: 'three_d_sensor_calibration',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Whole second part of the timestamp */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Indicates which sensor the calibration is for */
      0: {
        id: 0,
        name: 'sensor_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sensor_type',
        type: profileTypeList['sensor_type'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibration factor used to convert from raw ADC value to degrees, g,  etc. */
      1: {
        id: 1,
        name: 'calibration_factor',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 1,
            name: 'accel_cal_factor',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'g',
            refFields: [
              {
                id: 0,
                name: 'sensor_type',
                rawValue: 0,
                value: 'accelerometer',
              }
            ],
            components: [
            ],
          },
          {
            id: 1,
            name: 'gyro_cal_factor',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'deg/s',
            refFields: [
              {
                id: 0,
                name: 'sensor_type',
                rawValue: 1,
                value: 'gyroscope',
              }
            ],
            components: [
            ],
          }

        ],
      },
      /** Calibration factor divisor */
      2: {
        id: 2,
        name: 'calibration_divisor',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Level shift value used to shift the ADC value back into range */
      3: {
        id: 3,
        name: 'level_shift',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Internal calibration factors, one for each: xy, yx, zx */
      4: {
        id: 4,
        name: 'offset_cal',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** 3 x 3 rotation matrix (row major) */
      5: {
        id: 5,
        name: 'orientation_matrix',
        scale: 65535,
        offset: undefined,
        units: 'undefined',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  210: {
    id: 210,
    name: 'one_d_sensor_calibration',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Whole second part of the timestamp */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Indicates which sensor the calibration is for */
      0: {
        id: 0,
        name: 'sensor_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sensor_type',
        type: profileTypeList['sensor_type'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Calibration factor used to convert from raw ADC value to degrees, g,  etc. */
      1: {
        id: 1,
        name: 'calibration_factor',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 1,
            name: 'baro_cal_factor',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'Pa',
            refFields: [
              {
                id: 0,
                name: 'sensor_type',
                rawValue: 3,
                value: 'barometer',
              }
            ],
            components: [
            ],
          }

        ],
      },
      /** Calibration factor divisor */
      2: {
        id: 2,
        name: 'calibration_divisor',
        scale: undefined,
        offset: undefined,
        units: 'counts',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Level shift value used to shift the ADC value back into range */
      3: {
        id: 3,
        name: 'level_shift',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Internal Calibration factor */
      4: {
        id: 4,
        name: 'offset_cal',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  169: {
    id: 169,
    name: 'video_frame',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Whole second part of the timestamp */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Millisecond part of the timestamp. */
      0: {
        id: 0,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Number of the frame that the timestamp and timestamp_ms correlate to */
      1: {
        id: 1,
        name: 'frame_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  174: {
    id: 174,
    name: 'obdii_data',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Timestamp message was output */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Fractional part of timestamp, added to timestamp */
      0: {
        id: 0,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Offset of PID reading [i] from start_timestamp+start_timestamp_ms. Readings may span accross seconds. */
      1: {
        id: 1,
        name: 'time_offset',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Parameter ID */
      2: {
        id: 2,
        name: 'pid',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [

        ],
      },
      /** Raw parameter data */
      3: {
        id: 3,
        name: 'raw_data',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [

        ],
      },
      /** Optional, data size of PID[i].  If not specified refer to SAE J1979. */
      4: {
        id: 4,
        name: 'pid_data_size',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** System time associated with sample expressed in ms, can be used instead of time_offset.  There will be a system_time value for each raw_data element.  For multibyte pids the system_time is repeated. */
      5: {
        id: 5,
        name: 'system_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Timestamp of first sample recorded in the message.  Used with time_offset to generate time of each sample */
      6: {
        id: 6,
        name: 'start_timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Fractional part of start_timestamp */
      7: {
        id: 7,
        name: 'start_timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  177: {
    id: 177,
    name: 'nmea_sentence',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Timestamp message was output */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Fractional part of timestamp, added to timestamp */
      0: {
        id: 0,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** NMEA sentence */
      1: {
        id: 1,
        name: 'sentence',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  178: {
    id: 178,
    name: 'aviation_attitude',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Timestamp message was output */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Fractional part of timestamp, added to timestamp */
      0: {
        id: 0,
        name: 'timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** System time associated with sample expressed in ms. */
      1: {
        id: 1,
        name: 'system_time',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Range -PI/2 to +PI/2 */
      2: {
        id: 2,
        name: 'pitch',
        scale: 10430.38,
        offset: undefined,
        units: 'radians',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Range -PI to +PI */
      3: {
        id: 3,
        name: 'roll',
        scale: 10430.38,
        offset: undefined,
        units: 'radians',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Range -78.4 to +78.4 (-8 Gs to 8 Gs) */
      4: {
        id: 4,
        name: 'accel_lateral',
        scale: 100,
        offset: undefined,
        units: 'm/s^2',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Range -78.4 to +78.4 (-8 Gs to 8 Gs) */
      5: {
        id: 5,
        name: 'accel_normal',
        scale: 100,
        offset: undefined,
        units: 'm/s^2',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Range -8.727 to +8.727 (-500 degs/sec to +500 degs/sec) */
      6: {
        id: 6,
        name: 'turn_rate',
        scale: 1024,
        offset: undefined,
        units: 'radians/second',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'stage',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'attitude_stage',
        type: profileTypeList['attitude_stage'],
        components: [
        ],
        subfields: [

        ],
      },
      /** The percent complete of the current attitude stage.  Set to 0 for attitude stages 0, 1 and 2 and to 100 for attitude stage 3 by AHRS modules that do not support it.  Range - 100 */
      8: {
        id: 8,
        name: 'attitude_stage_complete',
        scale: undefined,
        offset: undefined,
        units: '%',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Track Angle/Heading Range 0 - 2pi */
      9: {
        id: 9,
        name: 'track',
        scale: 10430.38,
        offset: undefined,
        units: 'radians',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'validity',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'attitude_validity',
        type: profileTypeList['attitude_validity'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  184: {
    id: 184,
    name: 'video',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'url',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'hosting_provider',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      /** Playback time of video */
      2: {
        id: 2,
        name: 'duration',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  185: {
    id: 185,
    name: 'video_title',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Long titles will be split into multiple parts */
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Total number of title parts */
      0: {
        id: 0,
        name: 'message_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'text',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  186: {
    id: 186,
    name: 'video_description',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Long descriptions will be split into multiple parts */
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Total number of description parts */
      0: {
        id: 0,
        name: 'message_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'text',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  187: {
    id: 187,
    name: 'video_clip',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'clip_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'start_timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'start_timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'end_timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'end_timestamp_ms',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Start of clip in video time */
      6: {
        id: 6,
        name: 'clip_start',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** End of clip in video time */
      7: {
        id: 7,
        name: 'clip_end',
        scale: undefined,
        offset: undefined,
        units: 'ms',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  225: {
    id: 225,
    name: 'set',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      /** Timestamp of the set */
      254: {
        id: 254,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'duration',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** # of repitions of the movement */
      3: {
        id: 3,
        name: 'repetitions',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Amount of weight applied for the set */
      4: {
        id: 4,
        name: 'weight',
        scale: 16,
        offset: undefined,
        units: 'kg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'set_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'set_type',
        type: profileTypeList['set_type'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Start time of the set */
      6: {
        id: 6,
        name: 'start_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'category',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'exercise_category',
        type: profileTypeList['exercise_category'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Based on the associated category, see [category]_exercise_names */
      8: {
        id: 8,
        name: 'category_subtype',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'weight_display_unit',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'fit_base_unit',
        type: profileTypeList['fit_base_unit'],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'wkt_step_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  285: {
    id: 285,
    name: 'jump',
    groupName: 'ACTIVITY FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'distance',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'height',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'rotations',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'hang_time',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** A score for a jump calculated based on hang time, rotations, and distance. */
      4: {
        id: 4,
        name: 'score',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'speed',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
          {
            id: '8',
            name: 'enhanced_speed',
            scale: '1000',
            offset: 'undefined',
            units: 'm/s',
            accumulate: 'undefined',
            bits: '16',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'enhanced_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  31: {
    id: 31,
    name: 'course',
    groupName: 'COURSE FILE MESSAGES',
    fields: {
      4: {
        id: 4,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'capabilities',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'course_capabilities',
        type: profileTypeList['course_capabilities'],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'sub_sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sub_sport',
        type: profileTypeList['sub_sport'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  32: {
    id: 32,
    name: 'course_point',
    groupName: 'COURSE FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'distance',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'course_point',
        type: profileTypeList['course_point'],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'favorite',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  /** Unique Identification data for a segment file */
  148: {
    id: 148,
    name: 'segment_id',
    groupName: 'SEGMENT FILE MESSAGES',
    fields: {
      /** Friendly name assigned to segment */
      0: {
        id: 0,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      /** UUID of the segment */
      1: {
        id: 1,
        name: 'uuid',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      /** Sport associated with the segment */
      2: {
        id: 2,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Segment enabled for evaluation */
      3: {
        id: 3,
        name: 'enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      /** Primary key of the user that created the segment */
      4: {
        id: 4,
        name: 'user_profile_primary_key',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** ID of the device that created the segment */
      5: {
        id: 5,
        name: 'device_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Index for the Leader Board entry selected as the default race participant */
      6: {
        id: 6,
        name: 'default_race_leader',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Indicates if any segments should be deleted */
      7: {
        id: 7,
        name: 'delete_status',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'segment_delete_status',
        type: profileTypeList['segment_delete_status'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Indicates how the segment was selected to be sent to the device */
      8: {
        id: 8,
        name: 'selection_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'segment_selection_type',
        type: profileTypeList['segment_selection_type'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  /** Unique Identification data for an individual segment leader within a segment file */
  149: {
    id: 149,
    name: 'segment_leaderboard_entry',
    groupName: 'SEGMENT FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Friendly name assigned to leader */
      0: {
        id: 0,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      /** Leader classification */
      1: {
        id: 1,
        name: 'type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'segment_leaderboard_type',
        type: profileTypeList['segment_leaderboard_type'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Primary user ID of this leader */
      2: {
        id: 2,
        name: 'group_primary_key',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** ID of the activity associated with this leader time */
      3: {
        id: 3,
        name: 'activity_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Segment Time (includes pauses) */
      4: {
        id: 4,
        name: 'segment_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** String version of the activity_id. 21 characters long, express in decimal */
      5: {
        id: 5,
        name: 'activity_id_string',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  /** Navigation and race evaluation point for a segment decribing a point along the segment path and time it took each segment leader to reach that point */
  150: {
    id: 150,
    name: 'segment_point',
    groupName: 'SEGMENT FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** Accumulated distance along the segment at the described point */
      3: {
        id: 3,
        name: 'distance',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Accumulated altitude along the segment at the described point */
      4: {
        id: 4,
        name: 'altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Accumualted time each leader board member required to reach the described point. This value is zero for all leader board members at the starting point of the segment. */
      5: {
        id: 5,
        name: 'leader_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  142: {
    id: 142,
    name: 'segment_lap',
    groupName: 'SEGMENT FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Lap end time. */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'event',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event',
        type: profileTypeList['event'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'event_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'event_type',
        type: profileTypeList['event_type'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'start_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'start_position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'start_position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'end_position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'end_position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** Time (includes pauses) */
      7: {
        id: 7,
        name: 'total_elapsed_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Timer Time (excludes pauses) */
      8: {
        id: 8,
        name: 'total_timer_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'total_distance',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'total_cycles',
        scale: undefined,
        offset: undefined,
        units: 'cycles',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 10,
            name: 'total_strokes',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'strokes',
            refFields: [
              {
                id: 23,
                name: 'sport',
                rawValue: 2,
                value: 'cycling',
              }
            ],
            components: [
            ],
          }

        ],
      },
      11: {
        id: 11,
        name: 'total_calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** If New Leaf */
      12: {
        id: 12,
        name: 'total_fat_calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'avg_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      14: {
        id: 14,
        name: 'max_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      15: {
        id: 15,
        name: 'avg_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      16: {
        id: 16,
        name: 'max_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** total_cycles / total_timer_time if non_zero_avg_cadence otherwise total_cycles / total_elapsed_time */
      17: {
        id: 17,
        name: 'avg_cadence',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      18: {
        id: 18,
        name: 'max_cadence',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** total_power / total_timer_time if non_zero_avg_power otherwise total_power / total_elapsed_time */
      19: {
        id: 19,
        name: 'avg_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      20: {
        id: 20,
        name: 'max_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      21: {
        id: 21,
        name: 'total_ascent',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      22: {
        id: 22,
        name: 'total_descent',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      23: {
        id: 23,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      24: {
        id: 24,
        name: 'event_group',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** North east corner latitude. */
      25: {
        id: 25,
        name: 'nec_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** North east corner longitude. */
      26: {
        id: 26,
        name: 'nec_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** South west corner latitude. */
      27: {
        id: 27,
        name: 'swc_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      /** South west corner latitude. */
      28: {
        id: 28,
        name: 'swc_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      29: {
        id: 29,
        name: 'name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      30: {
        id: 30,
        name: 'normalized_power',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      31: {
        id: 31,
        name: 'left_right_balance',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'left_right_balance_100',
        type: profileTypeList['left_right_balance_100'],
        components: [
        ],
        subfields: [

        ],
      },
      32: {
        id: 32,
        name: 'sub_sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sub_sport',
        type: profileTypeList['sub_sport'],
        components: [
        ],
        subfields: [

        ],
      },
      33: {
        id: 33,
        name: 'total_work',
        scale: undefined,
        offset: undefined,
        units: 'J',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      34: {
        id: 34,
        name: 'avg_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      35: {
        id: 35,
        name: 'max_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      36: {
        id: 36,
        name: 'gps_accuracy',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      37: {
        id: 37,
        name: 'avg_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      38: {
        id: 38,
        name: 'avg_pos_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      39: {
        id: 39,
        name: 'avg_neg_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      40: {
        id: 40,
        name: 'max_pos_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      41: {
        id: 41,
        name: 'max_neg_grade',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      42: {
        id: 42,
        name: 'avg_temperature',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      43: {
        id: 43,
        name: 'max_temperature',
        scale: undefined,
        offset: undefined,
        units: 'C',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      44: {
        id: 44,
        name: 'total_moving_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      45: {
        id: 45,
        name: 'avg_pos_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      46: {
        id: 46,
        name: 'avg_neg_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      47: {
        id: 47,
        name: 'max_pos_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      48: {
        id: 48,
        name: 'max_neg_vertical_speed',
        scale: 1000,
        offset: undefined,
        units: 'm/s',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      49: {
        id: 49,
        name: 'time_in_hr_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      50: {
        id: 50,
        name: 'time_in_speed_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      51: {
        id: 51,
        name: 'time_in_cadence_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      52: {
        id: 52,
        name: 'time_in_power_zone',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      53: {
        id: 53,
        name: 'repetition_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      54: {
        id: 54,
        name: 'min_altitude',
        scale: 5,
        offset: 500,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      55: {
        id: 55,
        name: 'min_heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      56: {
        id: 56,
        name: 'active_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      57: {
        id: 57,
        name: 'wkt_step_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      58: {
        id: 58,
        name: 'sport_event',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport_event',
        type: profileTypeList['sport_event'],
        components: [
        ],
        subfields: [

        ],
      },
      59: {
        id: 59,
        name: 'avg_left_torque_effectiveness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      60: {
        id: 60,
        name: 'avg_right_torque_effectiveness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      61: {
        id: 61,
        name: 'avg_left_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      62: {
        id: 62,
        name: 'avg_right_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      63: {
        id: 63,
        name: 'avg_combined_pedal_smoothness',
        scale: 2,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      64: {
        id: 64,
        name: 'status',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'segment_lap_status',
        type: profileTypeList['segment_lap_status'],
        components: [
        ],
        subfields: [

        ],
      },
      65: {
        id: 65,
        name: 'uuid',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of the avg_cadence */
      66: {
        id: 66,
        name: 'avg_fractional_cadence',
        scale: 128,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of the max_cadence */
      67: {
        id: 67,
        name: 'max_fractional_cadence',
        scale: 128,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of the total_cycles */
      68: {
        id: 68,
        name: 'total_fractional_cycles',
        scale: 128,
        offset: undefined,
        units: 'cycles',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      69: {
        id: 69,
        name: 'front_gear_shift_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      70: {
        id: 70,
        name: 'rear_gear_shift_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Total time spent in the standing position */
      71: {
        id: 71,
        name: 'time_standing',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Number of transitions to the standing state */
      72: {
        id: 72,
        name: 'stand_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average left platform center offset */
      73: {
        id: 73,
        name: 'avg_left_pco',
        scale: undefined,
        offset: undefined,
        units: 'mm',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average right platform center offset */
      74: {
        id: 74,
        name: 'avg_right_pco',
        scale: undefined,
        offset: undefined,
        units: 'mm',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average left power phase angles. Data value indexes defined by power_phase_type. */
      75: {
        id: 75,
        name: 'avg_left_power_phase',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average left power phase peak angles. Data value indexes defined by power_phase_type. */
      76: {
        id: 76,
        name: 'avg_left_power_phase_peak',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average right power phase angles. Data value indexes defined by power_phase_type. */
      77: {
        id: 77,
        name: 'avg_right_power_phase',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average right power phase peak angles. Data value indexes defined by power_phase_type. */
      78: {
        id: 78,
        name: 'avg_right_power_phase_peak',
        scale: 0.7111111,
        offset: undefined,
        units: 'degrees',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average power by position. Data value indexes defined by rider_position_type. */
      79: {
        id: 79,
        name: 'avg_power_position',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Maximum power by position. Data value indexes defined by rider_position_type. */
      80: {
        id: 80,
        name: 'max_power_position',
        scale: undefined,
        offset: undefined,
        units: 'watts',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Average cadence by position. Data value indexes defined by rider_position_type. */
      81: {
        id: 81,
        name: 'avg_cadence_position',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Maximum cadence by position. Data value indexes defined by rider_position_type. */
      82: {
        id: 82,
        name: 'max_cadence_position',
        scale: undefined,
        offset: undefined,
        units: 'rpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Manufacturer that produced the segment */
      83: {
        id: 83,
        name: 'manufacturer',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'manufacturer',
        type: profileTypeList['manufacturer'],
        components: [
        ],
        subfields: [

        ],
      },
      /** The grit score estimates how challenging a route could be for a cyclist in terms of time spent going over sharp turns or large grade slopes. */
      84: {
        id: 84,
        name: 'total_grit',
        scale: undefined,
        offset: undefined,
        units: 'kGrit',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** The flow score estimates how long distance wise a cyclist deaccelerates over intervals where deacceleration is unnecessary such as smooth turns or small grade angle intervals. */
      85: {
        id: 85,
        name: 'total_flow',
        scale: undefined,
        offset: undefined,
        units: 'Flow',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** The grit score estimates how challenging a route could be for a cyclist in terms of time spent going over sharp turns or large grade slopes. */
      86: {
        id: 86,
        name: 'avg_grit',
        scale: undefined,
        offset: undefined,
        units: 'kGrit',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** The flow score estimates how long distance wise a cyclist deaccelerates over intervals where deacceleration is unnecessary such as smooth turns or small grade angle intervals. */
      87: {
        id: 87,
        name: 'avg_flow',
        scale: undefined,
        offset: undefined,
        units: 'Flow',
        typeId: 'float32',
        type: baseTypesList[0x88],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of total_ascent */
      89: {
        id: 89,
        name: 'total_fractional_ascent',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** fractional part of total_descent */
      90: {
        id: 90,
        name: 'total_fractional_descent',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  /** Summary of the unique segment and leaderboard information associated with a segment file. This message is used to compile a segment list file describing all segment files on a device. The segment list file is used when refreshing the contents of a segment file with the latest available leaderboard information. */
  151: {
    id: 151,
    name: 'segment_file',
    groupName: 'SEGMENT FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** UUID of the segment file */
      1: {
        id: 1,
        name: 'file_uuid',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      /** Enabled state of the segment file */
      3: {
        id: 3,
        name: 'enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      /** Primary key of the user that created the segment file */
      4: {
        id: 4,
        name: 'user_profile_primary_key',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Leader type of each leader in the segment file */
      7: {
        id: 7,
        name: 'leader_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'segment_leaderboard_type',
        type: profileTypeList['segment_leaderboard_type'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Group primary key of each leader in the segment file */
      8: {
        id: 8,
        name: 'leader_group_primary_key',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Activity ID of each leader in the segment file */
      9: {
        id: 9,
        name: 'leader_activity_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** String version of the activity ID of each leader in the segment file. 21 characters long for each ID, express in decimal */
      10: {
        id: 10,
        name: 'leader_activity_id_string',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      /** Index for the Leader Board entry selected as the default race participant */
      11: {
        id: 11,
        name: 'default_race_leader',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  26: {
    id: 26,
    name: 'workout',
    groupName: 'WORKOUT FILE MESSAGES',
    fields: {
      4: {
        id: 4,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'capabilities',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'workout_capabilities',
        type: profileTypeList['workout_capabilities'],
        components: [
        ],
        subfields: [

        ],
      },
      /** number of valid steps */
      6: {
        id: 6,
        name: 'num_valid_steps',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'wkt_name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'sub_sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sub_sport',
        type: profileTypeList['sub_sport'],
        components: [
        ],
        subfields: [

        ],
      },
      14: {
        id: 14,
        name: 'pool_length',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      15: {
        id: 15,
        name: 'pool_length_unit',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_measure',
        type: profileTypeList['display_measure'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  158: {
    id: 158,
    name: 'workout_session',
    groupName: 'WORKOUT FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'sub_sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sub_sport',
        type: profileTypeList['sub_sport'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'num_valid_steps',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'first_step_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'pool_length',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'pool_length_unit',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'display_measure',
        type: profileTypeList['display_measure'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  27: {
    id: 27,
    name: 'workout_step',
    groupName: 'WORKOUT FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'wkt_step_name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'duration_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'wkt_step_duration',
        type: profileTypeList['wkt_step_duration'],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'duration_value',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 2,
            name: 'duration_time',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 1000,
            offset: undefined,
            units: 's',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 0,
                value: 'time',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 28,
                value: 'repetition_time',
              }
            ],
            components: [
            ],
          },
          {
            id: 2,
            name: 'duration_distance',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 100,
            offset: undefined,
            units: 'm',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 1,
                value: 'distance',
              }
            ],
            components: [
            ],
          },
          {
            id: 2,
            name: 'duration_hr',
            typeId: 'workout_hr',
            type: profileTypeList['workout_hr'],
            scale: undefined,
            offset: undefined,
            units: '% or bpm',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 2,
                value: 'hr_less_than',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 3,
                value: 'hr_greater_than',
              }
            ],
            components: [
            ],
          },
          {
            id: 2,
            name: 'duration_calories',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'calories',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 4,
                value: 'calories',
              }
            ],
            components: [
            ],
          },
          {
            id: 2,
            name: 'duration_step',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 6,
                value: 'repeat_until_steps_cmplt',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 7,
                value: 'repeat_until_time',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 8,
                value: 'repeat_until_distance',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 9,
                value: 'repeat_until_calories',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 10,
                value: 'repeat_until_hr_less_than',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 11,
                value: 'repeat_until_hr_greater_than',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 12,
                value: 'repeat_until_power_less_than',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 13,
                value: 'repeat_until_power_greater_than',
              }
            ],
            components: [
            ],
          },
          {
            id: 2,
            name: 'duration_power',
            typeId: 'workout_power',
            type: profileTypeList['workout_power'],
            scale: undefined,
            offset: undefined,
            units: '% or watts',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 14,
                value: 'power_less_than',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 15,
                value: 'power_greater_than',
              }
            ],
            components: [
            ],
          },
          {
            id: 2,
            name: 'duration_reps',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 29,
                value: 'reps',
              }
            ],
            components: [
            ],
          }

        ],
      },
      3: {
        id: 3,
        name: 'target_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'wkt_step_target',
        type: profileTypeList['wkt_step_target'],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'target_value',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 4,
            name: 'target_speed_zone',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 0,
                value: 'speed',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'target_hr_zone',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 1,
                value: 'heart_rate',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'target_cadence_zone',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 3,
                value: 'cadence',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'target_power_zone',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 4,
                value: 'power',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'repeat_steps',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 6,
                value: 'repeat_until_steps_cmplt',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'repeat_time',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 1000,
            offset: undefined,
            units: 's',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 7,
                value: 'repeat_until_time',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'repeat_distance',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 100,
            offset: undefined,
            units: 'm',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 8,
                value: 'repeat_until_distance',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'repeat_calories',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'calories',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 9,
                value: 'repeat_until_calories',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'repeat_hr',
            typeId: 'workout_hr',
            type: profileTypeList['workout_hr'],
            scale: undefined,
            offset: undefined,
            units: '% or bpm',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 10,
                value: 'repeat_until_hr_less_than',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 11,
                value: 'repeat_until_hr_greater_than',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'repeat_power',
            typeId: 'workout_power',
            type: profileTypeList['workout_power'],
            scale: undefined,
            offset: undefined,
            units: '% or watts',
            refFields: [
              {
                id: 1,
                name: 'duration_type',
                rawValue: 12,
                value: 'repeat_until_power_less_than',
              },
              {
                id: 1,
                name: 'duration_type',
                rawValue: 13,
                value: 'repeat_until_power_greater_than',
              }
            ],
            components: [
            ],
          },
          {
            id: 4,
            name: 'target_stroke_type',
            typeId: 'swim_stroke',
            type: profileTypeList['swim_stroke'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 11,
                value: 'swim_stroke',
              }
            ],
            components: [
            ],
          }

        ],
      },
      5: {
        id: 5,
        name: 'custom_target_value_low',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 5,
            name: 'custom_target_speed_low',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 1000,
            offset: undefined,
            units: 'm/s',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 0,
                value: 'speed',
              }
            ],
            components: [
            ],
          },
          {
            id: 5,
            name: 'custom_target_heart_rate_low',
            typeId: 'workout_hr',
            type: profileTypeList['workout_hr'],
            scale: undefined,
            offset: undefined,
            units: '% or bpm',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 1,
                value: 'heart_rate',
              }
            ],
            components: [
            ],
          },
          {
            id: 5,
            name: 'custom_target_cadence_low',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'rpm',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 3,
                value: 'cadence',
              }
            ],
            components: [
            ],
          },
          {
            id: 5,
            name: 'custom_target_power_low',
            typeId: 'workout_power',
            type: profileTypeList['workout_power'],
            scale: undefined,
            offset: undefined,
            units: '% or watts',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 4,
                value: 'power',
              }
            ],
            components: [
            ],
          }

        ],
      },
      6: {
        id: 6,
        name: 'custom_target_value_high',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 6,
            name: 'custom_target_speed_high',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 1000,
            offset: undefined,
            units: 'm/s',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 0,
                value: 'speed',
              }
            ],
            components: [
            ],
          },
          {
            id: 6,
            name: 'custom_target_heart_rate_high',
            typeId: 'workout_hr',
            type: profileTypeList['workout_hr'],
            scale: undefined,
            offset: undefined,
            units: '% or bpm',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 1,
                value: 'heart_rate',
              }
            ],
            components: [
            ],
          },
          {
            id: 6,
            name: 'custom_target_cadence_high',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: undefined,
            offset: undefined,
            units: 'rpm',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 3,
                value: 'cadence',
              }
            ],
            components: [
            ],
          },
          {
            id: 6,
            name: 'custom_target_power_high',
            typeId: 'workout_power',
            type: profileTypeList['workout_power'],
            scale: undefined,
            offset: undefined,
            units: '% or watts',
            refFields: [
              {
                id: 3,
                name: 'target_type',
                rawValue: 4,
                value: 'power',
              }
            ],
            components: [
            ],
          }

        ],
      },
      7: {
        id: 7,
        name: 'intensity',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'intensity',
        type: profileTypeList['intensity'],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'notes',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'equipment',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'workout_equipment',
        type: profileTypeList['workout_equipment'],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'exercise_category',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'exercise_category',
        type: profileTypeList['exercise_category'],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'exercise_name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      12: {
        id: 12,
        name: 'exercise_weight',
        scale: 100,
        offset: undefined,
        units: 'kg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'weight_display_unit',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'fit_base_unit',
        type: profileTypeList['fit_base_unit'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  264: {
    id: 264,
    name: 'exercise_title',
    groupName: 'WORKOUT FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'exercise_category',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'exercise_category',
        type: profileTypeList['exercise_category'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'exercise_name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'wkt_step_name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  28: {
    id: 28,
    name: 'schedule',
    groupName: 'SCHEDULE FILE MESSAGES',
    fields: {
      /** Corresponds to file_id of scheduled workout / course. */
      0: {
        id: 0,
        name: 'manufacturer',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'manufacturer',
        type: profileTypeList['manufacturer'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Corresponds to file_id of scheduled workout / course. */
      1: {
        id: 1,
        name: 'product',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [
          {
            id: 1,
            name: 'favero_product',
            typeId: 'favero_product',
            type: profileTypeList['favero_product'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'manufacturer',
                rawValue: 263,
                value: 'favero_electronics',
              }
            ],
            components: [
            ],
          },
          {
            id: 1,
            name: 'garmin_product',
            typeId: 'garmin_product',
            type: profileTypeList['garmin_product'],
            scale: undefined,
            offset: undefined,
            units: 'undefined',
            refFields: [
              {
                id: 0,
                name: 'manufacturer',
                rawValue: 1,
                value: 'garmin',
              },
              {
                id: 0,
                name: 'manufacturer',
                rawValue: 15,
                value: 'dynastream',
              },
              {
                id: 0,
                name: 'manufacturer',
                rawValue: 13,
                value: 'dynastream_oem',
              },
              {
                id: 0,
                name: 'manufacturer',
                rawValue: 89,
                value: 'tacx',
              }
            ],
            components: [
            ],
          }

        ],
      },
      /** Corresponds to file_id of scheduled workout / course. */
      2: {
        id: 2,
        name: 'serial_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32z',
        type: baseTypesList[0x8C],
        components: [
        ],
        subfields: [

        ],
      },
      /** Corresponds to file_id of scheduled workout / course. */
      3: {
        id: 3,
        name: 'time_created',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** TRUE if this activity has been started */
      4: {
        id: 4,
        name: 'completed',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'schedule',
        type: profileTypeList['schedule'],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'scheduled_time',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'local_date_time',
        type: profileTypeList['local_date_time'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  33: {
    id: 33,
    name: 'totals',
    groupName: 'TOTALS FILE MESSAGES',
    fields: {
      254: {
        id: 254,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Excludes pauses */
      0: {
        id: 0,
        name: 'timer_time',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'distance',
        scale: undefined,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'sport',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sport',
        type: profileTypeList['sport'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Includes pauses */
      4: {
        id: 4,
        name: 'elapsed_time',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'sessions',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'active_time',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'sport_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  30: {
    id: 30,
    name: 'weight_scale',
    groupName: 'WEIGHT SCALE FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'weight',
        scale: 100,
        offset: undefined,
        units: 'kg',
        typeId: 'weight',
        type: profileTypeList['weight'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'percent_fat',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'percent_hydration',
        scale: 100,
        offset: undefined,
        units: '%',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'visceral_fat_mass',
        scale: 100,
        offset: undefined,
        units: 'kg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'bone_mass',
        scale: 100,
        offset: undefined,
        units: 'kg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'muscle_mass',
        scale: 100,
        offset: undefined,
        units: 'kg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'basal_met',
        scale: 4,
        offset: undefined,
        units: 'kcal/day',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'physique_rating',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** ~4kJ per kcal, 0.25 allows max 16384 kcal */
      9: {
        id: 9,
        name: 'active_met',
        scale: 4,
        offset: undefined,
        units: 'kcal/day',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'metabolic_age',
        scale: undefined,
        offset: undefined,
        units: 'years',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'visceral_fat_rating',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** Associates this weight scale message to a user.  This corresponds to the index of the user profile message in the weight scale file. */
      12: {
        id: 12,
        name: 'user_profile_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  51: {
    id: 51,
    name: 'blood_pressure',
    groupName: 'BLOOD PRESSURE FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'systolic_pressure',
        scale: undefined,
        offset: undefined,
        units: 'mmHg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'diastolic_pressure',
        scale: undefined,
        offset: undefined,
        units: 'mmHg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'mean_arterial_pressure',
        scale: undefined,
        offset: undefined,
        units: 'mmHg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'map_3_sample_mean',
        scale: undefined,
        offset: undefined,
        units: 'mmHg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'map_morning_values',
        scale: undefined,
        offset: undefined,
        units: 'mmHg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'map_evening_values',
        scale: undefined,
        offset: undefined,
        units: 'mmHg',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'heart_rate_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'hr_type',
        type: profileTypeList['hr_type'],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'status',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bp_status',
        type: profileTypeList['bp_status'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Associates this blood pressure message to a user.  This corresponds to the index of the user profile message in the blood pressure file. */
      9: {
        id: 9,
        name: 'user_profile_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  103: {
    id: 103,
    name: 'monitoring_info',
    groupName: 'MONITORING FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Use to convert activity timestamps to local time if device does not support time zone and daylight savings time correction. */
      0: {
        id: 0,
        name: 'local_timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'local_date_time',
        type: profileTypeList['local_date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'activity_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'activity_type',
        type: profileTypeList['activity_type'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Indexed by activity_type */
      3: {
        id: 3,
        name: 'cycles_to_distance',
        scale: 5000,
        offset: undefined,
        units: 'm/cycle',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Indexed by activity_type */
      4: {
        id: 4,
        name: 'cycles_to_calories',
        scale: 5000,
        offset: undefined,
        units: 'kcal/cycle',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'resting_metabolic_rate',
        scale: undefined,
        offset: undefined,
        units: 'kcal / day',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  55: {
    id: 55,
    name: 'monitoring',
    groupName: 'MONITORING FILE MESSAGES',
    fields: {
      /** Must align to logging interval, for example, time must be 00:00:00 for daily log. */
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Associates this data to device_info message.  Not required for file with single device (sensor). */
      0: {
        id: 0,
        name: 'device_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'device_index',
        type: profileTypeList['device_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Accumulated total calories.  Maintained by MonitoringReader for each activity_type.  See SDK documentation */
      1: {
        id: 1,
        name: 'calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Accumulated distance.  Maintained by MonitoringReader for each activity_type.  See SDK documentation. */
      2: {
        id: 2,
        name: 'distance',
        scale: 100,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Accumulated cycles.  Maintained by MonitoringReader for each activity_type.  See SDK documentation. */
      3: {
        id: 3,
        name: 'cycles',
        scale: 2,
        offset: undefined,
        units: 'cycles',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [
          {
            id: 3,
            name: 'steps',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 1,
            offset: undefined,
            units: 'steps',
            refFields: [
              {
                id: 5,
                name: 'activity_type',
                rawValue: 6,
                value: 'walking',
              },
              {
                id: 5,
                name: 'activity_type',
                rawValue: 1,
                value: 'running',
              }
            ],
            components: [
            ],
          },
          {
            id: 3,
            name: 'strokes',
            typeId: 'uint32',
            type: baseTypesList[0x86],
            scale: 2,
            offset: undefined,
            units: 'strokes',
            refFields: [
              {
                id: 5,
                name: 'activity_type',
                rawValue: 2,
                value: 'cycling',
              },
              {
                id: 5,
                name: 'activity_type',
                rawValue: 5,
                value: 'swimming',
              }
            ],
            components: [
            ],
          }

        ],
      },
      4: {
        id: 4,
        name: 'active_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'activity_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'activity_type',
        type: profileTypeList['activity_type'],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'activity_subtype',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'activity_subtype',
        type: profileTypeList['activity_subtype'],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'activity_level',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'activity_level',
        type: profileTypeList['activity_level'],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'distance_16',
        scale: undefined,
        offset: undefined,
        units: '100 * m',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'cycles_16',
        scale: undefined,
        offset: undefined,
        units: '2 * cycles (steps)',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'active_time_16',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Must align to logging interval, for example, time must be 00:00:00 for daily log. */
      11: {
        id: 11,
        name: 'local_timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'local_date_time',
        type: profileTypeList['local_date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      /** Avg temperature during the logging interval ended at timestamp */
      12: {
        id: 12,
        name: 'temperature',
        scale: 100,
        offset: undefined,
        units: 'C',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Min temperature during the logging interval ended at timestamp */
      14: {
        id: 14,
        name: 'temperature_min',
        scale: 100,
        offset: undefined,
        units: 'C',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Max temperature during the logging interval ended at timestamp */
      15: {
        id: 15,
        name: 'temperature_max',
        scale: 100,
        offset: undefined,
        units: 'C',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Indexed using minute_activity_level enum */
      16: {
        id: 16,
        name: 'activity_time',
        scale: undefined,
        offset: undefined,
        units: 'minutes',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      19: {
        id: 19,
        name: 'active_calories',
        scale: undefined,
        offset: undefined,
        units: 'kcal',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Indicates single type / intensity for duration since last monitoring message. */
      24: {
        id: 24,
        name: 'current_activity_type_intensity',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
          {
            id: '5',
            name: 'activity_type',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '5',
            bitOffset: '0',
          },
          {
            id: '28',
            name: 'intensity',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '3',
            bitOffset: '5',
          }
        ],
        subfields: [

        ],
      },
      25: {
        id: 25,
        name: 'timestamp_min_8',
        scale: undefined,
        offset: undefined,
        units: 'min',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      26: {
        id: 26,
        name: 'timestamp_16',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      27: {
        id: 27,
        name: 'heart_rate',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      28: {
        id: 28,
        name: 'intensity',
        scale: 10,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      29: {
        id: 29,
        name: 'duration_min',
        scale: undefined,
        offset: undefined,
        units: 'min',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      30: {
        id: 30,
        name: 'duration',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      31: {
        id: 31,
        name: 'ascent',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      32: {
        id: 32,
        name: 'descent',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      33: {
        id: 33,
        name: 'moderate_activity_minutes',
        scale: undefined,
        offset: undefined,
        units: 'minutes',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      34: {
        id: 34,
        name: 'vigorous_activity_minutes',
        scale: undefined,
        offset: undefined,
        units: 'minutes',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  132: {
    id: 132,
    name: 'hr',
    groupName: 'MONITORING FILE MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'fractional_timestamp',
        scale: 32768,
        offset: undefined,
        units: 's',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'time256',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
          {
            id: '0',
            name: 'fractional_timestamp',
            scale: '256',
            offset: 'undefined',
            units: 's',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '0',
          }
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'filtered_bpm',
        scale: undefined,
        offset: undefined,
        units: 'bpm',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'event_timestamp',
        scale: 1024,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'event_timestamp_12',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
          {
            id: '9',
            name: 'event_timestamp',
            scale: '1024',
            offset: 'undefined',
            units: 's',
            accumulate: 'true',
            bits: '12',
            bitOffset: '0',
          },
          {
            id: '9',
            name: 'event_timestamp',
            scale: '1024',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'true',
            bits: '12',
            bitOffset: '12',
          },
          {
            id: '9',
            name: 'event_timestamp',
            scale: '1024',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'true',
            bits: '12',
            bitOffset: '24',
          },
          {
            id: '9',
            name: 'event_timestamp',
            scale: '1024',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'true',
            bits: '12',
            bitOffset: '36',
          },
          {
            id: '9',
            name: 'event_timestamp',
            scale: '1024',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'true',
            bits: '12',
            bitOffset: '48',
          },
          {
            id: '9',
            name: 'event_timestamp',
            scale: '1024',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'true',
            bits: '12',
            bitOffset: '60',
          },
          {
            id: '9',
            name: 'event_timestamp',
            scale: '1024',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'true',
            bits: '12',
            bitOffset: '72',
          },
          {
            id: '9',
            name: 'event_timestamp',
            scale: '1024',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'true',
            bits: '12',
            bitOffset: '84',
          },
          {
            id: '9',
            name: 'event_timestamp',
            scale: '1024',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'true',
            bits: '12',
            bitOffset: '96',
          },
          {
            id: '9',
            name: 'event_timestamp',
            scale: '1024',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'true',
            bits: '12',
            bitOffset: '108',
          }
        ],
        subfields: [

        ],
      }
    },
  },
  /** Value from 1 to 100 calculated by FirstBeat */
  227: {
    id: 227,
    name: 'stress_level',
    groupName: 'MONITORING FILE MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'stress_level_value',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sint16',
        type: baseTypesList[0x83],
        components: [
        ],
        subfields: [

        ],
      },
      /** Time stress score was calculated */
      1: {
        id: 1,
        name: 'stress_level_time',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  145: {
    id: 145,
    name: 'memo_glob',
    groupName: 'OTHER MESSAGES',
    fields: {
      /** Sequence number of memo blocks */
      250: {
        id: 250,
        name: 'part_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Block of utf8 bytes */
      0: {
        id: 0,
        name: 'memo',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [

        ],
      },
      /** Allows relating glob to another mesg  If used only required for first part of each memo_glob */
      1: {
        id: 1,
        name: 'message_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      /** Index of external mesg */
      2: {
        id: 2,
        name: 'message_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  82: {
    id: 82,
    name: 'ant_channel_id',
    groupName: 'OTHER MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'channel_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'device_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'device_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16z',
        type: baseTypesList[0x8B],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'transmission_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8z',
        type: baseTypesList[0x0A],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'device_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'device_index',
        type: profileTypeList['device_index'],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  80: {
    id: 80,
    name: 'ant_rx',
    groupName: 'OTHER MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'fractional_timestamp',
        scale: 32768,
        offset: undefined,
        units: 's',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'mesg_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'mesg_data',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
          {
            id: '3',
            name: 'channel_number',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '0',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '8',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '16',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '24',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '32',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '40',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '48',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '56',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '64',
          }
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'channel_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'data',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  81: {
    id: 81,
    name: 'ant_tx',
    groupName: 'OTHER MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'fractional_timestamp',
        scale: 32768,
        offset: undefined,
        units: 's',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'mesg_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'mesg_data',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
          {
            id: '3',
            name: 'channel_number',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '0',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '8',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '16',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '24',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '32',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '40',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '48',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '56',
          },
          {
            id: '4',
            name: 'data',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '8',
            bitOffset: '64',
          }
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'channel_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'data',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  200: {
    id: 200,
    name: 'exd_screen_configuration',
    groupName: 'OTHER MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'screen_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      /** number of fields in screen */
      1: {
        id: 1,
        name: 'field_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'layout',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'exd_layout',
        type: profileTypeList['exd_layout'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'screen_enabled',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  201: {
    id: 201,
    name: 'exd_data_field_configuration',
    groupName: 'OTHER MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'screen_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'concept_field',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
          {
            id: '2',
            name: 'field_id',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '4',
            bitOffset: '0',
          },
          {
            id: '3',
            name: 'concept_count',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '4',
            bitOffset: '4',
          }
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'field_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'concept_count',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'display_type',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'exd_display_type',
        type: profileTypeList['exd_display_type'],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'title',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  202: {
    id: 202,
    name: 'exd_data_concept_configuration',
    groupName: 'OTHER MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'screen_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'concept_field',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
          {
            id: '2',
            name: 'field_id',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '4',
            bitOffset: '0',
          },
          {
            id: '3',
            name: 'concept_index',
            scale: 'undefined',
            offset: 'undefined',
            units: 'undefined',
            accumulate: 'undefined',
            bits: '4',
            bitOffset: '4',
          }
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'field_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'concept_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'data_page',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'concept_key',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'scaling',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'data_units',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'exd_data_units',
        type: profileTypeList['exd_data_units'],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'qualifier',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'exd_qualifiers',
        type: profileTypeList['exd_qualifiers'],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'descriptor',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'exd_descriptors',
        type: profileTypeList['exd_descriptors'],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'is_signed',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'bool',
        type: baseTypesList[0x00],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  /** Must be logged before developer field is used */
  206: {
    id: 206,
    name: 'field_description',
    groupName: 'OTHER MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'developer_data_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'field_definition_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'fit_base_type_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'fit_base_type',
        type: profileTypeList['fit_base_type'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'field_name',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'array',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'components',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'scale',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'offset',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'sint8',
        type: baseTypesList[0x01],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'units',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'bits',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'accumulate',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'string',
        type: baseTypesList[0x07],
        components: [
        ],
        subfields: [

        ],
      },
      13: {
        id: 13,
        name: 'fit_base_unit_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'fit_base_unit',
        type: profileTypeList['fit_base_unit'],
        components: [
        ],
        subfields: [

        ],
      },
      14: {
        id: 14,
        name: 'native_mesg_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'mesg_num',
        type: profileTypeList['mesg_num'],
        components: [
        ],
        subfields: [

        ],
      },
      15: {
        id: 15,
        name: 'native_field_num',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  /** Must be logged before field description */
  207: {
    id: 207,
    name: 'developer_data_id',
    groupName: 'OTHER MESSAGES',
    fields: {
      0: {
        id: 0,
        name: 'developer_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'application_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'byte',
        type: baseTypesList[0x0D],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'manufacturer_id',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'manufacturer',
        type: profileTypeList['manufacturer'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'developer_data_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'application_version',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  268: {
    id: 268,
    name: 'dive_summary',
    groupName: 'OTHER MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'reference_mesg',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'mesg_num',
        type: profileTypeList['mesg_num'],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'reference_index',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'message_index',
        type: profileTypeList['message_index'],
        components: [
        ],
        subfields: [

        ],
      },
      /** 0 if above water */
      2: {
        id: 2,
        name: 'avg_depth',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** 0 if above water */
      3: {
        id: 3,
        name: 'max_depth',
        scale: 1000,
        offset: undefined,
        units: 'm',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      /** Time since end of last dive */
      4: {
        id: 4,
        name: 'surface_interval',
        scale: 1,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      5: {
        id: 5,
        name: 'start_cns',
        scale: 1,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      6: {
        id: 6,
        name: 'end_cns',
        scale: 1,
        offset: undefined,
        units: 'percent',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      },
      7: {
        id: 7,
        name: 'start_n2',
        scale: 1,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      8: {
        id: 8,
        name: 'end_n2',
        scale: 1,
        offset: undefined,
        units: 'percent',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      9: {
        id: 9,
        name: 'o2_toxicity',
        scale: undefined,
        offset: undefined,
        units: 'OTUs',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      10: {
        id: 10,
        name: 'dive_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      },
      11: {
        id: 11,
        name: 'bottom_time',
        scale: 1000,
        offset: undefined,
        units: 's',
        typeId: 'uint32',
        type: baseTypesList[0x86],
        components: [
        ],
        subfields: [

        ],
      }
    },
  },
  317: {
    id: 317,
    name: 'climb_pro',
    groupName: 'OTHER MESSAGES',
    fields: {
      253: {
        id: 253,
        name: 'timestamp',
        scale: undefined,
        offset: undefined,
        units: 's',
        typeId: 'date_time',
        type: profileTypeList['date_time'],
        components: [
        ],
        subfields: [

        ],
      },
      0: {
        id: 0,
        name: 'position_lat',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      1: {
        id: 1,
        name: 'position_long',
        scale: undefined,
        offset: undefined,
        units: 'semicircles',
        typeId: 'sint32',
        type: baseTypesList[0x85],
        components: [
        ],
        subfields: [

        ],
      },
      2: {
        id: 2,
        name: 'climb_pro_event',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'climb_pro_event',
        type: profileTypeList['climb_pro_event'],
        components: [
        ],
        subfields: [

        ],
      },
      3: {
        id: 3,
        name: 'climb_number',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint16',
        type: baseTypesList[0x84],
        components: [
        ],
        subfields: [

        ],
      },
      4: {
        id: 4,
        name: 'climb_category',
        scale: undefined,
        offset: undefined,
        units: 'undefined',
        typeId: 'uint8',
        type: baseTypesList[0x02],
        components: [
        ],
        subfields: [

        ],
      }
    },
  }
} as const
