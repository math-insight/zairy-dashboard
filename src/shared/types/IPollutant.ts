export default interface IPollutant {
    value: string,
    unit: string,
    label: string,
    longLabel: string,
    desc?: string,
    color: string,
    airQualityThresholds: AirQualityThreshold[]
}

export interface AirQualityThreshold {
    label: string,
    min: number,
    max: number,
    color: string,
}


export interface IPollutantWithStatus extends IPollutant {
    status: 'real' | 'predict';
}