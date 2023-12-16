import express from 'express';
import mysqlRouter from "./mysqlRoute.js";
import influxRouter from "./influxRoute.js";
import env from './envVariables.js'

const server = express();

server.use('/api/sensors', influxRouter);
server.use('/api', mysqlRouter);

server.listen(env.PROXY_SERVER_PORT, () => console.log(`App running on port ${env.PROXY_SERVER_PORT}`))
