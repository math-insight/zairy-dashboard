import "./assets/sensorsDescription.css";
import sensorsCards from "./consts/sensorsCards.ts";
import SensorCard from "./components/SensorCard.tsx";
import Banner from "../shared/components/Banner.tsx";

export default function SensorsDescription() {
    const cardWidth = sensorsCards.length > 0 ? 100 / sensorsCards.length - 4 : 100;

    return (
        <>
            <div className="sensors-description-wrapper">
                <h2>{ "Czujniki dostępne na mapie" }</h2>
                <div className="sensors-cards-wrapper">
                    { sensorsCards.map( item => (
                        <div style={ { width: `${ cardWidth }%`, flex: 'none' } }>
                            <SensorCard title={ item.title } text={ item.text }/>
                        </div>
                    ) ) }
                </div>
            </div>
            <Banner title={ "Innowacyjny projekt dla miasta Żary" }/></>
    )
}
