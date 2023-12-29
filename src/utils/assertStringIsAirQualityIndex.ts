import { AirQualityIndices } from "../types/SensorsData.ts";

export default function assertAirQualityIndices( value: string ): asserts value is AirQualityIndices {
    const validIndices: AirQualityIndices[] = [ 'CO', 'NO2', 'O3', 'PM10', 'PM25', 'SO2' ];
    if( !validIndices.includes( value as AirQualityIndices ) ) {
        throw new Error( `Invalid Air Quality Index: ${ value }` );
    }
}
