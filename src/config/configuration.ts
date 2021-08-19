import {registerAs} from "@nestjs/config";

export default registerAs(
    'config',
    () => ({
        database: {
            username: process.env.MONGO_USER,
            password: process.env.MONGO_PASS,
            dbname: process.env.MONGO_DBNAME
        },
        jwtToken: process.env.jwtToken
    })
)