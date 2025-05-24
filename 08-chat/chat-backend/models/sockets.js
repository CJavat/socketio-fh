const {
  usuarioConectado,
  usuarioDesconectado,
} = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query["x-token"]);
      if (!valido) {
        console.log("Socket no identificado");

        return socket.disconnect();
      }

      await usuarioConectado(uid);

      //TODO: Validar JWT | Si el token no es válido, desconectar
      //TODO: Saber que usuario está activo mediante el UID
      //TODO: Emitir todos los usuarios conectados
      //TODO: Socket join
      //TODO: Escuchar cuando el cliente manda un mensaje | mensaje-personal
      //TODO: Disconnect | Marcar en la BD que el usuario se desconectó
      //TODO: Emitir todos los usuarios conectados
      socket.on("disconnect", async () => {
        await usuarioDesconectado(uid);
      });
    });
  }
}

module.exports = Sockets;
