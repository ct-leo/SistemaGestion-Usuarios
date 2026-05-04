const express = require("express");
const path = require("path");
const { usuariosRouter } = require("./routes/usuarios.routes");

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      mensaje: "API REST de Gestión de Usuarios funcionando correctamente",
    });
  });

  app.use("/usuarios", usuariosRouter);

  app.use(express.static(path.join(__dirname, "../../dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../dist/index.html"));
  });
  
  app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
  });

  app.use((error, req, res, next) => {
    const statusCode = Number(error?.statusCode) || 500;

    if (statusCode >= 500) {
      console.error(error);
    }

    res.status(statusCode).json({
      error: error?.message || "Error interno del servidor",
    });
  });

  return app;
}

module.exports = { createApp };
