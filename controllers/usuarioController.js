import Usuario from "../models/Usuario.js"
import generarIdToken from "../helpers/generarIdToken.js";
import generarJWT from "../helpers/generarJWT.js";
import {emailRegistro, emailOlvidePassword} from '../helpers/email.js'

const registrar = async(req,res) => {
    // Evitar Registros Duplicados

    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email})


    if(existeUsuario){
        const error = new Error ('Usuario ya registrado')
        return res.status(400).json({msg:error.message})
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarIdToken()
        await usuario.save()

        //enviar el email de confirmacion
        emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })


        res.json({msg: 'Usuario creado correctamente revisa tu correo para confirmar tu cuenta'})
        
    } catch (error) { 
        console.log(error)
    }
}


const autenticar = async(req,res) => {
    const {email, password} = req.body;

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        const error = new Error('El usuario no existe')
        return res.status(404).json({msg:error.message})
    }
    // Comprobar si el suaurio esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu usuario no ha sido confirmado')
        return res.status(403).json({msg:error.message})
    }

    // Comprobar su password
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token:generarJWT(usuario._id)
        })
    }else{
        const error = new Error('El password es incorrecto')
        return res.status(403).json({msg:error.message})
    }

} 

const confirmar = async  (req,res) => {
    const {token} = req.params
    const usuarioConfirmar = await Usuario.findOne({token})

    if(!usuarioConfirmar) {
        const error = new Error('Token no valido')
        return res.status(403).json({msg:error.message})
    }

    try {
        usuarioConfirmar.confirmado=true;
        usuarioConfirmar.token="";
        await usuarioConfirmar.save();
        res.json({msg: "Usuario Confirmado Correctamente"})
    } catch (error) {
        console.log(error);
    }


}


const olvidePassword = async (req,res) => {
    const {email} = req.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario) {
        const error = new Error('El Usario No Existe')
        return res.status(404).json({msg:error.message})
        
    }

    try {
        usuario.token = generarIdToken();
        await usuario.save()

        //Envair Email
        emailOlvidePassword({
            email:usuario.email,
            nombre:usuario.nombre,
            token:usuario.token,
        })

        res.json({msg: 'Hemos enviado un email con las instrucciones'})

    } catch (error) {
        console.log(error)
    }
} 

const comprobarToken = async(req,res) => {
    const {token} = req.params;

    const tokenValido = await Usuario.findOne({token})

    if(tokenValido){
        res.json({msg:'Token valido y el usuario existe'})
    }else{
        const error = new Error('Token no valido')
        return res.status(404).json({msg:error.message})
    }

}

const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body

    const usuario = await Usuario.findOne({token})

    if(usuario) {
        usuario.password = password;
        usuario.token= '';
        try {
            await usuario.save();
            res.json({msg:'Password modificado correctamente'})
        } catch (error) {
            console.log(error)
        }
       
    }else{
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message})
    }

}

const perfil = async (req,res) => {
    const {usuario} = req

    res.json(usuario)
}

export { registrar,autenticar,confirmar,olvidePassword,comprobarToken,nuevoPassword,perfil }