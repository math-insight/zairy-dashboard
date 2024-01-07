import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css"

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
        </MapContainer>)
}
