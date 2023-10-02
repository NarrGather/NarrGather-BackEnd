"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class banks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      banks.belongsTo(models.invitations, {
        foreignKey: "invitation_id",
      });
    }
  }
  banks.init(
    {
      nameBank: DataTypes.STRING,
      bankOwner: DataTypes.STRING,
      noRek: DataTypes.STRING,
      imageQR: DataTypes.TEXT,
      invitation_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "banks",
    }
  );
  return banks;
};
