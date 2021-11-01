/*
    Rutas para crud de docs
    host + /api/documentos
*/
const {Router} = require('express');
const router = Router();
const { getPais }= require('../controllers/paises');
const { validarJWT } = require('../middlewares/validar-jwt');   

router.use(validarJWT);
//obtener docs
router.get('/', getPais);




module.exports = router;
