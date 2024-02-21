import "./assets/mapOptions.css"
import SensorsVisibility from "../../../shared/types/SensorsVisibility.ts";
import SensorTypes from "./consts/sensorTypes.ts";
import Checkbox from "../../components/Checkbox.tsx";
import { ChangeEvent } from "react";

interface MapOptionsProps {
    toggleSensorsVisibility: ( sensorType: keyof SensorsVisibility ) => void;
}

export default function MapOptions( { toggleSensorsVisibility }: MapOptionsProps ) {
    const onToggle = ( event: ChangeEvent<HTMLInputElement> ) => {
        toggleSensorsVisibility( event.target.id as keyof SensorsVisibility );
    }

    return (
        <div className="map-options-wrapper">
            <h3>{ "Ustawienia mapy" }</h3>
            <div className="displayed-sensors">
                <h4>{ "Wyświetlane czujniki" }</h4>
                { SensorTypes.map( ( { label, displayOnRender, color, type }, index ) => (
                    <Checkbox key={ `sensorVisibility${ type }${ index }` } id={ type } value={ displayOnRender }
                              color={ color }
                              label={ label }
                              onToggle={ onToggle }/>
                ) ) }
            </div>
        </div>
    )
}
