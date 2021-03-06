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
    quantidadePessoas: {
        type: Number,
        required: true,
    },
    lote: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    palestrantes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Palestrante',
        },
    ],
    redeSociais: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RedeSocial',
        },
    ],
    lotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lote',
        },
    ],
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
