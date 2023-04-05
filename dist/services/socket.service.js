var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createAdapter } from '@socket.io/redis-adapter';
import { pubClient, subClient } from './redis.service.js';
import { httpServer } from './server.service.js';
import { Server } from 'socket.io';
import { CONSTANTS } from '../config/constants.config.js';
// import { SocketHandler } from '../handlers/socket.handler.js';
import { instrument } from "@socket.io/admin-ui";
import { Player } from '../models/player.model.js';
import { test } from '../handlers/test.handler.js';
import { convertStringtoObject } from '../helpers/common.helper.js';
import { isJsonString, makeResponse } from '../helpers/utils.helper.js';
export var IO = null;
export var SocketBroadCast = null;
export var socket_G = null;
export const disconnectPlayer = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            Player.findOneAndUpdate({ socketId: socket.id }, { socketId: null }, { new: true })
                .then((player) => {
                global.logger.info("player disconnected!");
                global.logger.debug(JSON.stringify(player));
                resolve();
            })
                .catch((e) => {
                reject(e);
            });
        }
        catch (e) {
            reject(e);
        }
    });
});
export const initialize_socket = (context, event, src) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            IO = new Server(httpServer, {
                cors: {
                    origin: ["*", "https://admin.socket.io"],
                    credentials: true
                },
                pingInterval: 4000,
                maxHttpBufferSize: 1e8,
                pingTimeout: 10000,
                connectionStateRecovery: {
                    // the backup duration of the sessions and the packets
                    maxDisconnectionDuration: 2 * 60 * 1000,
                    // whether to skip middlewares upon successful recovery
                    skipMiddlewares: false,
                },
                allowEIO3: true
            });
            IO.adapter(createAdapter(pubClient, subClient));
            instrument(IO, {
                auth: false,
                readonly: true
            });
            resolve(`Socket connection established successfully ✔`);
        }
        catch (e) {
            reject(e);
        }
    }));
});
var handlers = {};
handlers[`${CONSTANTS.SOCKET.EVENTS.CUSTOM.TEST}`] = (data, acknowledgement, socket) => __awaiter(void 0, void 0, void 0, function* () { return yield test(data, acknowledgement, socket); });
export const SocketHandler = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        socket.onAny((eventName, value, acknowledgement) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (typeof value === 'string')
                    value = convertStringtoObject(value);
                let data = isJsonString(value) ? JSON.parse(value) : value;
                handlers[eventName] ? handlers[eventName](data, acknowledgement, socket, eventName) : (() => {
                    global.logger.info('wrong event name');
                    global.logger.info(eventName);
                    global.logger.info(value);
                    socket.emit('wrong', makeResponse({
                        msg: 'wrong event name'
                    }));
                })();
                resolve();
            }
            catch (e) {
                global.logger.info('wrong payload again');
                global.logger.error(e.message);
                acknowledgement(makeResponse({
                    msg: e.message
                }));
                reject(e);
            }
        }));
    });
});
// XState service
export const start_listening_events = (context, event, src) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            IO.on(CONSTANTS.SOCKET.EVENTS.CORE.CONNECT, (socket) => __awaiter(void 0, void 0, void 0, function* () {
                global.logger.info(IO.engine.eventNames);
                socket.on(CONSTANTS.SOCKET.EVENTS.CORE.DISCONNECT, () => __awaiter(void 0, void 0, void 0, function* () { return yield disconnectPlayer(socket); }));
                socket.on("disconnect", (reason) => {
                    global.logger.info('disconnect : ');
                    global.logger.info(reason);
                    // for (const room of socket.rooms) {
                    //   if (room !== socket.id) {
                    //     socket.to(room).emit("user has left", socket.id);
                    //   }
                    // } 
                });
                socket.on("disconnecting", (reason) => {
                    global.logger.info(reason);
                    // for (const room of socket.rooms) {
                    //   if (room !== socket.id) {
                    //     socket.to(room).emit("user has left", socket.id);
                    //   }
                    // } 
                });
                socket.on("error", (e) => {
                    global.logger.error(e);
                });
                SocketBroadCast = socket.broadcast;
                yield SocketHandler(socket);
            }));
            resolve(`Started listening all events...`);
        }
        catch (e) {
            reject(e);
        }
    });
});
//# sourceMappingURL=socket.service.js.map