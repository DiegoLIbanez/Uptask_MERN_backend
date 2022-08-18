import mongoose from "mongoose";

const proyectosShema = mongoose.Schema({
    nombre: {
        type:String,
        trim:true,
        required:true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    fechaEntrega: {
        type: Date,
        default: Date.now(),

    },
    cliente: {
        type: String,
        trim: true,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    tareas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tarea'
        }
    ],
    colaboradores : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
        },
    ],
},{
    timestamps: true
});

const Proyecto = mongoose.model("Proyecto", proyectosShema)

export default Proyecto;
