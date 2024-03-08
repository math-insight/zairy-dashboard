import {executeQuery} from "./databaseConnection.js";

export default function getSimulationDatetime(req, res) {
    const sqlQuery = `SELECT *
                      FROM ttsimulation_info`;

    executeQuery(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: 'internal server error'});
        } else {
            res.status(200).send(result)
        }
    })
}
