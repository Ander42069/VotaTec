import mongoose from "mongoose";

// Define el esquema si no está definido
const schema = mongoose.Schema({
    voto: {
        type: String,
        required: true,
    },
    candidato: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Comprueba si el modelo ya está definido antes de compilarlo
const Vote = mongoose.models.User || mongoose.model("Vote", schema, "votes");

export default Vote;