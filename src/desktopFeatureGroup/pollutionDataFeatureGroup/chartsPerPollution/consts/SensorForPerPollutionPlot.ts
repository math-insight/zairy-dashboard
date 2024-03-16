import { Measurement } from "../../consts/ISensor.ts";

export default interface SensorForPerPollutionPlot {
    index: number;
    id: string;
    title: string;
    data: Measurement[];
    color: string;
    isActive: boolean;
}
