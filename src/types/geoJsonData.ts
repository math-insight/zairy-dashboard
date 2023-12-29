import { GeoJSON } from "react-leaflet";

export default interface GeoJsonData {
    datetime: string;
    CO?: GeoJSON.Feature[];
    NO2?: GeoJSON.Feature[];
    O3?: GeoJSON.Feature[];
    PM10?: GeoJSON.Feature[];
    PM25?: GeoJSON.Feature[];
    SO2?: GeoJSON.Feature[];
}
