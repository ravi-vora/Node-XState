var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
export const connect_mongodb = (context, event, src) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            const db_config = src.endpoint;
            const userCredentials = `${db_config.username}:${db_config.password}@`;
            const db_uri = `${db_config.protocol}://${process.env.NODE_ENV !== 'test' ? userCredentials : ''}${db_config.host}:${db_config.port}/${db_config.name}`;
            mongoose.set('strictQuery', true);
            mongoose.connect(db_uri).then(() => {
                resolve('Database connection established successfully ✔');
            }).catch((e) => {
                reject(e);
            });
        }
        catch (e) {
            reject(e);
        }
    });
});
//# sourceMappingURL=mongodb.service.js.map