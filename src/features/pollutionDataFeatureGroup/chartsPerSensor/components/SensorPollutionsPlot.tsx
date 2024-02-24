import { Measurement, PollutantsMeasurements } from "../../consts/ISensor.ts";
import { pollutants } from "../../../shared/consts/pollutants.ts";
import { PlotData } from "plotly.js";
import Plot from "react-plotly.js";

interface SensorPollutionsPlotProps {
    data: PollutantsMeasurements;
}

const splitMeasurementArrayIntoArrays = ( data: Measurement[] ): [ string[], number[] ] => {
    const datetimeArray: string[] = [];
    const valueArray: number[] = [];

    data.forEach( ( { datetime, value } ) => {
        datetimeArray.push( datetime );
        valueArray.push( value );
    } )

    return [ datetimeArray, valueArray ];
}

export default function SensorPollutionsPlot( { data }: SensorPollutionsPlotProps ) {
    const dataEntries = Object.entries( data );
    const plotData = pollutants.map( pollutant => {
        const measurementsEntries = dataEntries.find( ( [ key ] ) => key === pollutant.value );

        if( measurementsEntries ) {
            const [ datetimeArray, valueArray ] = splitMeasurementArrayIntoArrays( measurementsEntries[1] );

            return {
                x: datetimeArray,
                y: valueArray,
                mode: 'lines',
                name: pollutant.longLabel,
                line: {
                    color: pollutant.color,
                    width: 3,
                    dash: 'solid'
                },
                hovertemplate: `${ pollutant.longLabel } | %{x}<extra></extra>`
            } as PlotData
        }
    } ) as PlotData[]

    return (
        <Plot data={ plotData } layout={ {
            autosize: true,
            xaxis: {
                title: "Data pomiaru"
            },
            yaxis: {
                title: "Wartość pomiaru"
            },
            hovermode: "closest",
        } } useResizeHandler={ true } style={ { width: "100%", height: "70vh" } }/>
    );
}
