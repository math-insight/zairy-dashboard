type ValidAirPollutionSensors =
    'reference'
    | 'be7a0000000029f7'
    | 'be7a0000000029fc'
    | 'be7a0000000029fd'
    | 'be7a0000000029fe'
    | 'be7a0000000029f2'
    | 'be7a0000000029f9'
    | 'be7a0000000029fa'
    | 'be7a0000000029fb'
    | 'be7a0000000029f5'
    | 'be7a0000000029f6'
    | 'be7a0000000029f1'
    | 'be7a0000000029f8'
    | 'be7a0000000029f3'
    | 'be7a0000000029f4';

export type AirQualityIndices = 'CO' | 'NO2' | 'O3' | 'PM10' | 'PM2.5' | 'SO2';

export interface AirPollutionData {
    datetime: string;
    id: ValidAirPollutionSensors;
    measurement: AirQualityIndices;
    status: number;
    value: number;
}


