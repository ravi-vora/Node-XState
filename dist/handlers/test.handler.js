var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CONSTANTS } from "../config/constants.config.js";
import { foundDummyEvent } from "../config/errors.config.js";
export const test = (data, acknowledgement, socket) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            global.logger.info('test request data', data);
            resolve(acknowledgement({
                data,
                error: false,
                message: CONSTANTS.ERROR.MESSAGES.TEST_SUCCESS,
            }));
        }
        catch (error) {
            global.logger.error(error);
            if (acknowledgement) {
                return acknowledgement(foundDummyEvent);
            }
            reject(error);
        }
    });
});
//# sourceMappingURL=test.handler.js.map