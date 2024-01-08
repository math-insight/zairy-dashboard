import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css"
import cityBorderPolygonOption from "./mapUtils/cityBorderPolygonOption.ts";
import cityBorderPolygonCoordinates from "./mapUtils/cityBorderPolygonCoordinates.ts";
import cityBorderMarginPolygonOptions from "./mapUtils/cityBorderMarginPolygonOptions.ts";
import cityBorderMarginPolygonCoordinates from "./mapUtils/cityBorderMarginPolygonCoordinates.ts";

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
