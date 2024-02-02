import express from "express";
import * as mysql from "mysql2";
import env from './envVariables.js'

const databaseRouter = express.Router();

const mysqlPool = mysql.createPool({
    connectTimeout: 10000,
    connectionLimit: 100,
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASS,
    database: env.MYSQL_NAME,
    port: env.MYSQL_PORT
});

const executeQuery = (sqlQuery, callback) => {
    mysqlPool.getConnection((err, connection) => {
        if (err) {
            return callback(err, null);
        }
        connection.query(sqlQuery, (error, results) => {
            connection.release();
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    });
};

databaseRouter.get('/sensors/meteo', (req, res) => {
    const tableName = 'ttmeteo_value';
    const sqlQuery = `SELECT DISTINCT id,
                                      measurement,
                                      value
                      FROM ${tableName}
                      GROUP BY id, measurement;`;

    executeQuery(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(404).json({error: 'internal server error'});
        } else {
            const mergedSensorsData = result.reduce((acc, item) => {
                const {id, measurement, value} = item;
                const found = acc.find(x => x.id === id);
                if (found) {
                    found.data.push({measurement, value});
                } else {
                    acc.push({id, data: [{measurement, value}]})
                }

                return acc;
            }, []);

            return res.send(mergedSensorsData)
        }
    })
})

databaseRouter.get('/sensors/pollutions', (req, res) => {
    const tableName = 'ttsensors_value';
    const sqlQuery = `SELECT DISTINCT id,
                                      measurement,
                                      value
                      FROM ${tableName}
                      GROUP BY id, measurement;`;

    executeQuery(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(404).json({error: 'internal server error'});
        } else {
            const mergedSensorsData = result.reduce((acc, item) => {
                const {id, measurement, value} = item;
                const found = acc.find(x => x.id === id);
                if (found) {
                    found.data.push({measurement, value});
                } else {
                    acc.push({id, data: [{measurement, value}]})
                }

                return acc;
            }, []);

            return res.send(mergedSensorsData)
        }
    })
})

databaseRouter.get('/simulation', (req, res) => {
    const param = req.query.param;
    if (!isValidMeasurementParam(param)) return res.status(400).json({error: 'invalid param value'});

    const tableName = 'ttsimulation';

    const sqlQuery = `SELECT lon1,
                             lat1,
                             lon2,
                             lat2,
                             lon3,
                             lat3,
                             lon4,
                             lat4,
                             col
                      FROM ${tableName}
                      WHERE pollution = "${param}"`;

    executeQuery(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(404).json({error: 'internal server error'});
        } else {
            const polygonSimData = result.map(row => ({
                coordinates: [[row.lat1, row.lon1], [row.lat2, row.lon2], [row.lat3, row.lon3], [row.lat4, row.lon4]],
                color: row.col
            }))
            return res.send({
                datetime: '2023-12-27T21:30:00.000Z',
                pollutant: param,
                polygonSimData
            })
        }
    })
})

function isValidMeasurementParam(param) {
    const validMeasurements = ['CO', 'NO2', 'O3', 'PM10', 'PM25', 'SO2'];
    return validMeasurements.includes(param);
}

export default databaseRouter;
