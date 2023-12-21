import LeafletMap from './leafletMap/LeafletMap';
import ButtonsRow from './buttonsRow/ButtonsRow';
import { ChangeEvent, useState } from "react";

function App() {
    const [ pollutionType, setPollutionType ] = useState<undefined | string>( undefined )
    const handleChange = ( event: ChangeEvent<HTMLSelectElement> ) => {
        setPollutionType( event.target.value )
    };

    return (
        <div>
            <LeafletMap pollutionType={ pollutionType }/>
            <ButtonsRow handleChange={ handleChange }/>
        </div>
    );
}

export default App;
