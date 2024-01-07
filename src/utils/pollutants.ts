export type PollutantState = {
    backgroundColor: string;
    fontColor: string;
};

export type Pollutant = {
    id: string;
    label: string;
};

export const pollutants: Pollutant[] = [
    {
        id: "SO2",
        label: "SO2",
    },
    {
        id: "CO",
        label: "CO",
    },
    {
        id: "NO2",
        label: "NO2",
    },
    {
        id: "O3",
        label: "O3",
    }
    , {
        id: "PM10",
        label: "PM10",
    }
    , {
        id: "PM25",
        label: "PM2,5",
    }


];

