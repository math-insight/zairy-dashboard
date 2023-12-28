export const referenceSensorTableData = [
    {
        key: '1',
        pollutionName: 'Tlenek węgla',
        shortcut: 'CO',
        unit: 'ppm',
    },
    {
        key: '2',
        pollutionName: 'Dwutlenek azotu',
        shortcut: 'NO2',
        unit: 'ppm',
    },
    {
        key: '3',
        pollutionName: 'Ozon',
        shortcut: 'O3',
        unit: 'ppm',
    },
    {
        key: '4',
        pollutionName: 'Dwutlenek siarki',
        shortcut: 'SO2',
        unit: 'ppm',
    },
    {
        key: '5',
        pollutionName: 'Pył zawieszony o średnicy 2.5μm',
        shortcut: 'PM2.5',
        unit: 'μm',
    },
    {
        key: '6',
        pollutionName: 'Pył zawieszony o średnicy 10μm',
        shortcut: 'PM10',
        unit: 'μm',
    },
];

export const referenceSensorTableColumns = [
    {
        title: 'Nazwa zanieczyszczenia',
        dataIndex: 'pollutionName',
        key: 'pollutionName',
    },
    {
        title: 'Skrót',
        dataIndex: 'shortcut',
        key: 'shortcut',
    },
    {
        title: 'Jednostka',
        dataIndex: 'unit',
        key: 'unit',
    },
    {
        title: 'Wartość pomiaru z ostatniego dnia',
        dataIndex: 'value',
        key: 'value'
    },
    {
        title: 'Jest git?',
        dataIndex: 'colorThreshold',
        key: 'colorThreshold'
    }
];
