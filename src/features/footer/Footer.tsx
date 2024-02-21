import "./assets/footer.css";
import ProjectIcon from "../shared/assets/zairyAirMonitoring.svg";
import footerUrls from "./consts/footerUrls.ts";

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <img className="project-icon" src={ ProjectIcon } alt="project icon"/>
            <div className="urls">
                { footerUrls.map( ( { url, label }, index ) => (
                    <a key={ `footerUrl${ index }` } href={ url }> { label } </a>
                ) ) }
            </div>
        </div>
    )
}
