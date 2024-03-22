import "./assets/mobilePollutionDataWrapper.css";
import MobileMapPanel from "./mapFeatureGroup/MobileMapPanel.tsx";
import ChartsPerSensor from "../../shared/features/chartsPerSensor/ChartsPerSensor.tsx";
import PillBanner from "../../shared/features/pillBanner/PillBanner.tsx";
import ChartsPerPollution from "../../shared/features/chartsPerPollution/ChartsPerPollution.tsx";
import IPollutionDataWrapper from "../../shared/types/IPollutionDataWrapper.ts";

export default function MobilePollutionDataWrapper( {
                                                        heatmaps,
                                                        heatmapsDatetimes,
                                                        sensors
                                                    }: IPollutionDataWrapper ) {
    const pollutionSensors = sensors.filter( ( { type } ) => type === "reference" || type === "regular" )

    return (
        <div className="mobile-pollution-container">
            <MobileMapPanel heatmaps={ heatmaps } heatmapsDatetimes={ heatmapsDatetimes } sensors={ sensors }/>
            <div className="charts-banner-wrapper">
                <ChartsPerSensor isMobile={ true } sensors={ pollutionSensors }/>
                <PillBanner title={ "Jak mierzymy zanieczyszczenia?" } background={ "transparent" }/>
            </div>
            <ChartsPerPollution sensors={ pollutionSensors } wrapLegend={ true }/>
        </div>
    )
}
