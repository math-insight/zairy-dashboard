import LeafletMap from './leafletMap/LeafletMap';
import ButtonsRow from './buttonsRow/ButtonsRow';
import { ChangeEvent, useState } from "react";
import Charts from "./charts/Charts.tsx";

function App() {
    const [ pollutionType, setPollutionType ] = useState<undefined | string>( undefined )
    const handleChange = ( event: ChangeEvent<HTMLSelectElement> ) => {
        setPollutionType( event.target.value )
    };
    const [ showCharts, setShowCharts ] = useState<boolean>( false );
    const toggleShowCharts = () => showCharts ? setShowCharts( false ) : setShowCharts( true )

    const mainView = (
        <>
            <LeafletMap pollutionType={ pollutionType }/>
            <ButtonsRow handleChange={ handleChange } toggleChartsView={ toggleShowCharts }/>
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
