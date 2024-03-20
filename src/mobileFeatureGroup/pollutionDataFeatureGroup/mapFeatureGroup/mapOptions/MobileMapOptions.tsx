import "./assets/mobileMapOptions.css";
import ISensorsVisibility from "../../../../shared/types/ISensorsVisibility.ts";
import { PollutantsNames } from "../../../../shared/consts/pollutants.ts";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { LIGHT_BLUE, PALE_BLUE } from "../../../../shared/consts/colors.ts";
import questionMarkSvg from "../../../../shared/assets/questionMark.svg";
import SensorTypes from "../../../../shared/consts/sensorTypes.ts";
import pollutionButtons from "../../../../shared/consts/pollutionButtons.ts";
import Checkbox from "../../../../shared/features/checkbox/Checkbox.tsx";
import Button from "../../../../shared/features/button/Button.tsx";

interface MapOptionsProps {
    visibleSensors: ISensorsVisibility;
    toggleSensorsVisibility: ( sensorType: keyof ISensorsVisibility ) => void;
    selectedHeatmap: PollutantsNames | "";
    setSelectedHeatmap: Dispatch<SetStateAction<string>>;
}

export default function MobileMapOptions( {
                                              visibleSensors,
                                              toggleSensorsVisibility,
                                              selectedHeatmap,
                                              setSelectedHeatmap
                                          }: MapOptionsProps ) {
    const [ selectedCard, setSelectedCard ] = useState<"sensors" | "pollutions">( "pollutions" );
    const [ extendHelp, setExtendedHelp ] = useState<boolean>( false );

    const onCardNameClick = ( card: "sensors" | "pollutions" ) => {
        setSelectedCard( prevState => {
            if( prevState !== card ) setExtendedHelp( false )

            return card
        } )
        setExtendedHelp( false )
    };
    const onExtendHelpClick = () => {
        setExtendedHelp( prevState => !prevState );
    }
    const onSensorToggle = ( event: ChangeEvent<HTMLInputElement> ) => {
        toggleSensorsVisibility( event.target.id as keyof ISensorsVisibility );
    };
    const handleButtonClick = ( buttonId: string ) => {
        if( selectedHeatmap === buttonId ) {
            setSelectedHeatmap( "" );
        } else setSelectedHeatmap( buttonId );
    };

    return (
        <div className="mobile-map-options-wrapper">
            <h3>{ "Ustawienia wyświetlania mapy" }</h3>
            <div className="options-card-wrapper">
                <div className={ "options-card-names" }>
                    <div id="sensors-card-name"
                         style={ { backgroundColor: selectedCard === "sensors" ? PALE_BLUE : LIGHT_BLUE } }
                         onClick={ () => onCardNameClick( "sensors" ) }>
                        <span className="card-title">{ "Czujniki" }</span>
                    </div>
                    <div id="pollutions-card-name"
                         style={ { backgroundColor: selectedCard === "pollutions" ? PALE_BLUE : LIGHT_BLUE } }
                         onClick={ () => onCardNameClick( "pollutions" ) }>
                        <span className="card-title">{ "Zanieczyszczenia" }</span>
                    </div>
                </div>
                <div className="options-cards-contents">
                    <div id="sensors-card-content" style={ { display: selectedCard === "sensors" ? "block" : "none" } }>
                        { SensorTypes.map( ( { label, color, type }, index ) => (
                            <Checkbox key={ `sensorVisibility${ type }${ index }` } id={ type }
                                      value={ visibleSensors[type] }
                                      color={ color }
                                      label={ label }
                                      onToggle={ onSensorToggle }/>
                        ) ) }
                    </div>
                    <div id="pollutions-card-content"
                         style={ { display: selectedCard === "pollutions" ? "grid" : "none" } }>
                        { pollutionButtons.map( ( { color, label, value }, index ) => (
                            <Button key={ `heatmapPollutionButton${ index }` } color={ color }
                                    label={ label } isActive={ selectedHeatmap === value }
                                    onClick={ () => handleButtonClick( value ) }/>
                        ) ) }
                    </div>
                    <div className="extend-help" onClick={ () => onExtendHelpClick() }>
                        <p>{ extendHelp ? "Zwiń pomoc" : "Rozwiń pomoc" }</p>
                        <img src={ questionMarkSvg } alt={ "Rozwiń pomoc" }/>
                    </div>
                    { extendHelp && selectedCard === "sensors" &&
                        <div id="sensors-card-help" className="card-help-content"
                             style={ { display: extendHelp ? "block" : "none" } }>
                            <p>{ "Wybierz czujniki, które zostaną wyświetlone na mapie." }</p>
                            <a href={ "https://react.dev/reference/react/Suspense" }> { "Dowiedz się więcej o czujnikach." } </a>
                        </div> }
                    { extendHelp && selectedCard === "pollutions" &&
                        <div id="pollutions-card-help" className="card-help-content"
                             style={ { display: extendHelp ? "block" : "none" } }>
                            <p className="help-card-title">{ "Jednocześnie może być wyświetlana mapa tylko jednego typu zanieczyszczeń." }</p>
                            <p><b>{ "Objaśnienie symboli:" }</b></p>
                            <p><b>{ "SO2" }</b> { "- Dwutlenek siarki" }</p>
                            <p><b>{ "NO2" }</b> { "- Dwutlenek azotu" }</p>
                            <p><b>{ "O3" }</b> { "- Ozon" }</p>
                            <p><b>{ "CO" }</b> { "- Tlenek węgla" }</p>
                            <p><b>{ "PM 10" }</b> { "- Pyły zawieszone o średnicy do 10 mikrometrów" }</p>
                            <p><b>{ "PM 2,5" }</b> { "- Pyły zawieszone o średnicy do 2,5 mikrometrów" }</p>
                            <a href={ "https://react.dev/reference/react/Suspense" }> { "Dowiedz się więcej o zanieczyszczeniach." } </a>
                        </div> }
                </div>
            </div>
        </div>
    )
}
