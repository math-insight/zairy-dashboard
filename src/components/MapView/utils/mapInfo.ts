import { LatLngTuple } from "leaflet";

interface MapInfo {
    cityCenter: LatLngTuple;
    zoom: number;
    enableScrollZoom: boolean;
}

export const ZaryMapInfo: MapInfo = {
    cityCenter: [ 51.6327, 15.1370 ],
    zoom: 13,
    enableScrollZoom: true
}
