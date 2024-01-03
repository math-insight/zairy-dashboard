import "./Charts.css";
import { useEffect, useRef, useState } from "react";
import LoadingScreen from "../loadingScreen/LoadingScreen.tsx";
import { AirPollutionData } from "../types/SensorsData.ts";
import { AQIChart } from "./AQIChart/AQIChart.tsx";
import DisplayChartsInfo from "../types/DisplayChartsInfo.ts";

interface ChartsProps {
    displayChartsInfo: DisplayChartsInfo;
}

export default function Charts( { displayChartsInfo }: ChartsProps ) {
    const lineChartsContainer = useRef<HTMLDivElement>( null )

    const [ loadingScreen, setLoadingScreen ] = useState<boolean>( false );
    const [ chartData, setChartData ] = useState<AirPollutionData[]>( [] );


    useEffect( () => {
        if( displayChartsInfo.toggleView ) {
            setLoadingScreen( true );

            const apiUrl = `http://localhost:5000/api/sensors/air-pollution?sensorId=${ displayChartsInfo.sensorId }`;

            fetch( apiUrl )
                .then( response => response.json() )
                .then( data => {
                    setChartData( data as AirPollutionData[] );
                    setLoadingScreen( false );
                } )
                .catch( error => {
                    console.error( "Failed to fetch data:", error );
                    setLoadingScreen( false );
                } );
        }
    }, [ displayChartsInfo ] );

    useEffect( () => {
        if( lineChartsContainer.current ) {
            window.scrollTo( {
                top: lineChartsContainer.current.offsetTop + lineChartsContainer.current.scrollHeight,
                behavior: 'smooth',
            } );
        }
    }, [] );

    return (
        <div className="charts">
            { loadingScreen ? <LoadingScreen/> : (
                <div ref={ lineChartsContainer }>
                    <AQIChart key={ 'acc-chart' } data={ chartData }/>
                </div>
            ) }
        </div>
    );
}
