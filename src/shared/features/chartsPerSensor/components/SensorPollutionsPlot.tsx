import { Layout, PlotData } from "plotly.js";
import Plot from "react-plotly.js";
import { pollutants } from "../../../consts/pollutants.ts";
import { PollutantsMeasurements } from "../../../types/ISensor.ts";
import splitMeasurementArrayIntoArrays from "../../../service/splitMeasurementArrayIntoArrays.ts";
import { useEffect, useState } from "react";

interface SensorPollutionsPlotProps {
    isMobile: boolean;
    visibleLines: string[];
    data: PollutantsMeasurements;
}

export default function SensorPollutionsPlot( { data, visibleLines }: SensorPollutionsPlotProps ) {
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
              style={ {
                  width: windowWidth < 475 ? "120vw"
                      : windowWidth >= 1024 ? "80vw"
                          : "100vw",
                  marginLeft: windowWidth < 475 ? "-8vw"
                      : windowWidth >= 1024 ? "-3vw"
                          : "-2vw",
                  height: "70vh",
              } }/>
    );
}
