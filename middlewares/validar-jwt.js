const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) =>{
    //leer headers
    const token = req.header('x-token');

    if(!token){
        return res.status(400).json({
            ok:false,
            error:"No hay token"
        });
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        
        req.uid = payload.uid;
        req.name = payload.name;
        req.role = payload.role;
        req.status = payload.status;
        req.hub = payload.hub;
        req.shift = payload.shift;
        req.breakT = payload.breakT;
    } catch (error) {
        return res.status(400).json({
            ok:false,
            error:"Token no valido"
        });
    }

    next();

}


module.exports ={
    validarJWT
}