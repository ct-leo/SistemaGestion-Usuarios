const express = require("express");
const path = require("path"); 
const { usuariosRouter } = require("./routes/usuarios.routes");

function createApp() {
  const app = express();

  app.use(express.json());

  // RUTAS API
  app.get("/api", (req, res) => {
    res.json({
      mensaje: "API REST de Gestión de Usuarios funcionando correctamente",
    });
  });

  app.use("/api/usuarios", usuariosRouter);

  // SERVIR FRONTEND (React build)
  const frontendPath = path.join(process.cwd(), "frontend/dist");

  app.use(express.static(frontendPath));

  // SPA (React Router)
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });

  // MANEJO DE ERRORES
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