const { Router } = require('express');//desestructuramos una funcion q viene del paquete express
const {check} = require('express-validator');




const { categoriasGet, 
        categoriaId, 
        crearCategoria, 
        actualizarCategoria, 
        categoriaDelete } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos, adminRole } = require('../middlewares');


const router = Router();

router.get('/',categoriasGet);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
],categoriaId);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,crearCategoria);

router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
] ,actualizarCategoria);

router.delete('/:id',[
    validarJWT,
    adminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
] ,categoriaDelete);




module.exports = router;