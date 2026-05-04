const { sequelize } = require("./sequelize");
require("../models/Usuario");

async function initDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Conexión exitosa a SQLite");
  } catch (error) {
    const wrapped = new Error("Error de conexión a SQLite");
    wrapped.cause = error;
    throw wrapped;
  }
}

module.exports = { initDb, sequelize };
