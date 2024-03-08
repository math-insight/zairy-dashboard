import {executeQuery} from "./databaseConnection.js";

export default function getSimulationPolygons(req, res) {
    const param = req.query.param;
    if (!isValidMeasurementParam(param)) return res.status(400).json({error: 'invalid param value'});

    const sqlQuery = `SELECT lon1,
                             lat1,
                             lon2,
                             lat2,
                             lon3,
                             lat3,
                             lon4,
                             lat4,
                             col
                      FROM ttsimulation
                      WHERE pollution = "${param}"`;

    executeQuery(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: 'internal server error'});
        } else {
            const polygonSimData = result.map(row => ({
                coordinates: [[row.lat1, row.lon1], [row.lat2, row.lon2], [row.lat3, row.lon3], [row.lat4, row.lon4]],
                color: row.col
            }))
            return res.send({
                pollutant: param,
                polygonSimData
            })
        }
    })
}

function isValidMeasurementParam(param) {
    const validMeasurements = ['CO', 'NO2', 'O3', 'PM10', 'PM25', 'SO2'];
    return validMeasurements.includes(param);
}
