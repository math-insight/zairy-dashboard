import "./assets/pollutionData.css";
import MapPanel from "./mapFeatureGroup/MapPanel.tsx";
import ChartsPerSensor from "../../shared/features/chartsPerSensor/ChartsPerSensor.tsx";
import PillBanner from "../../shared/features/pillBanner/PillBanner.tsx";
import ChartsPerPollution from "../../shared/features/chartsPerPollution/ChartsPerPollution.tsx";
import IPollutionDataWrapper from "../../shared/types/IPollutionDataWrapper.ts";
import ISensor from "../../shared/types/ISensor.ts";

export default function DesktopPollutionDataWrapper( { heatmaps, heatmapsDatetimes, sensors }: IPollutionDataWrapper ) {
    const pollutionSensors: ISensor[] = sensors.filter( ( { type } ) => type === "reference" || type === "regular" )

    return (
        <>
            <MapPanel sensorsDetails={ sensors } heatmapsData={ heatmaps }
                      heatmapsDatetimes={ heatmapsDatetimes }/>
            <ChartsPerSensor
                sensors={ pollutionSensors } isMobile={ false }/>
            <div className="pollutions-banner">
                <PillBanner title={ "Jak mierzymy zanieczyszczenia?" } background={ "transparent" }/>
            </div>
            <ChartsPerPollution
                sensors={ pollutionSensors }
                wrapLegend={ false }/>
        </>
    )
}
