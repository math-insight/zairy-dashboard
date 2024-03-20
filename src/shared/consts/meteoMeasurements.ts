interface IMeteoMeasurements {
    measurement: string,
    label: string,
    unit: string,
}

export const meteoMesurements: IMeteoMeasurements[] = [
    {
        measurement: "Barometer",
        label: "Ciśnienie",
        unit: "mb",
    },
    {
        measurement: "Temp_Outside",
        label: "Temperatura",
        unit: "°C"
    },
    {
        measurement: "Wind_Current_Speed",
        label: "Prędkość wiatru",
        unit: "km/h"
    }
]
