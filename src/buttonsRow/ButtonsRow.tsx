import { ChangeEvent } from "react";
import { Button, Checkbox, Select } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import './ButtonsRow.css'

interface ButtonsRowProps {
    handleChange: ( event: ChangeEvent<HTMLSelectElement> ) => void;
    toggleDisplayedSensors: ( checkedSensors: CheckboxValueType[] ) => void;
}

function ButtonsRow( { handleChange, toggleDisplayedSensors }: ButtonsRowProps ) {
    const selectPollutionSimulationOptions = [
        { value: 'CO', label: 'CO' },
        { value: 'NO2', label: 'NO2' },
        { value: 'O3', label: 'O3' },
        { value: 'SO2', label: 'PM10' },
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

    return (
        <div className='button-row'>
            <Button key='go-back' onClick={ redirectToHomePage }>Wróć do głównej strony</Button>
            <Select
                className='pollution-simulation-select'
                onChange={ handleChange }
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
        </div>
    );
}

export default ButtonsRow;
