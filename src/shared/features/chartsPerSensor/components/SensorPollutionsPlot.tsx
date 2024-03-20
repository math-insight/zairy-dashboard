import { Layout, PlotData } from "plotly.js";
import Plot from "react-plotly.js";
import { pollutants } from "../../../consts/pollutants.ts";
import { PollutantsMeasurements } from "../../../types/ISensor.ts";
import splitMeasurementArrayIntoArrays from "../../../service/splitMeasurementArrayIntoArrays.ts";

interface SensorPollutionsPlotProps {
    isMobile: boolean;
    visibleLines: string[];
    data: PollutantsMeasurements;
}

export default function SensorPollutionsPlot( { data, visibleLines, isMobile }: SensorPollutionsPlotProps ) {
    let longestDatetimeArrayLength = 0;
    let longestDatetimeArray: string[] = [];

    const dataEntries = Object.entries( data );
    const plotData = pollutants.map( pollutant => {
        if( !visibleLines.includes( pollutant.value ) ) return;

        const measurementsEntries = dataEntries.find( ( [ key ] ) => key === pollutant.value );

        if( measurementsEntries ) {
            const [ datetimeArray, valueArray ] = splitMeasurementArrayIntoArrays( measurementsEntries[1] );

            if( datetimeArray.length > longestDatetimeArrayLength ) {
                longestDatetimeArrayLength = datetimeArray.length;
                longestDatetimeArray = datetimeArray;
            }

            return {
                x: datetimeArray,
                y: valueArray,
                mode: 'lines',
                name: pollutant.longLabel,
                line: {
                    color: pollutant.color,
                    width: 2,
                    dash: 'solid'
                },
                hovertemplate: `${ pollutant.longLabel }<br>Data: %{x} Wartość: %{y} <extra></extra>`,
                connectgaps: false
            } as PlotData
        }
    } ).filter( plot => plot !== undefined ) as PlotData[]

    const layout: Partial<Layout> = {
        autosize: true,
        xaxis: {
            title: "Data pomiaru",
            tickformat: "%d.%m | %H:%M",
            range: [ longestDatetimeArray[Math.floor( longestDatetimeArrayLength / 2 )], longestDatetimeArray[longestDatetimeArrayLength - 1] ]
        },
        yaxis: {
            title: "Wartość pomiaru"
        },
        hovermode: "closest",
        showlegend: false
    }

    return (
        <Plot data={ plotData } layout={ layout } useResizeHandler={ true }
              style={ { width: isMobile ? "120vw" : "100vw", height: "70vh", marginLeft: isMobile ? "-8vw" : 0 } }/>
    );
}
