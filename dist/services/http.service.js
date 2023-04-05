var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import http from 'http';
import https from 'https';
import express from 'express';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export var httpServer = null;
export const create_http = (context, event, src) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            const app = express();
            app.use(express.static(join(__dirname, '../../views')));
            const server = process.env.NODE_ENV !== 'test' ? https.createServer({
                key: fs.readFileSync(join(__dirname, '../../ssl/new/artoon.key'), 'utf-8'),
                cert: fs.readFileSync(join(__dirname, '../../ssl/new/artoon.crt'), 'utf-8')
            }, app) : http.createServer(app);
            const port = process.env.NODE_ENV === 'production' ? process.env.PROD_PORT : process.env.DEV_PORT || 3000;
            server.listen(port, () => {
                httpServer = server;
                resolve(`Server is running on port: ${port} successfully ✔`);
            });
        }
        catch (e) {
            reject(e);
        }
    });
});
//# sourceMappingURL=http.service.js.map