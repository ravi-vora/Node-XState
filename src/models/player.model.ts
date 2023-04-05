import mongoose from 'mongoose'

const PlayerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    socketId: {
        type: String,
        default: null
    },
    isWaiting: {
        type: Boolean,
        required: true
    },
    deadCount: {
        type: Number,
        default: 0
    },
    killCount: {
        type: Number,
        default: 0
    },
    health: { // percentage
        type: Number,
        default: 100
    },
    primaryGun: { // player can purchase gun and set default gun in lobby,
        type: mongoose.Types.ObjectId,
        ref: 'gun'
    },
    secondaryGun: {
        type: mongoose.Types.ObjectId,
        ref: 'gun'
    },
    cloth: { // it has to be unique over single game document
        type: Number
    },
    playerPosition: {
        type: Number
    },
    match_slug: {
        type: String,
        // required: true FIXME: needs to be required.
    }
}, {timestamps: true})

/**
 * hide some credentials to query by accident
 */
PlayerSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj["__v"];
    return obj;
}

export const Player = mongoose.model('player', PlayerSchema);