const { usuariosService } = require("../services/usuarios.service");
const { createHttpError } = require("../errors/httpError");

function isValidEmail(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function parseId(raw) {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

function normalizeString(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed;
}

const usuariosController = {
  async crear(req, res, next) {
    try {
      const nombre = normalizeString(req.body?.nombre);
      const correo = normalizeString(req.body?.correo);

      if (!nombre || nombre.length > 120) {
        throw createHttpError(400, "El campo nombre es obligatorio (máx 120)");
      }

      if (!correo || correo.length > 160 || !isValidEmail(correo)) {
        throw createHttpError(400, "El campo correo es obligatorio y debe ser válido (máx 160)");
      }

      const usuario = await usuariosService.crear({ nombre, correo });
      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  },

  async listar(req, res, next) {
    try {
      const usuarios = await usuariosService.listar();
      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  },

  async obtenerPorId(req, res, next) {
    try {
      const id = parseId(req.params?.id);
      if (!id) throw createHttpError(400, "El parámetro id debe ser un entero positivo");

      const usuario = await usuariosService.obtenerPorId(id);
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  },

  async actualizar(req, res, next) {
    try {
      const id = parseId(req.params?.id);
      if (!id) throw createHttpError(400, "El parámetro id debe ser un entero positivo");

      const nombre = req.body?.nombre === undefined ? undefined : normalizeString(req.body?.nombre);
      const correo = req.body?.correo === undefined ? undefined : normalizeString(req.body?.correo);

      if (nombre === null) throw createHttpError(400, "El campo nombre no puede ser vacío");
      if (correo === null) throw createHttpError(400, "El campo correo no puede ser vacío");

      if (nombre === undefined && correo === undefined) {
        throw createHttpError(400, "Debes enviar al menos nombre o correo para actualizar");
      }

      if (nombre !== undefined && nombre.length > 120) {
        throw createHttpError(400, "El campo nombre excede el máximo (120)");
      }

      if (correo !== undefined) {
        if (correo.length > 160 || !isValidEmail(correo)) {
          throw createHttpError(400, "El campo correo debe ser válido (máx 160)");
        }
      }

      const usuario = await usuariosService.actualizar(id, { nombre, correo });
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  },

  async eliminar(req, res, next) {
    try {
      const id = parseId(req.params?.id);
      if (!id) throw createHttpError(400, "El parámetro id debe ser un entero positivo");

      await usuariosService.eliminar(id);
      res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { usuariosController, createHttpError };
