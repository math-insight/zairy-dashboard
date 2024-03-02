import SensorForPerPollutionPlot from "../consts/SensorForPerPollutionPlot.ts";
import splitMeasurementArrayIntoArrays from "../../service/splitMeasurementArrayIntoArrays.ts";
import { Layout, PlotData } from "plotly.js";
import Plot from "react-plotly.js";

interface PollutionSensorsPlot {
    sensors: SensorForPerPollutionPlot[];
}

export default function PollutionSensorsPlot( { sensors }: PollutionSensorsPlot ) {
    const layout: Partial<Layout> = {
        autosize: true,
        xaxis: {
            title: "Data pomiaru",
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
            hovertemplate: `${ title } | %{y}<extra></extra>`
        } as PlotData;
    } )

    return (
        <Plot data={ plotData } layout={ layout } useResizeHandler={ true } style={ { width: "70vw" } }/>
    )
}
