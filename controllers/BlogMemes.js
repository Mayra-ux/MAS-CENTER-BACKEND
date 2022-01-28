//code added by Mayra
const express = require('express');
const BlogMemes = require('../models/BlogMemes');



const getMemes = async (req, res = express.response) =>{

    const blogMemes= await BlogMemes.find();
    console.log(blogMemes);
    res.json({
        ok:true,
        msg:'Obteniendo Memes',
        blogMemes
    })
}
const getMemesById = async (req, res = express.response) =>{
    
    const MemesId = req.params.id;

    try {

        const blogMemes = await BlogMemes.findById(MemesId);

        if (!blogMemes) {
            return res.status(404).json({
                ok:false,
                msg:'No se encontró el registro'
            });
        }else{
            res.json({
                ok:true,
                blogMemes
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
const createMemes= async (req, res = express.response) =>{
    const blogMemes = new BlogMemes(req.body);
    console.log(blogMemes);
    try {
        await blogMemes.save();

        return res.status(200).json({
            ok:true,
            msg:'Meme creado'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error por favor hable al administrador'
        })
    }
}


const updateMemes= async (req, res = express.response) =>{

    const MemesId = req.params.id;

    try {

        const memes = await BlogMemes.findById(MemesId);

        if (!memes) {
            return res.status(404).json({
                ok:false,
                msg:'No existe meme'
            });
        }else{
            let newMeme = new BlogMemes(req.body);
            const {date, image} = newMeme ;
            const updateMemes= await BlogMemes.findByIdAndUpdate(MemesId, {date, image} );
            res.status(200).json({
                ok:true,
                msg:'Meme Actualizado',
                updateMemes
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
const deleteMemes = async (req, res = express.response) =>{

    const MemesId = req.params.id;

    try {

        const memes = await BlogMemes.findById(MemesId);

        if (!memes) {
            return res.status(404).json({
                ok:false,
                msg:'No existe meme'
            });
        }else{

            await BlogMemes.findByIdAndDelete(MemesId);
            res.status(200).json({
                ok:true,
                msg:'Meme eliminado'
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
    getMemes,
    getMemesById,
    createMemes,
    updateMemes,
    deleteMemes,
}