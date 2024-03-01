import "leaflet/dist/leaflet.css";
import "./assets/leafletMap.css";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import ZaryMapCenter from "./consts/zaryMapCenter.ts";
import cityBorderPolygon from "./consts/cityBorderPolygon.ts";
import SensorsVisibility from "../../../shared/types/SensorsVisibility.ts";
import ISensor from "../../consts/ISensor.ts";
import { meteoSensorIcon, referenceSensorIcon, regularSensorIcon } from "./consts/sensorIcons.ts";
import { PollutantsNames } from "../../../shared/consts/pollutants.ts";
import IHeatmap from "../../consts/IHeatmap.ts";
import formatDatetime from "../../service/formatDatetime.ts";

interface LeafletMapProps {
    sensorsDetails: ISensor[];
    visibleMarkers: SensorsVisibility;
    heatmapsData: IHeatmap[];
    visibleHeatmap: PollutantsNames | "";
}

export default function LeafletMap( {
                                        sensorsDetails,
                                        visibleMarkers,
                                        heatmapsData,
                                        visibleHeatmap
                                    }: LeafletMapProps ) {
    const styleHeatmapPolygon = ( color: string ) => {
        return {
            weight: 0,
            fillOpacity: 0.4,
            color,
            fillColor: color,
        }
    }

    return (
        <div className="leaflet-map-wrapper">
            <MapContainer center={ ZaryMapCenter } zoom={ 12 }
                          scrollWheelZoom={ false }>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ></TileLayer>

                { visibleMarkers.meteo && sensorsDetails.map( ( {
                                                                    type,
                                                                    longitude,
                                                                    latitude,
                                                                    title,
                                                                    address
                                                                }, index ) => {
                    if( type === "meteo" ) return (
                        <Marker key={ `meteoMarker${ index }` } position={ [ latitude, longitude ] }
                                icon={ meteoSensorIcon }>
                            <Popup>
                                <h1 className="popup-title"> { title } </h1>
                                <span className="popup-street">{ address }</span>
                                <div className="values-tbl">

                                </div>
                                <div className="popup-button"> { "Dowiedz się więcej" } </div>
                            </Popup>
                        </Marker>
                    );
                } ) }
                { visibleMarkers.reference && sensorsDetails.map( ( {
                                                                        type, longitude, latitude, title, address
                                                                    }, index ) => {
                    if( type === "reference" ) return (
                        <Marker key={ `referenceMarker${ index }` } position={ [ latitude, longitude ] }
                                icon={ referenceSensorIcon }>
                            <Popup>
                                <h1 className="popup-title"> { title } </h1>
                                <span className="popup-street">{ address }</span>
                                <div className="values-tbl">

                                </div>
                                <div className="popup-button"> { "Dowiedz się więcej" } </div>
                            </Popup>
                        </Marker>
                    );
                } ) }
                { visibleMarkers.regular && sensorsDetails.map( ( {
                                                                      type, longitude, latitude, title, address
                                                                  }, index ) => {
                    if( type === "regular" ) return (
                        <Marker key={ `regularMarker${ index }` } position={ [ latitude, longitude ] }
                                icon={ regularSensorIcon }>
                            <Popup>
                                <h1 className="popup-title"> { title } </h1>
                                <span className="popup-street">{ address }</span>
                                <div className="values-tbl">

                                </div>
                                <div className="popup-button"> { "Dowiedz się więcej" } </div>
                            </Popup>
                        </Marker>
                    );
                } ) }

                { visibleHeatmap && heatmapsData.map( ( { pollutant, polygonSimData } ) => {
                    if( visibleHeatmap === pollutant ) {
                        return polygonSimData.map( ( { color, coordinates }, index ) => (
                            <Polygon key={ index } positions={ coordinates }
                                     pathOptions={ styleHeatmapPolygon( color ) }/>
                        ) );
                    } else {
                        return <></>
                    }
                } ) }
                <Polygon pathOptions={ cityBorderPolygon.options } positions={ cityBorderPolygon.coordinates }/>
            </MapContainer>
            <div className="heatmap-info">
                <span className="heatmap-datetime">{ heatmapsData.map( ( { datetime, pollutant } ) => {
                    if( visibleHeatmap === pollutant ) return `Dane z ${ formatDatetime( datetime ) }`
                    else return '';
                } ) }</span>
                <span>{ }</span>
            </div>
        </div>
    )
}
