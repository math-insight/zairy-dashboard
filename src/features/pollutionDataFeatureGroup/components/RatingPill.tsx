import "../assets/ratingPill.css";

interface RatingPillProps {
    color: string;
    label: string;
}

export default function RatingPill( { color, label }: RatingPillProps ) {
    return (
        <div className="pill-wrapper">
            <div className="pill" style={ { backgroundColor: color } }></div>
            <p>{ label }</p>
        </div>
    )
}
