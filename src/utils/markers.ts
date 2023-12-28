import Marker from '../types/MarkerType.ts'

export const referenceSensors: Marker[] = [
    {
        geocode: [ 51.63382726433871, 15.14626229151967 ],
        title: 'Stacja referencyjna SP nr 8-10',
        deviceTag: 'reference'
    }
];

export const normalSensors: Marker[] = [
    { geocode: [ 51.64005529576406, 15.15910140845386 ], title: "Czujnik 1", deviceTag: 'zestaw01' },
    { geocode: [ 51.64443342251068, 15.12856978122888 ], title: "Czujnik 2", deviceTag: 'zestaw02' },
    { geocode: [ 51.64519794321679, 15.12759325349263 ], title: "Czujnik 3", deviceTag: 'zestaw03' },
    { geocode: [ 51.64263915198794, 15.12213642127958 ], title: "Czujnik 4", deviceTag: 'zestaw04' },
    { geocode: [ 51.6426665244895, 15.14260599673567 ], title: "Czujnik 5", deviceTag: 'zestaw05' },
    { geocode: [ 51.6371074586525, 15.13642803787406 ], title: "Czujnik 6", deviceTag: 'zestaw06' },
    { geocode: [ 51.63538690574322, 15.13717388067802 ], title: "Czujnik 7", deviceTag: 'zestaw07' },
    { geocode: [ 51.64434448538645, 15.15261471412351 ], title: "Czujnik 8", deviceTag: 'zestaw08' },
    { geocode: [ 51.63481195532064, 15.15712729456143 ], title: "Czujnik 9", deviceTag: 'zestaw09' },
    { geocode: [ 51.60179440548797, 15.17090915569445 ], title: "Czujnik 10", deviceTag: 'zestaw10' },
    { geocode: [ 51.62786482176203, 15.13264528763997 ], title: "Czujnik 11", deviceTag: 'zestaw11' },
    { geocode: [ 51.62990693260917, 15.14524326913709 ], title: "Czujnik 12", deviceTag: 'zestaw12' },
    { geocode: [ 51.62617985896151, 15.14807324543068 ], title: "Czujnik 13", deviceTag: 'zestaw13' },
    { geocode: [ 51.62256844962159, 15.12106219094307 ], title: "Czujnik 14", deviceTag: 'zestaw14' },
]

export const meteoSensors: Marker[] = [
    {
        geocode: [ 51.63402840267737, 15.14682806987108 ],
        title: "Czujnik meteorologiczny na SP8",
        deviceTag: 'weatherSP8'
    },
    {
        geocode: [ 51.6280272178069, 15.1321996624282 ],
        title: "Czujnik meteorologiczny na SP2",
        deviceTag: 'weatherSP2'
    },
    {
        geocode: [ 51.64290547264308, 15.12885402573953 ],
        title: "Czujnik meteorologiczny na SP1",
        deviceTag: 'weatherSP1'
    }
]
