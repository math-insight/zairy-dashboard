import { createContext } from "react";
import { MeasurementTypes } from "../types/MeasurementTypes.ts";

const PollutionTypeContext = createContext( {
    selectedPollutionType: '',
    setSelectedPollutionType: ( _selectedPollutionType: MeasurementTypes ) => {
    },
} )

export default PollutionTypeContext;
