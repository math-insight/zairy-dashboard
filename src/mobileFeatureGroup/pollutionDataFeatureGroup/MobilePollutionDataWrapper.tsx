import IPollutionDataWrapperComponentProps from "../../shared/types/IPollutionData.ts";
import MobileMapPanel from "./mapFeatureGroup/MobileMapPanel.tsx";

export default function MobilePollutionDataWrapper( {
                                                        heatmaps,
                                                        heatmapsDatetimes,
                                                        sensors
                                                    }: IPollutionDataWrapperComponentProps ) {

    return (
        <>
            <MobileMapPanel heatmaps={ heatmaps } heatmapsDatetimes={ heatmapsDatetimes } sensors={ sensors }/>
        </>
    )
}
