import "./features/shared/assets/stylesguide.css"
import Navigation from "./features/navigation/Navigation.tsx";
import SensorsDescription from "./features/sensorsDescription/SensorsDescription.tsx";
import Footer from "./features/footer/Footer.tsx";
import PollutionData from "./features/pollutionDataFeatureGroup/PollutionData.tsx";
import { useState } from "react";
import DataDownloadError from "./features/pollutionDataFeatureGroup/error/DataDownloadError.tsx";

function App() {
    // const [ isMobile, setIsMobile ] = useState<boolean>( window.innerWidth < 768 );
    //
    // useEffect( () => {
    //     function handleResize() {
    //         setIsMobile( window.innerWidth < 768 );
    //     }
    //
    //     window.addEventListener( 'resize', handleResize );
    //
    //     return () => window.removeEventListener( 'resize', handleResize );
    // }, [] );

    //return isMobile ? <Mobile/> : <Desktop/>
    const [ errorOccurred, setErrorOccurred ] = useState( false );

    const handleError = () => {
        setErrorOccurred( true );
    };

    if( errorOccurred ) {
        return <DataDownloadError/>;
    }
    return (
        <>
            <Navigation/>
            <PollutionData handleError={ handleError }/>
            <SensorsDescription/>
            <Footer/>
        </>
    )
}

export default App;
