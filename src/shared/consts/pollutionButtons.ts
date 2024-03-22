const pollutionButtons: IPollutionButton[] = [
    { color: "#F9C86B", label: "SO2", value: "SO2" },
    { color: "#3BEAC0", label: "NO2", value: "NO2" },
    { color: "#EC77CB", label: "O3", value: "O3" },
    { color: "#9C76EE", label: "CO", value: "CO" },
    { color: "#99BCFF", label: "PM 10", value: "PM10" },
    { color: "#FD9F9F", label: "PM 2,5", value: "PM25" },
]

export interface IPollutionButton {
    color: string;
    label: string;
    value: string;
}

export default pollutionButtons;
