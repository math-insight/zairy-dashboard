import express from "express";
import * as mysql from "mysql2";
import env from './envVariables.js'
import createGeoJsonPolygons from "./geoJsonMapping/createGeoJsonPolygons.js";

const mysqlRouter = express.Router();

mysqlRouter.get(`/simulation`, async (req, res) => {
    const measurement = req.query.measurement;
    if (!isValidMeasurementParam(req.query.measurement)) return res.status(400).json({error: 'invalid measurement value'});

    const tableName = 'ttsimulation';
    const mysqlConnection = mysql.createConnection({
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASS,
        database: env.MYSQL_NAME,
        port: env.MYSQL_PORT
    })

    mysqlConnection.query(
        `SELECT lon, lat, ${measurement}
         FROM ${tableName}`, (err, data) => {
            if (err) console.error(err)
            else return res.send(createGeoJsonPolygons(data, measurement))
        }
    )
})

mysqlRouter.get('/sensors/air-pollution', async (req, res) => {
    const param = req.query.param;
    if (!isValidMeasurementParam(param)) return res.status(400).json({error: 'invalid measurement value'});

    const tableName = 'ttsensors_value';
    const mysqlConnection = mysql.createConnection({
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASS,
        database: env.MYSQL_NAME,
        port: env.MYSQL_PORT
    })

    mysqlConnection.query(`SELECT *
                           FROM ${tableName}
                           WHERE measurement = '${param}'`, (err, result) => {
        if (err) {
            console.error(err);
            res.status(404).json({error: 'internal server error'});
        } else
            return res.send(result)
    })

})

mysqlRouter.get('/api/sensors/meteo', (req, res) => {
    const param = req.query.param;
    if (!isValidMeteoMeasurementParam(param)) return res.status(400).json({error: 'invalid measurement value'});
    const sensorId = req.query.sensorId;
    if (!isValidSensorId(sensorId)) return res.status(400).json({error: 'invalid measurement value'});

    const tableName = 'ttmeteo_value';
    const mysqlConnection = mysql.createConnection({
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASS,
        database: env.MYSQL_NAME,
        port: env.MYSQL_PORT
    })

    const sqlQuery = sensorId ? `SELECT *
                                 FROM ${tableName}
                                 WHERE measurement = '${param}'
                                   AND datetime >= NOW() - INTERVAL 1 DAY;` : `SELECT *
                                                                               FROM ${tableName}
                                                                               WHERE measurement = '${param}'
                                                                                 AND datetime >= NOW() - INTERVAL 1 DAY;`;

    mysqlConnection.query(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(404).json({error: 'internal server error'});
        } else
            return res.send(result)
    })
})

function isValidMeasurementParam(param) {
    const validMeasurements = ['CO', 'NO2', 'O3', 'PM10', 'PM25', 'SO2'];
    return validMeasurements.includes(param);
}

function isValidMeteoMeasurementParam(param) {
    const validMeteoMeasurements = ['Barometer', 'Temp_Outside', 'Wind_Current_Speed'];
    return validMeteoMeasurements.includes(param)
}

function isValidSensorId(param) {
    const validAirPollutionSensors = ['reference', 'be7a0000000029f7', 'be7a0000000029fc', 'be7a0000000029fd', 'be7a0000000029fe', 'be7a0000000029f2', 'be7a0000000029f9', 'be7a0000000029fa', 'be7a0000000029fb', 'be7a0000000029f5', 'be7a0000000029f6', 'be7a0000000029f1', 'be7a0000000029f8', 'be7a0000000029f3', 'be7a0000000029f4']
    return validAirPollutionSensors.includes(param);
}

export default mysqlRouter;
