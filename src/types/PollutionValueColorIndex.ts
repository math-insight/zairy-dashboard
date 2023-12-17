import MeasuredPollutionsNames from "./MeasuredPollutionsNames.ts";
import ColorThresholds from "./ColorThresholds.ts";

type PollutionValueColorIndex = {
    name: MeasuredPollutionsNames,
    unit: string,
    colorThresholds: ColorThresholds[]
};

export default PollutionValueColorIndex;
