//code added by Mayra
const express = require('express');
const BlogCarousel = require('../models/BlogCarousel');



const getCarousel = async (req, res = express.response) =>{

    const blogCarousel= await BlogCarousel.find();
    console.log(blogCarousel);
    res.json({
        ok:true,
        msg:'Obteniendo Carrusel',
        blogCarousel
    })
}
const getCarouselById = async (req, res = express.response) =>{
    
    const CarouselId = req.params.id;

    try {

        const blogCarousel = await BlogCarousel.findById(CarouselId);

        if (!blogCarousel) {
            return res.status(404).json({
                ok:false,
                msg:'No se encontró el registro'
            });
        }else{
            res.json({
                ok:true,
                blogCarousel
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
const createCarousel= async (req, res = express.response) =>{
    const blogCarousel  = new BlogCarousel(req.body);
    console.log("carrusel: " + blogCarousel);
    try {
        await blogCarousel.save();

        return res.status(200).json({
            ok:true,
            msg:'Carrusel creado'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error por favor hable al administrador'
        })
    }
}


const updateCarousel = async (req, res = express.response) =>{

    const carouselId = req.params.id;

    try {

        const carousel = await BlogCarousel.findById(carouselId);

        if (!carousel) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el carrusel'
            });
        }else{
            let newCarousel = new BlogCarousel(req.body);
            const {position, image} = newCarousel;
            const updateCarousel = await BlogCarousel.findByIdAndUpdate(carouselId, {position, image} );
            res.status(200).json({
                ok:true,
                msg:'Carousel Actualizado',
                updateCarousel
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
const deleteCarousel = async (req, res = express.response) =>{

    const carouselId = req.params.id;

    try {

        const carousel = await BlogCarousel.findById(carouselId);

        if (!carousel) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el Carousel'
            });
        }else{

            await BlogCarousel.findByIdAndDelete(carouselId);
            res.status(200).json({
                ok:true,
                msg:'Carousel eliminado'
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
    getCarousel,
    getCarouselById,
    createCarousel,
    updateCarousel,
    deleteCarousel,
}