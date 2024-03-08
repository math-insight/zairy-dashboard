import { PollutantsMeasurements } from "../../consts/ISensor.ts";
import { pollutants } from "../../../shared/consts/pollutants.ts";
import { Layout, PlotData } from "plotly.js";
import Plot from "react-plotly.js";
import splitMeasurementArrayIntoArrays from "../../service/splitMeasurementArrayIntoArrays.ts";

interface SensorPollutionsPlotProps {
    visibleLines: string[];
    data: PollutantsMeasurements;
}

export default function SensorPollutionsPlot( { data, visibleLines }: SensorPollutionsPlotProps ) {
    const dataEntries = Object.entries( data );
    const plotData = pollutants.map( pollutant => {
        if( !visibleLines.includes( pollutant.value ) ) return;

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
                hovertemplate: `${ pollutant.longLabel }<br>Data: %{x} Wartość: %{y} <extra></extra>`,
                connectgaps: false
            } as PlotData
        }
    } ).filter( plot => plot !== undefined ) as PlotData[]

    const layout: Partial<Layout> = {
        autosize: true,
        xaxis: {
            title: "Data pomiaru",
            tickformat: "%d.%m | %H:%M"
        },
        yaxis: {
            title: "Wartość pomiaru"
        },
        hovermode: "closest",
        showlegend: false
    }

    return (
        <Plot data={ plotData } layout={ layout } useResizeHandler={ true }
              style={ { width: "100%", height: "70vh" } }/>
    );
}
