/*code added by Mayra*/
/*
    Rutas para crud del carrusel
    host + /api/BlogCarousel localhost:4000/api/BlogCarousel
*/
const {Router} = require('express');
const router = Router();
const { getCarousel,getCarouselById, createCarousel,updateCarousel,deleteCarousel}= require('../controllers/BlogCarousel');
const { validarJWT } = require('../middlewares/validar-jwt');   


router.use(validarJWT);
//obtener carousel
router.get('/', getCarousel);
//obtener carousel por id
router.get('/:id', getCarouselById);

//crear carousel
router.post('/', createCarousel);

//actualizar carousel
router.put('/:id', updateCarousel);

//eliminar carousel
router.delete('/:id', deleteCarousel); 

module.exports = router;