import "./assets/stylesguide.css"
import { useEffect, useState } from "react";
import Mobile from "./mobileFeatureGroup/Mobile.tsx";
import Desktop from "./desktopFeatureGroup/Desktop.tsx";
import IHeatmap from "./shared/types/IHeatmap.ts";
import ISensor from "./shared/types/ISensor.ts";
import IHeatmapDatetime from "./shared/types/IHeatmapDatetime.ts";
import getHeatmaps from "./shared/service/getHeatmapSimulation.ts";
import getSensors from "./shared/service/getSensors.ts";
import getHeatmapsDatetimes from "./shared/service/getHeatmapsDatetimes.ts";

function App() {
    const [ isLoading, setIsLoading ] = useState<boolean>( true );
    const [ errorOccurred, setErrorOccurred ] = useState( false );

    const [ heatmaps, setHeatmaps ] = useState<IHeatmap[]>( [] );
    const [ sensorsDetails, setSensorsDetails ] = useState<ISensor[]>( [] );
    const [ heatmapsDatetimes, setHeatmapsDatetimes ] = useState<IHeatmapDatetime[]>( [] )

    const handleError = () => {
        setErrorOccurred( true );
    };

    const useMobileView = () => {
        const [ isMobileView, setIsMobileView ] = useState( false );

        useEffect( () => {
            const updateView = () => {
                const isMobile = (window.innerHeight > window.innerWidth) || (window.innerWidth < 856);
                setIsMobileView( isMobile );
            };

            updateView();
            window.addEventListener( 'resize', updateView );

            return () => window.removeEventListener( 'resize', updateView );
        }, [] );

        return isMobileView;
    };

    useEffect( () => {
        const fetchData = async () => {
            try {
                const [ heatmaps, sensors, heatmapsDatetimes ] = await Promise.all( [ getHeatmaps(), getSensors(), getHeatmapsDatetimes() ] );

                setHeatmaps( heatmaps );
                setSensorsDetails( sensors );
                setHeatmapsDatetimes( heatmapsDatetimes )
            } catch ( error ) {
                console.log( error )
                handleError();
            } finally {
                setIsLoading( false );
            }
        }

        if( isLoading ) {
            fetchData();
        }
    }, [] );

    const isMobileView = useMobileView();

    return (
        <>
            { isMobileView ? (
                <Mobile isLoading={ isLoading } errorOccurred={ errorOccurred } heatmaps={ heatmaps }
                        heatmapsDatetimes={ heatmapsDatetimes } sensors={ sensorsDetails }/>
            ) : (
                <Desktop isLoading={ isLoading } errorOccurred={ errorOccurred } heatmaps={ heatmaps }
                         heatmapsDatetimes={ heatmapsDatetimes } sensors={ sensorsDetails }/>
            ) }
        </>
    )
}

export default App;
