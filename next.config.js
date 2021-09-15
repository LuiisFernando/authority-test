module.exports = {
    env: {
        HOST: process.env.DB_HOST,
        USERNAME: process.env.DB_USERNAME,
        PASSWORD: process.env.DB_PASSWORD,
        DATABASE: process.env.DB_DATABASE,
        EXPIRESIN: process.env.EXPIRESIN,
        SECRETPASS: process.env.SECRETPASS,
    }
}
