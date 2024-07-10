import {executeQuery} from "./databaseConnection.js";

const MICROGRAMS_PER_MILLIGRAM = 1000;

export default function getSensorsPollutionMeasurements(req, res, next) {
    const {sensorsDetails} = req;
    const sqlQuery = `SELECT id, datetime, measurement, value, status, col
                      FROM ttsensors_value
                      WHERE datetime >= NOW() - INTERVAL 1 DAY`;

    executeQuery(sqlQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        } else {
            result.forEach(row => {
                const {measurement} = row

                if (measurement) {
                    const sensor = sensorsDetails.find(sensor => sensor.id === row.id);


                    if (sensor) {
                        if (!sensor.data) {
                            sensor.data = {};
                        }
                        if (!sensor.data[measurement]) {
                            sensor.data[measurement] = [];
                        }

                        if (measurement === 'CO') {
                            row.value === null ? console.log(row.value, row.datetime, sensor.id) : "";
                            sensor.data[measurement].push({
                                datetime: row.datetime,
                                value: row.value === null ? null : row.value / MICROGRAMS_PER_MILLIGRAM,
                                status: row.status,
                                color: row.col,
                            })
                        } else {
                            sensor.data[measurement].push({
                                datetime: row.datetime,
                                value: row.value,
                                status: row.status,
                                color: row.col,
                            })
                        }

                    }
                }
            })
        }

        next()
    })
}
