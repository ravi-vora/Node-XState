var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient } from 'redis';
export var redisClient = null;
export var pubClient = null;
export var subClient = null;
export const connect_redis = (context, event, src) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const redisConfig = src.endpoint;
            var redisConfiguration = {
                socket: {
                    host: redisConfig.host,
                    port: parseInt(redisConfig.port)
                }
            };
            if (process.env.NODE_ENV !== 'test') {
                redisConfiguration['password'] = redisConfig.password;
                redisConfiguration['database'] = parseInt(redisConfig.database_number);
            }
            // const userCredentials = `${redisConfig.password}@`
            // console.log(`${process.env.NODE_ENV !== 'test' ? userCredentials : ''}${redisConfig.protocol}://${redisConfig.host}:${redisConfig.port}/${redisConfig.database_number}`)
            // const client = createClient({
            //     url: `${process.env.NODE_ENV !== 'test' ? userCredentials : ''}${redisConfig.protocol}://${redisConfig.host}:${redisConfig.port}/${redisConfig.database_number}`
            // });
            const client = createClient(redisConfiguration);
            const subClientI = client.duplicate();
            subClientI.on('error', (err) => {
                reject(err);
                process.exit(0);
            });
            client.on('error', (err) => {
                reject(err);
                process.exit(0);
            });
            // connect 
            yield client.connect();
            yield subClientI.connect();
            redisClient = client;
            pubClient = client;
            subClient = subClientI;
            resolve('Redis connection established successfully ✔');
        }
        catch (e) {
            reject(e);
        }
    }));
};
export const redisSetKeyValue = (key, value, isJson = false) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            value = isJson ? JSON.stringify(value) : value;
            const stored = yield redisClient.set(key, value);
            if (stored === 'OK') {
                resolve({
                    success: true,
                    stored: isJson ? JSON.parse(value) : value
                });
            }
            else {
                resolve({
                    success: false,
                    message: 'failed storing value on redis server'
                });
            }
        }
        catch (e) {
            resolve({
                success: false,
                message: e.message
            });
        }
    }));
});
export const redisGetKeyValue = (key, isJson = false) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            var value = yield redisClient.get(key);
            if (value) {
                if (isJson)
                    value = JSON.parse(value);
                resolve({
                    success: true,
                    value
                });
            }
            else {
                resolve({
                    success: false,
                    message: 'not found'
                });
            }
        }
        catch (e) {
            resolve({
                success: false,
                message: `redis failed : ${e.message}`
            });
        }
    }));
});
//# sourceMappingURL=redis.service.js.map