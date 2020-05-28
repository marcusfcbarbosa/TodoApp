import * as mongoose from 'mongoose';
export const PalestranteSchema = new mongoose.Schema({

    documento: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
    nome: {
        type: String,
        required: true,
    },
    minicurriculo: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    eventos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Evento',
        },
    ],
    redeSociais: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RedeSocial',
        },
    ],
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
