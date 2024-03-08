import {executeQuery} from "./databaseConnection.js";

export default function getSensorsWeatherMeasurements(req, res) {
    const {sensorsDetails} = req;
    const sqlQuery = `SELECT id, datetime, measurement, value, unit
                      FROM ttmeteo_value
                      WHERE datetime >= NOW() - INTERVAL 1 DAY`;

    executeQuery(sqlQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        } else {
            result.forEach(row => {
                const {measurement} = row
                if (measurement && row.value) {
                    const sensor = sensorsDetails.find(sensor => sensor.id === row.id);

                    if (sensor) {
                        if (!sensor.data) {
                            sensor.data = {};
                        }
                        if (!sensor.data[measurement]) {
                            sensor.data[measurement] = [];
                        }

                        sensor.data[measurement].push({
                            datetime: row.datetime,
                            value: row.value,
                            color: row.col,
                        })
                    }
                }
            })

            res.status(200).send(sensorsDetails)
        }
    })
}
