import GaugeComponent from "react-gauge-component";

interface GaugeCardProps {

}

export default function GaugeCard() {
    return (
        <GaugeComponent
            type="semicircle"
            arc={ {
                width: 0.2,
                padding: 0.005,
                cornerRadius: 1
            } }/>
    )
}
