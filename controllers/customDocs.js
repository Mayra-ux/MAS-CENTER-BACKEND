const express = require('express');
const CustomDoc = require('../models/CustomDoc');

const getDocs = async (req, res = express.response) =>{

    const docs = await CustomDoc.find();

    res.json({
        ok:true,
        msg:'Obtener documentos',
        docs
    })
}

const getDocsByType = async (req, res = express.response) =>{
    const {name, type} =(req);

    const docs = await CustomDoc.find();
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
    const doc = new CustomDoc(req.body);
    console.log(doc);
    try {
        await doc.save();

        return res.json({
            ok:true,
            msg:'Documento creado'
        })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:doc
        })
    }

    
}
const actualizarDoc = async (req, res = express.response) =>{
    
    const docId = req.params.id;
    console.log(req.params.id);
    try {

        const doc = await CustomDoc.findById(docId);

        if (!doc) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el documento'
            });
        }else{
            let docNuevo = new CustomDoc(req.body);
            console.log(docNuevo);
            const {typeCustom, type, image} = docNuevo;
            const actualizarDoc = await CustomDoc.findByIdAndUpdate(docId, {type, image, typeCustom} );
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

        const doc = await CustomDoc.findById(docId);

        if (!doc) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el documento'
            });
        }else{

            await CustomDoc.findByIdAndDelete(docId);
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
    getDocs,
    crearDoc,
    actualizarDoc,
    eliminarDoc,
    getDocsByType
}