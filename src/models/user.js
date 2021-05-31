const { DataTypes} = require("sequelize");
const db =require("../config/database/db");

const User=db.define("user",{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull:false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull:false,
  },
  role: {
    type: DataTypes.BOOLEAN,
    allowNull:false,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

module.exports = User;