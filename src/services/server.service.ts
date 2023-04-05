import http from 'http';
import https from 'https';
import express from 'express';
import fs from 'fs'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export var httpServer : any = null;

export const create_http = async (context, event, src) : Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            const app = express();

            app.use(express.static(join(__dirname, '../../views')))

            const server = process.env.NODE_ENV !== 'test' ? https.createServer({
                key: fs.readFileSync(join(__dirname, '../../ssl/new/artoon.key'), 'utf-8'),
                cert: fs.readFileSync(join(__dirname, '../../ssl/new/artoon.crt'), 'utf-8')
            }, app) : http.createServer(app);

            const port = process.env.NODE_ENV === 'production' ? process.env.PROD_PORT : process.env.DEV_PORT || 3000

            server.listen(port, () => {
                httpServer = server;
                resolve(`Server is running on port: ${port} successfully ✔`);
            })
        } catch(e) {
            reject(e);
        }
    })
}