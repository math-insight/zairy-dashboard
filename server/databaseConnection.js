import * as mysql from "mysql2";
import env from './envVariables.js'

export const mysqlPool = mysql.createPool({
    connectTimeout: 10000,
    connectionLimit: 100,
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASS,
    database: env.MYSQL_NAME,
    port: env.MYSQL_PORT
});

export const executeQuery = (sqlQuery, callback) => {
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
