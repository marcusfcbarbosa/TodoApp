import * as mongoose from 'mongoose';
export const LoteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    datainicio: {
        type: Date,
        required: true,
        default: Date.now,
    },
    datafim: {
        type: Date,
        required: true,
        default: Date.now,
    },
    quantidade: {
        type: Number,
        required: true,
    },
    evento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evento',
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
