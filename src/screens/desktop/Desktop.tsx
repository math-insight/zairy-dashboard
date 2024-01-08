import "./styles.css";
import { Navbar } from "../../components/NavbarView/Navbar.tsx";
import { MapView } from "../../components/MapView/MapView.tsx";
import { ChartView } from "../../components/ChartComponent/ChartView.tsx";
import { SensorsDescView } from "../../components/SensorsDescView/SensorsDescView.tsx";
import { Footer } from "../../components/FooterComponent/Footer.tsx";

export const Desktop = () => {

    return (
        <div className="desktop-container">
            <Navbar key='navbar'/>
            <MapView/>
            <ChartView/>
            <SensorsDescView/>
            <Footer/>
        </div>
    )
}
