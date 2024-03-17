import "./assets/pollutionColorsLegend.css";
import heatmapColorsLegend from "../../consts/heatmapColorsLegend.ts";
import RatingPill from "./components/RatingPill.tsx";

export default function PollutionColorsLegend() {
    return (
        <div className="pollution-heatmap-colors-legend-wrapper">
            <h4>{ "Legenda ilości zanieczyszczeń" }</h4>
            <div className="heatmap-colors-legend-pills">
                { heatmapColorsLegend.map( ( { color, label }, index ) => (
                    <RatingPill key={ `legendPill${ index }` } color={ color } label={ label }/>
                ) ) }
            </div>
        </div>
    )
}
