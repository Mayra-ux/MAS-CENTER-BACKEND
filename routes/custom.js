/*
    Rutas para crud de docs
    host + /api/documentos
*/
const {Router} = require('express');
const router = Router();
const { getCustom, crearCustom, actualizarCustom, eliminarCustom}= require('../controllers/custom.js');
const { validarJWT } = require('../middlewares/validar-jwt');   
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarJWT);
//obtener docs

router.get('/', getCustom);

//crear docs
router.post('/', crearCustom);

//actualizar docs
router.put('/:id', actualizarCustom);

//actualizar docs
router.delete('/:id', eliminarCustom);


module.exports = router;
