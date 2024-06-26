import "./assets/mobileMapOptions.css";
import ISensorsVisibility from "../../../../shared/types/state/ISensorsVisibility.ts";
import { ChangeEvent, useState } from "react";
import { LIGHT_BLUE, PALE_BLUE } from "../../../../shared/consts/colors.ts";
import questionMarkSvg from "../../../../shared/assets/questionMark.svg";
import SensorTypes from "../../../../shared/consts/sensorTypes.ts";
import pollutionButtons from "../../../../shared/consts/pollutionButtons.ts";
import Checkbox from "../../../../shared/features/checkbox/Checkbox.tsx";
import Button from "../../../../shared/features/button/Button.tsx";
import IMapOptionsProps from "../../../../shared/types/props/IMapOptionProps.ts";
import { pollutants } from "../../../../shared/consts/pollutants.ts";

export default function MobileMapOptions( {
                                              visibleSensors,
                                              toggleSensorsVisibility,
                                              selectedHeatmap,
                                              setSelectedHeatmap
                                          }: IMapOptionsProps ) {
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
                            <a> { "Dowiedz się więcej o czujnikach." } </a>
                        </div> }
                    { extendHelp && selectedCard === "pollutions" &&
                        <div id="pollutions-card-help" className="card-help-content"
                             style={ { display: extendHelp ? "block" : "none" } }>
                            <p className="help-card-title">{ "Jednocześnie może być wyświetlana mapa tylko jednego typu zanieczyszczeń." }</p>
                            <p><b>{ "Objaśnienie symboli:" }</b></p>
                            {pollutants.map(({label, longLabel, desc, unit}) => (
                                <p><b>{label}</b> - { desc ? desc : longLabel} {unit}</p>
                            ))}
                            <a> { "Dowiedz się więcej o zanieczyszczeniach." } </a>
                        </div> }
                </div>
            </div>
        </div>
    )
}
