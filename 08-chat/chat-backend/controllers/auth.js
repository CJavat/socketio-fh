const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail)
      return res.status(400).json({ ok: false, msg: "El correo ya existe" });

    const usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar usuario en DB
    await usuario.save();

    // Generar el JWT
    token = await generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hable con el administrador" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB)
      return res.status(404).json({ ok: false, msg: "Email no encontrado" });

    // Validar el password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword)
      res.status(400).json({ ok: false, msg: "Password incorrecto" });

    // Generar el JWT
    const token = await generarJWT(usuarioDB.id);

    return res.status(201).json({ ok: true, usuario: usuarioDB, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hable con el administrador" });
  }
};

const renewToken = async (req, res) => {
  const uid = req.uid;

  // Generar nuevo JWT
  const token = await generarJWT(uid);

  // Obtener el usuario por uid
  const usuario = await Usuario.findById(uid);

  {
    res.json({
      ok: true,
      usuario,
      token,
    });
  }
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
