import "./styles.css";
import { SensorDescCard } from "./SensorDescCard/SensorDescCard.tsx";
import { sensorsCards } from "../../utils/sensorsCards.ts";

export function SensorsDescView() {
    const handleClick = () => {
        window.location.href = "https://plotly.com/javascript/react/"
    }

    return (
        <>
            <div className="sensors-desc-view">
                <h2>{ "Czujniki dostępne na mapie" }</h2>
                <div className="sensors-cards">
                    { sensorsCards.map( ( { title, desc } ) => (
                        <SensorDescCard title={ title } desc={ desc }/>
                    ) ) }
                </div>
            </div>
            <div className="end-banner">
                <h1> { "Innowacyjny projekt" } <br/> { "dla miasta Żary" } </h1>
                <div onClick={ handleClick }>{ "Dowiedz się więcej" }</div>
            </div>
        </>
    )
}
