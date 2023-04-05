import { createAdapter } from '@socket.io/redis-adapter';
import { pubClient, subClient } from './redis.service.js';
import { httpServer } from './server.service.js';
import { Server, Socket } from 'socket.io';
import { CONSTANTS } from '../config/constants.config.js'
// import { SocketHandler } from '../handlers/socket.handler.js';
import { instrument } from "@socket.io/admin-ui";
import { Player } from '../models/player.model.js';

export var IO: Server = null;
export var SocketBroadCast : any = null;

export const disconnectPlayer = async (socket: Socket): Promise<void> => {
    return new Promise((resolve, reject): void => {
      try {
        Player.findOneAndUpdate(
          { socketId: socket.id },
          { socketId: null },
          { new: true }
        )
          .then((player) => {
            global.logger.info("player disconnected!");
            global.logger.debug(JSON.stringify(player));
            resolve();
          })
          .catch((e: Error) => {
            reject(e);
          });
      } catch (e) {
        reject(e);
      }
    });
  };

export const initialize_socket = async (context, event, src) : Promise<any> => {
    return new Promise(async (resolve, reject) => {
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
            })

            IO.on(CONSTANTS.SOCKET.EVENTS.CORE.CONNECT, async (socket: Socket) => {
                global.logger.info(IO.engine.eventNames);

                socket.on(CONSTANTS.SOCKET.EVENTS.CORE.DISCONNECT, async () => await disconnectPlayer(socket))

                socket.on("disconnect", (reason) => {
                    global.logger.info('disconnect : ')
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

                // TODO: left here...
                // await SocketHandler(socket);
            })
            resolve(`Socket connection established successfully ✔`);
        } catch(e) {
            reject(e);
        }
    })
}