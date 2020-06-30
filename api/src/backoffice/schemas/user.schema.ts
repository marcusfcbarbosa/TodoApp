//Se ao importar, usassemos asisim ./mongoose siginifica que importamos do diretorio node_modules
import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });