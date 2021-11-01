const express = require('express');
const Documento = require('../models/Paises');

const getPais = async (req, res = express.response) =>{

    const paises = await Documento.find();

    res.json({
        ok:true,
        msg:'Obtener paises',
        paises
    })
}

module.exports = {
    getPais
}