import "../assets/gaugesPerSensor.css";
import ISensor from "../../consts/ISensor.ts";
import { pollutants } from "../../../shared/consts/pollutants.ts";
import getValueThreshold from "../../service/getValueThreshold.ts";
import getLatestMeasurement from "../../service/getLatestMeasurement.ts";
import GaugeCard from "../../components/GaugeCard.tsx";

interface GaugesPerSensor {
    selectedSensorDetails: ISensor,
}

export default function GaugesPerSensor( { selectedSensorDetails }: GaugesPerSensor ) {
    return (
        <div className="gauges-per-sensor-wrapper">
            <div className="selected-sensor-title">
                <h3>{ "Dane dla czujnika" }</h3>
                <h3 className="sensor-name">{ selectedSensorDetails.title + " " + selectedSensorDetails.address }</h3>
            </div>
            <div className="gauges-grid">
                { pollutants.map( ( { value, label, longLabel, airQualityThresholds } ) => {
                    if( !selectedSensorDetails.data[value] ) {
                        return null;
                    }

                    const latestMeasurement = getLatestMeasurement( selectedSensorDetails.data[value] );
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
