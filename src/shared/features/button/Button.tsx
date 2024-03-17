import "./assets/button.css";

interface ButtonProps {
    color: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export default function Button( { color, label, onClick, isActive }: ButtonProps ) {
    const buttonStyle = isActive ?
        { backgroundColor: color, color: "#1F5066" } :
        { backgroundColor: "white", borderColor: color, color }

    return (
        <button className="pollutant-button"
                onClick={ onClick }
                style={ buttonStyle }>{ label }</button>
    )
}
