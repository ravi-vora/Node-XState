var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
}, { timestamps: true });
/**
 * hide some credentials to query by accident
 */
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj["__v"];
    return obj;
};
UserSchema.path("deviceId").validate((deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield mongoose.models.user.countDocuments({ deviceId });
    return !count;
}), "'deviceId' already registered.");
export const User = mongoose.model('user', UserSchema);
//# sourceMappingURL=user.model.js.map