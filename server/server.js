import express from "express";
import cors from "cors";
import env from "./envVariables.js";
import getSensorsPollutionMeasurements from "./getSensorsPollutionMeasurements.js";
import getSensorsDetails from "./getSensorsDetails.js";
import getSensorsWeatherMeasurements from "./getSensorsWeatherMeasurements.js";
import getSimulationPolygons from "./getSimulationPolygons.js";
import getSimulationDatetime from "./getSimulationDatetime.js";
import getSensorsPollutionsForCSV from "./getSensorsPollutionsForCSV.js";

const server = express();
server.use(cors({ methods: "GET" }));

server.get(
  "/api/sensors",
  getSensorsDetails,
  getSensorsPollutionMeasurements,
  getSensorsWeatherMeasurements
);
server.get("/api/sensors/csv", getSensorsDetails, getSensorsPollutionsForCSV);
server.get("/api/simulation", getSimulationPolygons);
server.get("/api/simulation/datetime", getSimulationDatetime);
server.listen(env.PROXY_SERVER_PORT, () =>
  console.log(`App running on port ${env.PROXY_SERVER_PORT}`)
);
