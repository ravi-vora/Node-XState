import { CONSTANTS } from "../config/constants.config.js";
import { foundDummyEvent } from "../config/errors.config.js";
import {Socket} from 'socket.io'

export const test = async (data, acknowledgement, socket: Socket) : Promise<void> => {
    return new Promise((resolve, reject) => {
        try {

            global.logger.info('test request data', data);
            resolve(acknowledgement({
                data,
                error: false,
                message: CONSTANTS.ERROR.MESSAGES.TEST_SUCCESS,
            }));
    
        } catch (error) {
    
            global.logger.error(error);
            if (acknowledgement) {
                return acknowledgement(foundDummyEvent);
            }
            reject(error);
            
        }
    })
}