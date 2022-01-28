/*code added by Mayra*/
/*
    Rutas para crud de reglas especiales
    host + /api/BlogSpecialRules localhost:4000/api/BlogSpecialRules
*/
const {Router} = require('express');
const router = Router();
const {  getSpecialRules, getSpecialRulesById, createSpecialRules, updateSpecialRules, deleteSpecialRules}= require('../controllers/BlogSpecialRules');
const { validarJWT } = require('../middlewares/validar-jwt');   


router.use(validarJWT);
//obtener regla especial
router.get('/', getSpecialRules);
//obtener regla especial por id
router.get('/:id', getSpecialRulesById);

//crear regla especial
router.post('/', createSpecialRules);

//actualizar regla especial
router.put('/:id', updateSpecialRules);

//eliminar regla especial
router.delete('/:id', deleteSpecialRules);


module.exports = router;