import "leaflet/dist/leaflet.css";
import "./assets/mapPanel.css";
import LeafletMap from "./leafletMap/LeafletMap.tsx";
import MapOptions from "./mapOptions/MapOptions.tsx";
import { useState } from "react";
import SensorsVisibility from "../../shared/types/SensorsVisibility.ts";
import ISensor from "../consts/ISensor.ts";

interface MapPanel {
    sensorsDetails: ISensor[];
}

export default function MapPanel( { sensorsDetails }: MapPanel ) {
    const [ visibleSensors, setSensorsVisibility ] = useState<SensorsVisibility>( {
        meteo: false,
        regular: true,
        reference: false,
    } );

    const toggleMarkersVisibility = ( sensorType: keyof SensorsVisibility ) => {
        setSensorsVisibility( prevState => ({ ...prevState, [sensorType]: !prevState[sensorType] }) )
    }

    return (
        <div className="map-panel-wrapper">
            <LeafletMap sensorsDetails={ sensorsDetails } visibleMarkers={ visibleSensors }/>
            <MapOptions toggleSensorsVisibility={ toggleMarkersVisibility }/>
        </div>
    )
}
