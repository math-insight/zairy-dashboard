import "./assets/mapOptions.css";
import "../../assets/helpPopup.css";
import questionMarkSvg from "../../../shared/assets/questionMark.svg";
import SensorsVisibility from "../../../shared/types/SensorsVisibility.ts";
import SensorTypes from "./consts/sensorTypes.ts";
import Checkbox from "../../components/Checkbox.tsx";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import heatmapColorsLegend from "./consts/heatmapColorsLegend.ts";
import RatingPill from "../../components/RatingPill.tsx";
import pollutionButtons from "../../consts/pollutionButtons.ts";
import Button from "../../components/Button.tsx";
import { PollutantsNames } from "../../../shared/consts/pollutants.ts";
import LegendHelpPopup from "./components/LegendHelpPopup.tsx";

interface MapOptionsProps {
    toggleSensorsVisibility: ( sensorType: keyof SensorsVisibility ) => void;
    selectedHeatmap: PollutantsNames | "";
    setSelectedHeatmap: Dispatch<SetStateAction<string>>;
}

export default function MapOptions( {
                                        toggleSensorsVisibility,
                                        selectedHeatmap,
                                        setSelectedHeatmap
                                    }: MapOptionsProps ) {
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
        toggleSensorsVisibility( event.target.id as keyof SensorsVisibility );
    }
    const handleButtonClick = ( buttonId: string ) => {
        if( selectedHeatmap === buttonId ) {
            setSelectedHeatmap( "" );
        } else setSelectedHeatmap( buttonId );
    }

    return (
        <div className="map-options-wrapper">
            <h3>{ "Ustawienia mapy" }</h3>
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
                            <a href={ "https://react.dev/reference/react/Suspense" }> { "Dowiedz się więcej o czujnikach." } </a>
                        </div>)
                    }
                </div>
                { SensorTypes.map( ( { label, displayOnRender, color, type }, index ) => (
                    <Checkbox key={ `sensorVisibility${ type }${ index }` } id={ type } value={ displayOnRender }
                              color={ color }
                              label={ label }
                              onToggle={ onToggle }/>
                ) ) }
            </div>
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
                            <p><b>{ "Objaśnienie symboli:" }</b></p>
                            <p><b>{ "SO2" }</b> { "- Dwutlenek siarki" }</p>
                            <p><b>{ "NO2" }</b> { "- Dwutlenek azotu" }</p>
                            <p><b>{ "O3" }</b> { "- Ozon" }</p>
                            <p><b>{ "CO" }</b> { "- Tlenek węgla" }</p>
                            <p><b>{ "PM 10" }</b> { "- Pyły zawieszone o średnicy do 10 mikrometrów" }</p>
                            <p><b>{ "PM 2,5" }</b> { "- Pyły zawieszone o średnicy do 2,5 mikrometrów" }</p>
                            <a href={ "https://react.dev/reference/react/Suspense" }> { "Dowiedz się więcej o zanieczyszczeniach." } </a>
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
                <p className="info">{ "Jednocześnie może być wyświetlana mapa tylko jednego typu zanieczyszczeń." }</p>
            </div>
            <div className="heatmap-colors-legend">
                <div className="section-title">
                    <h4>{ "Wyświetlane zanieczyszczenia" }</h4>
                    <img className="help" src={ questionMarkSvg } alt={ "ikona pomocy" }
                         onMouseOver={ () => handleMouse( "legend", true ) }
                         onMouseOut={ () => handleMouse( "legend", false ) }/>

                    { isHovering.legend && (
                        <div id="legend" className="help-popup-wrapper" style={ { display: "flex" } }
                             onMouseOver={ () => handleMouse( "legend", true ) }
                             onMouseOut={ () => handleMouse( "legend", false ) }>
                            <LegendHelpPopup/>
                        </div>)
                    }
                </div>
                <div className="heatmap-color-pills">
                    { heatmapColorsLegend.map( ( { color, label }, index ) => (
                        <RatingPill key={ `legendPill${ index }` } color={ color } label={ label }/>
                    ) ) }
                </div>
            </div>
        </div>
    )
}
