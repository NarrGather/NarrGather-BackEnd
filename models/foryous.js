"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class foryous extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      foryous.belongsTo(models.invitations, {
        foreignKey: "invitation_id",
      });
    }
  }
  foryous.init(
    {
      name: DataTypes.STRING,
      invitation_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "foryous",
    }
  );
  return foryous;
};
