const Role = require('../models/role');
const Usuario = require('../models/usuario');


const RoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no está registrado en la DB`)
    }
  };

 //Verificar si el correo existe
 const existeEmail = async(correo = '') => {
     const existe = await Usuario.findOne({correo});
    if(existe){
    throw new Error(`El correo ${correo} ya está registrado`)
    }
 };

 const existeUsuarioPorId = async(id) => {
  const existeId = await Usuario.findById(id)
 if(!existeId){
 throw new Error(`El id ${id} no existe`)
 }
};




  module.exports = {
      RoleValido,
      existeEmail,
      existeUsuarioPorId
  }