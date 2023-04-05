var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createMachine } from "xstate";
import { start_listening_events } from "../services/socket.service.js";
export const gameMachine = createMachine({
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
}, {
    services: {
        start_listening_events: (context, event, { src }) => __awaiter(void 0, void 0, void 0, function* () { return yield start_listening_events(context, event, src); })
    }
});
//# sourceMappingURL=game.machine.js.map