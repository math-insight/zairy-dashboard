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

interface LeafletMapProps {
    pollutionType: string | undefined;
    displaySensors: DisplaySensors;
    setDisplayCharts: Dispatch<SetStateAction<DisplayChartsInfo>>;
}

export default function LeafletMap( { pollutionType, displaySensors, setDisplayCharts }: LeafletMapProps ) {
    const cityCenter: LatLngTuple = [ 51.62307, 15.15726 ];
    const zoom = 12;
    const enableScrollZoom = false;


    const handleButtonClick = ( sensorId: string ) => {
        setDisplayCharts( {
            toggleView: true,
            sensorId
        } )
    };

    const [ simulationData, setSimulationData ] = useState( {
        type: 'FeatureCollection',
        features: []
    } as GeoJSON.FeatureCollection );
    const [ loadSimulation, setLoadSimulation ] = useState( false );
    useEffect( () => {
        if( pollutionType )
            (async () => {
                try {
                    const response = await fetch( `http://localhost:5000/api/simulation?measurement=${ pollutionType }` );
                    const data = await response.json() as GeoJSON.Feature[];

                    console.log( pollutionType )
                    setSimulationData( {
                        type: 'FeatureCollection',
                        features: data
                    } )
                    setLoadSimulation( true );

                } catch ( e ) {
                    console.error( e )
                }
            })()
    }, [ pollutionType ] );

    return (
        <div>
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
                    !loadSimulation &&
                    <><Polygon pathOptions={ cityBorderPolygonOption }
                               positions={ cityBorderPolygonCoordinates }/><Polygon
                        pathOptions={ cityBorderMarginPolygonOptions }
                        positions={ cityBorderMarginPolygonCoordinates }/></>
                }

                {
                    simulationData.features.length > 1 && loadSimulation &&
                    <>
                        < GeoJSON data={ simulationData } style={ ( feature ) => feature ? feature.properties : {} }/>
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
