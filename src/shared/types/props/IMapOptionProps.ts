import ISensorsVisibility from "../state/ISensorsVisibility.ts";
import { PollutantsNames } from "../../consts/pollutants.ts";
import { Dispatch, SetStateAction } from "react";

export default interface IMapOptionsProps {
    visibleSensors: ISensorsVisibility;
    toggleSensorsVisibility: ( sensorType: keyof ISensorsVisibility ) => void;
    selectedHeatmap: PollutantsNames | "";
    setSelectedHeatmap: Dispatch<SetStateAction<string>>;
}
