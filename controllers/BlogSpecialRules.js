//code added by Mayra
const express = require('express');
const BlogSpecialRules = require('../models/BlogSpecialRules');



const getSpecialRules = async (req, res = express.response) =>{

    const blogSpecialRules= await BlogSpecialRules.find();
    console.log(blogSpecialRules);
    res.json({
        ok:true,
        msg:'Obteniendo Regla Especial',
        blogSpecialRules
    })
}
const getSpecialRulesById = async (req, res = express.response) =>{
    
    const SpecialRulesId = req.params.id;

    try {

        const blogSpecialRules = await BlogSpecialRules.findById(SpecialRulesId);

        if (!blogSpecialRules) {
            return res.status(404).json({
                ok:false,
                msg:'No se encontró el registro'
            });
        }else{
            res.json({
                ok:true,
                blogSpecialRules
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
const createSpecialRules= async (req, res = express.response) =>{
    const blogSpecialRules = new BlogSpecialRules(req.body);
    console.log(blogSpecialRules);
    try {
        await blogSpecialRules.save();

        return res.status(200).json({
            ok:true,
            msg:'Regla especial creada'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error por favor hable al administrador'
        })
    }
}


const updateSpecialRules= async (req, res = express.response) =>{

    const specialRulesId = req.params.id;

    try {

        const specialRules = await BlogSpecialRules.findById(specialRulesId);

        if (!specialRules) {
            return res.status(404).json({
                ok:false,
                msg:'No existe esta regla especial'
            });
        }else{
            let newSpecialRules = new BlogSpecialRules(req.body);
            const {date, image} = newSpecialRules ;
            const updateSpecialRules = await BlogSpecialRules.findByIdAndUpdate(specialRulesId, {date, image} );
            res.status(200).json({
                ok:true,
                msg:'Regla especial Actualizada',
                updateSpecialRules
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
const deleteSpecialRules = async (req, res = express.response) =>{

    const specialRulesId = req.params.id;

    try {

        const specialRules = await BlogSpecialRules.findById(specialRulesId);

        if (!specialRules) {
            return res.status(404).json({
                ok:false,
                msg:'No existe la regla especial'
            });
        }else{

            await BlogSpecialRules.findByIdAndDelete(specialRulesId);
            res.status(200).json({
                ok:true,
                msg:'Regla especial eliminada'
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
    getSpecialRules,
    getSpecialRulesById,
    createSpecialRules,
    updateSpecialRules,
    deleteSpecialRules,
}