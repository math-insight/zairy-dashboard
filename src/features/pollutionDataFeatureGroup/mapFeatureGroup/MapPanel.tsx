import "leaflet/dist/leaflet.css";
import "./assets/mapPanel.css";
import LeafletMap from "./leafletMap/LeafletMap.tsx";
import MapOptions from "./mapOptions/MapOptions.tsx";
import { useState } from "react";
import SensorsVisibility from "../../shared/types/SensorsVisibility.ts";
import ISensor from "../consts/ISensor.ts";
import { PollutantsNames } from "../../shared/consts/pollutants.ts";
import IHeatmap from "../consts/IHeatmap.ts";
import IHeatmapDatetime from "../consts/IHeatmapDatetime.ts";

interface MapPanel {
    sensorsDetails: ISensor[];
    heatmapsData: IHeatmap[];
    heatmapsDatetimes: IHeatmapDatetime[];
}

export default function MapPanel( { sensorsDetails, heatmapsData, heatmapsDatetimes }: MapPanel ) {
    const [ visibleSensors, setSensorsVisibility ] = useState<SensorsVisibility>( {
        meteo: false,
        regular: true,
        reference: false,
    } );
    const [ visibleHeatmap, setVisibleHeatmap ] = useState<PollutantsNames | "">( "" );

    const toggleMarkersVisibility = ( sensorType: keyof SensorsVisibility ) => {
        setSensorsVisibility( prevState => ({ ...prevState, [sensorType]: !prevState[sensorType] }) );
    };

    return (
        <>
            <div className={ "map-panel-wrapper" }>
                <LeafletMap sensorsDetails={ sensorsDetails } visibleMarkers={ visibleSensors }
                            heatmapsData={ heatmapsData } visibleHeatmap={ visibleHeatmap }
                            heatmapsDatetimes={ heatmapsDatetimes }/>
                <MapOptions toggleSensorsVisibility={ toggleMarkersVisibility } setSelectedHeatmap={ setVisibleHeatmap }
                            selectedHeatmap={ visibleHeatmap }/>
            </div>
            <a href={ "https://www.youtube.com/watch?v=tAnYAJiEg3g" }
               className="footnote">{ "Dowiedz się więcej o czujnikach i zanieczyszczeniach" }</a>
        </>
    )
}
