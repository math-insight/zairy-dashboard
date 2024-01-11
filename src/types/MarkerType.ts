export type PollutionSensorMarker = {
    geocode: [ number, number ];
    street: string;
    title: string;
    deviceTag: string;
    pollutions: { id: string, label: string, value: number }[];
}

export interface MeteoSensorMarker {
    geocode: [ number, number ];
    street: string;
    title: string;
    deviceTag: string;
    measurements: { id: string, label: string, value: number }[]
}
