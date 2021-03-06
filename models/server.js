//El inicializador de la app ya no se encuentra en un archivo apartado, sino que se encuentra dentro
//de una clase con sus atributos y métodos, que será el SERVIDOR.

const express = require("express");
const cors = require("cors");
const { database } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
        auth: '/api/auth',
        buscar: '/api/buscar',
        categorias: '/api/categorias',
        productos: '/api/productos',
        usuarios: '/api/usuarios'
    }

    //Conectar a la base de datos
    this.conectarDB();
    //Middlewares (funciones q añaden funcionalidad al WebServer se ejecuta siempre q levantemos el servidor
    this.middlewares();

    //Rutas de mi app
    this.routes(); //se dispara el metodo cuando se lo llame
  }

  async conectarDB() {
    await database();
  }

  middlewares() {
    //Lectura y parseo del body
    this.app.use(express.json());
    //CORS (protege la API de ciertas paginas web, o quizas quiero que todo el mundo acceda)
    this.app.use(cors());
    
    //Directorio público
    this.app.use(express.static("public")); //la palabra USE es clave para que haga referencia al MW.
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.categorias, require("../routes/categorias"))
    this.app.use(this.paths.productos, require('../routes/productos'))
    this.app.use(this.paths.usuarios, require("../routes/usuarios")); //es un middleware condicional, cuando pase por esa ruta q haga la peticion
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
