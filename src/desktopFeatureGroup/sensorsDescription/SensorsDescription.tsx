import "./assets/sensorsDescription.css";
import sensorsCards from "../../shared/features/sensorsDescription/consts/sensorsCards.ts";
import SensorCard from "./components/SensorCard.tsx";

export default function SensorsDescription() {
    const cardWidth = sensorsCards.length > 0 ? 100 / sensorsCards.length - 4 : 100;

    return (
        <div className="sensors-description-wrapper">
            <h2>{ "Czujniki dostępne na mapie" }</h2>
            <div className="sensors-cards-wrapper">
                { sensorsCards.map( ( { title, text }, index ) => (
                    <div key={ `cardWrapper${ index }` } style={ { width: `${ cardWidth }%`, flex: 'none' } }>
                        <SensorCard key={ `sensorCard${ index }` } title={ title } text={ text }/>
                    </div>
                ) ) }
            </div>
        </div>
    )
}
