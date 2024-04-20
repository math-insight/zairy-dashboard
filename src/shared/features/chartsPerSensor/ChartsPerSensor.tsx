import "./assets/chartsPerSensor.css";
import { useEffect, useState } from "react";
import Select from "../select/Select.tsx";
import SensorPollutionsPlot from "./components/SensorPollutionsPlot.tsx";
import ISelectOption from "../../types/ISelectOption.ts";
import ISensor from "../../types/ISensor.ts";
import pollutionButtons, { IPollutionButton } from "../../consts/pollutionButtons.ts";
import formatDatetime from "../../service/formatDatetime.ts";
import Button from "../button/Button.tsx";
import IChartsPerSensorProps from "../../types/props/IChartsPerSensorProps.ts";
import MobileGaugesPerSensor
    from "../../../mobileFeatureGroup/pollutionDataFeatureGroup/gaugesPerSensor/MobileGaugesPerSensor.tsx";
import DesktopGaugesPerSensor
    from "../../../desktopFeatureGroup/pollutionDataFeatureGroup/gaugesPerSensor/DesktopGaugesPerSensor.tsx";

export default function ChartsPerSensor( { sensors, isMobile }: IChartsPerSensorProps ) {
    const plotKey = Date.now();
    const selectOptions = sensors.map( ( { address, id, data, type } ) => {
        return {
            label: (type === "reference" ? "Referencyjny " : "Standardowy ") + address,
            value: id,
            disabled: !data
        }
    } );

    const [ selectedSensor, setSelectedSensor ] = useState<ISelectOption>( selectOptions[0] );
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
        if( visiblePollutionLines.includes( value ) )
            lines = visiblePollutionLines.filter( lineId => lineId !== value );
        else
            lines = [ ...visiblePollutionLines, value ];

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
                setLatestDate( formatDatetime( latest.toISOString() ) );
            }
        }
    }, [ selectedSensor ] );

    return (
        <>
            <div className="charts-per-sensor-wrapper">
                <h2>{ "Wykres zanieczyszczeń dla wybranego czujnika" }</h2>
                <div className="chart-panel">
                    <div className="chart-line-plot-panel">
                        <p>{ `Dane z ${ latestDate }` }</p>
                        <div className="sensor-select">
                            <h3>{ "Wybierz czujnik,\nktórego dane chcesz odczytać" }</h3>
                            <Select id="sensor-select-box" options={ selectOptions } selectedOption={ selectedSensor }
                                    onChange={ handleSelectionChange }/>
                        </div>
                        { sensorDetails && <SensorPollutionsPlot key={ plotKey } data={ sensorDetails.data }
                                                                 visibleLines={ visiblePollutionLines }
                                                                 isMobile={ isMobile }/> }
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
                        <div className="plot-desc">
                            <p>{ "Wynik dla SO2, O3, NO2, PM10 i PM2.5 podawany jest w  µg/m3." }</p>
                            <p>{ "Wynik dla CO podawany jest w  mg/m3." }</p>
                        </div>
                    </div>
                </div>
                { isMobile ? <MobileGaugesPerSensor selectedSensor={ sensorDetails }/> :
                    <DesktopGaugesPerSensor selectedSensor={ sensorDetails }/> }
            </div>
        </>
    )
}
