const { DataTypes} = require("sequelize");
const db =require("../config/database/db");

const User=db.define("user",{
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull:false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  user_phone: {
    type: DataTypes.BIGINT,
    allowNull:false,
  },
  user_role: {
    type: DataTypes.BOOLEAN,
    allowNull:false,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

module.exports = User;

