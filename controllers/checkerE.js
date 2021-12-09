const express = require('express');
const CheckerExtra = require('../models/CheckerExtra');

const getCheck = async (req, res = express.response) =>{

    const check = await CheckerExtra.find();

    res.json({
        ok:true,
        msg:'Obtener check',
        check
    })
}
const getCheckID = async (req, res = express.response) =>{
    
    const checkId = req.params.id;

    try {

        const check = await CheckerExtra.findById(checkId);

        if (!check) {
            return res.status(404).json({
                ok:false,
                msg:'You have not checked in'
            });
        }else{
            res.json({
                ok:true,
                check
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error! please contact the administrator'
        })
    }
}

const crearCheck = async (req, res = express.response) =>{

    const check = new CheckerExtra(req.body);
    console.log(check);
    try {
        await check.save();
        return res.json({
            ok:true,
            msg:'Check in',
            check
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error! please contact the administrator'
        })
    }

    
}
const actualizarCheck = async (req, res = express.response) =>{
    
    const checkID = req.params.id;
    console.log(checkID);
    try {

        const check = await CheckerExtra.findById(checkID);

        if (!check) {
            return res.status(404).json({
                ok:false,
                msg:'You have not checked in'
            });
        }else{
            let checkNuevo = new CheckerExtra(req.body);
            const {fecha, checkin, checkout,  total,  approval, sup} = checkNuevo;
            const actualizarDoc = await CheckerExtra.findByIdAndUpdate(checkID, {fecha, checkin, checkout, total, approval, sup} );
            res.json({
                ok:true,
                msg:'Ok',
                actualizarDoc
            })
        }
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error! please contact the administrator'
        })
    }

}
const eliminarCheck = async (req, res = express.response) =>{

    const checkId = req.params.id;

    try {

        const check = await CheckerExtra.findById(checkId);

        if (!check) {
            return res.status(404).json({
                ok:false,
                msg:'You have not checked in'
            });
        }else{

            await Checker.findByIdAndDelete(checkId);
            res.json({
                ok:true,
                msg:'check eliminado'
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error! please contact the administrator'
        })
    }

    
}

module.exports = {
    getCheck,
    crearCheck,
    actualizarCheck,
    eliminarCheck,
    getCheckID
}