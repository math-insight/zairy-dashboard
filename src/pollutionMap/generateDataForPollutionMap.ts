import MeasuredPollutionsNames from "../types/MeasuredPollutionsNames.ts";
import SimulationPoint from "../types/SimulationPoint.ts";
import ApiSimulationResponse from "../types/ApiSimulationResponse.ts";
import { GeoJsonSquare } from "../types/GeoJsonSquare.ts";
import getColorForValue from "./getColorForValue.ts";
import PollutionValueColorIndex from "./pollutionValueColorIndex.ts";
import ColorThresholds from "../types/ColorThresholds.ts";

export default async function generateDataForPollutionMap( parameter: MeasuredPollutionsNames ) {
    const { x, y } = { x: 30, y: 30 }

    const response = await fetch( 'http://localhost:5000/api/simulation' );
    const dataArray: ApiSimulationResponse[] = await response.json();

    const simulationData: SimulationPoint[] = dataArray.map( ( simulationPoint: ApiSimulationResponse ) =>
        convertResponseToSimulationPoints( simulationPoint )
    );

    return createGeoJsonSquares( simulationData, parameter, x, y )
}

function createGeoJsonSquares( TP: SimulationPoint[], parameter: MeasuredPollutionsNames, Dx: number, Dy: number ): GeoJsonSquare[] {
    const thirtyMetersInDegrees = 333360;
    const colorThreshold: ColorThresholds[] = findProperThreshold( parameter );

    return TP.map( ( point ) => {
        const offsetLat = Dy / thirtyMetersInDegrees;
        const offsetLon = Dx / (333960 * Math.cos( point.lat * Math.PI / 180 ));

        const squareApexes = {
            topLeft: [ point.lon - offsetLon / 2, point.lat + offsetLat / 2 ],
            topRight: [ point.lon + offsetLon / 2, point.lat + offsetLat / 2 ],
            bottomRight: [ point.lon + offsetLon / 2, point.lat - offsetLat / 2 ],
            bottomLeft: [ point.lon - offsetLon / 2, point.lat - offsetLat / 2 ],
        }

        return {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [ [ squareApexes.topLeft, squareApexes.topRight, squareApexes.bottomRight, squareApexes.bottomLeft, squareApexes.topLeft ] ]
            },
            "properties": {
                "value": point[parameter],
                "style": createGeoJsonStyles( point[parameter], colorThreshold )
            }
        };
    } );
}

function createGeoJsonStyles( value: number, colorThresholds: ColorThresholds[] ) {
    const color = getColorForValue( value, colorThresholds );
    return {
        "weight": 0,
        "color": color,
        "fillColor": color,
        "fillOpacity": 0.6,
    }
}

function findProperThreshold( parameter: MeasuredPollutionsNames ): ColorThresholds[] {
    const paramValueColorIndex = PollutionValueColorIndex.find( ( { name } ) => name === parameter )

    if( !paramValueColorIndex ) throw new Error( 'Unknown parameter name' );
    return paramValueColorIndex.colorThresholds;
}

function convertResponseToSimulationPoints( data: ApiSimulationResponse ): SimulationPoint {
    return {
        datetime: new Date( data.datetime ),
        lon: parseFloat( data.lon ),
        lat: parseFloat( data.lat ),
        CO: parseFloat( data.CO ),
        NO2: parseFloat( data.NO2 ),
        O3: parseFloat( data.O3 ),
        PM10: parseFloat( data.PM10 ),
        PM25: parseFloat( data.PM25 ),
        SO2: parseFloat( data.SO2 )
    }
}
