import { Password, Token, TokenStatus } from "../config/user.config.js";
import crypto from 'crypto'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'
import { CONSTANTS } from "../config/constants.config.js";
import { IO } from "../services/socket.service.js";
import { addMinutes } from "./game.helper.js";
import { redisGetKeyValue, redisSetKeyValue } from "../services/redis.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const privKey : string = fs.readFileSync(path.join(__dirname, '..', '../ssl/', 'id_rsa_priv.pem'), 'utf-8');
const pubKey : string = fs.readFileSync(path.join(__dirname, '..', '../ssl/', 'id_rsa_pub.pem'), 'utf-8');

export const validateEmail = ( email : string ) : boolean => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) ? true : false;
};

export const validatePhone = ( phone: string ) : boolean => {
    return phone
    .match(
        /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/
    ) ? true : false;
}

export const genPassword = ( password: string ) : Password => {
    const salt = crypto.randomBytes(32).toString('hex')
	const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

    return {
        hash,
        salt
    };
}

export const comparePassword = ( password: string, hash: string, salt: string ) : boolean => {
    const newHash : string = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return newHash === hash
}

export const issueJWT = ( id: string ) : Token => {
    const expiresIn = '1d'
	const payload = {
		sub:id,
		iat:Date.now(),
		exp:Math.floor(Date.now() / 1000) + (24 * 60 *60)
	}
	const jwt = jsonwebtoken.sign(payload, privKey, {algorithm:'RS256'})
	return {
		token: 'Bearer ' + jwt,
		expires: expiresIn
	}
}

export const makeResponse = (obj: object) => {
    return JSON.stringify(obj);
}

export const verifyJwt = ( token: string ) : TokenStatus => {
    try {
        const tokenStatus = jsonwebtoken.verify(token.split(" ")[1], pubKey, { algorithms: 'RS256' });

        if ( tokenStatus && (tokenStatus.iat + tokenStatus.exp) < Date.now()) {
            return {
                validate: false,
                message: 'token has been expired.'
            }
        } else if(tokenStatus) {
            return {
                validate: true,
                message: 'token has been validated successfully.',
                id: tokenStatus.sub
            }
        } else {
            return {
                validate: false,
                message: 'invalid token'
            }
        }
    } catch(e) {
        return {
            validate: false,
            message: 'invalid token'
        }
    }
}

export const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const startGameTimer = async (gameId: string, duration: number) : Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {

            var allGameTimers = await redisGetKeyValue(CONSTANTS.REDIS.GAME_TIMERS, true);
            
            if (allGameTimers.success) {
                if (!allGameTimers.value[gameId]) {
                    allGameTimers.value[gameId] = duration;
                    await redisSetKeyValue(CONSTANTS.REDIS.GAME_TIMERS, allGameTimers.value, true);

                    setTimeout(() => {
                        IO.to(gameId).emit(CONSTANTS.SOCKET.EVENTS.CUSTOM.GAME_EXPIRED, makeResponse({
                            msg: 'Game over',
                            en: CONSTANTS.SOCKET.EVENTS.CUSTOM.GAME_EXPIRED
                        }))
                    }, addMinutes(new Date(), duration).getTime() - new Date().getTime());

                    resolve();
                } else resolve();
            } else {
                await redisSetKeyValue(CONSTANTS.REDIS.GAME_TIMERS, { [gameId]: duration }, true)

                setTimeout(() => {
                    IO.to(gameId).emit(CONSTANTS.SOCKET.EVENTS.CUSTOM.GAME_EXPIRED, makeResponse({
                        msg: 'Game over',
                        en: CONSTANTS.SOCKET.EVENTS.CUSTOM.GAME_EXPIRED
                    }))
                }, addMinutes(new Date(), duration).getTime() - new Date().getTime());

                resolve()
            }

        } catch(e) {
            reject(e);
        }
    })
}