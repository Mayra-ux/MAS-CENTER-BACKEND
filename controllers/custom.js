const express = require('express');
const Custom = require('../models/CustomW');

const getCustom = async (req, res = express.response) =>{

    const customs = await Custom.find();
    res.json({
        ok:true,
        msg:'Get Custom jobs',
        customs
    })
}
const crearCustom = async (req, res = express.response) =>{
    const doc = new Custom(req.body);
    console.log(doc);
    try {
        await doc.save();

        return res.json({
            ok:true,
            msg:'Custom Job creado'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error por favor hable al administrador'
        })
    }

    
}
const actualizarCustom = async (req, res = express.response) =>{
    
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
            const {name, image} = docNuevo;
            console.log(docNuevo);
            const actualizarDoc = await Custom.findByIdAndUpdate(docId, {name, image} );
            res.json({
                ok:true,
                msg:'actualizar custom',
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
const eliminarCustom = async (req, res = express.response) =>{

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
    getCustom,
    crearCustom,
    actualizarCustom,
    eliminarCustom
}