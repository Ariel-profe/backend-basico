const { Router } = require('express');//desestructuramos una funcion q viene del paquete express
const {check} = require('express-validator');
const { existeProductoPorId, existeCategoria } = require('../helpers/db-validators');
const {validarCampos, validarJWT, adminRole } = require('../middlewares');

const { getProductos,
        getProducto,
        crearProductos,
        actualizarProductos,
        eliminarProductos} = require('../controllers/productos')
const router = Router();


router.get('/', getProductos);


router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
] ,getProducto);


router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
] ,crearProductos);


router.put('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
] ,actualizarProductos);

router.delete('/:id',[
    validarJWT,
    adminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
] ,eliminarProductos);


module.exports = router;