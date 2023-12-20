import LeafletMap from './leafletMap/LeafletMap';
import ButtonsRow from './buttonsRow/ButtonsRow';
import { useState } from "react";
import PollutionTypeContext from "./contexts/PollutionTypeContext.ts";

function App() {
    const [ selectedPollutionType, setSelectedPollutionType ] = useState( '' )

    return (
        <PollutionTypeContext.Provider value={ { selectedPollutionType, setSelectedPollutionType } }>
            <LeafletMap/>
            <ButtonsRow/>
        </PollutionTypeContext.Provider>
    );
}

export default App;
