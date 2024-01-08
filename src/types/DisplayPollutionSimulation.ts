import { AirQualityIndices } from "./SensorsData.ts";

export default interface DisplayPollutionSimulation {
    userChangedPollutionType: boolean;
    pollutionType: AirQualityIndices;
}
