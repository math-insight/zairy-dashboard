export default interface IPollutant {
    value: string,
    label: string,
    longLabel: string,
    color: string,
    airQualityThresholds: AirQualityThreshold[]
}

export interface AirQualityThreshold {
    label: string,
    min: number,
    max: number,
    color: string,
}
