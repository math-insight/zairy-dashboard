import "./AQIChart.css"
import Plot from 'react-plotly.js';
import { AirPollutionData, AirQualityIndices } from "../../types/SensorsData.ts";
import { useEffect, useState } from "react";

type AQIChartProps = {
    data: AirPollutionData[];
};

type ProcessedAirPollutionData = {
    datetimes: string[];
    valuesByMeasurement: {
        [key in AirQualityIndices]: number[];
    };
};

export function AQIChart( { data }: AQIChartProps ) {
    function prepareChartData( data: AirPollutionData[] ): ProcessedAirPollutionData {
        const datetimes: string[] = [];
        const valuesByMeasurement: { [key in AirQualityIndices]: number[] } = {
            'CO': [],
            'NO2': [],
            'O3': [],
            'PM10': [],
            'PM25': [],
            'SO2': []
        };

        data.forEach( item => {
            if( !datetimes.includes( item.datetime ) ) datetimes.push( item.datetime );

            if( item.measurement in valuesByMeasurement ) {
                valuesByMeasurement[item.measurement].push( item.value );
            }
        } );

        return { datetimes, valuesByMeasurement };
    }

    const [ plottingData, setPlottingData ] = useState<ProcessedAirPollutionData>( {
        datetimes: [],
        valuesByMeasurement: {
            'CO': [],
            'NO2': [],
            'O3': [],
            'PM10': [],
            'PM25': [],
            'SO2': []
        }
    } )
    useEffect( () => {
        const result = prepareChartData( data );
        console.log( result )
        setPlottingData( result )
    }, [ data ] );

    return (
        <Plot
            data={ [
                {
                    x: plottingData.datetimes,
                    y: plottingData.valuesByMeasurement.CO,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'CO'
                },
                {
                    x: plottingData.datetimes,
                    y: plottingData.valuesByMeasurement.NO2,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'NO2'
                },
                {
                    x: plottingData.datetimes,
                    y: plottingData.valuesByMeasurement.SO2,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'SO2'
                },
                {
                    x: plottingData.datetimes,
                    y: plottingData.valuesByMeasurement.O3,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'O3'
                },
                {
                    x: plottingData.datetimes,
                    y: plottingData.valuesByMeasurement.PM10,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'PM10',
                },
                {
                    x: plottingData.datetimes,
                    y: plottingData.valuesByMeasurement.PM25,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'PM2.5'
                }
            ] }
            layout={ {
                title: 'Wykres jakości powietrza',
                xaxis: { title: 'Data pomiaru' },
                yaxis: { title: 'Wartość pomiaru' },
                width: 1000,
                height: 600
            } }
        />
    );
}
