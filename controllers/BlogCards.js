//code added by Mayra
const express = require('express');
const BlogCards = require('../models/BlogCards');


const getCards = async (req, res = express.response) =>{

    const blogCard = await BlogCards.find();
    console.log(blogCard);
    res.json({
        ok:true,
        msg:'Obteniendo Blog cards',
        blogCard
    })
}

// -----------------------------------------------------------------------------------Se evaluara el funcionamiento de este metodo
const createCard = async (req, res = express.response) =>{
    const BlogCard  = new BlogCards(req.body);
    console.log(BlogCard);
    try {
        await BlogCard.save();

        return res.status(200).json({
            ok:true,
            msg:'Blog Card creado'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error por favor hable al administrador'
        })
    }
}


const updateCard = async (req, res = express.response) =>{

    const cardId = req.params.id;

    try {

        const card = await BlogCards.findById(cardId);

        if (!card) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el Blog Card'
            });
        }else{
            let newCard = new BlogCards(req.body);
            console.log(JSON.stringify(req.body))
            const {name, image} = newCard;
            console.log("Backend name: "+name+" Backend image: "+image+" CardId: "+cardId)
            const updateCard = await BlogCards.findByIdAndUpdate(cardId, {name, image} );
            res.status(200).json({
                ok:true,
                msg:'Blog Card Actualizado',
                updateCard
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
// const deleteCard = async (req, res = express.response) =>{

//     const cardId = req.params.id;

//     try {

//         const card = await BlogCards.findById(cardId);

//         if (!card) {
//             return res.status(404).json({
//                 ok:false,
//                 msg:'No existe el Blog Card'
//             });
//         }else{

//             await BlogCards.findByIdAndDelete(cardId);
//             res.status(200).json({
//                 ok:true,
//                 msg:'Blog Card eliminado'
//             })
//         }
        
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok:false,
//             msg:'Error por favor hable al administrador'
//         })
//     }

    
// }

module.exports = {
    getCards,
    createCard,
    updateCard,
    //deleteCard,
}