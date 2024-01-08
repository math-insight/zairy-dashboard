import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css"
import cityBorderPolygonOption from "./utils/cityBorderPolygonOption.ts";
import cityBorderPolygonCoordinates from "./utils/cityBorderPolygonCoordinates.ts";
import cityBorderMarginPolygonOptions from "./utils/cityBorderMarginPolygonOptions.ts";
import cityBorderMarginPolygonCoordinates from "./utils/cityBorderMarginPolygonCoordinates.ts";

interface LeafletMapProps {
    mapCenter: LatLngTuple;
    zoom: number;
    enableScrollZoom: boolean;
}

export function LeafletMap( { mapCenter, zoom, enableScrollZoom }: LeafletMapProps ) {
    return (
        <MapContainer center={ mapCenter } zoom={ zoom } scrollWheelZoom={ enableScrollZoom }>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></TileLayer>

            <Polygon pathOptions={ cityBorderPolygonOption }
                     positions={ cityBorderPolygonCoordinates }/><Polygon
            pathOptions={ cityBorderMarginPolygonOptions }
            positions={ cityBorderMarginPolygonCoordinates }/>
        </MapContainer>)
}
