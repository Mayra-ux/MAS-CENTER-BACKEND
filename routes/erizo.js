/*code added by Mayra*/
/*
    Rutas para crud de erizo
    host + /api/erizo localhost:4000/api/erizo
*/
const {Router} = require('express');
const router = Router();
const { getErizo, getErizoById, createErizo, updateErizo, deleteErizo}= require('../controllers/erizo');
const { validarJWT } = require('../middlewares/validar-jwt');   


router.use(validarJWT);
//obtener erizo
router.get('/', getErizo);
//obtener erizo por id
router.get('/:id', getErizoById);

//crear erizo
router.post('/', createErizo);

//actualizar erizo
router.put('/:id', updateErizo);

//eliminar erizo
router.delete('/:id', deleteErizo);


module.exports = router;