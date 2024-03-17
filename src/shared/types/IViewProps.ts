import IHeatmap from "./IHeatmap.ts";
import IHeatmapDatetime from "./IHeatmapDatetime.ts";
import ISensor from "./ISensor.ts";

export default interface IViewProps {
    isLoading: boolean;
    errorOccurred: boolean;
    heatmaps: IHeatmap[];
    heatmapsDatetimes: IHeatmapDatetime[];
    sensors: ISensor[];
}
