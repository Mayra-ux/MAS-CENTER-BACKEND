/*code added by Mayra*/
/*
    Rutas para crud de Memes
    host + /api/BlogMemes localhost:4000/api/BlogMemes
*/
const {Router} = require('express');
const router = Router();
const {getMemes,getMemesById,createMemes,updateMemes,deleteMemes}= require('../controllers/BlogMemes');
const { validarJWT } = require('../middlewares/validar-jwt');   


router.use(validarJWT);
//obtener meme
router.get('/', getMemes);
//obtener meme por id
router.get('/:id', getMemesById);

//crear meme
router.post('/', createMemes);

//actualizar meme
router.put('/:id', updateMemes);

//eliminar meme
router.delete('/:id', deleteMemes);


module.exports = router;