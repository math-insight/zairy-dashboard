import ProjectIconSVG from "../assets/zairyAirMonitoring.svg";
import "./styles.css"

export function Navbar() {
    return (
        <div className="navbar">
            <img className="project-icon" src={ ProjectIconSVG } alt="project icon"/>
            <div className="navigation-items">
                <a href="https://mathinsight.xyz/">Mapa</a>
                <a href="https://mathinsight.xyz/">O projekcie</a>
                <a href="https://mathinsight.xyz/">Technologia</a>
                <a href="https://mathinsight.xyz/">Edukacja</a>
                <a href="https://mathinsight.xyz/">Kontakt</a>
            </div>
        </div>
    )
}
