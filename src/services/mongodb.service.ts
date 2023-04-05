import mongoose from 'mongoose';


export const connect_mongodb = async (context, event, src) => {
    return new Promise((resolve, reject) => {
        try {
            const db_config = src.endpoint;
            const userCredentials = `${db_config.username}:${db_config.password}@`;
            const db_uri = `${db_config.protocol}://${process.env.NODE_ENV !== 'test' ? userCredentials : ''}${db_config.host}:${db_config.port}/${db_config.name}`
            mongoose.set('strictQuery', true);
            mongoose.connect(db_uri).then(() => {
                resolve('Database connection established successfully ✔');
            }).catch((e : Error) => {
                reject(e);
            })
        } catch(e) {
            reject(e);
        }
    })
}