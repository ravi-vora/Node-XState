import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    purchasedGun: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'gun'
        }]
    },
    purchasedCloths: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'cloth'
        }]
    }
}, {timestamps: true})

/**
 * hide some credentials to query by accident
 */
UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj["__v"];
    return obj;
}

UserSchema.path("deviceId").validate(async (deviceId) => {
    const count = await mongoose.models.user.countDocuments({ deviceId });
    return !count;
}, "'deviceId' already registered.");

export const User = mongoose.model('user', UserSchema);