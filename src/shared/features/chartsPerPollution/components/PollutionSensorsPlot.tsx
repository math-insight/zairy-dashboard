import { Layout, PlotData } from "plotly.js";
import Plot from "react-plotly.js";
import splitMeasurementArrayIntoArrays from "../../../service/splitMeasurementArrayIntoArrays.ts";
import ISensorForPerPollutionPlot from "../../../types/ISensorForPerPollutionPlot.ts";
import { PALE_BLUE } from "../../../consts/colors.ts";
import { useEffect, useState } from "react";

interface PollutionSensorsPlot {
    sensors: ISensorForPerPollutionPlot[];
}

export default function PollutionSensorsPlot( { sensors }: PollutionSensorsPlot ) {
    const [ windowWidth, setWindowWidth ] = useState( window.innerWidth );

    useEffect( () => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width to state
            setWindowWidth( window.innerWidth );
        }

        // Add event listener
        window.addEventListener( 'resize', handleResize );

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener( 'resize', handleResize );
    }, [] ); // Empty array ensures that effect runs only on mount and unmount

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
              style={ {
                  width: windowWidth < 475 ? "120vw"
                      : windowWidth >= 1024 ? "70vw"
                          : "100vw",
                  marginLeft: windowWidth < 475 ? "-8vw"
                      : windowWidth >= 1024 ? 0
                          : "-2vw"
              } }/>
    )
}
