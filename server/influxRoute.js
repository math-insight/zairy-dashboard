import express from "express";
import {InfluxDB} from "@influxdata/influxdb-client";
import env from "./envVariables.js";
import normalSensorsValueAcc from "./normalSensorsValueAcc.js";

const queryApi = new InfluxDB({
    url: env.INFLUX_URL,
    token: env.INFLUX_TOKEN
}).getQueryApi(env.INFLUX_ORG);

const influxRouter = express.Router()

influxRouter.get('/normal', async (req, res) => {
    const normalSensorsBucket = 'umzapp';
    const fluxQuery = `from(bucket:"${normalSensorsBucket}") |> range(start: -1d) |> filter(fn: (r) => r._value > 0)`;

    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        if (o._measurement === 'co')
            normalSensorsValueAcc[o.deviceName].co.push(parseFloat(o.rawValue));
        if (o._measurement === 'o3')
            normalSensorsValueAcc[o.deviceName].co.push(parseFloat(o.rawValue));
        if (o._measurement === 'no2')
            normalSensorsValueAcc[o.deviceName].co.push(parseFloat(o.rawValue));
        if (o._measurement === 'so2')
            normalSensorsValueAcc[o.deviceName].co.push(parseFloat(o.rawValue));
        if (o._measurement === 'pm2_5')
            normalSensorsValueAcc[o.deviceName].co.push(parseFloat(o.rawValue));
        if (o._measurement === 'pm10')
            normalSensorsValueAcc[o.deviceName].co.push(parseFloat(o.rawValue));
    }

    res.send(JSON.stringify(normalSensorsValueAcc));
})

influxRouter.get(`/meteo`, async (req, res) => {
    const meteoSensorsValuesAcc = {
        weatherSP2: {
            barometer: [],
            tempOutside: [],
            windCurrentSpeed: [],
        },
        weatherSP8: {
            barometer: [],
            tempOutside: [],
            windCurrentSpeed: [],
        }
    };

    const meteoSensorsBucket = 'umzapp_2';
    const fluxQuery = `from(bucket:"${meteoSensorsBucket}") |> range(start: -1d) |> filter(fn: (r) => r._value > 0)`;

    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);

        if ('Barometer' === o._measurement)
            meteoSensorsValuesAcc[o.id].barometer.push(parseFloat(o._value));
        if ('Temp_Outside' === o._measurement)
            meteoSensorsValuesAcc[o.id].tempOutside.push(parseFloat(o._value));
        if ('Wind_Current_Speed' === o._measurement)
            meteoSensorsValuesAcc[o.id].windCurrentSpeed.push(parseFloat(o._value));
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
    const fluxQuery = `from(bucket:"${referenceSensorBucket}") |> range(start: -1d) |> filter(fn: (r) => r._value > 0)`;

    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        if (Object.prototype.hasOwnProperty.call(referenceSensorMeasurementsAcc, o._measurement)) {
            referenceSensorMeasurementsAcc[o._measurement].push(parseFloat(o._value));
        } else {
            console.log(`Nieznany pomiar: ${o._measurement}`);
        }
    }

    res.send(referenceSensorMeasurementsAcc);
})

export default influxRouter;
