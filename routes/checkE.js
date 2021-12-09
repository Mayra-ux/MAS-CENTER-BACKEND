/*
    Rutas para crud de docs
    host + /api/documentos
*/
const {Router} = require('express');
const router = Router();
const { getCheck, crearCheck, actualizarCheck, eliminarCheck,getCheckID}= require('../controllers/checkerE');
const { validarJWT } = require('../middlewares/validar-jwt');   


router.use(validarJWT);
//obtener docs
router.get('/', getCheck);

router.get('/:id', getCheckID);

//crear docs
router.post('/', crearCheck);

//actualizar docs
router.put('/:id', actualizarCheck);

//actualizar docs
router.delete('/:id', eliminarCheck);


module.exports = router;
