"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.invitations, {
        foreignKey: "user_id",
      });
    }
  }

  users.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.TEXT,
      email: DataTypes.STRING,
      otp: DataTypes.INTEGER,
      verified: DataTypes.BOOLEAN,
      phoneNumber: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM(["admin", "user"]),
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
