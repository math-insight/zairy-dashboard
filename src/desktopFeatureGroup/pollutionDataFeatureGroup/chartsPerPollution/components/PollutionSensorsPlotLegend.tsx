import "../assets/pollutionSensorsPlotLegend.css"
import "../../assets/helpPopup.css";
import SensorForPerPollutionPlot from "../consts/SensorForPerPollutionPlot.ts";
import questionMarkSvg from "../../../../shared/assets/questionMark.svg";
import { useState } from "react";
import Button from "../../../../shared/features/button/Button.tsx";

interface PollutionSensorsPlotLegend {
    sensorsToPlot: SensorForPerPollutionPlot[];
    onClick: ( value: string ) => void;
}

export default function PollutionSensorsPlotLegend( {
                                                        sensorsToPlot,
                                                        onClick
                                                    }: PollutionSensorsPlotLegend ) {
    const [ isHovering, setIsHovering ] = useState( false );

    const handleMouse = () => {
        setIsHovering( prevState => !prevState )
    };

    return (
        <div className="legend-list-element-wrapper">
            <div id="per-pollution-legend" className="per-pollution-legend-title">
                <p>{ "Wybór czujników" }</p>
                <img className="help" src={ questionMarkSvg } alt={ "ikona pomocy" }
                     onMouseOver={ () => handleMouse() }
                     onMouseOut={ () => handleMouse() }/>

                { isHovering && (
                    <div id="per-pollution" className="help-popup-wrapper" style={ { display: "flex" } }
                         onMouseOver={ () => handleMouse() }
                         onMouseOut={ () => handleMouse() }>
                        <p> { "Na wykresie wyświetlaja się wszystkie dostępne czujniki. Wybierz maksymalnie cztery, które mają zostać wyróżnione." } </p>
                    </div>)
                }
            </div>

            { sensorsToPlot.map( ( { index, id, title, color, isActive } ) => (
                <div key={ "plot-legend-wrapper" + index } className="legend-list-element">
                    <Button key={ "plot-legend-sensor-button" + index } color={ color } label={ `${ index }` }
                            isActive={ isActive }
                            onClick={ () => onClick( id ) }/>
                    <p>{ title }</p>
                </div>
            ) ) }
        </div>
    );
}
