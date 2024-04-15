import "./assets/mapOptions.css";
import "../../assets/helpPopup.css";
import questionMarkSvg from "../../../../shared/assets/questionMark.svg";
import { ChangeEvent, useState } from "react";
import ISensorsVisibility from "../../../../shared/types/state/ISensorsVisibility.ts";
import pollutionButtons from "../../../../shared/consts/pollutionButtons.ts";
import SensorTypes from "../../../../shared/consts/sensorTypes.ts";
import Button from "../../../../shared/features/button/Button.tsx";
import Checkbox from "../../../../shared/features/checkbox/Checkbox.tsx";
import IMapOptionsProps from "../../../../shared/types/props/IMapOptionProps.ts";
import PollutionColorsLegend from "../../../../shared/features/pollutionColorsLegend/PollutionColorsLegend.tsx";

export default function MapOptions( {
                                        visibleSensors,
                                        toggleSensorsVisibility,
                                        selectedHeatmap,
                                        setSelectedHeatmap
                                    }: IMapOptionsProps ) {
    const [ isHovering, setIsHovering ] = useState( {
        sensors: false,
        pollutions: false,
        legend: false
    } );

    const handleMouse = ( id: "pollutions" | "sensors" | "legend", isHovering: boolean ) => {
        setIsHovering( prevState => ({
            ...prevState,
            [id]: isHovering
        }) );
    };

    const onToggle = ( event: ChangeEvent<HTMLInputElement> ) => {
        toggleSensorsVisibility( event.target.id as keyof ISensorsVisibility );
    }
    const handleButtonClick = ( buttonId: string ) => {
        if( selectedHeatmap === buttonId ) {
            setSelectedHeatmap( "" );
        } else setSelectedHeatmap( buttonId );
    }

    return (
        <div className="map-options-wrapper">
            <h3>{ "Ustawienia mapy" }</h3>
            <div className="displayed-pollutions">
                <div className="section-title">
                    <h4>{ "Wyświetlane zanieczyszczenia" }</h4>
                    <img className="help" src={ questionMarkSvg } alt={ "ikona pomocy" }
                         onMouseOver={ () => handleMouse( "pollutions", true ) }
                         onMouseOut={ () => handleMouse( "pollutions", false ) }/>

                    { isHovering.pollutions && (
                        <div id="pollutions" className="help-popup-wrapper" style={ { display: "flex" } }
                             onMouseOver={ () => handleMouse( "pollutions", true ) }
                             onMouseOut={ () => handleMouse( "pollutions", false ) }>
                            <p className="info">{ "Jednocześnie może być wyświetlana mapa tylko jednego typu zanieczyszczeń." }</p>

                            <p><b>{ "Objaśnienie symboli:" }</b></p>
                            <p><b>{ "SO2" }</b> { "- Dwutlenek siarki" }</p>
                            <p><b>{ "NO2" }</b> { "- Dwutlenek azotu" }</p>
                            <p><b>{ "O3" }</b> { "- Ozon" }</p>
                            <p><b>{ "CO" }</b> { "- Tlenek węgla" }</p>
                            <p><b>{ "PM 10" }</b> { "- Pyły zawieszone o średnicy do 10 mikrometrów" }</p>
                            <p><b>{ "PM 2,5" }</b> { "- Pyły zawieszone o średnicy do 2,5 mikrometrów" }</p>
                            <a> { "Dowiedz się więcej o zanieczyszczeniach." } </a>
                        </div>)
                    }
                </div>
                <div className="pollutions-buttons-grid">
                    { pollutionButtons.map( ( { color, label, value }, index ) => (
                        <Button key={ `heatmapPollutionButton${ index }` } color={ color }
                                label={ label } isActive={ selectedHeatmap === value }
                                onClick={ () => handleButtonClick( value ) }/>
                    ) ) }
                </div>
            </div>
            <div className="displayed-sensors">
                <div className="section-title">
                    <h4>{ "Wyświetlane czujniki" }</h4>
                    <img className="help" src={ questionMarkSvg } alt={ "ikona pomocy" }
                         onMouseOver={ () => handleMouse( "sensors", true ) }
                         onMouseOut={ () => handleMouse( "sensors", false ) }/>

                    { isHovering.sensors && (
                        <div id="sensors" className="help-popup-wrapper" style={ { display: "flex" } }
                             onMouseOver={ () => handleMouse( "sensors", true ) }
                             onMouseOut={ () => handleMouse( "sensors", false ) }>
                            <p> { "Wybierz czujniki, które mają zostać wyświetlone na mapie." } </p>
                            <a> { "Dowiedz się więcej o czujnikach." } </a>
                        </div>)
                    }
                </div>
                { SensorTypes.map( ( { label, color, type }, index ) => (
                    <Checkbox key={ `sensorVisibility${ type }${ index }` } id={ type } value={ visibleSensors[type] }
                              color={ color }
                              label={ label }
                              onToggle={ onToggle }/>
                ) ) }
            </div>
            <div className="heatmap-colors-legend">
                <PollutionColorsLegend/>
            </div>
        </div>
    )
}
