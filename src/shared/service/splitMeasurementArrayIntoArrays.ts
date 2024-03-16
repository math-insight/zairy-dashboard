import { Measurement } from "../consts/ISensor.ts";

const splitMeasurementArrayIntoArrays = ( data: Measurement[] ): [ string[], number[] ] => {
    const datetimeArray: string[] = [];
    const valueArray: number[] = [];

    data.forEach( ( { datetime, value } ) => {
        datetimeArray.push( datetime );
        valueArray.push( value );
    } )

    return [ datetimeArray, valueArray ];
}

export default splitMeasurementArrayIntoArrays;
