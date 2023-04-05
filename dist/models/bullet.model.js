import mongoose from 'mongoose';
export const BulletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    weight: {
        type: Number,
        required: true
    }
}, { timestamps: true });
export const Bullet = mongoose.model('bullet', BulletSchema);
//# sourceMappingURL=bullet.model.js.map