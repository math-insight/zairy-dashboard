import {executeQuery} from "./databaseConnection.js";

export default function getSensorsDetails(req, res, next) {
    const sqlQuery = `SELECT id, type, title, address, longitude, latitude
                      FROM sensors
                      WHERE type != 'base'`

    executeQuery(sqlQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        } else {
            req.sensorsDetails = result;
            next();
        }
    });
}

