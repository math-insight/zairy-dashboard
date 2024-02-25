import "./assets/chartsPerSensor.css";
import ISensor from "../consts/ISensor.ts";
import { useEffect, useState } from "react";
import SensorSelectOption from "../../shared/types/SensorSelectOption.ts";
import Select from "../components/Select.tsx";
import SensorPollutionsPlot from "./components/SensorPollutionsPlot.tsx";
import GaugesPerSensor from "./components/GaugesPerSensor.tsx";
import pollutionButtons, { IPollutionButton } from "../consts/pollutionButtons.ts";
import Button from "../components/Button.tsx";

interface ChartsPerSensorProps {
    sensors: ISensor[];
}

export default function ChartsPerSensor( { sensors }: ChartsPerSensorProps ) {
    const plotKey = Date.now();
    const selectOptions = sensors.map( ( { title, address, id, data } ) => {
        return {
            label: title + " - " + address,
            value: id,
            disabled: !data
        }
    } );

    const [ selectedSensor, setSelectedSensor ] = useState<SensorSelectOption>( selectOptions[0] );
    const [ sensorDetails, setSensorDetails ] = useState<ISensor>( sensors[0] );
    const [ latestDate, setLatestDate ] = useState<string>( '' );
    const [ legendButtonsToGenerate, setLegendButtonsToGenerate ] = useState<IPollutionButton[]>( [] )
    const [ visiblePollutionLines, setVisiblePollutionsLines ] = useState<string[]>( [] );

    const handleSelectionChange = ( value: string ) => {
        const pickedOption = selectOptions.filter( option => option.value === value );
        setSelectedSensor( pickedOption[0] );
    };
    const handleLegendButtonClick = ( value: string ) => {
        let lines: string[] = [];
        if( visiblePollutionLines.includes( value ) ) {
            lines = visiblePollutionLines.filter( lineId => lineId !== value );
        } else {
            lines = [ ...visiblePollutionLines, value ];
        }
        setVisiblePollutionsLines( lines );
    }

    useEffect( () => {
        const selectedSensorDetails = sensors.find( ( { id } ) => id === selectedSensor.value );
        if( selectedSensorDetails ) {
            setSensorDetails( selectedSensorDetails );
            if( selectedSensorDetails.data ) {
                const dataObjectKeys = Object.keys( selectedSensorDetails.data );
                const buttonsToGenerate = pollutionButtons.filter( item => dataObjectKeys.includes( item.value ) );
                setLegendButtonsToGenerate( buttonsToGenerate );
                setVisiblePollutionsLines( Object.keys( selectedSensorDetails.data ) )

                let latest = new Date( 0 )
                Object.values( selectedSensorDetails.data ).forEach( measurements => {
                    const datetime = new Date( measurements[measurements.length - 1].datetime );

                    if( datetime > latest ) latest = datetime
                } )

                if( latest.getTime() === 0 ) setLatestDate( '' );
                setLatestDate( latest.toISOString().replace( 'T', ' | ' ).slice( 0, 18 ) );
            }
        }
    }, [ selectedSensor ] );

    return (
        <>
            <div className="charts-per-sensor-wrapper">
                <h2>{ "WYKRES ZANIECZYSZCZEŃ DLA WYBRANEGO CZUJNIKA" }</h2>
                <div className="chart-panel">
                    <span>{ `Dane z ${ latestDate }` }</span>
                    <div className="sensor-select">
                        <h3>{ "Wybierz czujnik,\nktórego dane chcesz odczytać" }</h3>
                        <Select options={ selectOptions } selectedOption={ selectedSensor }
                                onChange={ handleSelectionChange }/>
                    </div>
                    { sensorDetails && <SensorPollutionsPlot key={ plotKey } data={ sensorDetails.data }
                                                             visibleLines={ visiblePollutionLines }/> }
                    <div className="plot-legend">
                        <h4>{ "ZANIECZYSZCZENIA\nNA WYKRESIE" }</h4>
                        <div className="button-row">
                            { visiblePollutionLines && legendButtonsToGenerate.map( ( {
                                                                                          color,
                                                                                          label,
                                                                                          value
                                                                                      }, index ) =>
                                (
                                    <Button key={ `legendPlotPerSensorButton${ index }` } color={ color }
                                            label={ label } isActive={ visiblePollutionLines.includes( value ) }
                                            onClick={ () => handleLegendButtonClick( value ) }/>
                                )
                            ) }
                        </div>
                    </div>
                </div>
                <div className="gauges-panel">
                    { sensorDetails.data && <GaugesPerSensor selectedSensorDetails={ sensorDetails }/> }
                </div>
            </div>
        </>
    )
}
