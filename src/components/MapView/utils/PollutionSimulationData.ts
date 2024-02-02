export interface SimulationData {
    datetime: string;
    pollutant: string;
    polygonSimData: PolygonData[];
}

export interface PolygonData {
    color: string;
    coordinates: [ number, number ][]
}
