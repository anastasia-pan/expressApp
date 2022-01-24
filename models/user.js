const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../connection");

const User = connection.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    update: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { indexed: [{ unique: true, fields: ["name"] }] }
);

module.exports = User;
