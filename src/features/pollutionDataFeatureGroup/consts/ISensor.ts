export default interface ISensor {
    id: string;
    type: SensorTypes;
    longitude: number;
    latitude: number;
    title: string;
    address: string;
    data: PollutantsMeasurements;
}

export interface PollutantsMeasurements {
    CO: Measurement[];
    SO2: Measurement[];
    NO2: Measurement[];
    O3: Measurement[];
    PM10: Measurement[];
    PM25: Measurement[];
}

export interface Measurement {
    datetime: string;
    value: number;
    color: string;
}

export type SensorTypes = "reference" | "meteo" | "regular";
