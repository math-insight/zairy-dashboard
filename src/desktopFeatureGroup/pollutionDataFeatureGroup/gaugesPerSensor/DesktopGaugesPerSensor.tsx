import "./assets/desktopGaugesPerSensor.css";
import GaugesPerSensorProps from "../../../shared/types/props/GaugesPerSensorProps.ts";
import { pollutants } from "../../../shared/consts/pollutants.ts";
import getValueThreshold from "../../../shared/service/getValueThreshold.ts";
import getLatestMeasurement from "../../../shared/service/getLatestMeasurement.ts";
import GaugeCard from "../../../shared/features/gaugesPerSensor/components/GaugeCard.tsx";

export default function DesktopGaugesPerSensor( { selectedSensor }: GaugesPerSensorProps ) {
    return (
        <div className="desktop-gauges-wrapper">
            <div className="selected-sensor-title">
                <h3>{ "Dane dla czujnika" }</h3>
                <h3 className="sensor-name">{ selectedSensor.title + " " + selectedSensor.address }</h3>
            </div>
            <div className="gauges-grid">
                { pollutants.map( ( { value, label, longLabel, airQualityThresholds } ) => {
                    if( !selectedSensor.data[value] ) {
                        return null;
                    }

                    const latestMeasurement = getLatestMeasurement( selectedSensor.data[value] );
                    const currThreshold = getValueThreshold( latestMeasurement.value, airQualityThresholds );
                    return (
                        <GaugeCard key={ `gauge${ value }` } pollutantLabel={ label } pollutantLongLabel={ longLabel }
                                   measurement={ latestMeasurement }
                                   currentThreshold={ currThreshold }
                                   airQualityThresholds={ airQualityThresholds }/>
                    )
                } ) }
            </div>
        </div>
    )
}
