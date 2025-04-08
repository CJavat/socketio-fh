const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // HTTP Server
    this.server = http.createServer(this.app);

    // Configuraciones de SocketIO
    this.io = socketio(this.server, {
      /* Configuraciones */
    });
  }

  middlewares() {
    //* Desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // Habilitar CORS
    this.app.use(cors());
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  excecute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar Sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
