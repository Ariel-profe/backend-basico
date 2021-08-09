const {response} = require('express');
const {ObjectId } = require('mongoose').Types;
const {Usuario, Producto, Categoria} = require('../models')

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];


const buscarUsuarios = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //validar si es id de mongo

    if(esMongoId){
        const usuario = await Usuario.findById(termino); // el termino trae el id validado
        return res.json({
            results: ( usuario ) ? [usuario] : [] // si el usuario existe, retornarlo con array, sino array vacio
        })
    }

    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{nombre:regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios
    })
};

const buscarCategorias = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //validar si es id de mongo

    if(esMongoId){
        const categoria = await Categoria.findById(termino) // el termino trae el id validado
        return res.json({
            results: ( categoria ) ? [categoria] : [] // si la categoria existe, retornarlo con array, sino array vacio
        })
    }

    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({nombre: regex, estado: true})
                                       

    res.json({
        results: categorias
    })
};



const buscarProductos = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //validar si es id de mongo

    if(esMongoId){
        const producto = await Producto.findById(termino)
                                            .populate('categoria', 'nombre'); // el termino trae el id validado
        return res.json({
            results: ( producto ) ? [producto] : [] // si el usuario existe, retornarlo con array, sino array vacio
        })
    }

    const regex = new RegExp(termino, 'i')

    const productos = await Producto.find({nombre: regex, estado: true})
                                        .populate('categoria', 'nombre');

    res.json({
        results: productos
    })
};


const buscar = (req, res = response) => {

    const {coleccion, termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `No encontrado, las colecciones son: ${coleccionesPermitidas}`
        })

    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
    
        default:
            res.status(500).json({
                msg: 'Se olvidó de hacer esta búsqueda'
            })
    }

}



module.exports = {
    buscar
}