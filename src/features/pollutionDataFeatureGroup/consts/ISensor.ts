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
    [key: string]: Measurement[];
}

export interface Measurement {
    datetime: string;
    value: number;
    color: string;
}

export type SensorTypes = "reference" | "meteo" | "regular";
