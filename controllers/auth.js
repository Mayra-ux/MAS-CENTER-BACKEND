const express = require('express');
const Usuario = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');


const crearUsuario = async (req, res = express.response) =>{

    const {email,password} = req.body;

    try {
        
        let usuario = await Usuario.findOne({email});
        
        if(usuario){
            return res.status(400).json({
                ok:false,
                error:"Correo en uso"
            });
        }

        usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        
        //Generar token
        const token = await generarJWT(usuario.id, usuario.name, usuario.role);

        res.status(201).json({
            ok:true,
            msg:"registro",
            token
        })
    } catch (error) {
        return res.status(400).json({
            ok:false,
            error:"Por favor revisa los datos"
        });
    }
}

const loginUsuarios = async (req, res = express.response) =>{

    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});
        console.log(usuario);
        if(!usuario){
            return res.status(400).json({
                ok:false,
                error:"No existe el usuario, revisa tus credenciales"
            });
        }
        
        const validarUsuario = bcrypt.compareSync(password, usuario.password);
        //console.log(validarUsuario);

        //generacion de token
        const token = await generarJWT(usuario.id, usuario.name, usuario.role, usuario.email, usuario.status,  usuario.shift,  usuario.hub,  usuario.breakT);
        console.log(token);

        if(validarUsuario===true){
            return res.status(201).json({
                ok:true,
                msg:"login como "+usuario.role,
                uid: usuario.id,
                name: usuario.name,
                email: usuario.email,
                role: usuario.role,
                status:usuario.status, 
                shift:usuario.shift, 
                hub:usuario.hub, 
                breakT:usuario.breakT,
                token,
            })
        }else{
            return res.status(400).json({
                ok:false,
                error:"Revisa tus credenciales"
            });
        }
        

    } catch (error) {
        return res.status(400).json({
            ok:false,
            error:"Por favor revisa los datos"
        });
    }

    
}

const revalidarToken = async(req, res = express.response) =>{
    
    const {uid, name, role, status, shift, hub, breakT} = req;
    
    const token = await generarJWT(uid, name, role, status, shift, hub, breakT);
       
    res.json({
        ok:true,
        msg:"renew",
        token,
        uid,
        name, 
        role,
        status, 
        shift, 
        hub, 
        breakT
    })
}
const getUser = async (req, res = express.response) =>{

    const users = await Usuario.find();
    
    res.json({
        ok:true,
        msg:'Obtener usuarios',
        users
    })
}

const actualizarUser = async (req, res = express.response) =>{

    const UserId = req.params.id;

    try {

        let usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(usuario.password, salt);
        const {name, email, password, role, status, shift, hub, breakT} = usuario;
        const actualizarDoc = await Usuario.findByIdAndUpdate(UserId, {name, email, password, role, status, shift, hub, breakT} );
        res.json({
            ok:true,
            msg:'actualizar documento',
            actualizarDoc
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error por favor hable al administrador'
        })
    }

}

const eliminarUser = async (req, res = express.response) =>{

    const UserId = req.params.id;

    try {
        await Usuario.findByIdAndDelete(UserId);
        res.json({
            ok:true,
            msg:'Documento eliminado'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error por favor hable al administrador'
        })
    }

    
}

module.exports = {
    crearUsuario,
    loginUsuarios,
    revalidarToken,
    getUser,
    actualizarUser,
    eliminarUser
}
    