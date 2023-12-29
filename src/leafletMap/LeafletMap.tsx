import { GeoJSON, MapContainer, Marker, Polygon, Popup, TileLayer, Tooltip } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { meteoSensors, normalSensors, referenceSensors } from "../utils/markers.ts";
import referenceSensorIcon from "./icons/referenceSensorIcon.ts";
import normalSensorIcon from "./icons/normalSensorIcon.ts";
import meteoSensorIcon from "./icons/meteoSensorIcon.ts";
import cityBorderPolygonOption from "./borderPolygons/cityBorderPolygonOption.ts";
import cityBorderPolygonCoordinates from "./borderPolygons/cityBorderPolygonCoordinates.ts";
import cityBorderMarginPolygonOptions from "./borderPolygons/cityBorderMarginPolygonOptions.ts";
import cityBorderMarginPolygonCoordinates from "./borderPolygons/cityBorderMarginPolygonCoordinates.ts";

import 'leaflet/dist/leaflet.css';
import './LeafletMap.css';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DisplaySensors from "../types/DisplaySensors.ts";
import { Button } from "antd";
import DisplayChartsInfo from "../types/DisplayChartsInfo.ts";
import DisplayPollutionSimulation from "../types/DisplayPollutionSimulation.ts";
import GeoJsonData from "../types/geoJsonData.ts";
import { format, parseISO } from "date-fns";

interface LeafletMapProps {
    displaySensors: DisplaySensors;
    displayPollutionSimulation: DisplayPollutionSimulation;
    setDisplayCharts: Dispatch<SetStateAction<DisplayChartsInfo>>;
    setDisplayPollutionSimulation: Dispatch<SetStateAction<DisplayPollutionSimulation>>;
}

export default function LeafletMap( {
                                        displaySensors,
                                        setDisplayCharts,
                                        displayPollutionSimulation,
                                        setDisplayPollutionSimulation
                                    }: LeafletMapProps ) {
    const cityCenter: LatLngTuple = [ 51.62307, 15.15726 ];
    const zoom = 12;
    const enableScrollZoom = false;

    const handleButtonClick = ( sensorId: string ) => {
        setDisplayCharts( {
            toggleView: true,
            sensorId
        } )
    };

    const [ dateOfSimulation, setDateOfSimulation ] = useState<string>( '' )
    const [ simulationData, setSimulationData ] = useState( {
        type: 'FeatureCollection',
        features: []
    } as GeoJSON.FeatureCollection );
    const [ simulationLoadingFinished, setSimulationLoadingFinished ] = useState( true );
    useEffect( () => {
        if( displayPollutionSimulation.userChangedPollutionType && simulationLoadingFinished )
            (async () => {
                try {
                    const response = await fetch( `http://localhost:5000/api/simulation?param=${ displayPollutionSimulation.pollutionType }` );
                    const data = await response.json() as GeoJsonData;
                    console.log( data )
                    setDateOfSimulation( format( parseISO( data.datetime ), 'yyyy-MM-dd HH:mm' ) )
                    setSimulationData( {
                        type: 'FeatureCollection',
                        features: data[displayPollutionSimulation.pollutionType] as GeoJSON.Feature[]
                    } );
                } catch ( e ) {
                    console.error( e )
                }
            })()
    }, [ displayPollutionSimulation, setDisplayPollutionSimulation, simulationData, simulationLoadingFinished ] );

    useEffect( () => {
        setSimulationLoadingFinished( true );
        setDisplayPollutionSimulation( {
            userChangedPollutionType: false,
            pollutionType: displayPollutionSimulation.pollutionType,
        } )
    }, [ displayPollutionSimulation.pollutionType, setDisplayPollutionSimulation, simulationData ] );

    return (
        <div>
            { simulationData.features.length > 0 && <h4> Symulacja została wykonana { dateOfSimulation }</h4> }
            <MapContainer center={ cityCenter } zoom={ zoom } scrollWheelZoom={ enableScrollZoom }>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                </TileLayer>

                { displaySensors.reference && referenceSensors.map( ( { geocode, title, deviceTag } ) => (
                    <Marker position={ geocode } icon={ referenceSensorIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                        <Popup>
                            <h1>Czujnik referencyjny</h1>
                            <h2>Szkoła Podstawowa nr 8-10</h2>

                            <Button type="primary" key='reference'
                                    onClick={ () => handleButtonClick( deviceTag ) }>{ "Pokaż wykresy zanieczyszczeń dla czujnika" }</Button>
                        </Popup>
                    </Marker>
                ) ) }
                { displaySensors.normal && normalSensors.map( ( { geocode, title } ) => (
                    <Marker position={ geocode } icon={ normalSensorIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                    </Marker>
                ) ) }
                { displaySensors.meteo && meteoSensors.map( ( { geocode, title } ) => (
                    <Marker position={ geocode } icon={ meteoSensorIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                    </Marker>
                ) ) }
                {
                    simulationLoadingFinished &&
                    <><Polygon
                        pathOptions={ cityBorderMarginPolygonOptions }
                        positions={ cityBorderMarginPolygonCoordinates }/><Polygon
                        pathOptions={ cityBorderPolygonOption }
                        positions={ cityBorderPolygonCoordinates }/></>
                }

                {
                    simulationData.features.length > 1 &&
                    <>
                        <GeoJSON data={ simulationData } style={ ( feature ) => feature ? feature.properties : {} }/>
                        <Polygon pathOptions={ cityBorderPolygonOption }
                                 positions={ cityBorderPolygonCoordinates }/><Polygon
                        pathOptions={ cityBorderMarginPolygonOptions }
                        positions={ cityBorderMarginPolygonCoordinates }/>
                    </>
                }
            </MapContainer>
        </div>
    )
}
