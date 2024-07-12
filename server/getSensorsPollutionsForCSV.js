import { executeQuery } from "./databaseConnection.js";

/**
 * Handler function to fetch and organize sensor pollution data for CSV export.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} req.query - Query parameters from the request.
 * @param {string} req.query.from - Start date for the data range (inclusive).
 * @param {string} req.query.to - End date for the data range (inclusive).
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * @returns {void}
 */
export default function getSensorsPollutionsForCSV(req, res, next) {
  // Extract sensor IDs from request
  const sensorsIds = req.sensorsDetails
    .map((sensor) => {
      if (sensor.id.includes("S") || sensor.id.includes("R")) return sensor.id;
    })
    .filter((value) => value !== undefined);
  sensorsIds.unshift("DataCzas");


  // Extract start and end dates from request query parameters
  const { from, to } = req.query;

  // SQL query to fetch sensor data within the specified date range
  const sqlQuery = `
    SELECT id, datetime, measurement, value
    FROM ttsensors_value
    WHERE datetime BETWEEN "${from} 00:00:00" AND "${to} 23:59:59"
       AND status != 'predict'
    ORDER BY measurement, datetime
  `;

  // Generate datetime entries for each 15 minutes within the specified date range
  const datetimeEntries = generateDatetimes(from, to);
  const container = [sensorsIds, ...datetimeEntries];
  const columnNameRowIdx = 0;

  // Execute SQL query
  executeQuery(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Extract unique pollutants from query result
      const uniquePollutants = [
        ...new Set(result.map((obj) => obj.measurement)),
      ];

      // Organize pollution data for each pollutant
      const pollutionData = uniquePollutants.map((pollutant) => {
        const measurementEntries = result.filter(
          ({ measurement }) => measurement === pollutant
        );

        // Prepare data structure for CSV
        const sheetDataHolder = container.map((value, index) => {
          if (index === columnNameRowIdx) return value; // Leave column name row as it is

          const [datetime] = value;
          const temp = [datetime];

          // Populate values for each sensor at each datetime
          for (let sensorId of container[columnNameRowIdx]) {
            if (sensorId === "DataCzas") continue;

            const entry = measurementEntries.find(
              (obj) => obj.id === sensorId && obj.datetime === datetime
            );

            temp.push(
              entry ? (entry.value === null ? "" : entry.value) : "" // How replace NULL
            );
          }

          return temp;
        });

        return {
          pollutant,
          aoaData: sheetDataHolder,
        };
      });

      // Send organized pollution data as response
      res.status(200).send(pollutionData);
    }
  });
}

/**
 * Generate datetime entries for each 15 minutes within the specified date range.
 *
 * @param {string} from - Start date for the data range (inclusive).
 * @param {string} to - End date for the data range (inclusive).
 * @returns {Array<Array<string>>} An array of arrays containing formatted datetime strings.
 */
function generateDatetimes(from, to) {
  const startDate = new Date(`${from}T00:00:00Z`);
  const endDate = new Date(`${to}T23:45:00Z`);

  const generatedDatetimes = [];
  let currentDate = new Date(startDate);

  // Generate datetime entries for each 15 minutes
  while (currentDate <= endDate) {
    const isoString = currentDate.toISOString();
    const formattedString = isoString
      .replace("T", " ")
      .replace("Z", "")
      .slice(0, -4);
    generatedDatetimes.push([formattedString]);
    currentDate = new Date(currentDate.getTime() + 15 * 60000);
  }

  return generatedDatetimes;
}
