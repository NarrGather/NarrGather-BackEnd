"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stories.belongsTo(models.invitations, {
        foreignKey: "invitation_id",
      });
    }
  }
  stories.init(
    {
      year: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      image: DataTypes.TEXT,
      invitation_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "stories",
    }
  );
  return stories;
};
