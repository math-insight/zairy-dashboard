import { MapContainer, Marker, Polygon, TileLayer, Tooltip } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { meteoSensors, normalSensors, referenceSensors } from "../utils/markers.ts";
import referenceSensorIcon from "./icons/referenceSensorIcon.ts";
import normalSensorIcon from "./icons/normalSensorIcon.ts";
import meteoSensorIcon from "./icons/meteoSensorIcon.ts";
import cityBorderPolygonOption from "./borderPolygons/cityBorderPolygonOption.ts";
import cityBorderPolygonCoordinates from "./borderPolygons/cityBorderPolygonCoordinates.ts";
import cityBorderMarginPolygonOptions from "./borderPolygons/cityBorderMarginPolygonOptions.ts";
import cityBorderMarginPolygonCoordinates from "./borderPolygons/cityBorderMarginPolygonCoordinates.ts";

import 'leaflet/dist/leaflet.css';
import './LeafletMap.css';


export default function LeafletMap() {
    const cityCenter: LatLngTuple = [ 51.62307, 15.15726 ];
    const zoom = 13;
    const enableScrollZoom = false;


    return (
        <div>
            <MapContainer center={ cityCenter } zoom={ zoom } scrollWheelZoom={ enableScrollZoom }>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                </TileLayer>

                { referenceSensors.map( ( { geocode, title } ) => (
                    <Marker position={ geocode } icon={ referenceSensorIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                    </Marker>
                ) ) }
                { normalSensors.map( ( { geocode, title } ) => (
                    <Marker position={ geocode } icon={ normalSensorIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                    </Marker>
                ) ) }
                { meteoSensors.map( ( { geocode, title } ) => (
                    <Marker position={ geocode } icon={ meteoSensorIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                    </Marker>
                ) ) }

                <Polygon pathOptions={ cityBorderPolygonOption } positions={ cityBorderPolygonCoordinates }/>
                <Polygon pathOptions={ cityBorderMarginPolygonOptions }
                         positions={ cityBorderMarginPolygonCoordinates }/>
            </MapContainer>
        </div>
    )
}
