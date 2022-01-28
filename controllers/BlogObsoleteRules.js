//code added by Mayra
const express = require('express');
const BlogObsoleteRules = require('../models/BlogObsoleteRules');



const getObsoleteRules = async (req, res = express.response) =>{

    const blogObsoleteRules= await BlogObsoleteRules.find();
    console.log(blogObsoleteRules);
    res.json({
        ok:true,
        msg:'Obteniendo reglas Obsoletas',
        blogObsoleteRules
    })
}
const getObsoleteRulesById = async (req, res = express.response) =>{
    
    const ObsoleteRulesId = req.params.id;

    try {

        const blogObsoleteRules = await BlogObsoleteRules.findById(ObsoleteRulesId);

        if (!blogObsoleteRules) {
            return res.status(404).json({
                ok:false,
                msg:'No se encontró el registro'
            });
        }else{
            res.json({
                ok:true,
                blogObsoleteRules
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
//-----------------------------------------------------------------------------------Se evaluara el funcionamiento de este metodo
const createObsoleteRules= async (req, res = express.response) =>{
    const blogObsoleteRules = new BlogObsoleteRules(req.body);
    console.log(blogObsoleteRules);
    try {
        await blogObsoleteRules.save();

        return res.status(200).json({
            ok:true,
            msg:'regla obsoleta creada'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error por favor hable al administrador'
        })
    }
}


const updateObsoleteRules= async (req, res = express.response) =>{

    const ObsoleteRulesId = req.params.id;

    try {

        const ObsoleteRules = await BlogObsoleteRules.findById(ObsoleteRulesId);

        if (!ObsoleteRules) {
            return res.status(404).json({
                ok:false,
                msg:'No existe regla'
            });
        }else{
            let newObsoleteRules = new BlogObsoleteRules(req.body);
            const {date, image} = newObsoleteRules ;
            const updateObsoleteRules= await BlogObsoleteRules.findByIdAndUpdate(ObsoleteRulesId, {date, image} );
            res.status(200).json({
                ok:true,
                msg:'Regla Actualizada',
                updateObsoleteRules
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

//-----------------------------------------------------------------------------------Se evaluara el funcionamiento de este metodo
const deleteObsoleteRules = async (req, res = express.response) =>{

    const ObsoleteRulesId = req.params.id;

    try {

        const ObsoleteRules = await BlogObsoleteRules.findById(ObsoleteRulesId);

        if (!ObsoleteRules) {
            return res.status(404).json({
                ok:false,
                msg:'No existe regla'
            });
        }else{

            await BlogObsoleteRules.findByIdAndDelete(ObsoleteRulesId);
            res.status(200).json({
                ok:true,
                msg:'Regla eliminada'
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
    getObsoleteRules,
    getObsoleteRulesById,
    createObsoleteRules,
    updateObsoleteRules,
    deleteObsoleteRules,
}