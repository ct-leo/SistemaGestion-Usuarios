const express = require("express");
const { usuariosController } = require("../controllers/usuarios.controller");

const usuariosRouter = express.Router();

usuariosRouter.post("/", usuariosController.crear);
usuariosRouter.get("/", usuariosController.listar);
usuariosRouter.get("/:id", usuariosController.obtenerPorId);
usuariosRouter.put("/:id", usuariosController.actualizar);
usuariosRouter.delete("/:id", usuariosController.eliminar);

module.exports = { usuariosRouter };
