import { Layout, PlotData } from "plotly.js";
import Plot from "react-plotly.js";
import { pollutants } from "../../../consts/pollutants.ts";
import { PollutantsMeasurements } from "../../../types/ISensor.ts";
import splitMeasurementArrayIntoArrays from "../../../service/splitMeasurementArrayIntoArrays.ts";
import { useEffect, useState } from "react";
import { IPollutantWithStatus } from "../../../types/IPollutant.ts";

interface SensorPollutionsPlotProps {
    isMobile: boolean;
    visibleLines: string[];
    data: PollutantsMeasurements;
}

export default function SensorPollutionsPlot( { data, visibleLines }: SensorPollutionsPlotProps ) {
    const [ windowWidth, setWindowWidth ] = useState( window.innerWidth );


    useEffect( () => {
        function handleResize() {
            setWindowWidth( window.innerWidth );
        }

        window.addEventListener( 'resize', handleResize );

        handleResize();

        return () => window.removeEventListener( 'resize', handleResize );
    }, [] );

    let longestDatetimeArrayLength = 0;
    let longestDatetimeArrayNew: string[] = [];

    const pollutants_new = pollutants.reduce<IPollutantWithStatus[]>((acc, pollutant) => {
        acc.push(
            { ...pollutant, status: 'real'},
            { ...pollutant, status: 'predict'}
        )
        return acc;
    }, []);

    Object.keys(data).forEach(key => {
        data[key] = data[key].map(entry => {
            if (entry.status !== 'predict'){
                return {...entry, status: 'real'};
            }
            return entry;
        });
    });

    const dataEntries = Object.entries( data );
    const plotData = pollutants_new.map( pollutant => {
        if( !visibleLines.includes( pollutant.value ) ) return;

        const measurementsEntries = dataEntries.find( ( [ key ] ) => key === pollutant.value );

        if( measurementsEntries ) {
            const measurementsEntries_new = measurementsEntries[1].filter(entry => entry.status === pollutant.status);
            const [ datetimeArray, valueArray ] = splitMeasurementArrayIntoArrays( measurementsEntries_new );

            if( datetimeArray.length > longestDatetimeArrayLength ) {
                longestDatetimeArrayLength = datetimeArray.length;
                longestDatetimeArrayNew = datetimeArray;
            }

            longestDatetimeArrayNew = Array.from(new Set(longestDatetimeArrayNew.concat(datetimeArray)));

            const dash_type = pollutant.status === 'real'? 'solid' : 'dot';
            const label_info = pollutant.status === 'real'? '' : ' - prognoza';

            return {
                x: datetimeArray,
                y: valueArray,
                mode: 'lines',
                name: pollutant.longLabel,
                line: {
                    color: pollutant.color,
                    width: 2,
                    dash: dash_type
                },
                hovertemplate: `${ pollutant.longLabel }${ label_info }<br>Data: %{x} Wartość: %{y} <extra></extra>`,
                connectgaps: false
            } as PlotData
        }
    } ).filter( plot => plot !== undefined ) as PlotData[]




    longestDatetimeArrayNew.sort();

    const layout: Partial<Layout> = {
        autosize: true,
        xaxis: {
            title: "Data pomiaru",
            tickformat: "%d.%m | %H:%M",
            range: [ longestDatetimeArrayNew[0], longestDatetimeArrayNew[Math.floor(0.6 * longestDatetimeArrayNew.length)] ]
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
                  width: windowWidth < 475 ? "110vw"
                      : windowWidth >= 1024 ? "80vw"
                          : "100vw",
                  marginLeft: windowWidth < 475 ? "-7vw"
                      : windowWidth >= 1024 ? "-3vw"
                          : "-2vw",
                  height: "70vh",
              } }/>
    );
}
