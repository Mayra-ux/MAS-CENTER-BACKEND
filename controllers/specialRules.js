const express = require('express');
const SpecialRule = require('../models/SpecialRules');

const getSR = async (req, res = express.response) =>{

    const sr = await SpecialRule.find();
    console.log(sr);
    res.json({
        ok:true,
        msg:'Obtener SpecialRule',
        sr
    })
}


const crearSR = async (req, res = express.response) =>{
    const doc = new SpecialRule(req.body);
    console.log(doc);
    try {
        await doc.save();

        return res.json({
            ok:true,
            msg:'SpecialRule creado'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error por favor hable al administrador'
        })
    }

    
}
const actualizarSR = async (req, res = express.response) =>{

    const docId = req.params.id;

    try {

        const doc = await SpecialRule.findById(docId);

        if (!doc) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el SpecialRule'
            });
        }else{
            let docNuevo = new SpecialRule(req.body);
            const {date, image} = docNuevo;
            const actualizarDoc = await SpecialRule.findByIdAndUpdate(docId, {date, image} );
            res.json({
                ok:true,
                msg:'actualizar SpecialRule',
                actualizarDoc
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
const eliminarSR = async (req, res = express.response) =>{

    const docId = req.params.id;

    try {

        const doc = await SpecialRule.findById(docId);

        if (!doc) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el SpecialRule'
            });
        }else{

            await SpecialRule.findByIdAndDelete(docId);
            res.json({
                ok:true,
                msg:'SpecialRule eliminado'
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
    getSR,
    crearSR,
    actualizarSR,
    eliminarSR,
}