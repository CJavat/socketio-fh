const { comprobarJWT } = require("../helpers/jwt");
const {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  grabarMensaje,
} = require("../controllers/sockets");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query["x-token"]);

      //? Validar JWT | Si el token no es válido, desconectar
      if (!valido) {
        console.log("Socket no identificado");

        return socket.disconnect();
      }

      //? Saber que usuario está activo mediante el UID
      await usuarioConectado(uid);

      //?: Emitir todos los usuarios conectados
      this.io.emit("lista-usuarios", await getUsuarios());

      //? Socket join
      // Unir al usuario a una sala de socket.io
      socket.join(uid);

      //? Escuchar cuando el cliente manda un mensaje | mensaje-personal
      socket.on("mensaje-personal", async (payload) => {
        const mensaje = await grabarMensaje(payload);
        this.io.to(payload.para).emit("mensaje-personal", mensaje);
        this.io.to(payload.de).emit("mensaje-personal", mensaje);
      });

      //? Disconnect | Marcar en la BD que el usuario se desconectó

      //TODO: Emitir todos los usuarios conectados
      socket.on("disconnect", async () => {
        await usuarioDesconectado(uid);

        this.io.emit("lista-usuarios", await getUsuarios());
      });
    });
  }
}

module.exports = Sockets;
