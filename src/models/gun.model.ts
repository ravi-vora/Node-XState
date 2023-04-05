import mongoose from 'mongoose'
import { BulletSchema } from './bullet.model.js';


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
    damageHelth: { // amount of health can be losed => refered as percentage
        type: Number,
        required: true
    }
}, {timestamps: true});

export const Gun = mongoose.model('gun', GunSchema);