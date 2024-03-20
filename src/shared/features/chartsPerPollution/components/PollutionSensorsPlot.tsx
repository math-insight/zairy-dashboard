import { Layout, PlotData } from "plotly.js";
import Plot from "react-plotly.js";
import splitMeasurementArrayIntoArrays from "../../../service/splitMeasurementArrayIntoArrays.ts";
import ISensorForPerPollutionPlot from "../../../types/ISensorForPerPollutionPlot.ts";
import { PALE_BLUE } from "../../../consts/colors.ts";

interface PollutionSensorsPlot {
    sensors: ISensorForPerPollutionPlot[];
}

export default function PollutionSensorsPlot( { sensors }: PollutionSensorsPlot ) {
    let longestDatetimeArrayLength = 0;
    let longestDatetimeArray: string[] = [];

    const plotData: PlotData[] = sensors.map( ( { title, color, data } ) => {
        const [ datetimeArray, valueArray ] = splitMeasurementArrayIntoArrays( data );

        if( datetimeArray.length > longestDatetimeArrayLength ) {
            longestDatetimeArrayLength = datetimeArray.length;
            longestDatetimeArray = datetimeArray;
        }

        return {
            x: datetimeArray,
            y: valueArray,
            name: title,
            line: {
                color,
                width: color !== PALE_BLUE ? 3 : 2,
                dash: 'solid'
            },
            hovertemplate: `${ title }<br>Data: %{x} Wartość: %{y}<extra></extra>`
        } as PlotData;
    } )

    const layout: Partial<Layout> = {
        autosize: true,
        xaxis: {
            title: "Data pomiaru",
            tickformat: "%d.%m | %H:%M",
            range: [ longestDatetimeArray[Math.floor( longestDatetimeArrayLength / 2 )], longestDatetimeArray[longestDatetimeArrayLength - 1] ]
        },
        yaxis: {
            title: "Wartość pomiaru",
        },
        showlegend: false
    }

    return (
        <Plot data={ plotData } layout={ layout } useResizeHandler={ true }
              style={ { width: "117vw", marginLeft: "-5vw" } }/>
    )
}
