const {request, response } = require('express');
const {Producto} = require('../models');



const getProductos = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;

    const query = {estado: true};

    const [total, productos] = await Promise.all([
        await Producto.countDocuments(query), 
        await Producto.find(query)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))
    ])
    
    res.json({
        total,
        productos
    })

};


const getProducto = async(req = request, res = response) => {

    const {id} = req.params;

    const idproducto = await Producto.findById(id)
                                    .populate('usuario', 'nombre')
                                    .populate('categoria', 'nombre')

    res.json({
        idproducto
    })
};

const crearProductos  = async(req = request, res = response) => {

        const {estado, usuario, ...body} = req.body; //sacar del body estado y usuario, y grabar todo lo demas
        

     const productoDb = await Producto.findOne({nombre : body.nombre});
     if(productoDb){
         return res.status(400).json({
             msg: `El producto ${producto.nombre} ya existe en base de datos`
         });
     }

     //Generar la data a guardar
     const data = {
         ...body,
         nombre: body.nombre.toUpperCase(),
         usuario: req.usuario._id
     }

     const producto = new Producto(data);
     await producto.save();

     res.status(200).json(producto)
};


const actualizarProductos = async(req = request, res = response) => {

    const {id} = req.params;
    
    const {estado, usuario, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const actualizar = await Producto.findByIdAndUpdate(id, data, {new : true})

    res.json(actualizar)
};

const eliminarProductos = async(req = request, res = response) => {

    const {id} = req.params;

    const eliminar = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true})

    res.json(eliminar)
};

module.exports = {
    getProductos,
    getProducto,
    crearProductos,
    actualizarProductos,
    eliminarProductos

}
