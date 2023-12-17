type GeoJsonSquare = {
    type: 'Polygon' | 'Feature' | 'FeatureCollection',
    geometry: {
        type: string,
        coordinates: number[][]
    },
    properties: {
        value: number,
        style: {
            weight: number,
            color: string,
            fillColor: string,
            fillOpacity: number,
        }
    }
}

type GeoJsonSquaresCollection = {
    type: 'FeatureCollection',
    features: GeoJsonSquare[],
}

export type { GeoJsonSquare, GeoJsonSquaresCollection };
