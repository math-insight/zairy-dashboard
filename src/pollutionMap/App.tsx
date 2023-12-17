import { useEffect, useState } from "react";
import { GeoJSON, MapContainer, Marker, Polygon, TileLayer, Tooltip } from "react-leaflet";
import '../App.css';
import 'leaflet/dist/leaflet.css'

import { Icon } from "leaflet";
import yellow_icon from "../assets/yellow_icon.png";
import blue_icon from "../assets/blue_icon.png";
import green_icon from "../assets/green_icon.png";

import { meteoStations, normalGauges, referenceGauges } from "../utils/markers.ts";
import cityBorderPolygonCoordinates from "../utils/cityBorderPolygonCoordinates.ts";
import cityBorderMarginPolygonCoordinates from "../utils/cityBorderMarginPolygonCoordinates.ts";
import generateDataForPollutionMap from "./generateDataForPollutionMap.ts";
import { GeoJsonSquaresCollection } from "../types/GeoJsonSquare.ts";

function App() {
    const [ simulationMapData, setSimulationMapData ] = useState<GeoJsonSquaresCollection>( {
        type: 'FeatureCollection',
        features: []
    } );

    useEffect( () => {
        const fetchPollutionData = async () => {
            const data = await generateDataForPollutionMap( 'CO' );
            setSimulationMapData( {
                type: 'FeatureCollection',
                features: data
            } );
        };

        fetchPollutionData();
    }, [] );

    const referenceGaugeIcon = new Icon( {
        iconUrl: yellow_icon,
        iconSize: [ 38, 38 ]
    } );

    const normalGaugeIcon = new Icon( {
        iconUrl: green_icon,
        iconSize: [ 38, 38 ]
    } );

    const meteoStationIcon = new Icon( {
        iconUrl: blue_icon,
        iconSize: [ 38, 38 ]
    } )

    const polygonOptions = {
        color: 'black',
        weight: 2,
        fillOpacity: 0,
    }

    const marginPolygonOptions = {
        color: 'grey',
        weight: 1.5,
        fillOpacity: 0,
        dashArray: '4',
    }

    return (
        <div>
            <MapContainer center={ [ 51.62307, 15.15726 ] } zoom={ 12 } scrollWheelZoom={ false }>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                </TileLayer>

                { referenceGauges.map( ( { geocode, title } ) => (
                    <Marker position={ geocode } icon={ referenceGaugeIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                    </Marker>
                ) ) }
                { normalGauges.map( ( { geocode, title } ) => (
                    <Marker position={ geocode } icon={ normalGaugeIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                    </Marker>
                ) ) }

                { meteoStations.map( ( { geocode, title } ) => (
                    <Marker position={ geocode } icon={ meteoStationIcon }>
                        <Tooltip direction="bottom">{ title }</Tooltip>
                    </Marker>
                ) ) }
                <Polygon pathOptions={ polygonOptions } positions={ cityBorderPolygonCoordinates }/>
                <Polygon pathOptions={ marginPolygonOptions } positions={ cityBorderMarginPolygonCoordinates }/>
                <GeoJSON data={ simulationMapData }/>
            </MapContainer>
        </div>
    )
}

export default App

// mention icon author is needed <a href="https://www.flaticon.com/free-icons/pin" title="pin icons">Pin icons created by Freepik - Flaticon</a>
