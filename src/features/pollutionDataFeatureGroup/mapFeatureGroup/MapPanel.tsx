import "leaflet/dist/leaflet.css";
import "./assets/mapPanel.css";
import LeafletMap from "./leafletMap/LeafletMap.tsx";
import MapOptions from "./mapOptions/MapOptions.tsx";
import { useState } from "react";
import SensorsVisibility from "../../shared/types/SensorsVisibility.ts";
import ISensor from "../consts/ISensor.ts";
import { PollutantsNames } from "../../shared/consts/pollutants.ts";
import IHeatmap from "../consts/IHeatmap.ts";

interface MapPanel {
    sensorsDetails: ISensor[];
    heatmapsData: IHeatmap[];
}

export default function MapPanel( { sensorsDetails, heatmapsData }: MapPanel ) {
    const [ visibleSensors, setSensorsVisibility ] = useState<SensorsVisibility>( {
        meteo: false,
        regular: true,
        reference: false,
    } );
    const [ visibleHeatmap, setVisibleHeatmap ] = useState<PollutantsNames | "">( "" );

    const toggleMarkersVisibility = ( sensorType: keyof SensorsVisibility ) => {
        setSensorsVisibility( prevState => ({ ...prevState, [sensorType]: !prevState[sensorType] }) )
    }

    return (
        <>
            <div className="map-panel-wrapper">
                <LeafletMap sensorsDetails={ sensorsDetails } visibleMarkers={ visibleSensors }
                            heatmapsData={ heatmapsData } visibleHeatmap={ visibleHeatmap }/>
                <MapOptions toggleSensorsVisibility={ toggleMarkersVisibility } setSelectedHeatmap={ setVisibleHeatmap }
                            selectedHeatmap={ visibleHeatmap }/>
            </div>
            <a href={ "https://www.youtube.com/watch?v=tAnYAJiEg3g" }
               className="footnote">{ "Dowiedz się więcej o czujnikach i zanieczyszczeniach" }</a>
        </>
    )
}
