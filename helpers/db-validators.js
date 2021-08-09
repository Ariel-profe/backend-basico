
const { Producto, Categoria, Usuario, Role } = require('../models');



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

//Validar si existen los ids de las categorias 
const existeCategoria = async(id) => {
  const categoriaId = await Categoria.findById(id);
  if(!categoriaId){
    throw new Error(`La categoría con id: ${id} no existe`)
  }
}

//Validar si existen los ids de los productos 
const existeProductoPorId = async(id) => {
  const productoId = await Producto.findById(id);
  if(!productoId){
    throw new Error(`El producto con id: ${id} no existe`)
  }
}


  module.exports = {
      RoleValido,
      existeEmail,
      existeUsuarioPorId,
      existeCategoria,
      existeProductoPorId
  }