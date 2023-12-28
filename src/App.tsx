import LeafletMap from './leafletMap/LeafletMap';
import ButtonsRow from './buttonsRow/ButtonsRow';
import { ChangeEvent, useState } from "react";
import Charts from "./charts/Charts.tsx";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import DisplaySensors from "./types/DisplaySensors.ts";
import DisplayChartsInfo from "./types/DisplayChartsInfo.ts";

function App() {
    const [ displayCharts, setDisplayCharts ] = useState<DisplayChartsInfo>( {
        toggleView: false,
        sensorId: ''
    } )
    const [ pollutionType, setPollutionType ] = useState<undefined | string>( undefined )
    const handleChange = ( event: ChangeEvent<HTMLSelectElement> ) => {
        setPollutionType( event.target.value )
    };
    const [ displaySensors, setDisplaySensors ] = useState<DisplaySensors>( {
        meteo: true,
        normal: true,
        reference: true,
    } )
    const toggleDisplayedSensors = ( checkedSensors: CheckboxValueType[] ) => {
        const displaySensors: DisplaySensors = {
            meteo: false,
            normal: false,
            reference: false
        }

        if( checkedSensors.includes( 'meteoSensors' ) ) displaySensors.meteo = true;
        if( checkedSensors.includes( 'normalSensors' ) ) displaySensors.normal = true;
        if( checkedSensors.includes( 'referenceSensors' ) ) displaySensors.reference = true;

        setDisplaySensors( displaySensors );
    }

    return (
        <>
            <LeafletMap pollutionType={ pollutionType } displaySensors={ displaySensors }
                        setDisplayCharts={ setDisplayCharts }/>
            <ButtonsRow handleChange={ handleChange } toggleDisplayedSensors={ toggleDisplayedSensors }
            />
            { displayCharts.toggleView && <Charts displayChartsInfo={ displayCharts }/> }
        </>
    );
}

export default App;
