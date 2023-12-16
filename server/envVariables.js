import {cleanEnv, num, str} from "envalid";
import 'dotenv/config';

const env = cleanEnv(process.env, {
    MYSQL_HOST: str(),
    MYSQL_USER: str(),
    MYSQL_PASS: str(),
    MYSQL_NAME: str(),
    MYSQL_PORT: num(),
    INFLUX_URL: str(),
    INFLUX_TOKEN: str(),
    INFLUX_ORG: str(),
    PROXY_SERVER_PORT: num()
})

export default env;
