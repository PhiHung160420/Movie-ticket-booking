const { DataTypes} = require("sequelize");
const db =require("../config/database/db");
const bcrypt = require('bcrypt-nodejs');

const User=db.define(
  "user",{
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
      type: DataTypes.STRING,
      allowNull:false,
    },
    user_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_verify:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user_role: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull:false,
    },
  }, 
{timestamps: false, createdAt: false, updatedAt: false});

User.findUserByEmail = async function (user_email) {
  return User.findOne({
      where:{
        user_email,
      }
  })
};

User.finUserdById = async function (user_id) {
  return User.findByPk(user_id);  
};

//sinh chuỗi hash
User.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSalt(8),null);
};

User.validPassword = function(password){
  return bcrypt.compareSync(password, this.user.user_password);
};

module.exports = User;