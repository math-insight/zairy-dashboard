import "./assets/chartsPerPollution.css";
import ISensor from "../../types/ISensor.ts";
import ISelectOption from "../../types/ISelectOption.ts";
import { pollutants } from "../../consts/pollutants.ts";
import { useEffect, useState } from "react";
import formatDatetime from "../../service/formatDatetime.ts";
import Select from "../select/Select.tsx";
import PollutionSensorsPlot from "./components/PollutionSensorsPlot.tsx";
import PollutionSensorsPlotLegend from "./components/PollutionSensorsPlotLegend.tsx";
import ISensorForPerPollutionPlot from "../../types/ISensorForPerPollutionPlot.ts";
import { HighlightColor } from "../../types/IHighlightColor.ts";
import { PALE_BLUE } from "../../consts/colors.ts";
import MobilePollutionSensorsPlotLegend from "./components/MobilePollutionSensorsPlotLeged.tsx";

interface ChartsPerPollution {
    sensors: ISensor[];
    wrapLegend: boolean;
}

export default function ChartsPerPollution( { sensors, wrapLegend }: ChartsPerPollution ) {
    const selectOptions: ISelectOption[] = pollutants.map( ( { value, longLabel } ) => ({
        value,
        label: longLabel,
        disabled: false
    }) );

    const [ selectedOption, setSelectedOption ] = useState<ISelectOption>( selectOptions[0] )
    const [ sensorsWithSelectedPollution, setSensorsWithSelectedPollution ] = useState<ISensorForPerPollutionPlot[]>( [] )
    const [ highlightedSensors, setHighlightedSensors ] = useState<HighlightColor[]>( [
        {
            color: "#FD9F9F",
            sensorHighlighted: ""
        },
        {
            color: "#F9C86B",
            sensorHighlighted: ""
        },
        {
            color: "#EC77CB",
            sensorHighlighted: ""
        },
        {
            color: "#B897FF",
            sensorHighlighted: ""
        }
    ] )
    const [ latestDatetime, setLatestDatetime ] = useState<string>( '' )

    const handleSelectionChange = ( value: string ) => {
        const pickedOption = selectOptions.filter( option => option.value === value );
        setSelectedOption( pickedOption[0] );
        setHighlightedSensors( [
            {
                color: "#FD9F9F",
                sensorHighlighted: ""
            },
            {
                color: "#F9C86B",
                sensorHighlighted: ""
            },
            {
                color: "#EC77CB",
                sensorHighlighted: ""
            },
            {
                color: "#B897FF",
                sensorHighlighted: ""
            }
        ] );
    };

    const handleButtonClick = ( id: string ) => {
        setHighlightedSensors( prevState => {
            let isIdFound = false;
            const newStateWithIdRemoved = prevState.map( sensor => {
                if( sensor.sensorHighlighted === id ) {
                    isIdFound = true;
                    return { ...sensor, sensorHighlighted: "" };
                }
                return sensor;
            } );

            if( isIdFound ) {
                return newStateWithIdRemoved;
            }

            let isIdAssigned = false;
            const newStateWithIdAssigned = prevState.map( sensor => {
                if( !isIdAssigned && sensor.sensorHighlighted === "" ) {
                    isIdAssigned = true;
                    return { ...sensor, sensorHighlighted: id };
                }
                return sensor;
            } );

            return isIdAssigned ? newStateWithIdAssigned : prevState;
        } );
    }

    useEffect( () => {
        const filteredSensors: ISensor[] = sensors.filter( ( { data } ) => data && data[selectedOption.value] );

        const sensorsToPlot = filteredSensors.map( ( { id, address, data }, index ) => {
            let bgColor: string = PALE_BLUE;

            highlightedSensors.forEach( ( { sensorHighlighted, color } ) => {
                if( sensorHighlighted === id ) bgColor = color
            } );

            const { datetime } = data[selectedOption.value].reduce( ( latest, current ) => {
                return new Date( latest.datetime ) < new Date( current.datetime ) ? current : latest;
            }, data[selectedOption.value][0] );
            setLatestDatetime( formatDatetime( datetime ) );

            return {
                index: index + 1,
                id,
                title: "Czujnik przy " + address,
                data: data[selectedOption.value],
                color: bgColor,
                isActive: (bgColor !== PALE_BLUE)
            }
        } )

        setSensorsWithSelectedPollution( sensorsToPlot );
    }, [ highlightedSensors ] );

    return (
        <div className="charts-per-pollution-wrapper">
            <h2>{ "Wykres wybranego parametru" }</h2>
            <div className="plot-panel">
                <p>{ `Dane z ${ latestDatetime }` }</p>
                <div className="pollution-select">
                    <h3>{ "Wybierz jakie zanieczyszczenie chcesz odczytać" }</h3>
                    <Select id="pollution-list-select" options={ selectOptions } selectedOption={ selectedOption }
                            onChange={ handleSelectionChange }/>
                </div>
                <div className="plot">
                    <PollutionSensorsPlot sensors={ sensorsWithSelectedPollution }/>

                    { wrapLegend ?
                        <MobilePollutionSensorsPlotLegend sensorsToPlot={ sensorsWithSelectedPollution }
                                                          onClick={ handleButtonClick }/> :
                        <PollutionSensorsPlotLegend sensorsToPlot={ sensorsWithSelectedPollution }
                                                    onClick={ handleButtonClick }/>
                    }
                </div>
            </div>
        </div>
    )

}
