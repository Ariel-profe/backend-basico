const { response, request } = require('express');
const brcrypt = require('bcryptjs');//encriptar constraseña


const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response)=> {
    // const {q, nombre = 'No name'} = req.query;//para traer los parámetros de la url
    const {limite = 5, desde = 0} = req.query;
    const query = {estado : true};

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  //   const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
     ]);
    
    res.json({
      total,
      usuarios
      // total,
      // usuarios
    })
  };

const usuariosPost = async(req, res = response)=> {//Post para crear nuevos recursos

    

    const {nombre, correo, password, rol} = req.body;//esto viene de la request desde lo q la persona solicita
    const usuario = new Usuario( {nombre, correo, password, rol} );//creacion de instancia, pero sin grabar los datos en mongo
   
   

    //Encriptar el password
    const salt = brcrypt.genSaltSync();//el salt es la cantidad de vueltas de encriptado q queremos. 10 por defecto
    usuario.password = brcrypt.hashSync(password, salt);//el has es para encriptar

    //Guarda en base de datos
    await usuario.save(); //Aca se graban los datos, await para esperar a q se ingresen los datos

    res.json({
        usuario
    })
    
  };

  const usuariosPut = async(req, res)=> {//Put para actualizar data (ej:usuario creado correctamente)
    const {id} = req.params; //tb puede ser: req.params.ed. Trae el id del pedido en la ruta (usuarios/routes)
    const {_id, password, google, correo,  ...resto} = req.body;

    //Validar contra la db
    if(password){
        //Encriptar el password
      const salt = brcrypt.genSaltSync();//el salt es la cantidad de vueltas de encriptado q queremos. 10 por defecto
      resto.password = brcrypt.hashSync(password, salt);//el has es para encriptar
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        usuario
    })
  };

  const usuariosPatch = (req, res)=> {//Delete para borrar algo (no hace falta q sea fisicamente)
    res.json({
        msg: 'patch API - controlador'
    })
  };

  const usuariosDelete = async(req, res)=> {

    const {id} = req.params;

    //Borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json({
        usuario
    })
  };



  module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete
  }