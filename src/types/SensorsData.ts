interface SensorsData {
    zestaw01: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw02: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw03: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw04: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw05: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw06: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw07: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw08: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw09: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw10: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw11: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw12: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw13: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
    zestaw14: {
        co: number[],
        o3: number[],
        no2: number[],
        so2: number[],
        pm2_5: number[],
        pm10: number[]
    },
}

interface MeteoSensorsData {
    weatherSP2: {
        barometer: [],
        tempOutside: [],
        windCurrentSpeed: [],
    },
    weatherSP8: {
        barometer: [],
        tempOutside: [],
        windCurrentSpeed: [],
    }
}

interface ReferenceSensorsData {
    CO: [],
    NO2: [],
    O3: [],
    PM10: [],
    'PM2.5': [],
    SO2: []
}

type SensorsData = [ SensorsData, ReferenceSensorsData, MeteoSensorsData ];
export default SensorsData;
