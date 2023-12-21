import "./ButtonsRow.css"
import { ChangeEvent } from "react";

interface ButtonsRowProps {
    handleChange: ( event: ChangeEvent<HTMLSelectElement> ) => void;
}

function ButtonsRow( { handleChange }: ButtonsRowProps ) {
    const selectPollutionSimulationOptions = [
        { value: 'CO', label: 'CO' },
        { value: 'NO2', label: 'NO2' },
        { value: 'O3', label: 'O3' },
        { value: 'SO2', label: 'PM10' },
        { value: 'PM25', label: 'PM2.5' }
    ]

    return (
        <div className='button-row'>
            <button key={ 'go-back' }>Wróć do głównej strony</button>
            <select className='pollution-simulation-select' onChange={ handleChange }>
                <option key={ 'pick-pollution-type' } value={ undefined }> Wybierz typ zanieczyszczenia</option>
                { selectPollutionSimulationOptions.map( option => (
                    <option key={ option.value } value={ option.value }>{ option.label }</option>
                ) ) }
            </select>
        </div>
    );
}

export default ButtonsRow;
