const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

//* Desplegar el directorio publico
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  socket.emit("mensaje-bienvenida", {
    mensaje: "Bienvenido al server",
    fecha: new Date().getDate(),
  });

  socket.on("mensaje-to-server", (data) => {
    console.log(data);
    io.emit("mensaje-from-server", data);
  });
});

server.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080");
});
