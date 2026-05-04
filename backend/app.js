require("dotenv").config();

const { createApp } = require("./src/app");
const { initDb } = require("./src/db");

const PORT = Number(process.env.PORT) || 3000;

async function start() {
  try {
    await initDb();

    const app = createApp();
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exitCode = 1;
  }
}

start();
