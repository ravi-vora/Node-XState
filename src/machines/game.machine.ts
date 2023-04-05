import { createMachine } from "xstate";
import { start_listening_events } from "../services/socket.service.js";

export const gameMachine = createMachine(
    {
        predictableActionArguments: true,
        id: 'Game',
        initial: 'start_listening_events',
        states: {
            start_listening_events: {
                invoke: {
                    id: 'start_listening_events',
                    src: {
                        type: 'start_listening_events',
                        endpoint: {}
                    },
                    onDone: {
                        actions: (_, serviceStatus) => global.logger.info(serviceStatus.data)
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
            start_listening_events: async (context, event, {src}) => await start_listening_events(context, event, src)
        }
    }
);