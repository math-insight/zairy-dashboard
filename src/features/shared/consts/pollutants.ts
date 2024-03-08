import IPollutant from "../types/IPollutant.ts";

export const pollutants: IPollutant[] = [
    {
        value: "SO2",
        label: "SO2",
        longLabel: "Dwutlenek siarki",
        color: "#F9C86B",
        airQualityThresholds: [
            { label: "Bardzo dobry", min: 0, max: 50, color: "#2EB20D" },
            { label: "Dobry", min: 50.1, max: 100, color: "#B0DD10" },
            { label: "Umiarkowany", min: 100.1, max: 200, color: "#FFD912" },
            { label: "Dostateczny", min: 200.1, max: 350, color: "#E48100" },
            { label: "Zły", min: 350.1, max: 500, color: "#E50000" },
            { label: "Bardzo zły", min: 500.1, max: 650, color: "#9A0000" }
        ]
    },
    {
        value: "O3",
        label: "O3",
        longLabel: "Ozon",
        color: "#B897FF",
        airQualityThresholds: [
            { label: "Bardzo dobry", min: 0, max: 70, color: "#2EB20D" },
            { label: "Dobry", min: 70.1, max: 120, color: "#B0DD10" },
            { label: "Umiarkowany", min: 120.1, max: 150, color: "#FFD912" },
            { label: "Dostateczny", min: 150.1, max: 180, color: "#E48100" },
            { label: "Zły", min: 180.1, max: 240, color: "#E50000" },
            { label: "Bardzo zły", min: 240.1, max: 300, color: "#9A0000" }
        ]
    },
    {
        value: "PM10",
        label: "PM 10",
        longLabel: "Pył PM 10",
        color: "#99BCFF",
        airQualityThresholds: [
            { label: "Bardzo dobry", min: 0, max: 20, color: "#2EB20D" },
            { label: "Dobry", min: 20.1, max: 50, color: "#B0DD10" },
            { label: "Umiarkowany", min: 50.1, max: 80, color: "#FFD912" },
            { label: "Dostateczny", min: 80.1, max: 110, color: "#E48100" },
            { label: "Zły", min: 110.1, max: 150, color: "#E50000" },
            { label: "Bardzo zły", min: 150.1, max: 190, color: "#9A0000" }
        ]
    },
    {
        value: "CO",
        label: "CO",
        longLabel: "Tlenek węgla",
        color: "#9C76EE",
        airQualityThresholds: [
            { label: "Bardzo dobry", min: 0, max: 3, color: "#2EB20D" },
            { label: "Dobry", min: 3.1, max: 7, color: "#B0DD10" },
            { label: "Umiarkowany", min: 7.1, max: 11, color: "#FFD912" },
            { label: "Dostateczny", min: 11.1, max: 15, color: "#E48100" },
            { label: "Zły", min: 15.1, max: 21, color: "#E50000" },
            { label: "Bardzo zły", min: 21.1, max: 30, color: "#9A0000" }
        ]
    },
    {
        value: "NO2",
        label: "NO2",
        longLabel: "Dwutlenek azotu",
        color: "#3BEAC0",
        airQualityThresholds: [
            { label: "Bardzo dobry", min: 0, max: 40, color: "#2EB20D" },
            { label: "Dobry", min: 40.1, max: 100, color: "#B0DD10" },
            { label: "Umiarkowany", min: 100.1, max: 150, color: "#FFD912" },
            { label: "Dostateczny", min: 150.1, max: 200, color: "#E48100" },
            { label: "Zły", min: 200.1, max: 400, color: "#E50000" },
            { label: "Bardzo zły", min: 400.1, max: 600, color: "#9A0000" }
        ]
    },
    {
        value: "PM25",
        label: "PM 2,5",
        longLabel: "Pył PM 2,5",
        color: "#FD9F9F",
        airQualityThresholds: [
            { label: "Bardzo dobry", min: 0, max: 13, color: "#2EB20D" },
            { label: "Dobry", min: 13.1, max: 35, color: "#B0DD10" },
            { label: "Umiarkowany", min: 35.1, max: 55, color: "#FFD912" },
            { label: "Dostateczny", min: 55.1, max: 75, color: "#E48100" },
            { label: "Zły", min: 75.1, max: 110, color: "#E50000" },
            { label: "Bardzo zły", min: 110.1, max: 135, color: "#9A0000" }
        ]
    }
];

export type PollutantsNames = typeof pollutants[number]["value"];
