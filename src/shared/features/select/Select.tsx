import "./assets/select.css";
import { ChangeEvent } from "react";
import ISelectOption from "../../types/ISelectOption.ts";

interface SelectProps {
    id: string;
    options: ISelectOption[];
    selectedOption: ISelectOption;
    onChange: ( value: string ) => void;
}

export default function Select( { id, options, selectedOption, onChange }: SelectProps ) {
    const handleChange = ( event: ChangeEvent<HTMLSelectElement> ) => {
        onChange( event.target.value )
    }

    return (
        <div className="select-box">
            <select id={ id } className="custom-select"
                    value={ selectedOption.value } onChange={ handleChange }>
                { options.map( ( { label, value, disabled } ) => (
                    <option key={ value } value={ value } disabled={ disabled }>{ label }</option>
                ) ) }
            </select>
        </div>
    )
}
