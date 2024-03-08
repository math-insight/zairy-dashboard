const SensorTypes = [
    { label: "Czujniki meteorologiczne", type: "meteo", displayOnRender: false, color: "#1F5066", id: "meteoSensor" },
    {
        label: "Czujniki referencyjny",
        type: "reference",
        displayOnRender: false,
        color: "#71D3FF",
        id: "referenceSensor"
    },
    { label: "Czujniki standardowy", type: "regular", displayOnRender: true, color: "#378DB4", id: "regularSensor" },
]

export default SensorTypes;
