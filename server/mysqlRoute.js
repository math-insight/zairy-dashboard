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

function isValidMeasurementParam(param) {
    const validMeasurements = ['CO', 'NO2', 'O3', 'PM10', 'PM25', 'SO2'];
    return validMeasurements.includes(param);
}

export default mysqlRouter;
