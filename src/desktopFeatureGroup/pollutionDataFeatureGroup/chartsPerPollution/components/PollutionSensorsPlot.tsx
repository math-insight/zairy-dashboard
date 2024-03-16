import SensorForPerPollutionPlot from "../consts/SensorForPerPollutionPlot.ts";
import { Layout, PlotData } from "plotly.js";
import Plot from "react-plotly.js";
import splitMeasurementArrayIntoArrays from "../../../../shared/service/splitMeasurementArrayIntoArrays.ts";

interface PollutionSensorsPlot {
    sensors: SensorForPerPollutionPlot[];
}

export default function PollutionSensorsPlot( { sensors }: PollutionSensorsPlot ) {
    const layout: Partial<Layout> = {
        autosize: true,
        xaxis: {
            title: "Data pomiaru",
            tickformat: "%d.%m | %H:%M"
        },
        yaxis: {
            title: "Wartość pomiaru",
        },
        showlegend: false
    }

    const plotData: PlotData[] = sensors.map( ( { title, color, data } ) => {
        const [ datetimeArray, valueArray ] = splitMeasurementArrayIntoArrays( data );

        return {
            x: datetimeArray,
            y: valueArray,
            name: title,
            line: {
                color,
                width: 2,
                dash: 'solid'
            },
            hovertemplate: `${ title }<br>Data: %{x} Wartość: %{y}<extra></extra>`
        } as PlotData;
    } )

    return (
        <Plot data={ plotData } layout={ layout } useResizeHandler={ true } style={ { width: "70vw" } }/>
    )
}
