import * as PinoLogger from 'pino';
import pinoms from 'pino-multi-stream';

import fs from 'fs';
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const configure_globals = () => {
    process.env.TZ = "Asia/Calcutta";

    /**
     * register logger for development env...
     */
    const streams = [
        { stream: process.stdout },
        { stream: fs.createWriteStream(join(__dirname, '../logs/info.log'), { flags: 'a' }) },
    ]

    const logger = PinoLogger.pino({
        level: process.env.PINO_LOG_LEVEL || 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    }, pinoms.multistream(streams));

    PinoLogger.destination(join(__dirname, '../logs/info.log'))

    global.logger = logger;
    global.__filename = __filename;
    global.__dirname = __dirname;
}