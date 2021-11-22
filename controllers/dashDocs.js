const express = require('express');
const DashDoc = require('../models/DashDocs');

const getDocs = async (req, res = express.response) =>{

    const docs = await DashDoc.find();

    res.json({
        ok:true,
        msg:'Obtener documentos',
        docs
    })
}

const getDocsByType = async (req, res = express.response) =>{
    const {name, type} =(req);

    const docs = await DashDoc.find();
    console.log(docs);
    if(docs.length===0){
        res.json({
            ok:false,
            msg:'No hay documentos',
            Pais: name,
            Tipo: type
        })
    }else{
        res.json({
            ok:true,
            msg:'Obtener documentos',
            docs
        })
    }
    
}
const crearDoc = async (req, res = express.response) =>{
    const doc = new DashDoc(req.body);
    console.log(doc);
    try {
        await doc.save();

        return res.json({
            ok:true,
            msg:'Documento creado'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error por favor hable al administrador'
        })
    }

    
}
const actualizarDoc = async (req, res = express.response) =>{
    
    const docId = req.params.id;
    console.log(req.params.id);
    try {

        const doc = await DashDoc.findById(docId);

        if (!doc) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el documento'
            });
        }else{
            let docNuevo = new DashDoc(req.body);
            const {country, type, image} = docNuevo;
            const actualizarDoc = await DashDoc.findByIdAndUpdate(docId, {country, type, image} );
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
const eliminarDoc = async (req, res = express.response) =>{

    const docId = req.params.id;

    try {

        const doc = await DashDoc.findById(docId);

        if (!doc) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el documento'
            });
        }else{

            await DashDoc.findByIdAndDelete(docId);
            res.json({
                ok:true,
                msg:'Documento eliminados'
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error por favor hable al administradorrrrr'
        })
    }

    
}

module.exports = {
    getDocs,
    crearDoc,
    actualizarDoc,
    eliminarDoc,
    getDocsByType
}