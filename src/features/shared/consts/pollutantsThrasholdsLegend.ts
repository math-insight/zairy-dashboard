type AirQualityIndex = {
    'Indeks jakości powietrza': string;
    'PM10': [ number, number ] | string | null;
    'PM2.5': [ number, number ] | string | null;
    'O3': [ number, number ] | string | null;
    'NO2': [ number, number ] | string | null;
    'SO2': [ number, number ] | string | null;
};

const airQualityData: AirQualityIndex[] = [
    {
        'Indeks jakości powietrza': 'Bardzo dobry',
        'PM10': [ 0, 20 ],
        'PM2.5': [ 0, 13 ],
        'O3': [ 0, 70 ],
        'NO2': [ 0, 40 ],
        'SO2': [ 0, 50 ]
    },
    {
        'Indeks jakości powietrza': 'Dobry',
        'PM10': [ 21, 50 ],
        'PM2.5': [ 13.1, 35 ],
        'O3': [ 70.1, 120 ],
        'NO2': [ 40.1, 100 ],
        'SO2': [ 50.1, 100 ]
    },
    {
        'Indeks jakości powietrza': 'Umiarkowany',
        'PM10': [ 51, 80 ],
        'PM2.5': [ 35.1, 55 ],
        'O3': [ 120.1, 150 ],
        'NO2': [ 100.1, 150 ],
        'SO2': [ 100.1, 200 ]
    },
    {
        'Indeks jakości powietrza': 'Dostateczny',
        'PM10': [ 81, 110 ],
        'PM2.5': [ 55.1, 75 ],
        'O3': [ 150.1, 180 ],
        'NO2': [ 150.1, 200 ],
        'SO2': [ 200.1, 350 ]
    },
    {
        'Indeks jakości powietrza': 'Zły',
        'PM10': [ 111, 150 ],
        'PM2.5': [ 75.1, 110 ],
        'O3': [ 180.1, 240 ],
        'NO2': [ 200.1, 400 ],
        'SO2': [ 350.1, 500 ]
    },
    {
        'Indeks jakości powietrza': 'Bardzo zły',
        'PM10': '>150',
        'PM2.5': '>110',
        'O3': '>240',
        'NO2': '>400',
        'SO2': '>500'
    },
    { 'Indeks jakości powietrza': 'Brak indeksu', 'PM10': null, 'PM2.5': null, 'O3': null, 'NO2': null, 'SO2': null }
];
