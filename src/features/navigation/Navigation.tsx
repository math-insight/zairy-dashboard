import "./assets/navigation.css";
import ProjectIcon from "../shared/assets/zairyAirMonitoring.svg";
import navigationUrls from "./consts/navigationUrls.ts";

export default function Navigation() {
    return (
        <div className="navigation-wrapper">
            <img className="project-icon" src={ ProjectIcon } alt="project icon"/>
            <div className="navigation-buttons">
                { navigationUrls.map( ( { url, label }, index ) => (
                    <a key={ index } href={ url }> { label } </a>
                ) ) }
            </div>
        </div>
    )
}
