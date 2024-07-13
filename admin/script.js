// Event listener for the form submission
document.getElementById("dateForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  if (validateDates(startDate, endDate)) {
    fetchData(startDate, endDate)
      .then((data) => {
        const pollutantSensorsRaport = createExcelFile(data);

        // Convert binary string to Blob
        const blob = new Blob([s2ab(pollutantSensorsRaport)], {
          type: "application/octet-stream",
        });

        // Save the Blob as a file using FileSaver.js
        saveAs(blob, `dane ${startDate} -- ${endDate}.xlsx`);
      })
      .catch((error) => {
        console.error("Wystąpił błąd podczas pobierania danych:", error);
      });
  } else {
    document.getElementById("message").textContent =
      'Data "od" musi być wcześniejsza niż data "do".';
  }
});

/**
 * Data structure from the fetched resource.
 * @typedef {Object} FetchData
 * @property {string} pollutant - Type of pollutant. Availible pollutants currently are: CO, SO2, NO2, O3, PM10 and PM2.5.
 * @property {Array<Array<string | number>>} aoaData - Array containing measurement data. The first nested array represents column names for the .xlsx file. The first element is "X", which serves only to fill the cell. Then the IDs of all available sensors are saved. Each subsequent nested array has the datetime in the format YYYY-MM-DD HH:MM:SS as the first element, followed by measurement values respectively for each sensor. If the sensor measurement at that time was invalid, the value "N/A" is added.
 */

/**
 * Function to fetch data.
 * @param {string} startDate - Start date of the range.
 * @param {string} endDate - End date of the range.
 * @returns {Promise<FetchData>} Promise with the resource data.
 */
async function fetchData(startDate, endDate) {
  const response = await fetch(
    `https://api.zairymon.pl/api/sensors/csv?from=${startDate}&to=${endDate}`
  );
  const data = await response.json();
  return data;
}
  
/**
 * Function to create an Excel file with a sheet for each pollutant. Returns the file as a binary string.
 * @param {FetchData} data - The fetched data containing pollutant information.
 * @returns {string} The binary string representing the Excel file.
 */
function createExcelFile(data) {
  const workbook = XLSX.utils.book_new();

  for (let { pollutant, aoaData } of data) {
    const worksheet = XLSX.utils.aoa_to_sheet(aoaData);
    XLSX.utils.book_append_sheet(workbook, worksheet, pollutant);
  }

  return XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
}

/**
 * Function to convert a binary string to ArrayBuffer.
 * @param {string} s - The binary string to convert.
 * @returns {ArrayBuffer} The converted ArrayBuffer.
 */
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

/**
 * Function to check if the start date is indeed before the end date.
 * @param {string} startDate - Start date of the range.
 * @param {string} endDate - End date of the range.
 * @returns {boolean} Boolean value indicating if the check passed.
 */
function validateDates(startDate, endDate) {
  return new Date(startDate) <= new Date(endDate);
}
