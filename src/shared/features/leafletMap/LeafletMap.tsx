import "leaflet/dist/leaflet.css";
import "./assets/leafletMap.css";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import ZaryMapCenter from "./consts/zaryMapCenter.ts";
import cityBorderPolygon from "./consts/cityBorderPolygon.ts";
import { meteoSensorIcon, referenceSensorIcon, regularSensorIcon } from "./consts/sensorIcons.ts";
import ISensor from "../../types/ISensor.ts";
import ISensorsVisibility from "../../types/state/ISensorsVisibility.ts";
import IHeatmap, { SimulationPolygon } from "../../types/IHeatmap.ts";
import IHeatmapDatetime from "../../types/IHeatmapDatetime.ts";
import { pollutants, PollutantsNames } from "../../consts/pollutants.ts";
import { meteoMesurements } from "../../consts/meteoMeasurements.ts";
import formatDatetime from "../../service/formatDatetime.ts";
import getLongLabel from "../../service/getLongLabel.ts";
import { useEffect, useState } from "react";
import { MAIN_WORDPRESS_APP } from "../../consts/urls.ts";

interface LeafletMapProps {
    sensorsDetails: ISensor[];
    visibleMarkers: ISensorsVisibility;
    heatmapsData: IHeatmap[];
    heatmapsDatetimes: IHeatmapDatetime[];
    visibleHeatmap: PollutantsNames | "";
    onInteractionChange: (isInteractive: boolean) => void;
}

export default function LeafletMap( {
                                        sensorsDetails,
                                        visibleMarkers,
                                        heatmapsData,
                                        heatmapsDatetimes,
                                        visibleHeatmap,
                                        onInteractionChange
                                    }: LeafletMapProps ) {
    const [renderedPolygons, setRenderedPolygons] = useState<SimulationPolygon[]>([]);

    useEffect(() => {
        onInteractionChange(false);
        setRenderedPolygons([]);

        if (!visibleHeatmap) {
            onInteractionChange(true);
            return;
        }

        const heatmap = heatmapsData.find(h => h.pollutant === visibleHeatmap);

        if (!heatmap) {
            onInteractionChange(true);
            return;
        }

        let index = 0;
        const intervalId = setInterval(() => {
            const nextBatch = heatmap.polygonSimData.slice(index, index + 500);
            setRenderedPolygons(current => [...current, ...nextBatch]);
            index += 500;
            if (index >= heatmap.polygonSimData.length) {
                clearInterval(intervalId);
                onInteractionChange(true);
            }
        }, 100);
    }, [visibleHeatmap, heatmapsData]);

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
                                <a id="know-more-btn" className="popup-button" href={MAIN_WORDPRESS_APP.TECHNOLOGY_PAGE}>{ "Dowiedz się więcej" }</a>
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
                                <a className="popup-button" href={MAIN_WORDPRESS_APP.TECHNOLOGY_PAGE}>{ "Dowiedz się więcej" }</a>
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
                                <a className="popup-button" href={MAIN_WORDPRESS_APP.TECHNOLOGY_PAGE}>{ "Dowiedz się więcej" }</a>
                            </Popup>
                        </Marker>
                    );
                } ) }

                {renderedPolygons.map(({ color, coordinates }, index) => (
                    <Polygon key={index} positions={coordinates}
                             pathOptions={{ weight: 0, fillOpacity: 0.4, color, fillColor: color }}/>
                ))}

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
