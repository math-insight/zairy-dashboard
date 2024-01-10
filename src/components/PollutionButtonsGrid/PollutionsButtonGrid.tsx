import "./styles.css"
import { BaseSyntheticEvent, Dispatch, SetStateAction } from "react";

interface PollutionsButtonGridProps {
    turnOnButton: {
        SO2: boolean,
        NO2: boolean,
        CO: boolean,
        O3: boolean,
        PM10: boolean,
        PM25: boolean
    };
    setTurnOnButton: Dispatch<SetStateAction<{
        SO2: boolean,
        NO2: boolean,
        CO: boolean,
        O3: boolean,
        PM10: boolean,
        PM25: boolean
    }>>;
}

export function PollutionsButtonGrid( { turnOnButton, setTurnOnButton }: PollutionsButtonGridProps ) {
    const handleClick = ( event: BaseSyntheticEvent ) => {
        setTurnOnButton( {
            SO2: false,
            NO2: false,
            CO: false,
            O3: false,
            PM10: false,
            PM25: false
        } )

        const buttonId = event.target.id;
        setTurnOnButton( prevState => ({
            ...prevState,
            [buttonId]: true
        }) )
    }

    return (
        <div className="buttons-grid">
            <button id="SO2" className={ `badge ${ turnOnButton.SO2 ? "on" : "off" }` }
                    onClick={ handleClick }>SO<sub>2</sub>
            </button>

            <button id="NO2" className={ `badge ${ turnOnButton.NO2 ? "on" : "off" }` }
                    onClick={ handleClick }>NO<sub>2</sub>
            </button>

            <button id="CO" className={ `badge ${ turnOnButton.CO ? "on" : "off" }` }
                    onClick={ handleClick }>CO
            </button>

            <button id="O3" className={ `badge ${ turnOnButton.O3 ? "on" : "off" }` }
                    onClick={ handleClick }>O<sub>3</sub>
            </button>

            <button id="PM10" className={ `badge ${ turnOnButton.PM10 ? "on" : "off" }` }
                    onClick={ handleClick }>PM10
            </button>

            <button id="PM25" className={ `badge ${ turnOnButton.PM25 ? "on" : "off" }` }
                    onClick={ handleClick }>PM2,5
            </button>
        </div>
    )
}
