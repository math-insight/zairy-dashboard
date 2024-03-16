import { PollutantsShortNames } from "./PollutantsShortNames.ts";

export default interface IHeatmap {
    pollutant: PollutantsShortNames;
    polygonSimData: SimulationPolygon[];
}

export interface SimulationPolygon {
    color: string;
    coordinates: [ [ number, number ], [ number, number ], [ number, number ], [ number, number ] ]
}
