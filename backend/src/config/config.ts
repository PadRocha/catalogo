export default {
    ENV: process.env.NODE_ENV || 'development',
    KEY: {
        SECRET: process.env.SECRET_KEY || '//password',
        SALT: Number(process.env.SALT) || 11
    },
    DB: {
        URI: process.env.MONGO_URI || 'mongodb://localhost/database',
        USER: process.env.MONGO_USER,
        PASSWORD: process.env.MONGO_PASSWORD
    },
    CDB: {
        C_ENV_VAR: process.env.C_ENV_VAR,
        C_NAME: process.env.C_NAME,
        C_KEY: process.env.C_KEY,
        C_SECRET: process.env.C_SECRET
    },
    LIMIT: {
        KEY: 15,
        LINE: 20
    }
}