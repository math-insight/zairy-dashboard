export type Pollutant = {
    id: string;
    label: string;
    color: string;
};

export const pollutants: Pollutant[] = [
    {
        id: "SO2",
        label: "SO2",
        color: "#F9C86B"
    },
    {
        id: "CO",
        label: "CO",
        color: "#96DD4E",
    },
    {
        id: "NO2",
        label: "NO2",
        color: "#3BEAC0"
    },
    {
        id: "O3",
        label: "O3",
        color: "#B897FF"
    },
    {
        id: "PM10",
        label: "PM10",
        color: "#99BCFF"
    },
    {
        id: "PM25",
        label: "PM2,5",
        color: "#FD9F9F"
    }
];

