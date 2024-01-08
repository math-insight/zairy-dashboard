import express from 'express';
import cors from 'cors';
import databaseRouter from "./databaseRouter.js";
import env from './envVariables.js'

const server = express();
server.use(cors({methods: 'GET'}))

server.use('/api', databaseRouter);

server.listen(env.PROXY_SERVER_PORT, () => console.log(`App running on port ${env.PROXY_SERVER_PORT}`))
