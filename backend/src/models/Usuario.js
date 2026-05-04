const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(160),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
    underscored: false,
  }
);

module.exports = { Usuario };
