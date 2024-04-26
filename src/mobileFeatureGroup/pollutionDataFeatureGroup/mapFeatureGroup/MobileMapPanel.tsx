import "./assets/mobileMapPanel.css";
import { useState } from "react";
import IPollutionData from "../../../shared/types/IPollutionDataWrapper.ts";
import ISensorsVisibility from "../../../shared/types/state/ISensorsVisibility.ts";
import { PollutantsNames } from "../../../shared/consts/pollutants.ts";
import LeafletMap from "../../../shared/features/leafletMap/LeafletMap.tsx";
import MobileMapOptions from "./mapOptions/MobileMapOptions.tsx";
import PollutionColorsLegend from "../../../shared/features/pollutionColorsLegend/PollutionColorsLegend.tsx";
import { MAIN_WORDPRESS_APP } from "../../../shared/consts/urls.ts";

export default function MobileMapPanel( { heatmaps, heatmapsDatetimes, sensors }: IPollutionData ) {
    const [ visibleSensors, setVisibleSensors ] = useState<ISensorsVisibility>( {
        meteo: true,
        regular: true,
        reference: true
    } );
    const [ visibleHeatmap, setVisibleHeatmap ] = useState<PollutantsNames | "">( "" );
    const [ isMapInteractive, setMapInteractive ] = useState(true);

    const handleMapInteractionChange = (isInteractive: boolean) => {
        setMapInteractive(isInteractive);
    };

    const toggleSensorsVisibilty = ( sensorType: keyof ISensorsVisibility ) => {
        setVisibleSensors( prevState => ({ ...prevState, [sensorType]: !prevState[sensorType] }) )
    }

    return (
        <div className="mobile-map-panel-wrapper" style={{pointerEvents: isMapInteractive ? "auto": "none"}}>
            <LeafletMap sensorsDetails={ sensors } visibleMarkers={ visibleSensors }
                        heatmapsData={ heatmaps } visibleHeatmap={ visibleHeatmap }
                        heatmapsDatetimes={ heatmapsDatetimes } onInteractionChange={handleMapInteractionChange}/>
            <MobileMapOptions visibleSensors={ visibleSensors } toggleSensorsVisibility={ toggleSensorsVisibilty }
                              selectedHeatmap={ visibleHeatmap }
                              setSelectedHeatmap={ setVisibleHeatmap }/>
            <PollutionColorsLegend/>
            <a href={MAIN_WORDPRESS_APP.HOME_PAGE}>{ "Dowiedz się więcej o czujnikach i zanieczyszczeniach." }</a>
        </div>
    )
}
