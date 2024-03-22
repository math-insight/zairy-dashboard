import "../assets/sensorCard.css";

interface SensorCardProps {
    title: string;
    text: string;
}

export default function SensorCard( { title, text }: SensorCardProps ) {
    return (
        <div className="sensor-card-wrapper">
            <h3>{ title }</h3>
            <p>{ text }</p>
        </div>
    )
}
