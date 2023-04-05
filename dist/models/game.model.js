import mongoose from 'mongoose';
const GameSchema = new mongoose.Schema({
    players: {
        type: [mongoose.Types.ObjectId],
        ref: 'player'
    },
    gameId: {
        type: String,
        required: true
    },
    expiredAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });
/**
 * hide some credentials to query by accident
 */
GameSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj["__v"];
    return obj;
};
export const Game = mongoose.model('game', GameSchema);
//# sourceMappingURL=game.model.js.map