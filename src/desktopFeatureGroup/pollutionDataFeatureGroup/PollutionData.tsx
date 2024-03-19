import "./assets/pollutionData.css";
import MapPanel from "./mapFeatureGroup/MapPanel.tsx";
import ChartsPerSensor from "../../shared/features/chartsPerSensor/ChartsPerSensor.tsx";
import ChartsPerPollution from "./chartsPerPollution/ChartsPerPollution.tsx";
import PillBanner from "../../shared/features/pillBanner/PillBanner.tsx";
import IHeatmap from "../../shared/types/IHeatmap.ts";
import ISensor from "../../shared/types/ISensor.ts";
import IHeatmapDatetime from "../../shared/types/IHeatmapDatetime.ts";

interface PollutionDataProps {
    heatmaps: IHeatmap[];
    heatmapsDatetimes: IHeatmapDatetime[];
    sensors: ISensor[];
}

export default function PollutionData( { heatmaps, heatmapsDatetimes, sensors }: PollutionDataProps ) {
    return (
        <>
            <MapPanel sensorsDetails={ sensors } heatmapsData={ heatmaps }
                      heatmapsDatetimes={ heatmapsDatetimes }/>
            <ChartsPerSensor
                sensors={ sensors.filter( ( { type } ) => type === "reference" || type === "regular" ) }/>
            <div className="pollutions-banner">
                <PillBanner title={ "Jak mierzymy zanieczyszczenia?" } background={ "transparent" }/>
            </div>
            <ChartsPerPollution
                sensors={ sensors.filter( ( { type } ) => type === "reference" || type === "regular" ) }/>
        </>
    )
}
