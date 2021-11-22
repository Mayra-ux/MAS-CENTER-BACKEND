/*
    Rutas para crud de docs
    host + /api/documentos
*/
const {Router} = require('express');
const router = Router();
const { getDocs, crearDoc, actualizarDoc, eliminarDoc, getDocsByType}= require('../controllers/customDocs');
const { validarJWT } = require('../middlewares/validar-jwt');   
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarJWT);
//obtener docs
router.get('/', getDocs);

router.get('/type',  getDocsByType);
//crear docs
router.post('/', [
    check("image","La imagen es obligatoria").not().isEmpty(),
    validarCampos
], crearDoc);

//actualizar docs
router.put('/:id',[
    check("image","La imagen es obligatoria").not().isEmpty(),
    validarCampos
], actualizarDoc);

//actualizar docs
router.delete('/:id', eliminarDoc);


module.exports = router;
