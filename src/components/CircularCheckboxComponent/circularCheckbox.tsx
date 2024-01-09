import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import "./styles.css"

interface CircularCheckboxProps {
    id: string;
    label: string;
    checked: boolean;
    setDisplaySensors: Dispatch<SetStateAction<{ meteo: boolean, standard: boolean, reference: boolean }>>
}

export function CircularCheckbox( { id, label, checked, setDisplaySensors }: CircularCheckboxProps ) {
    const [ isChecked, setIsChecked ] = useState( false );
    const [ firstRender, setFirstRender ] = useState( true );

    if( firstRender && checked ) {
        setFirstRender( false );
        setIsChecked( true )
    }
    const toggleCheckbox = ( event: ChangeEvent<HTMLInputElement> ) => {
        setIsChecked( !isChecked );
        setDisplaySensors( prevState => ({
            ...prevState,
            [event.target.id]: !isChecked,
        }) )
    };

    return (
        <div key={ id } className="checkbox-container">
            <input
                type="checkbox"
                id={ `${ id }` }
                className={ `checkbox-round ${ id } ${ isChecked ? 'checked' : '' }` }
                checked={ isChecked }
                onChange={ toggleCheckbox }
            />
            <span className="label-text">{ label }</span>
        </div>
    );
}
