/*
    Rutas para crud de docs
    host + /api/specialrules
*/
const {Router} = require('express');
const router = Router();
const { getSR, crearSR, actualizarSR, eliminarSR}= require('../controllers/specialRules');
const { validarJWT } = require('../middlewares/validar-jwt');   
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarJWT);
//obtener docs
router.get('/', getSR);

//crear docs
router.post('/', [
    check("image","La imagen es obligatoria").not().isEmpty(),
    validarCampos
], crearSR);

//actualizar docs
router.put('/:id',[
    check("image","La imagen es obligatoria").not().isEmpty(),
    validarCampos
], actualizarSR);

//actualizar docs
router.delete('/:id', eliminarSR);


module.exports = router;
