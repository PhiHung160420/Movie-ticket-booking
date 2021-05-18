'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    user_id:{type: DataTypes.INTEGER,primaryKey:true,allowNull:false},
    user_email: {type:DataTypes.STRING,allowNull:false,unique:true},
    user_name: {type:DataTypes.STRING,allowNull:false},
    user_phone: DataTypes.BIGINT,
    user_role: {type:DataTypes.BOOLEAN,allowNull:false}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};