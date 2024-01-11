import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css"
import cityBorderPolygonOption from "./utils/cityBorderPolygonOption.ts";
import cityBorderPolygonCoordinates from "./utils/cityBorderPolygonCoordinates.ts";
import cityBorderMarginPolygonOptions from "./utils/cityBorderMarginPolygonOptions.ts";
import cityBorderMarginPolygonCoordinates from "./utils/cityBorderMarginPolygonCoordinates.ts";
import { meteoSensors, referenceSensors, standardSensors } from "../../utils/markers.ts";
import { meteoSensorIcon, referenceSensorIcon, standardSensorIcon } from "./utils/sensorsIcons.ts";

interface LeafletMapProps {
    mapCenter: LatLngTuple;
    zoom: number;
    enableScrollZoom: boolean;
    displaySensors: {
        meteo: boolean;
        standard: boolean;
        reference: boolean;
    }
}

export function LeafletMap( { mapCenter, zoom, enableScrollZoom, displaySensors }: LeafletMapProps ) {
    return (
        <MapContainer center={ mapCenter } zoom={ zoom } scrollWheelZoom={ enableScrollZoom }>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></TileLayer>

            { displaySensors.meteo && meteoSensors.map( ( { geocode, title, street, measurements } ) => (
                <Marker position={ geocode } icon={ meteoSensorIcon }>
                    <Popup>
                        <h1 className="popup-title"> { title } </h1>
                        <span className="popup-street">{ street }</span>
                        <div className="meteo-tbl">
                            { measurements.map( ( { label, value } ) => (
                                <p>`${ label } : { value }`</p>
                            ) ) }
                        </div>
                        <div className="popup-button"> { "Dowiedz się więcej" } </div>
                    </Popup>
                </Marker>
            ) ) }
            { displaySensors.standard && standardSensors.map( ( { geocode, title, street, pollutions } ) => (
                <Marker position={ geocode } icon={ standardSensorIcon }>
                    <Popup>
                        <h1 className="popup-title"> { title } </h1>
                        <span className="popup-street">{ street }</span>
                        <div className="meteo-tbl">
                            { pollutions.map( ( { label, value } ) => (
                                <p>`${ label } : { value }`</p>
                            ) ) }
                        </div>
                        <div className="popup-button"> { "Dowiedz się więcej" } </div>
                    </Popup>
                </Marker>
            ) ) }
            { displaySensors.reference && referenceSensors.map( ( { geocode, title, street, pollutions } ) => (
                <Marker position={ geocode } icon={ referenceSensorIcon }>
                    <Popup>
                        <h1 className="popup-title"> { title } </h1>
                        <span className="popup-street">{ street }</span>
                        <div className="meteo-tbl">
                            { pollutions.map( ( { label, value } ) => (
                                <p>{ label } : { value }</p>
                            ) ) }
                        </div>
                        <div className="popup-button"> { "Dowiedz się więcej" } </div>
                    </Popup>
                </Marker>
            ) ) }
            <Polygon pathOptions={ cityBorderPolygonOption }
                     positions={ cityBorderPolygonCoordinates }/><Polygon
            pathOptions={ cityBorderMarginPolygonOptions }
            positions={ cityBorderMarginPolygonCoordinates }/>
        </MapContainer>)
}
