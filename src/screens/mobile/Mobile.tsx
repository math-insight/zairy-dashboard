import "./styles.css"
import { Navbar } from "../../components/NavbarView/Navbar.tsx";
import { MobileMapView } from "../../components/MapView/mobile/MobileMapView.tsx";

export function Mobile() {
    return (
        <div className="mobile-container">
            <Navbar/>
            <MobileMapView/>
        </div>
    )
}
