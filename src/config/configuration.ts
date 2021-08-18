export default () => ({
    database: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASS,
        dbname: process.env.MONGO_DBNAME
    }
})