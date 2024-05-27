import mongoose from "mongoose";

// Define el esquema si no está definido
const schema = mongoose.Schema({
    numero_control: {
        type: String,
        required: true,
    },
    correo_institucional: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    carrera: {
        type: String,
        required: true,
    },
    usuario_rol: {
        type: String,
        required: true,
    },
    voto: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Comprueba si el modelo ya está definido antes de compilarlo
const User = mongoose.models.User || mongoose.model("User", schema, "users");

export default User;