/*code added by Mayra*/
/*
    Rutas para crud de erizo
    host + /api/blogCards localhost:4000/api/blogCards
*/
const {Router} = require('express');
const router = Router();
const {getCards, updateCard, createCard}= require('../controllers/BlogCards');
const { validarJWT } = require('../middlewares/validar-jwt');   


router.use(validarJWT);

//obtener Card
router.get('/', getCards);

//obtener card por id
//router.get('/:id', getErizoById);

//crear card
router.post('/', createCard);

//actualizar card
router.put('/:id', updateCard);




module.exports = router;