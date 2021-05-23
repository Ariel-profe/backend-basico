const { response, request } = require('express');


const usuariosGet = (req = request, res = response)=> {
    const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;//para traer los parámetros de la url
    
    res.json({
        msg: ' get API - Controlador ',
        q,
        nombre,
        apikey,
        page,
        limit
    })
  };

const usuariosPost = (req, res)=> {//Post para crear nuevos recursos

    const {nombre, edad} = req.body;//esto viene de la request desde lo q la persona solicita

    res.json({
        msg: 'post API  - controlador',
        nombre,
        edad
    })
  };

  const usuariosPut = (req, res)=> {//Put para actualizar data (ej:usuario creado correctamente)
    const {id} = req.params; //tb puede ser: req.params.ed. Trae el id del pedido en la ruta (usuarios/routes)

    res.json({
        msg: 'put API - controlador',
        id
    })
  };

  const usuariosPatch = (req, res)=> {//Delete para borrar algo (no hace falta q sea fisicamente)
    res.json({
        msg: 'patch API - controlador'
    })
  };

  const usuariosDelete = (req, res)=> {//Delete para borrar algo (no hace falta q sea fisicamente)
    res.json({
        msg: 'delete API - controlador'
    })
  };



  module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete
  }