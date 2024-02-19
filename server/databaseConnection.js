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

//

//
// databaseRouter.get('/sensors/pollutions/chart', (req, res) => {
//     const tableName = 'ttsensors_value';
//     const ids = [
//         'be7a0000000029f1',
//         'be7a0000000029f2',
//         'be7a0000000029f3',
//         'be7a0000000029f4',
//         'be7a0000000029f5',
//         'be7a0000000029f6',
//         'be7a0000000029f7',
//         'be7a0000000029f8',
//         'be7a0000000029f9',
//         'be7a0000000029fa',
//         'be7a0000000029fb',
//         'be7a0000000029fc',
//         'be7a0000000029fd',
//         'be7a0000000029fe',
//         'reference'
//     ]
//
//     const sqlQuery = `CREATE TABLE sensors_info
//                       (
//                           id        INT AUTO_INCREMENT,
//                           legacy_id CHAR(20),
//
//                       )`
//
//
//     executeQuery(sqlQuery, (err, result) => {
//         if (err) {
//             res.status(404).json({error: 'internal server error'});
//         } else {
//             console.log(result)
//
//             res.send('success')
//         }
//     })
// })
//
//
// export default databaseRouter;
