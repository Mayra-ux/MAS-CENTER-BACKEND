/*
    Rutas para login
    host + /api/auth
*/
const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const { crearUsuario, loginUsuarios, revalidarToken, getUser, actualizarUser, eliminarUser }= require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

//Crear usuario
router.post(
    '/new',
    [
        check("name","El nombre es obligatorio").not().isEmpty(),
        check("email","El email es obligatorio").isEmail(),
        check("password","El password debe ser mayor o igual a 5 caracteres").isLength({min: 5}),
        validarCampos
    ],
     crearUsuario);

//Login
router.post(
    '/',
    [
        check("email","El email es obligatorio").isEmail(),
        check("password","El password debe ser mayor o igual a 5 caracteres").isLength({min: 5}),
        validarCampos
    ], 
    loginUsuarios );

//Renovar el token
router.get('/renew', validarJWT, revalidarToken);

router.get('/', getUser);

router.put('/:id', actualizarUser);

router.delete('/:id', eliminarUser);


module.exports = router;