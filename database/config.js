const mongoose = require('mongoose');
const { collection } = require('../models/usuario');

const database = async()=>{

    try {
        
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
            
        } );

        console.log('Database onLine')


    } catch (error) {
        console.log(error);
        throw new Error('Failed to try connect the database');
    }



};






module.exports = {
    database


}