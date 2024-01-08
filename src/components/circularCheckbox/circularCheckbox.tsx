import { useState } from "react";
import "./styles.css"

interface CircularCheckboxProps {
    id: string;
    label: string;
    checked: boolean;
}

export function CircularCheckbox( { id, label, checked }: CircularCheckboxProps ) {
    const [ isChecked, setIsChecked ] = useState( false );
    const [ firstRender, setFirstRender ] = useState( true )

    if( firstRender && checked ) {
        setFirstRender( false );
        setIsChecked( true )
    }
    const toggleCheckbox = () => {
        setIsChecked( !isChecked );
    };

    return (
        <div key={ id } className="checkbox-container">
            <input
                type="checkbox"
                id={ `circular-checkbox ${ id }` }
                className={ `checkbox-round ${ id } ${ isChecked ? 'checked' : '' }` }
                checked={ isChecked }
                onChange={ toggleCheckbox }
            />
            <span className="label-text">{ label }</span>
        </div>
    );
}
