import "./styles.css"
import { Navbar } from "../../components/NavbarView/Navbar.tsx";
import { MobileMapView } from "../../components/MapView/mobile/MobileMapView.tsx";
import { ChartView } from "../../components/ChartComponent/ChartView.tsx";
import { SensorsDescView } from "../../components/SensorsDescView/SensorsDescView.tsx";
import { Footer } from "../../components/FooterComponent/Footer.tsx";

export function Mobile() {
    return (
        <div className="mobile-container">
            <Navbar/>
            <MobileMapView/>
            <ChartView isMobile={ true }/>
            <SensorsDescView/>
            <Footer/>
        </div>
    )
}
