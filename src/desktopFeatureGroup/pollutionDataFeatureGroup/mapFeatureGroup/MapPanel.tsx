import "leaflet/dist/leaflet.css";
import "./assets/mapPanel.css";
import MapOptions from "./mapOptions/MapOptions.tsx";
import { useState } from "react";
import ISensor from "../../../shared/types/ISensor.ts";
import IHeatmap from "../../../shared/types/IHeatmap.ts";
import IHeatmapDatetime from "../../../shared/types/IHeatmapDatetime.ts";
import ISensorsVisibility from "../../../shared/types/state/ISensorsVisibility.ts";
import { PollutantsNames } from "../../../shared/consts/pollutants.ts";
import LeafletMap from "../../../shared/features/leafletMap/LeafletMap.tsx";

interface MapPanel {
    sensorsDetails: ISensor[];
    heatmapsData: IHeatmap[];
    heatmapsDatetimes: IHeatmapDatetime[];
}

export default function MapPanel( { sensorsDetails, heatmapsData, heatmapsDatetimes }: MapPanel ) {
    const [ visibleSensors, setSensorsVisibility ] = useState<ISensorsVisibility>( {
        meteo: false,
        regular: true,
        reference: false,
    } );
    const [ visibleHeatmap, setVisibleHeatmap ] = useState<PollutantsNames | "">( "" );

    const toggleMarkersVisibility = ( sensorType: keyof ISensorsVisibility ) => {
        setSensorsVisibility( prevState => ({ ...prevState, [sensorType]: !prevState[sensorType] }) );
    };

    return (
        <>
            <div className={ "map-panel-wrapper" }>
                <LeafletMap sensorsDetails={ sensorsDetails } visibleMarkers={ visibleSensors }
                            heatmapsData={ heatmapsData } visibleHeatmap={ visibleHeatmap }
                            heatmapsDatetimes={ heatmapsDatetimes }/>
                <MapOptions visibleSensors={ visibleSensors } toggleSensorsVisibility={ toggleMarkersVisibility }
                            setSelectedHeatmap={ setVisibleHeatmap }
                            selectedHeatmap={ visibleHeatmap }/>
            </div>
            <a href={ "https://www.youtube.com/watch?v=tAnYAJiEg3g" }
               className="footnote">{ "Dowiedz się więcej o czujnikach i zanieczyszczeniach" }</a>
        </>
    )
}
