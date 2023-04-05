import mongoose from 'mongoose';
export const GunSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bullerPerMeg: {
        type: Number,
        required: true
    },
    oneHanded: {
        type: Boolean,
        required: true
    },
    bulletType: {
        type: mongoose.Types.ObjectId,
        ref: 'bullet'
    },
    damageHelth: {
        type: Number,
        required: true
    }
}, { timestamps: true });
export const Gun = mongoose.model('gun', GunSchema);
//# sourceMappingURL=gun.model.js.map