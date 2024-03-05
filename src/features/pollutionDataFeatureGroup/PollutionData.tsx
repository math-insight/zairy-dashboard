import "./assets/pollutionData.css";
import { useEffect, useState } from "react";
import IHeatmap from "./consts/IHeatmap.ts";
import ISensor from "./consts/ISensor.ts";
import getHeatmaps from "./service/getHeatmapSimulation.ts";
import getSensors from "./service/getSensors.ts";
import Loading from "../loading/Loading.tsx";
import MapPanel from "./mapFeatureGroup/MapPanel.tsx";
import ChartsPerSensor from "./chartsPerSensor/ChartsPerSensor.tsx";
import Banner from "../shared/components/Banner.tsx";
import ChartsPerPollution from "./chartsPerPollution/ChartsPerPollution.tsx";

interface PollutionDataProps {
    handleError: () => void;
}

export default function PollutionData( { handleError }: PollutionDataProps ) {
    const [ isLoading, setIsLoading ] = useState<boolean>( true );
    const [ heatmapsData, setHeatmapsData ] = useState<IHeatmap[]>( [] );
    const [ sensorsDetails, setSensorsDetails ] = useState<ISensor[]>( [] );

    useEffect( () => {
        const fetchData = async () => {
            try {
                const [ heatmaps, sensors ] = await Promise.all( [ getHeatmaps(), getSensors() ] );

                setHeatmapsData( heatmaps );
                setSensorsDetails( sensors );
            } catch ( error ) {
                handleError();
            } finally {
                setIsLoading( false );
            }
        }

        if( isLoading ) {
            fetchData();
        }
    }, [] );

    if( isLoading ) return <Loading/>

    return (
        <>
            <MapPanel sensorsDetails={ sensorsDetails } heatmapsData={ heatmapsData }/>
            <ChartsPerSensor
                sensors={ sensorsDetails.filter( ( { type } ) => type === "reference" || type === "regular" ) }/>
            <div className="pollutions-banner">
                <Banner title={ "Jak mierzymy zanieczyszczenia?" } background={ "transparent" }/>
            </div>
            <ChartsPerPollution
                sensors={ sensorsDetails.filter( ( { type } ) => type === "reference" || type === "regular" ) }/>
        </>
    )
}
