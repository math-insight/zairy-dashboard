import "./styles.css"
import "./chartButtons.css"
import Plot from "react-plotly.js";
import { datetimeArray, numberArray } from "./datetime_number_arrays.ts";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { pollutants } from "../../utils/pollutants.ts";

interface DisplayedChartLines {
    SO2: boolean;
    NO2: boolean;
    O3: boolean;
    CO: boolean;
    PM10: boolean;
    PM25: boolean;
}

interface ChartViewProps {
    isMobile: boolean
}

export function ChartView( { isMobile }: ChartViewProps ) {
    const containerRef = useRef<HTMLDivElement>( null );

    const [ chartWidth, setChartWidth ] = useState( window.innerWidth )
    const [ displayedChartLines, setDisplayedChartLines ] = useState<DisplayedChartLines>( {
        SO2: true,
        NO2: true,
        O3: false,
        CO: false,
        PM10: false,
        PM25: true,
    } )

    useEffect( () => {
        const multiplier = isMobile ? 1.18 : 0.75;
        const handleResize = () => {
            if( containerRef.current ) {
                setChartWidth( containerRef.current.offsetWidth * multiplier );
            }
        };

        window.addEventListener( 'resize', handleResize );

        handleResize();

        return () => {
            window.removeEventListener( 'resize', handleResize );
        };
    }, [] );

    const handleClick = ( event: MouseEvent<HTMLButtonElement> ) => {
        switch ( event.currentTarget.id ) {
            case "chart-SO2":
                setDisplayedChartLines( prevState => ({ ...prevState, SO2: !prevState["SO2"] }) );
                break;
            case "chart-NO2":
                setDisplayedChartLines( prevState => ({ ...prevState, NO2: !prevState.NO2 }) );
                break;
            case "chart-CO":
                setDisplayedChartLines( prevState => ({ ...prevState, CO: !prevState.CO }) );
                break;
            case "chart-O3":
                setDisplayedChartLines( prevState => ({ ...prevState, O3: !prevState.O3 }) );
                break;
            case "chart-PM10":
                setDisplayedChartLines( prevState => ({ ...prevState, PM10: !prevState.PM10 }) );
                break;
            case "chart-PM25":
                setDisplayedChartLines( prevState => ({ ...prevState, PM25: !prevState.PM25 }) );
                break;
        }
    };

    return (
        <div className="chart-view">
            <h2> { "Wykres jakości powietrza" } </h2>
            <div ref={ containerRef } className="chart-wrapper">
                <Plot
                    data={ numberArray.map( ( numbers, index ) => ({
                        x: datetimeArray,
                        y: numbers,
                        type: 'scatter',
                        mode: 'lines',
                        name: pollutants[index].label,
                        //visible: displayedChartLines[pollutants[index].id]
                    }) ) }
                    layout={ {
                        width: chartWidth,
                        xaxis: { title: "Data pomiaru", tickformat: '%d-%m-%Y\n%H:%M' },
                        yaxis: { title: "Wartość pomiaru" },
                        showlegend: false
                    } }
                />
                <div className="chart-buttons-grid">
                    <button id="chart-SO2" className={ `badge ${ displayedChartLines.SO2 ? "on" : "off" }` }
                            onClick={ handleClick }>SO<sub>2</sub>
                    </button>

                    <button id="chart-NO2" className={ `badge ${ displayedChartLines.NO2 ? "on" : "off" }` }
                            onClick={ handleClick }>NO<sub>2</sub>
                    </button>

                    <button id="chart-CO" className={ `badge ${ displayedChartLines.CO ? "on" : "off" }` }
                            onClick={ handleClick }>CO
                    </button>

                    <button id="chart-O3" className={ `badge ${ displayedChartLines.O3 ? "on" : "off" }` }
                            onClick={ handleClick }>O<sub>3</sub>
                    </button>

                    <button id="chart-PM10" className={ `badge ${ displayedChartLines.PM10 ? "on" : "off" }` }
                            onClick={ handleClick }>PM10
                    </button>

                    <button id="chart-PM25" className={ `badge ${ displayedChartLines.PM25 ? "on" : "off" }` }
                            onClick={ handleClick }>PM2,5
                    </button>
                </div>
            </div>
        </div>
    )
}
