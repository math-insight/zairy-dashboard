# How to run the project
1. Install dependencies with `npm install`.
2. Create `.env` file with proper values 
```txt
INFLUX_URL=<your-value>
INFLUX_TOKEN=<your-value>
INFLUX_ORG=<your-value>
MYSQL_HOST=<your-value>
MYSQL_USER=<your-value>
MYSQL_PASS=<your-value>
MYSQL_NAME=<your-value>
MYSQL_PORT=<your-value>
PROXY_SERVER_PORT=<your-value>
```
3. Run express proxy server with `npm run start:backend`
4. Run React frontend with vite using `npm run dev`
