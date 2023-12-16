import express from "express";
import * as mysql from "mysql2";
import env from './envVariables.js'

const mysqlRouter = express.Router();

mysqlRouter.get(`/simulation`, async (req, res) => {
    const tableName = 'ttsimulation'
    const mysqlConnection = mysql.createConnection({
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASS,
        database: env.MYSQL_NAME,
        port: env.MYSQL_PORT
    })

    mysqlConnection.query(
        `SELECT *
         FROM ${tableName}`, (err, data) => {
            if (err) console.error(err)
            else res.send(JSON.stringify(data))
        }
    )
})
export default mysqlRouter;
