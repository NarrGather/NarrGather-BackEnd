"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class wishes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      wishes.belongsTo(models.invitations, {
        foreignKey: "invitation_id",
      });
    }
  }
  wishes.init(
    {
      name: DataTypes.STRING,
      wish: DataTypes.TEXT,
      invitation_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "wishes",
    }
  );
  return wishes;
};
