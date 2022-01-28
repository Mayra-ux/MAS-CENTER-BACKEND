/*code added by Mayra*/
/*
    Rutas para crud de Reglas Obsoletas
    host + /api/BlogObsoleteRules localhost:4000/api/BlogObsoleteRules
*/
const {Router} = require('express');
const router = Router();
const {  getObsoleteRules, getObsoleteRulesById, createObsoleteRules, updateObsoleteRules, deleteObsoleteRules}= require('../controllers/BlogObsoleteRules');
const { validarJWT } = require('../middlewares/validar-jwt');   


router.use(validarJWT);
//obtener regla obsoleta
router.get('/', getObsoleteRules);
//obtener regla obsoleta por id
router.get('/:id', getObsoleteRulesById);

//crear regla obsoleta
router.post('/', createObsoleteRules);

//actualizar regla obsoleta
router.put('/:id', updateObsoleteRules);

//eliminar regla obsoleta
router.delete('/:id', deleteObsoleteRules);


module.exports = router;