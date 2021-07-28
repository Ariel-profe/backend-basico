const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



const login = async(req, res = response) => {

    const {correo, password} = req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //Si el usuario esta activo en la db
        
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //Verifiar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password);//compara dos variables
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        //Generar el JWT

        const token = await generarJWT(usuario.id);


        res.json({
           usuario,
           token
            
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    
}




module.exports = {
    login
}