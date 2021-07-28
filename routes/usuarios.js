
const { Router } = require('express');//desestructuramos una funcion q viene del paquete express
const {check} = require('express-validator');


const {validarCampos, validarJWT, tieneRole} = require('../middlewares');

const {RoleValido, existeEmail,existeUsuarioPorId} = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);

router.post('/',[//se le dice a check q campo del body quiero revisar 
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio y más de 6 letras').isLength({min:6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(existeEmail),
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom(RoleValido),
  validarCampos  
] ,usuariosPost);

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(RoleValido),
  validarCampos
],usuariosPut);

router.patch('/', usuariosPatch);
  
router.delete('/:id',[
  validarJWT,
  // adminRole,
  tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
] ,usuariosDelete);


  module.exports = router;