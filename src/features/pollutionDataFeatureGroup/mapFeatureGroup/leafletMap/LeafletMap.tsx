import "leaflet/dist/leaflet.css";
import "./assets/leafletMap.css";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import ZaryMapCenter from "./consts/zaryMapCenter.ts";
import cityBorderPolygon from "./consts/cityBorderPolygon.ts";
import SensorsVisibility from "../../../shared/types/SensorsVisibility.ts";
import ISensor from "../../consts/ISensor.ts";
import { meteoSensorIcon, referenceSensorIcon, regularSensorIcon } from "./consts/sensorIcons.ts";
import { pollutants, PollutantsNames } from "../../../shared/consts/pollutants.ts";
import IHeatmap from "../../consts/IHeatmap.ts";
import getLongLabel from "../../service/getLongLabel.ts";
import { meteoMesurements } from "../../../shared/consts/meteoMeasurements.ts";
import IHeatmapDatetime from "../../consts/IHeatmapDatetime.ts";
import formatDatetime from "../../service/formatDatetime.ts";

interface LeafletMapProps {
    sensorsDetails: ISensor[];
    visibleMarkers: SensorsVisibility;
    heatmapsData: IHeatmap[];
    heatmapsDatetimes: IHeatmapDatetime[];
    visibleHeatmap: PollutantsNames | "";
}

export default function LeafletMap( {
                                        sensorsDetails,
                                        visibleMarkers,
                                        heatmapsData,
                                        heatmapsDatetimes,
                                        visibleHeatmap,
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
        <div
            className="leaflet-map-wrapper">
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
                                                                    address,
                                                                    data
                                                                }, index ) => {
                    if( type === "meteo" ) return (
                        <Marker key={ `meteoMarker${ index }` } position={ [ latitude, longitude ] }
                                icon={ meteoSensorIcon }>
                            <Popup>
                                <h1 className="popup-title"> { title } </h1>
                                <span className="popup-street">{ address }</span>
                                <div className="meteo-values-tbl">
                                    { data && meteoMesurements.map( ( { measurement, label, unit } ) => {
                                        if( data[measurement] ) {
                                            const {
                                                value,
                                            } = data[measurement][data[measurement].length - 1];
                                            return <p
                                                key={ `tbl-meteo${ measurement }` }>{ `${ label } - ${ value } ${ unit }` }</p>
                                        }
                                    } ) }
                                </div>
                                <a id="know-more-btn" className="popup-button"
                                   href="https://antoniolago.github.io/react-gauge-component/">{ "Dowiedz się więcej" }</a>
                            </Popup>
                        </Marker>
                    );
                } ) }
                { visibleMarkers.reference && sensorsDetails.map( ( {
                                                                        type, longitude, latitude, title, address, data
                                                                    }, index ) => {
                    if( type === "reference" ) return (
                        <Marker key={ `referenceMarker${ index }` } position={ [ latitude, longitude ] }
                                icon={ referenceSensorIcon }>
                            <Popup>
                                <h1 className="popup-title"> { title } </h1>
                                <span className="popup-street">{ address }</span>
                                <div className="pollution-values-tbl">
                                    { data && pollutants.map( ( { value } ) => {
                                        if( data[value] ) {
                                            const { value: measurement, color } = data[value][data[value].length - 1];
                                            return <p key={ `tbl${ value }` }
                                                      style={ { color } }>{ value + " - " + measurement }</p>
                                        }
                                    } ) }
                                </div>
                                <a className="popup-button"
                                   href="https://antoniolago.github.io/react-gauge-component/">{ "Dowiedz się więcej" }</a>
                            </Popup>
                        </Marker>
                    );
                } ) }
                { visibleMarkers.regular && sensorsDetails.map( ( {
                                                                      type, longitude, latitude, title, address, data
                                                                  }, index ) => {
                    if( type === "regular" ) return (
                        <Marker key={ `regularMarker${ index }` } position={ [ latitude, longitude ] }
                                icon={ regularSensorIcon }>
                            <Popup>
                                <h1 className="popup-title"> { title } </h1>
                                <span className="popup-street">{ address }</span>
                                <div className="pollution-values-tbl">
                                    { data && pollutants.map( ( { value } ) => {
                                        if( data[value] ) {
                                            const { value: measurement, color } = data[value][data[value].length - 1];
                                            return <p key={ `tbl${ value }` }
                                                      style={ { color } }>{ value + " - " + measurement }</p>
                                        }
                                    } ) }
                                </div>
                                <a className="popup-button"
                                   href="https://antoniolago.github.io/react-gauge-component/">{ "Dowiedz się więcej" }</a>
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
                <span className="heatmap-datetime">{ heatmapsData.map( ( { pollutant } ) => {
                    if( visibleHeatmap === pollutant ) {
                        const heatmapDatetime = heatmapsDatetimes.find( ( {
                                                                              pollution,
                                                                          } ) => pollution === pollutant )
                        const datetime = heatmapDatetime ? formatDatetime( heatmapDatetime.datetime ) : ""

                        return `Dane z ${ datetime }`
                    } else return '';
                } ) }</span>
                { visibleHeatmap && <span className="heatmap-desc">{ "Wyświetlane zanieczyszczenie: " }
                    <b>{ `${ visibleHeatmap } - ${ getLongLabel( visibleHeatmap ) }` }</b></span> }
            </div>
        </div>
    )
}
