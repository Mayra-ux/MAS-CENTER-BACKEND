//code added by Mayra
const express = require('express');
const Erizo = require('../models/Erizo');



const getErizo = async (req, res = express.response) =>{

    const erizo = await Erizo.find();
    // console.log(erizo);
    res.json({
        ok:true,
        msg:'Obteniendo ganadores',
        erizo
    })

}

const getErizoById = async (req, res = express.response) =>{
    
    const erizoId = req.params.id;

    try {

        // const erizo = await Erizo.findById(erizoId);
        const erizo = await Erizo.findOne(erizoId);

        if (!erizo) {
            return res.status(404).json({
                ok:false,
                msg:'No se encontró el registro'
            });
        }else{
            res.json({
                ok:true,
                erizo
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error! por favor contacte al administrador'
        })
    }
}

const createErizo = async (req, res = express.response) =>{
    const erizo  = new Erizo(req.body);
    console.log("Objeto erizo: "+ erizo);
    try {
        await erizo.save();

        return res.status(200).json({
            ok:true,
            msg:'Registro creado'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error por favor hable al administrador'
        })
    }
}


const updateErizo = async (req, res = express.response) =>{

    const erizoId = req.params.id;
    console.log("Aqui es el update: ")
    console.log(req.params )

    try {

        const erizo = await Erizo.findById(erizoId);

        if (!erizo) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el registro'
            });
        }else{
            let newErizo = new Erizo(req.body);
            const {date, image} = newErizo;
            const updateErizo = await Erizo.findByIdAndUpdate(erizoId, {date, image} );
            res.status(200).json({
                ok:true,
                msg:'Registro Actualizado',
                updateErizo
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


const deleteErizo= async (req, res = express.response) =>{

    const erizoId = req.params.id;

    try {

        const card = await Erizo.findById(erizoId);

        if (!card) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el registro'
            });
        }else{

            await Erizo.findByIdAndDelete(erizoId);
            res.status(200).json({
                ok:true,
                msg:'Registro eliminado'
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
    getErizo,
    getErizoById,
    createErizo,
    updateErizo,
    deleteErizo,
}