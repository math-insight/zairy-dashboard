import { AirQualityThreshold } from "../../shared/types/IPollutant.ts";

export default function getValueThreshold( value: number, thresholds: AirQualityThreshold[] ): AirQualityThreshold {
    for ( const threshold of thresholds ) {
        if( value >= threshold.min && value <= threshold.max ) {
            return threshold;
        }
    }

    return thresholds[thresholds.length - 1];
}
