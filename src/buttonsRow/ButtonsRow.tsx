import { ChangeEvent, useContext } from "react";
import "./ButtonsRow.css"
import PollutionTypeContext from "../contexts/PollutionTypeContext.ts";
import { isMeasurementType } from "../types/MeasurementTypes.ts";

function ButtonsRow() {
    const { setSelectedPollutionType } = useContext( PollutionTypeContext )
    const selectPollutionSimulationOptions = [
        { value: 'CO', label: 'CO' },
        { value: 'NO2', label: 'NO2' },
        { value: 'O3', label: 'O3' },
        { value: 'SO2', label: 'PM10' },
        { value: 'PM25', label: 'PM2.5' }
    ]

    const handleChange = ( event: ChangeEvent<HTMLSelectElement> ) => {
        const selectedValue = event.target.value;
        try {
            isMeasurementType( selectedValue )
            setSelectedPollutionType( selectedValue )
        } catch ( e ) {
            console.error( e )
        }
    };

    return (
        <div className='button-row'>
            <button key={ 'go-back' }>Wróć do głównej strony</button>
            <select className='pollution-simulation-select' onChange={ handleChange }>
                { selectPollutionSimulationOptions.map( option => (
                    <option key={ option.value } value={ option.value }>{ option.label }</option>
                ) ) }
            </select>
        </div>
    );
}

export default ButtonsRow;
