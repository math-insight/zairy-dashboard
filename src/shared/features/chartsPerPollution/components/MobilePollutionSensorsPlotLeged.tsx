import "../assets/pollutionSensorsPlotLegend.css";
import selectArrow from "../../../assets/selectArrow.svg";
import questionMark from "../../../assets/questionMark.svg";
import Button from "../../button/Button.tsx";
import ISensorForPerPollutionPlot from "../../../types/ISensorForPerPollutionPlot.ts";
import { useState } from "react";

interface PollutionSensorsPlotLegend {
    sensorsToPlot: ISensorForPerPollutionPlot[];
    onClick: ( value: string ) => void;
}

export default function MobilePollutionSensorsPlotLegend( {
                                                              sensorsToPlot,
                                                              onClick
                                                          }: PollutionSensorsPlotLegend ) {

    const [ expandLegend, setExpandLegend ] = useState( false );
    const [ expandHelp, setExpandHelp ] = useState( false );
    const handleExpandLegendClick = () => {
        setExpandLegend( prevState => !prevState )
    }
    const handleExpandHelpClick = () => {
        setExpandHelp( prevState => !prevState )
    }

    return (
        <div className="mobile-legend-per-pollution-wrapper">
            <div className="mobile-per-pollution-legend-title">
                <h3>{ "Wybór wyróżnionych czujników" }</h3>
                <img src={ selectArrow } alt={ "Rozwiń wybór czujników" } onClick={ () => handleExpandLegendClick() }/>
            </div>
            { expandLegend && <div className="per-pollution-legend-buttons-wrapper">
                { sensorsToPlot.map( ( { index, id, title, color, isActive } ) => (
                    <div key={ "plot-legend-wrapper" + index } className="legend-list-element">
                        <Button key={ "plot-legend-sensor-button" + index } color={ color } label={ `${ index }` }
                                isActive={ isActive }
                                onClick={ () => onClick( id ) }/>
                        <p>{ title }</p>
                    </div>
                ) ) }
            </div> }
            <div className="per-pollution-help-wrapper">
                <div id="expand-per-pollution-plot-help" className="extend-help"
                     onClick={ () => handleExpandHelpClick() }>
                    <p>{ expandHelp ? "Zwiń pomoc" : "Rozwiń pomoc" }</p>
                    <img src={ questionMark } alt={ "Rozwiń pomoc" }/>
                </div>
                { expandHelp &&
                    <div className="per-pollution-plot-help-content">
                        <p>{ "Na wykresie wyświetlaja się wszystkie dostępne czujniki. Wybierz maksymalnie cztery, które mają zostać wyróżnione." }</p>
                        <p>{ "Wynik dla SO2, O3, NO2, PM10 i PM2.5 podawany jest w  µg/m3." }</p>
                        <p>{ "Wynik dla CO podawany jest w  mg/m3." }</p>
                    </div> }
            </div>
        </div>
    );
}
