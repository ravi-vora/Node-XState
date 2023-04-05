import { createMachine, assign, actions } from "xstate";
import { connect_mongodb } from "../services/mongodb.service.js";
import { db_config } from "../config/database.config.js";
import { redisConfig } from "../config/redis.config.js";
import { connect_redis } from "../services/redis.service.js";
import { create_http } from "../services/server.service.js";
import { initialize_socket } from "../services/socket.service.js";
import { gameMachine } from "./game.machine.js";

export const AppMachine = createMachine(
    {
        /** @xstate-layout N4IgpgJg5mDOIC5QEEAOqB0BjA9gOzzCwBcB9AW3yhwgCMBiCfMDASzwDccBrFtTXASJlKeanQTsuWAIbFW+ANoAGALorViUKhyxW8-FpAAPRACYAzAHYMARiu2AHM4Csj67dvLHAGhABPRCdbDDMzADYXAE4AFgdlF2jbGIBfFL9+bHxCEgoqGgYwACcinCKMVAAbOQAzMvIMTMEckXyJKRxZAzwNDSMdPW6jUwRI0MjwizCzKzMYtws-QIRHEJdlDYsXKYtvOdT0kCbs4VIiyFZYRmY2Th4+dCyhXPOIS8k7roUetT6kEAG+m+w0QLnCITMTisUXCMUcZkcylmSyCMIwuyijkx0LMMPcBwyj2ap1el3oxVK5SqtXqjSJJxeF1gH2kcm+vTU-V0QMM-xGMWUUXRyjiCJiEQsMXCjnCKIQaIWFnC4SscSsVixBKORPOcjApAAFsRiKhroRblxeHSBLriPqjSaWZ02Upfpz-oChnzEI4HOiospwjDYZEZlE5ZCQhYolNHDEA2Fo9Y0oSbWA9YbjaaKWUKtViHUig0mrb7VmnV9Xep3dpuV7QCMHGYMKszC4zMo27iOzE5Z4QsrlZj7HMrNtHCntZh2ECZJVWAAvfWwTq8YhmlgdK2ZGfyOeL5ersDECsun7VzQeuvA70IWwd5QYMcbKVRLyxWERiIYOKRZyYqU4RcLUdzwWd5yXUgVywNdyRKXNqQLWlQPAg8oKPE8Okrc8-lrQYbwbIIRWbbZbAsaMwXheZfACIJv2fTsomiBwHEcFw0kOPAaDgIx+C5fDeUIhAAFpbDlYTwknY5nlaMQCn4nk8BBBA4j7aEf1IyJgMxFwrGUCwpPpGSziZBT6xMRBoxsWwwRmFVJisXYXD7WIMG2WEYSiVVEi2Qy0wzB1UDMgiLIQPSbFjewgxmeZ7wjQUMHBTEEWjKI5iiLy-NuVDIOgtdgsE0KvF2FsEUsANESxGyvxiJ99Js5Lo0AkCjJab5SDgYgZFoedYANSACqU28yO2RLBVFdZbGVBwIzhUJ6oy9sZUFMEOJSIA */
        predictableActionArguments: true,
        id: 'App',
        initial: 'connect_mongodb',
        context: {
            socket: null
        },
        states: {
            connect_mongodb: {
                id: 'connect_mongodb',
                invoke: {
                    src: {
                        type: 'connect_mongodb',
                        endpoint: db_config
                    },
                    onDone: {
                        target: 'connect_redis',
                        actions: (_, db) => global.logger.info(db.data)
                    },
                    onError: {
                        actions: (_, error) => global.logger.error(error)
                    }
                }
            },
            connect_redis: {
                id: 'connect_redis',
                invoke: {
                    src: {
                        type: 'connect_redis',
                        endpoint: redisConfig
                    },
                    onDone: {
                        target: 'create_http',
                        actions: (_, redis) => global.logger.info(redis.data)
                    },
                    onError: {
                        actions: (_, error) => global.logger.error(error)
                    }
                }
            },
            create_http: {
                id: 'create_http',
                invoke: {
                    src: {
                        type: 'create_http',
                        endpoint: {}
                    },
                    onDone: {
                        target: 'initialize_socket',
                        actions: (_, httpServer) => global.logger.info(httpServer.data)
                    },
                    onError: {
                        actions: (_, error) => global.logger.error(error)
                    }
                }
            },
            initialize_socket: {
                id: 'initialize_socket',
                invoke: {
                    src: {
                        type: "initialize_socket",
                        endpoint: {}
                    },
                    onDone: {
                        target: 'all_connection_established',
                        actions: (_, socket) => global.logger.info(socket.data)
                    },
                    onError: {
                        actions: (_, error) => global.logger.error(error)
                    }
                }
            },
            all_connection_established: {
                id: 'all_connection_established',
                invoke: {
                    src: gameMachine,
                    onDone: {
                        actions: (_, events) => global.logger.info(events.data)
                    },
                    onError: {
                        actions: (_, error) => global.logger.error(error)
                    }
                }
            }
        }
    },
    {
        services: {
            connect_mongodb: async (context, event, {src}) => await connect_mongodb(context, event, src),
            connect_redis: async (context, event, {src}) => await connect_redis(context, event, src),
            create_http: async (context, event, {src}) => await create_http(context, event, src),
            initialize_socket: async (context, event, {src}) => await initialize_socket(context, event, src)
        }
    }
)