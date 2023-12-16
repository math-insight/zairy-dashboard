import express from "express";
import {InfluxDB} from "@influxdata/influxdb-client";
import env from "./envVariables.js";

const queryApi = new InfluxDB({
    url: env.INFLUX_URL,
    token: env.INFLUX_TOKEN
}).getQueryApi(env.INFLUX_ORG);

const influxRouter = express.Router()

// possible query strings co, o3, no2, so2, pm2_5, pm10
influxRouter.get('/normal', async (req, res) => {
    const measurement = req.query.measurement;
    const sensorsValueAcc = {
        zestaw01: [],
        zestaw02: [],
        zestaw03: [],
        zestaw04: [],
        zestaw05: [],
        zestaw06: [],
        zestaw07: [],
        zestaw08: [],
        zestaw09: [],
        zestaw10: [],
        zestaw11: [],
        zestaw12: [],
        zestaw13: [],
        zestaw14: [],
    }

    const normalSensorsBucket = 'umzapp';
    const fluxQuery = `from(bucket:"${normalSensorsBucket}") |> range(start:-3h, stop: 0h)`;

    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        if (o._measurement === measurement)
            sensorsValueAcc[o.deviceName].push(parseFloat(o.rawValue));
    }

    res.send(JSON.stringify(sensorsValueAcc));
})

// possible query strings Barometer, Temp_Outside, Wind_Current_Speed
influxRouter.get(`/meteo`, async (req, res) => {
    const measurement = req.query.measurement;
    const meteoSensorsValuesAcc = {
        weatherSP2: [],
        weatherSP8: []
    };

    const meteoSensorsBucket = 'umzapp_2';
    const fluxQuery = `from(bucket:"${meteoSensorsBucket}") |> range(start:-3h, stop: 0h) |> yield()`;

    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        if (measurement === o._measurement)
            meteoSensorsValuesAcc[o.id].push(parseFloat(o._value));
    }

    res.send(meteoSensorsValuesAcc);
})

influxRouter.get(`/reference`, async (req, res) => {
    const referenceSensorMeasurementsAcc = {
        CO: [],
        NO2: [],
        O3: [],
        PM10: [],
        'PM2.5': [],
        SO2: []
    };

    const referenceSensorBucket = 'umzapp_3';
    const fluxQuery = `from(bucket:"${referenceSensorBucket}") |> range(start:-3h, stop: 0h)`;


    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        referenceSensorMeasurementsAcc[o._measurement].push(parseFloat(o._value));
    }

    res.send(referenceSensorMeasurementsAcc);
})

export default influxRouter;
