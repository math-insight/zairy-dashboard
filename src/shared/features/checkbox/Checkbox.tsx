import "./assets/checkbox.css";
import { ChangeEvent, useState } from "react";

interface CheckboxProps {
    value: boolean;
    color: string;
    label: string;
    id: string;
    onToggle: ( event: ChangeEvent<HTMLInputElement> ) => void;
}

export default function Checkbox( { value, color, label, id, onToggle }: CheckboxProps ) {
    const [ isChecked, setIsChecked ] = useState( value );

    const handleToggle = ( event: ChangeEvent<HTMLInputElement> ) => {
        setIsChecked( prevState => !prevState );
        onToggle( event );
    };

    return (
        <div className="checkbox-wrapper">
            <input type="checkbox" id={ id } className={ `checkbox-round ${ id } ${ isChecked ? 'checked' : '' }` }
                   checked={ isChecked } onChange={ handleToggle }
                   style={ { color, backgroundColor: isChecked ? color : "white", border: `1.5px solid ${ color }` } }/>
            <p className="label-text">{ label }</p>
        </div>
    );
}
