import "../assets/select.css";
import { ChangeEvent } from "react";
import SensorSelectOption from "../../shared/types/SensorSelectOption.ts";

interface SelectProps {
    options: SensorSelectOption[];
    selectedOption: SensorSelectOption;
    onChange: ( value: string ) => void;
}

export default function Select( { options, selectedOption, onChange }: SelectProps ) {
    const handleChange = ( event: ChangeEvent<HTMLSelectElement> ) => {
        onChange( event.target.value )
    }

    return (
        <div className="select-box">
            <select className="custom-select"
                    value={ selectedOption.value } onChange={ handleChange }>
                { options.map( ( { label, value, disabled } ) => (
                    <option key={ value } value={ value } disabled={ disabled }>{ label }</option>
                ) ) }
            </select>
        </div>
    )
}
