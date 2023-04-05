import dotenv from 'dotenv';
dotenv.config();
const environment = {
    development: {
        port: process.env.REDIS_DEV_PORT,
        host: process.env.REDIS_DEV_HOST,
        protocol: process.env.REDIS_DEV_PROTOCOL,
        database_number: process.env.REDIS_DEV_DB,
        username: process.env.REDIS_DEV_USERNAME,
        password: process.env.REDIS_DEV_PASSWORD
    },
    production: {
        port: process.env.REDIS_PROD_PORT,
        host: process.env.REDIS_PROD_HOST,
        protocol: process.env.REDIS_PROD_PROTOCOL,
        database_number: process.env.REDIS_PROD_DB,
        username: process.env.REDIS_PROD_USERNAME,
        password: process.env.REDIS_PROD_PASSWORD
    },
    test: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        protocol: process.env.REDIS_PROTOCOL,
        database_number: process.env.REDIS_DB
    }
};
export const redisConfig = environment[process.env.NODE_ENV] ? environment[process.env.NODE_ENV] : environment.test;
//# sourceMappingURL=redis.config.js.map