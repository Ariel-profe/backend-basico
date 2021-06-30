const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){//si hay errores, retorne status 400
      return res.status(400).json(errors);
    }
    next();//Si sale tpdo bien, sigue al proximo middleware

};



module.exports = {
    validarCampos
}