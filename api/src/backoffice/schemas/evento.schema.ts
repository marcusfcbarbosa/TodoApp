import * as mongoose from 'mongoose';
export const EventoSchema = new mongoose.Schema({
    tema: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    local: {
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
