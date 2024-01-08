import "./styles.css"

interface SensorDescCardProps {
    title: string;
    desc: string;
}

export function SensorDescCard( { title, desc }: SensorDescCardProps ) {
    return (
        <div className="card-wrapper">
            <h3 className="card-title">{ title }</h3>
            <p>{ desc }</p>
        </div>
    )
}
