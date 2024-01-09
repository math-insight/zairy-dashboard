import { Desktop } from "./screens/desktop/Desktop.tsx";
import { useEffect, useState } from "react";
import { Mobile } from "./screens/mobile/Mobile.tsx";

function App() {
    const [ isMobile, setIsMobile ] = useState<boolean>( window.innerWidth < 768 );

    useEffect( () => {
        function handleResize() {
            setIsMobile( window.innerWidth < 768 );
        }

        window.addEventListener( 'resize', handleResize );

        return () => window.removeEventListener( 'resize', handleResize );
    }, [] );

    return isMobile ? <Mobile/> : <Desktop/>
}

export default App;
