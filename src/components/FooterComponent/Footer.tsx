import "./styles.css";
import ProjectIconSVG from "../../assets/zairyAirMonitoring.svg";

export function Footer() {
    return (
        <div className="footer-wrapper">
            <img className="project-icon" src={ ProjectIconSVG } alt="project icon"/>
            <div className="nav-items">
                <a href="https://mathinsight.xyz/">Mapa</a>
                <a href="https://mathinsight.xyz/">O projekcie</a>
                <a href="https://mathinsight.xyz/">Edukacja</a>
                <a href="https://mathinsight.xyz/">Dostępność</a>
                <a href="https://mathinsight.xyz/">FAQ</a>
                <a href="https://mathinsight.xyz/">Kontakt</a>
            </div>
        </div>
    )
}
