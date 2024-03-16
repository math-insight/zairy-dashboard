import { Measurement } from "../consts/ISensor.ts";

export default function getLatestMeasurement( measurements: Measurement[] ) {
    return measurements[measurements.length - 1];
}
