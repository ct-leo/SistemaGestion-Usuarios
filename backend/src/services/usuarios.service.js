const { Usuario } = require("../models/Usuario");
const { UniqueConstraintError } = require("sequelize");
const { createHttpError } = require("../errors/httpError");

const usuariosService = {
  async crear({ nombre, correo }) {
    try {
      const usuario = await Usuario.create({ nombre, correo });
      return usuario.toJSON();
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw createHttpError(409, "Ya existe un usuario con ese correo");
      }
      throw error;
    }
  },

  async listar() {
    const usuarios = await Usuario.findAll({
      order: [["id", "ASC"]],
    });
    return usuarios.map((u) => u.toJSON());
  },

  async obtenerPorId(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw createHttpError(404, "Usuario no encontrado");
    return usuario.toJSON();
  },

  async actualizar(id, { nombre, correo }) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw createHttpError(404, "Usuario no encontrado");

    if (nombre !== undefined) usuario.nombre = nombre;
    if (correo !== undefined) usuario.correo = correo;

    try {
      await usuario.save();
      return usuario.toJSON();
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw createHttpError(409, "Ya existe un usuario con ese correo");
      }
      throw error;
    }
  },

  async eliminar(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw createHttpError(404, "Usuario no encontrado");

    await usuario.destroy();
  },
};

module.exports = { usuariosService };
