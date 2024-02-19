import "./features/shared/assets/stylesguide.css"
import { useEffect, useState } from "react";
import Navigation from "./features/navigation/Navigation.tsx";
import SensorsDescription from "./features/sensorsDescription/SensorsDescription.tsx";
import Footer from "./features/footer/Footer.tsx";

function App() {
    const [ isMobile, setIsMobile ] = useState<boolean>( window.innerWidth < 768 );

    useEffect( () => {
        function handleResize() {
            setIsMobile( window.innerWidth < 768 );
        }

        window.addEventListener( 'resize', handleResize );

        return () => window.removeEventListener( 'resize', handleResize );
    }, [] );

    //return isMobile ? <Mobile/> : <Desktop/>
    return (
        <>
            <Navigation/>
            <SensorsDescription/>
            <Footer/>
        </>
    )
}

export default App;
