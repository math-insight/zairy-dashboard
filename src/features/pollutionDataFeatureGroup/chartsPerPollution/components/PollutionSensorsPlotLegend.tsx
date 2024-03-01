import "../assets/pollutionSensorsPlotLegend.css"
import Button from "../../components/Button.tsx";
import SensorForPerPollutionPlot from "../consts/SensorForPerPollutionPlot.ts";

interface PollutionSensorsPlotLegend {
    sensorsToPlot: SensorForPerPollutionPlot[];
    onClick: ( value: string ) => void;
}

export default function PollutionSensorsPlotLegend( {
                                                        sensorsToPlot,
                                                        onClick
                                                    }: PollutionSensorsPlotLegend ) {

    return (
        <div className="legend-list-element-wrapper">
            { sensorsToPlot.map( ( { index, id, title, color, isActive } ) => (
                <div className="legend-list-element">
                    <Button color={ color } label={ `${ index }` }
                            isActive={ isActive }
                            onClick={ () => onClick( id ) }/>
                    <p>{ title }</p>
                </div>
            ) ) }
        </div>
    );
}
