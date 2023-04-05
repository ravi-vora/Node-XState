export const CONSTANTS = {
    SOCKET: {
        EVENTS: {
            CORE: {
                DISCONNECT: 'disconnect',
                CONNECT: 'connection'
            },
            CUSTOM: {
                TEST: 'TEST',
                SIGN_UP: 'SIGN_UP',
                SIGN_UP_FAIL: 'SIGN_UP_FAIL',
                SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
                SIGN_IN: 'SIGN_IN',
                SIGN_IN_FAIL: 'SIGN_IN_FAIL',
                SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
                VERIFY_AUTH: 'VERIFY_AUTH',
                VERIFY_AUTH_FAIL: 'VERIFY_AUTH_FAIL',
                VERIFY_AUTH_SUCCESS: 'VERIFY_AUTH_SUCCESS',
                PLAY_GAME: 'PLAY_GAME',
                PLAY_GAME_FAIL: 'PLAY_GAME_FAIL',
                PLAY_GAME_SUCCESS: 'PLAY_GAME_SUCCESS',
                JOIN_GAME: 'JOIN_GAME',
                JOIN_GAME_FAIL: 'JOIN_GAME_FAIL',
                JOIN_GAME_SUCCESS: 'JOIN_GAME_SUCCESS',
                PLAYER_MOVE: 'PLAYER_MOVE',
                PLAYER_MOVE_FAIL: 'PLAYER_MOVE_FAIL',
                PLAYER_MOVE_SUCCESS: 'PLAYER_MOVE_SUCCESS',
                HEALTH_UPDATE: 'HEALTH_UPDATE',
                HEALTH_UPDATE_FAIL: 'HEALTH_UPDATE_FAIL',
                HEALTH_UPDATE_SUCCESS: 'HEALTH_UPDATE_SUCCESS',
                FLUSH_DB: 'FLUSH_DB',
                FLUSH_DB_FAIL: 'FLUSH_DB_FAIL',
                FLUSH_DB_SUCCESS: 'FLUSH_DB_SUCCESS',
                PLAYER_DATA: 'PLAYER_DATA',
                PLAYER_DATA_SUCCESS: 'PLAYER_DATA_SUCCESS',
                PLAYER_DATA_FAIL: 'PLAYER_DATA_FAIL',
                GAME_EXPIRED: 'GAME_EXPIRED',
                PLAYER_KILL: 'PLAYER_KILL',
                PLAYER_KILL_SUCCESS: 'PLAYER_KILL_SUCCESS',
                PLAYER_KILL_FAIL: 'PLAYER_KILL_FAIL'
                // SELECT_TABLE: 'SELECT_TABLE',
                // GAME_START: 'GAME_START',
                // COLLECT_ENTRYFEE: 'COLLECT_ENTRYFEE',
                // NO_PLAYER: 'NO_PLAYER',
                // RETRY: 'RETRY',
                // TURN_INFO: 'TURN_INFO',
                // PLAYER_INFO: 'PLAYER_INFO',
                // SEND_MESSAGE: 'SEND_MESSAGE',
                // LEAVE_TABLE: 'LEAVE_TABLE',
                // MOVE : 'MOVE'
            }
        }
    },
    GAME: {
        PLAYERS_PER_GAME: 1, // always use f(n) = f(n-1), hence 2 => 1
        GAME_TIME_LIMIT: 10, // in minutes only
        PLAYER_POSITIONS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    },
    ERROR: {
        MESSAGES: {
            TEST_SUCCESS: 'successfully tested',
            DUMMY_EVENT: 'Event doest not exist on server'
        }
    },
    REDIS: {
        MATCH: 'MATCH',
        GAME_TIMERS: 'GAME_TIMERS'
    },
    PLAYER: 'PLAYER'
}