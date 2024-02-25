import "../chartsPerSensor/assets/chartsPerSensor.css";
import ISensor from "../consts/ISensor.ts";
import { useEffect, useState } from "react";
import SensorSelectOption from "../../shared/types/SensorSelectOption.ts";
import Select from "../components/Select.tsx";
import SensorPollutionsPlot from "../chartsPerSensor/components/SensorPollutionsPlot.tsx";
import SelectedPollutions from "../consts/SelectedPollutions.ts";

interface ChartsPerSensorProps {
    sensors: ISensor[];
}

export default function ChartsPerSensor( { sensors }: ChartsPerSensorProps ) {
    const plotKey = Date.now();
    const selectOptions = sensors.map( ( { title, address, id } ) => {
        return {
            label: title + " - " + address,
            value: id
        }
    } );

    const [ selectedSensor, setSelectedSensor ] = useState<SensorSelectOption>( selectOptions[0] );
    const [ sensorDetails, setSensorDetails ] = useState<ISensor>();
    const [ selectedPollutionPlotLines, setSelectedPollutionPlotLines ] = useState<SelectedPollutions>( {
        NO2: true,
        SO2: true,
        CO: false,
        O3: true,
        PM10: true,
        PM25: true
    } )

    const handleSelectionChange = ( value: string ) => {
        const pickedOption = selectOptions.filter( option => option.value === value );
        setSelectedSensor( pickedOption[0] );
    };

    useEffect( () => {
        const selectedSensorDetails = sensors.find( ( { id } ) => id === selectedSensor.value );
        if( selectedSensorDetails ) setSensorDetails( selectedSensorDetails );
    }, [ selectedSensor ] );


    return (
        <>
            <div className="charts-per-sensor-wrapper">
                <h2>{ "WYKRES ZANIECZYSZCZEŃ DLA WYBRANEGO CZUJNIKA" }</h2>
                <div className="chart-panel">
                    <span>{ "Dane z 3.10.2024 | 17:55" }</span>
                    <div className="sensor-select">
                        <h3>{ "Wybierz czujnik,\nktórego dane chcesz odczytać" }</h3>
                        <Select options={ selectOptions } selectedOption={ selectedSensor }
                                onChange={ handleSelectionChange }/>
                    </div>
                    { sensorDetails && <SensorPollutionsPlot key={ plotKey } data={ sensorDetails?.data }/> }
                    <div className="plot-legend">
                        <h4>{ "ZANIECZYSZCZENIA\nNA WYKRESIE" }</h4>
                        <div className="button-row">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
