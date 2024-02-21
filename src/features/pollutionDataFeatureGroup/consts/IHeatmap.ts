import { PollutantsShortNames } from "./PollutantsShortNames.ts";

export default interface IHeatmap {
    datetime: string;
    pollutant: PollutantsShortNames;
    polygonSimData: SimulationPolygon[];
}

export interface SimulationPolygon {
    color: string;
    coordinates: [ [ number, number ], [ number, number ], [ number, number ], [ number, number ] ]
}
