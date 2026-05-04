const path = require("path");
const { Sequelize } = require("sequelize");

const storage =
  process.env.SQLITE_STORAGE ||
  path.join(process.cwd(), "database.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false,
});

module.exports = { sequelize };
