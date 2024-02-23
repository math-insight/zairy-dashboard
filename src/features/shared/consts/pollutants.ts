export const pollutants = [
    {
        value: "SO2",
        label: "SO2",
        longLabel: "Dwutlenek siarki",
        color: "#F9C86B"
    },
    {
        value: "O3",
        label: "O3",
        longLabel: "Ozon",
        color: "#B897FF"
    },
    {
        value: "PM10",
        label: "PM10",
        longLabel: "Pył PM 10",
        color: "#99BCFF"
    },
    {
        value: "CO",
        label: "CO",
        longLabel: "Tlenek węgla",
        color: "#9C76EE"
    },
    {
        value: "NO2",
        label: "NO2",
        longLabel: "Dwutlenek azotu",
        color: "#3BEAC0"
    },
    {
        value: "PM25",
        label: "PM2.5",
        longLabel: "Pył PM 2,5",
        color: "#FD9F9F"
    }
];

export type PollutantsNames = typeof pollutants[number]["value"];
