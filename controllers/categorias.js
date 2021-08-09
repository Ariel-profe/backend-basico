const {request, response} = require('express');

const Categoria = require('../models/categoria');


//Obtener categorias - paginado - total - populate
const categoriasGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado : true};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
          .skip(Number(desde))
          .limit(Number(limite))
       ]);
      
      res.json({
        total,
        categorias
      })

}

//Obtener categoria por Id - populate
const categoriaId = async(req, res = response) => {

    
    const {id} = req.params;
    const idCategoria = await Categoria.findById(id).populate('usuario', 'nombre')
   

    res.json({
        idCategoria

    })
}

//Crear categoria - privado - con token valido
const crearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDb = await Categoria.findOne({nombre})

    if(categoriaDb){
        return res.status(400).json({
            msg: `La categoria ${categoriaDb.nombre} ya existe en base de datos`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data)

    await categoria.save();
    

    res.status(201).json(categoria)
}

//Actualizar categoría
const actualizarCategoria = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json( categoria );



}

//Eliminar una categoría - solo Admin
const categoriaDelete = async(req, res) => {
    const {id} = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new: true});

    res.json(categoriaBorrada)
}

module.exports = {
    categoriasGet,
    categoriaId,
    crearCategoria,
    actualizarCategoria,
    categoriaDelete
}