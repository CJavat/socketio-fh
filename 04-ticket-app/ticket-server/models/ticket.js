const { v4: uuidV4 } = require("uuid");

class Ticket {
  constructor(numero) {
    this.id = uuidV4();
    this.numero = numero;
    this.escritorio = null;
    this.agente = null;
  }
}

module.exports = Ticket;
