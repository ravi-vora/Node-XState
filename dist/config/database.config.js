import dotenv from 'dotenv';
dotenv.config();
const environment = {
    development: {
        host: process.env.MONGO_DEV_HOST,
        protocol: process.env.MONGO_DEV_PROTOCOL,
        port: process.env.MONGO_DEV_PORT,
        name: process.env.MONGO_DEV_NAME,
        username: process.env.MONGO_DEV_USERNAME,
        password: process.env.MONGO_DEV_PASSWORD
    },
    production: {
        host: process.env.MONGO_PROD_HOST,
        protocol: process.env.MONGO_PROD_PROTOCOL,
        port: process.env.MONGO_PROD_PORT,
        name: process.env.MONGO_PROD_NAME,
        username: process.env.MONGO_PROD_USERNAME,
        password: process.env.MONGO_PROD_PASSWORD
    },
    test: {
        host: process.env.MONGO_HOST,
        protocol: process.env.MONGO_PROTOCOL,
        port: process.env.MONGO_PORT,
        name: process.env.MONGO_NAME,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD
    }
};
export const db_config = environment[process.env.NODE_ENV] ? environment[process.env.NODE_ENV] : environment.test;
//# sourceMappingURL=database.config.js.map