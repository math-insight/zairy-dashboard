const colorThresholdsIndex = [
    {
        name: 'CO',
        unit: 'mg/m3',
        colorThresholds: [
            {value: 3, color: '#57b108', label: 'Bardzo dobry',},
            {value: 7, color: '#b0dd10', label: 'Dobry',},
            {value: 11, color: '#ffd911', label: 'Umiarkowany',},
            {value: 15, color: '#e58100', label: 'Dostateczny',},
            {value: 21, color: '#e50000', label: 'Zły',},
            {value: 10000, color: '#990000', label: 'Bardzo zły',},
        ]
    },
    {
        name: 'NO2',
        unit: 'µg/m3',
        colorThresholds: [
            {value: 41, color: '#57b108', label: 'Bardzo dobry',},
            {value: 101, color: '#b0dd10', label: 'Dobry',},
            {value: 151, color: '#ffd911', label: 'Umiarkowany',},
            {value: 201, color: '#e58100', label: 'Dostateczny'},
            {value: 401, color: '#e50000', label: 'Zły',},
            {value: 100000, color: '#990000', label: 'Bardzo zły',},
        ]
    },
    {
        name: 'O3',
        unit: 'µg/m3',
        colorThresholds: [
            {value: 71, color: '#57b108', label: 'Bardzo dobry'},
            {value: 121, color: '#b0dd10', label: 'Dobry'},
            {value: 151, color: '#ffd911', label: 'Umiarkowany'},
            {value: 181, color: '#e58100', label: 'Dostateczny'},
            {value: 241, color: '#e50000', label: 'Zły'},
            {value: 100000, color: '#990000', label: 'Bardzo zły'},
        ]
    },
    {
        name: 'SO2',
        unit: 'µg/m3',
        colorThresholds: [
            {value: 51, color: '#57b108', label: 'Bardzo dobry'},
            {value: 101, color: '#b0dd10', label: 'Dobry'},
            {value: 201, color: '#ffd911', label: 'Umiarkowany'},
            {value: 351, color: '#e58100', label: 'Dostateczny'},
            {value: 501, color: '#e50000', label: 'Zły'},
            {value: 100000, color: '#990000', label: 'Bardzo zły'}
        ]
    },
    {
        name: 'PM10',
        unit: 'µg/m3',
        colorThresholds: [
            {value: 21, color: '#57b108', label: 'Bardzo dobry'},
            {value: 61, color: '#b0dd10', label: 'Dobry'},
            {value: 101, color: '#ffd911', label: 'Umiarkowany'},
            {value: 141, color: '#e58100', label: 'Dostateczny'},
            {value: 201, color: '#e50000', label: 'Zły'},
            {value: 100000, color: '#990000', label: 'Bardzo zły'}
        ]
    },
    {
        name: 'PM25',
        unit: 'µg/m3',
        colorThresholds: [
            {value: 13, color: '#57b108', label: 'Bardzo dobry'},
            {value: 37, color: '#b0dd10', label: 'Dobry'},
            {value: 61, color: '#ffd911', label: 'Umiarkowany'},
            {value: 85, color: '#e58100', label: 'Dostateczny'},
            {value: 121, color: '#e50000', label: 'Zły'},
            {value: 100000, color: '#990000', label: 'Bardzo zły'}
        ]
    }
]

export default colorThresholdsIndex;
