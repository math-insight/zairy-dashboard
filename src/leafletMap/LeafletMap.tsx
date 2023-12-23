import { GeoJSON as GeoJson, MapContainer, Marker, Polygon, TileLayer, Tooltip } from "react-leaflet";
import { GeoJSON, LatLngTuple } from "leaflet";
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
import { useEffect, useState } from "react";
import DisplaySensors from "../types/DisplaySensors.ts";
import SensorsData from "../types/SensorsData.ts";
import LoadingScreen from "../loadingScreen/LoadingScreen.tsx";

interface LeafletMapProps {
    pollutionType: string | undefined;
    displaySensors: DisplaySensors;
}

export default function LeafletMap( { pollutionType, displaySensors }: LeafletMapProps ) {
    const cityCenter: LatLngTuple = [ 51.62307, 15.15726 ];
    const zoom = 12;
    const enableScrollZoom = false;

    const [ isLoading, setIsLoading ] = useState<boolean>( true )
    const [ sensorsData, setSensorsData ] = useState<SensorsData>();

    useEffect( () => {
        (async () => {
            try {
                const fetchedSensorsData = await Promise.all( [
                    fetch( `http://localhost:5000/api/sensors/normal` ),
                    fetch( `http://localhost:5000/api/sensors/reference` ),
                    fetch( `http://localhost:5000/api/sensors/meteo` )
                ] ).then( responses => Promise.all( responses.map( res => res.json() ) ) ) as SensorsData;

                console.log( fetchedSensorsData )
                setSensorsData( fetchedSensorsData )
                setIsLoading( false );
            } catch ( e ) {
                console.error( e )
            }
        })()
    }, [] );

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

    if( isLoading ) {
        return (<LoadingScreen/>)
    }

    return (
        <div>
            <MapContainer center={ cityCenter } zoom={ zoom } scrollWheelZoom={ enableScrollZoom }>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                </TileLayer>

                { !isLoading && displaySensors.reference && referenceSensors.map( ( { geocode, title } ) => (
                    <Marker position={ geocode } icon={ referenceSensorIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                    </Marker>
                ) ) }
                { !isLoading && displaySensors.normal && normalSensors.map( ( { geocode, title } ) => (
                    <Marker position={ geocode } icon={ normalSensorIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                    </Marker>
                ) ) }
                { !isLoading && displaySensors.meteo && meteoSensors.map( ( { geocode, title } ) => (
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
                        < GeoJson data={ simulationData } style={ ( feature ) => feature ? feature.properties : {} }/>
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
