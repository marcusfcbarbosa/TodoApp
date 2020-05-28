import * as mongoose from 'mongoose';
export const RedeSocialSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    evento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evento',
        required: true,
    },
    palestrante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Palestrante',
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
