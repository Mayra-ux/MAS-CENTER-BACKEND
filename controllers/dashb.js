const express = require('express');
const Custom = require('../models/Dashb');

const getDash = async (req, res = express.response) =>{


    const dashb = await Custom.find();
    res.json({
        ok:true,
        msg:'Get Custom jobs',
        dashb
    })
}
const crearDash = async (req, res = express.response) =>{
    const doc = new Custom(req.body);
    console.log(doc);
    try {
        await doc.save();

        return res.json({
            ok:true,
            msg:'Dash Job creado'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error por favor hable al administrador'
        })
    }

    
}
const actualizarDash = async (req, res = express.response) =>{
    
    const docId = req.params.id;
    
    try {

        const doc = await Custom.findById(docId);

        if (!doc) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el documento'
            });
        }else{
            let docNuevo = new Custom(req.body);
            console.log("|"+docNuevo);
            const {name, image} = docNuevo;
            const actualizarDoc = await Custom.findByIdAndUpdate(docId, {name, image} );
            res.json({
                ok:true,
                msg:'actualizar documento',
                actualizarDoc
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error por favor hable al administrador2'
        })
    }

}
const eliminarDash = async (req, res = express.response) =>{

    const docId = req.params.id;

    try {

        const doc = await Custom.findById(docId);

        if (!doc) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el documento'
            });
        }else{

            await Custom.findByIdAndDelete(docId);
            res.json({
                ok:true,
                msg:'Documento eliminado'
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error por favor hable al administrador'
        })
    }

    
}

module.exports = {
    getDash,
    crearDash,
    actualizarDash,
    eliminarDash
}