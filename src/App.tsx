import LeafletMap from './leafletMap/LeafletMap';
import ButtonsRow from './buttonsRow/ButtonsRow';
import { ChangeEvent, useState } from "react";
import Charts from "./charts/Charts.tsx";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import DisplaySensors from "./types/DisplaySensors.ts";

function App() {
    const [ pollutionType, setPollutionType ] = useState<undefined | string>( undefined )
    const handleChange = ( event: ChangeEvent<HTMLSelectElement> ) => {
        setPollutionType( event.target.value )
    };
    const [ showCharts, setShowCharts ] = useState<boolean>( false );
    const toggleShowCharts = () => showCharts ? setShowCharts( false ) : setShowCharts( true )
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

    const mainView = (
        <>
            <LeafletMap pollutionType={ pollutionType } displaySensors={ displaySensors }/>
            <ButtonsRow handleChange={ handleChange } toggleDisplayedSensors={ toggleDisplayedSensors }
                        toggleChartsView={ toggleShowCharts }/>
        </>
    )

    const chartsView = (
        <>
            <Charts toggleChartsView={ toggleShowCharts }/>
        </>
    )

    return (
        <>
            { showCharts ? chartsView : mainView }
        </>
    );
}

export default App;
