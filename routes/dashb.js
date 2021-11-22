/*
    Rutas para crud de docs
    host + /api/documentos
*/
const {Router} = require('express');
const router = Router();
const { getDash, crearDash, actualizarDash, eliminarDash}= require('../controllers/dashb.js');
const { validarJWT } = require('../middlewares/validar-jwt');   
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarJWT);
//obtener docs

router.get('/', getDash);

//crear docs
router.post('/', crearDash);

//actualizar docs
router.put('/:id', actualizarDash);

//actualizar docs
router.delete('/:id', eliminarDash);


module.exports = router;
