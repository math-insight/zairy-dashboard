import "./styles.css";
import { Navbar } from "../../navbar/Navbar.tsx";
import { Map } from "../../map/Map.tsx";

export const Desktop = () => {
    return (
        <div className="desktop-container">
            <Navbar key='navbar'/>
            <Map/>
        </div>
    )
}
