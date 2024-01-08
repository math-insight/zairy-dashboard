import "./styles.css"
import "./chartButtons.css"
import Plot from "react-plotly.js";
import { datetimeArray, numberArray } from "./datetime_number_arrays.ts";
import { MouseEvent, useEffect, useRef, useState } from "react";

export function ChartView() {
    const [ chartWidth, setChartWidth ] = useState( window.innerWidth )

    const containerRef = useRef( null );

    useEffect( () => {
        const handleResize = () => {
            if( containerRef.current ) {
                setChartWidth( containerRef.current.offsetWidth * 0.75 );
            }
        };

        window.addEventListener( 'resize', handleResize );

        handleResize();

        return () => {
            window.removeEventListener( 'resize', handleResize );
        };
    }, [] );

    const [ SO2Active, setSO2Active ] = useState<boolean>( false )
    const [ NO2Active, setNO2Active ] = useState<boolean>( false )
    const [ COActive, setCOActive ] = useState<boolean>( false )
    const [ O3Active, setO3Active ] = useState<boolean>( false )
    const [ PM10Active, setPM10Active ] = useState<boolean>( false )
    const [ PM25Active, setPM25Active ] = useState<boolean>( false )

    const handleClick = ( event: MouseEvent<HTMLButtonElement> ) => {
        switch ( event.currentTarget.id ) {
            case "chart-SO2":
                setSO2Active( true );
                setNO2Active( false );
                setCOActive( false );
                setO3Active( false );
                setPM10Active( false );
                setPM25Active( false );
                break;
            case "chart-NO2":
                setSO2Active( false );
                setNO2Active( true );
                setCOActive( false );
                setO3Active( false );
                setPM10Active( false );
                setPM25Active( false );
                break;
            case "chart-CO":
                setSO2Active( false );
                setNO2Active( false );
                setCOActive( true );
                setO3Active( false );
                setPM10Active( false );
                setPM25Active( false );
                break;
            case "chart-O3":
                setSO2Active( false );
                setNO2Active( false );
                setCOActive( false );
                setO3Active( true );
                setPM10Active( false );
                setPM25Active( false );
                break;
            case "chart-PM10":
                setSO2Active( false );
                setNO2Active( false );
                setCOActive( false );
                setO3Active( false );
                setPM10Active( true );
                setPM25Active( false );
                break;
            case "chart-PM25":
                setSO2Active( false );
                setNO2Active( false );
                setCOActive( false );
                setO3Active( false );
                setPM10Active( false );
                setPM25Active( true );
                break;
            default:
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
                        name: `Series ${ index + 1 }`
                    }) ) }
                    layout={ {
                        width: chartWidth,
                        xaxis: { title: "Data pomiaru", tickformat: '%d-%m-%Y\n%H:%M' },
                        yaxis: { title: "Wartość pomiaru" },
                        showlegend: false
                    } }
                />
                <div className="chart-buttons-grid">
                    <button id="chart-SO2" className={ `badge ${ SO2Active ? "on" : "off" }` }
                            onClick={ handleClick }>SO<sub>2</sub>
                    </button>

                    <button id="chart-NO2" className={ `badge ${ NO2Active ? "on" : "off" }` }
                            onClick={ handleClick }>NO<sub>2</sub>
                    </button>

                    <button id="chart-CO" className={ `badge ${ COActive ? "on" : "off" }` }
                            onClick={ handleClick }>CO
                    </button>

                    <button id="chart-O3" className={ `badge ${ O3Active ? "on" : "off" }` }
                            onClick={ handleClick }>O<sub>3</sub>
                    </button>

                    <button id="chart-PM10" className={ `badge ${ PM10Active ? "on" : "off" }` }
                            onClick={ handleClick }>PM10
                    </button>

                    <button id="chart-PM25" className={ `badge ${ PM25Active ? "on" : "off" }` }
                            onClick={ handleClick }>PM<span>2,5</span></button>
                </div>
            </div>
        </div>
    )
}
