import { Measurement } from "./ISensor.ts";

export default interface ISensorForPerPollutionPlot {
    index: number;
    id: string;
    title: string;
    data: Measurement[];
    color: string;
    isActive: boolean;
}
