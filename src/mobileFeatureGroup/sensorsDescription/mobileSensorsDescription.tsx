import "./assets/mobileSensorsDescription.css";
import selectArrow from "../../shared/assets/selectArrow.svg";
import { useState } from "react";
import IExtendSensorDescription from "../../shared/types/state/IExtendSensorDescription.ts";
import { SensorTypes } from "../../shared/types/ISensor.ts";
import sensorsCards from "../../shared/features/sensorsDescription/consts/sensorsCards.ts";

export default function MobileSensorsDescription() {
    const [ extendDescription, setExtendDescription ] = useState<IExtendSensorDescription>( {
        reference: false,
        regular: false,
        meteo: false
    } )

    const handleExtendClick = ( sensorType: SensorTypes ) => {
        setExtendDescription( prevState => {
            return {
                ...prevState,
                [sensorType]: !prevState[sensorType]
            };
        } );
    };


    return (
        <div className="mobile-sensors-description-wrapper">
            { sensorsCards.map( ( { type, title, text } ) => {
                return (
                    <div className="sensor-description">
                        <div className="sensor-description-title-wrapper" onClick={ () => handleExtendClick( type ) }>
                            <h3>{ title }</h3>
                            <img src={ selectArrow } alt={ "Rozwiń opis typu sensora" }/>
                        </div>
                        { extendDescription[type] && <p> { text } </p> }
                    </div>)
            } ) }
        </div>
    )
}
