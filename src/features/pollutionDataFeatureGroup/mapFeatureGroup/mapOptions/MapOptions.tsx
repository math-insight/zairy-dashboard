import "./assets/mapOptions.css"
import SensorsVisibility from "../../../shared/types/SensorsVisibility.ts";
import SensorTypes from "./consts/sensorTypes.ts";
import Checkbox from "../../components/Checkbox.tsx";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import heatmapColorsLegend from "./consts/heatmapColorsLegend.ts";
import RatingPill from "../../components/RatingPill.tsx";
import heatmapButtons from "../../consts/heatmapButtons.ts";
import Button from "../../components/Button.tsx";
import { PollutantsNames } from "../../../shared/consts/pollutants.ts";

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
                <h4>{ "Wyświetlane czujniki" }</h4>
                { SensorTypes.map( ( { label, displayOnRender, color, type }, index ) => (
                    <Checkbox key={ `sensorVisibility${ type }${ index }` } id={ type } value={ displayOnRender }
                              color={ color }
                              label={ label }
                              onToggle={ onToggle }/>
                ) ) }
            </div>
            <div className="displayed-pollutions">
                <h4>{ "Wyświetlane zanieczyszczenia" }</h4>
                <div className="pollutions-buttons-grid">
                    { heatmapButtons.map( ( { color, label, value }, index ) => (
                        <Button key={ `heatmapPollutionButton${ index }` } color={ color }
                                label={ label } isActive={ selectedHeatmap === value }
                                onClick={ () => handleButtonClick( value ) }/>
                    ) ) }
                </div>
            </div>
            <div className="heatmap-colors-legend">
                <h4>{ "Legenda jakości powietrza" }</h4>
                <div className="heatmap-color-pills">
                    { heatmapColorsLegend.map( ( { color, label }, index ) => (
                        <RatingPill key={ `legendPill${ index }` } color={ color } label={ label }/>
                    ) ) }
                </div>
            </div>
        </div>
    )
}
