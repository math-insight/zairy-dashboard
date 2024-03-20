import "./assets/mobilePollutionDataWrapper.css";
import IPollutionDataWrapperComponentProps from "../../shared/types/IPollutionData.ts";
import MobileMapPanel from "./mapFeatureGroup/MobileMapPanel.tsx";
import ChartsPerSensor from "../../shared/features/chartsPerSensor/ChartsPerSensor.tsx";
import PillBanner from "../../shared/features/pillBanner/PillBanner.tsx";
import ChartsPerPollution from "../../shared/features/chartsPerPollution/ChartsPerPollution.tsx";

export default function MobilePollutionDataWrapper( {
                                                        heatmaps,
                                                        heatmapsDatetimes,
                                                        sensors
                                                    }: IPollutionDataWrapperComponentProps ) {

    return (
        <div className="mobile-pollution-container">
            <MobileMapPanel heatmaps={ heatmaps } heatmapsDatetimes={ heatmapsDatetimes } sensors={ sensors }/>
            <div className="charts-banner-wrapper">
                <ChartsPerSensor isMobile={ true }
                                 sensors={ sensors.filter( ( { type } ) => type === "regular" || type === "reference" ) }/>
                <PillBanner title={ "Jak mierzymy zanieczyszczenia?" } background={ "transparent" }/>
            </div>
            <ChartsPerPollution
                sensors={ sensors.filter( ( { type } ) => type === "reference" || type === "regular" ) }
                wrapLegend={ true }/>
        </div>
    )
}
