import "./assets/dataDownloadError.css";
import ProjectIcon from "../../shared/assets/zairyAirMonitoring.svg";

export default function DataDownloadError() {
    return (
        <div className="error-wrapper">
            <img id="on-error" className="project-icon" src={ ProjectIcon } alt="project icon"/>
            <h1>{ "Przepraszamy,\nprzelotna awaria systemu" }</h1>
            <p>{ "Robimy co możemy, żeby przywrócić pełną funkcjonalność strony." }</p>
        </div>
    )
}
