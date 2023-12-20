import findProperThreshold from "./findProperThreshold.js";
import createGeoJsonStyles from "./createGeoJsonStyles.js";

export default function createGeoJsonPolygons(data, parameter) {
    const Dx = 30;
    const Dy = 30;
    const tenMetersInDegrees = 111120
    const colorThreshold = findProperThreshold(parameter);

    return data.map(point => {
        const offsetLat = Dy / tenMetersInDegrees;
        const offsetLon = Dx / (111320 * Math.cos(point.lat * Math.PI / 180));

        const squareApexes = {
            topLeft: [parseFloat(point.lon - offsetLon / 2), parseFloat(point.lat + offsetLat / 2)],
            topRight: [parseFloat(point.lon + offsetLon / 2), parseFloat(point.lat + offsetLat / 2)],
            bottomRight: [parseFloat(point.lon + offsetLon / 2), parseFloat(point.lat - offsetLat / 2)],
            bottomLeft: [parseFloat(point.lon - offsetLon / 2), parseFloat(point.lat - offsetLat / 2)],
        }


        return {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [[squareApexes.topLeft, squareApexes.topRight, squareApexes.bottomRight, squareApexes.bottomLeft]]
            },
            properties: createGeoJsonStyles(point[parameter], colorThreshold)
        };
    })
}
