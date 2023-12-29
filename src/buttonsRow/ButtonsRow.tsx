import { Button, Checkbox, Select } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import './ButtonsRow.css'
import { Dispatch, SetStateAction } from "react";
import DisplayPollutionSimulation from "../types/DisplayPollutionSimulation.ts";
import assertAirQualityIndices from "../utils/assertStringIsAirQualityIndex.ts";

interface ButtonsRowProps {
    setDisplayPollutionSimulation: Dispatch<SetStateAction<DisplayPollutionSimulation>>
    toggleDisplayedSensors: ( checkedSensors: CheckboxValueType[] ) => void;
}

function ButtonsRow( { setDisplayPollutionSimulation, toggleDisplayedSensors }: ButtonsRowProps ) {
    const selectPollutionSimulationOptions = [
        { value: 'CO', label: 'CO' },
        { value: 'NO2', label: 'NO2' },
        { value: 'O3', label: 'O3' },
        { value: 'SO2', label: 'SO2' },
        { value: 'PM10', label: 'PM10' },
        { value: 'PM25', label: 'PM2.5' }
    ]
    const checkboxSensors = [
        { value: 'meteoSensors', label: 'Czujniki meteorologiczne' },
        { value: 'normalSensors', label: 'Czujniki standardowe' },
        { value: 'referenceSensors', label: 'Czujnik referencyjny' },
    ]
    const defaultCheckedList = checkboxSensors.map( sensor => sensor.value );

    const redirectToHomePage = () => {
        window.location.href = "https://mathinsight.xyz/";
    }
    const handleSelectChange = ( event: string ) => {
        assertAirQualityIndices( event );
        setDisplayPollutionSimulation( {
            userChangedPollutionType: true,
            pollutionType: event
        } )
    };

    return (
        <div className='button-row'>
            <Select
                className='pollution-simulation-select'
                onChange={ handleSelectChange }
                placeholder="Wybierz typ zanieczyszczenia"
                allowClear
            >
                { selectPollutionSimulationOptions.map( option => (
                    <Select.Option key={ option.value } value={ option.value }>{ option.label }</Select.Option>
                ) ) }
            </Select>
            <Checkbox.Group onChange={ toggleDisplayedSensors } defaultValue={ defaultCheckedList }>
                { checkboxSensors.map( option => (
                    <Checkbox key={ option.value } value={ option.value }
                    >{ option.label }</Checkbox>
                ) ) }
            </Checkbox.Group>
            <Button key='go-back' onClick={ redirectToHomePage }>Wróć do głównej strony</Button>
        </div>
    );
}

export default ButtonsRow;
