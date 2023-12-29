import LeafletMap from './leafletMap/LeafletMap';
import ButtonsRow from './buttonsRow/ButtonsRow';
import { useState } from "react";
import Charts from "./charts/Charts.tsx";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import DisplaySensors from "./types/DisplaySensors.ts";
import DisplayChartsInfo from "./types/DisplayChartsInfo.ts";
import DisplayPollutionSimulation from "./types/DisplayPollutionSimulation.ts";

function App() {
    const [ displayCharts, setDisplayCharts ] = useState<DisplayChartsInfo>( {
        toggleView: false,
        sensorId: ''
    } )

    const [ displayPollutionSimulation, setDisplayPollutionSimulation ] = useState<DisplayPollutionSimulation>( {
        userChangedPollutionType: false,
        pollutionType: "CO",
    } )

    const [ displaySensors, setDisplaySensors ] = useState<DisplaySensors>( {
        meteo: true,
        normal: true,
        reference: true,
    } );

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
            <LeafletMap displaySensors={ displaySensors }
                        setDisplayCharts={ setDisplayCharts }
                        displayPollutionSimulation={ displayPollutionSimulation }
                        setDisplayPollutionSimulation={ setDisplayPollutionSimulation }
            />
            <ButtonsRow toggleDisplayedSensors={ toggleDisplayedSensors }
                        setDisplayPollutionSimulation={ setDisplayPollutionSimulation }
            />
            { displayCharts.toggleView && <Charts displayChartsInfo={ displayCharts }/> }
        </>
    );
}

export default App;
