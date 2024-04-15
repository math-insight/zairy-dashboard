import "leaflet/dist/leaflet.css";
import "./assets/leafletMap.css";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import ZaryMapCenter from "./consts/zaryMapCenter.ts";
import cityBorderPolygon from "./consts/cityBorderPolygon.ts";
import { meteoSensorIcon, referenceSensorIcon, regularSensorIcon } from "./consts/sensorIcons.ts";
import ISensor from "../../types/ISensor.ts";
import ISensorsVisibility from "../../types/state/ISensorsVisibility.ts";
import IHeatmap from "../../types/IHeatmap.ts";
import IHeatmapDatetime from "../../types/IHeatmapDatetime.ts";
import { pollutants, PollutantsNames } from "../../consts/pollutants.ts";
import { meteoMesurements } from "../../consts/meteoMeasurements.ts";
import formatDatetime from "../../service/formatDatetime.ts";
import getLongLabel from "../../service/getLongLabel.ts";

interface LeafletMapProps {
    sensorsDetails: ISensor[];
    visibleMarkers: ISensorsVisibility;
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
                                <a id="know-more-btn" className="popup-button">{ "Dowiedz się więcej" }</a>
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
                                <a className="popup-button">{ "Dowiedz się więcej" }</a>
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
                                <a className="popup-button">{ "Dowiedz się więcej" }</a>
                            </Popup>
                        </Marker>
                    );
                } ) }

                { visibleHeatmap && heatmapsData.map( ( { pollutant, polygonSimData } ) => {
                    if( visibleHeatmap !== pollutant ) return <></>

                    return polygonSimData.map( ( { color, coordinates }, index ) => (
                        <Polygon key={ index } positions={ coordinates }
                                 pathOptions={ styleHeatmapPolygon( color ) }/>
                    ) );
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
                { visibleHeatmap &&
                    <div className="heatmap-pollution-description">
                        <p>{ "Wyświetlane zanieczyszczenie: " }</p>
                        <p><b>{ `${ visibleHeatmap } - ${ getLongLabel( visibleHeatmap ) }` }</b></p>
                    </div>
                }
            </div>
        </div>
    )
}
