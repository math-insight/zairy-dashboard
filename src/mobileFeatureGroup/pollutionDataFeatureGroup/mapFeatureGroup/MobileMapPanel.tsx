import "./assets/mobileMapPanel.css";
import { useState } from "react";
import IPollutionData from "../../../shared/types/IPollutionDataWrapper.ts";
import ISensorsVisibility from "../../../shared/types/state/ISensorsVisibility.ts";
import { PollutantsNames } from "../../../shared/consts/pollutants.ts";
import LeafletMap from "../../../shared/features/leafletMap/LeafletMap.tsx";
import MobileMapOptions from "./mapOptions/MobileMapOptions.tsx";
import PollutionColorsLegend from "../../../shared/features/pollutionColorsLegend/PollutionColorsLegend.tsx";

export default function MobileMapPanel( { heatmaps, heatmapsDatetimes, sensors }: IPollutionData ) {
    const [ visibleSensors, setVisibleSensors ] = useState<ISensorsVisibility>( {
        meteo: true,
        regular: true,
        reference: true
    } );
    const [ visibleHeatmap, setVisibleHeatmap ] = useState<PollutantsNames | "">( "" );

    const toggleSensorsVisibilty = ( sensorType: keyof ISensorsVisibility ) => {
        setVisibleSensors( prevState => ({ ...prevState, [sensorType]: !prevState[sensorType] }) )
    }

    return (
        <div className="mobile-map-panel-wrapper">
            <LeafletMap sensorsDetails={ sensors } visibleMarkers={ visibleSensors }
                        heatmapsData={ heatmaps } visibleHeatmap={ visibleHeatmap }
                        heatmapsDatetimes={ heatmapsDatetimes }/>
            <MobileMapOptions visibleSensors={ visibleSensors } toggleSensorsVisibility={ toggleSensorsVisibilty }
                              selectedHeatmap={ visibleHeatmap }
                              setSelectedHeatmap={ setVisibleHeatmap }/>
            <PollutionColorsLegend/>
            <a href={ "https://www.youtube.com/" }>{ "Dowiedz się więcej o czujnikach i zanieczyszczeniach." }</a>
        </div>
    )
}
