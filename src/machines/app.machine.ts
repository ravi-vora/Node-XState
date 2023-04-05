import { createMachine, assign } from "xstate";
import { connect_mongodb } from "../services/mongodb.service.js";
import { db_config } from "../config/database.config.js";
import { redisConfig } from "../config/redis.config.js";
import { connect_redis } from "../services/redis.service.js";
import { create_http } from "../services/server.service.js";
import { initialize_socket } from "../services/socket.service.js";

export const AppMachine = createMachine(
    {
        /** @xstate-layout N4IgpgJg5mDOIC5QEEAOqB0BjA9gOzzCwBcB9AW3yhwgCMBiCfMDASzwDccBrFtTXASJlKeanQTsuWAIbFW+ANoAGALorViUKhyxW8-FpAAPRACYAzAHYMARiu2AHFYCsAGhABPRE9sYzZgBsLi4ALM7KgcphVgC+sR782PiEJBRUNAxgAE7ZONkYqAA2cgBm+eQYSYKpIhkSUjiyBngaGkY6ei1GpgjB-sGBZu5eiI5+LvGJ6MlCadmQrLCMzGycPHwzNcKkCxBLkuvNCq1q7UggnfonPYgugX5mTg4AnOFmoU8vHt4Iti+BDAWZQvRxgszKCwvCxgqYgaopHZ7Jb0HJ5ArFMoVKpbRHzRawQ7SOQnNpqDq6a6GC69UIgoHKUKBKwBUK2J4g0I-RAAjAuRwWQVC4UWUJw6oLORgUgAC2IxFQK0Iay4vBxAklxGlcoVRKaJKUZ3JFyu3RpYwcQJe0Te70+-25CCefihFgCthc1jMLI94q2mu18sVaPyhRKxHK2UqErAUtlQb1x0N6mN2kpZtAvQcZgw4w+gTejg+X0dtjLGECleC1q9PsmcLwNDgRn4FK6N3NCAAtLZHV3An6BHi6mJMm2qXhbghQlZS1YXhhQp6y1ZrJFojPB7NarsCeOMyZEFCbB6hiNfv9QnyLIEl8orJDobCEvD-bGtfGFfuO5nEA+bG6jicnaJajE69IPC8ViOHStZPPW0yYOw1wyEUrAAF7SrATS8MQ37Ur+fyQsouZmEBtpFva3xgZYFh2P80GwSydbxPEQA */
        predictableActionArguments: true,
        id: 'App',
        initial: 'connect_mongodb',
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
                        target: 'connection_established',
                        actions: (_, socket) => global.logger.info(socket.data)
                    },
                    onError: {
                        actions: (_, error) => global.logger.error(error)
                    }
                }
            },
            connection_established: {}
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