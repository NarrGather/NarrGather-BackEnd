"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class invitations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      invitations.belongsTo(models.users, { foreignKey: "user_id" });

      invitations.hasMany(models.foryous, {
        foreignKey: "invitation_id",
      });

      invitations.hasMany(models.stories, {
        foreignKey: "invitation_id",
      });

      invitations.hasMany(models.wishes, {
        foreignKey: "invitation_id",
      });

      invitations.hasMany(models.banks, {
        foreignKey: "invitation_id",
      });
    }
  }
  invitations.init(
    {
      familyName: DataTypes.STRING,
      familyName2: DataTypes.STRING,
      groomDad: DataTypes.STRING,
      groomMom: DataTypes.STRING,
      brideDad: DataTypes.STRING,
      brideMom: DataTypes.STRING,
      groom: DataTypes.STRING,
      bride: DataTypes.STRING,
      day: DataTypes.STRING,
      date: DataTypes.DATE,
      address: DataTypes.STRING,
      time: DataTypes.STRING,
      place: DataTypes.STRING,
      image: DataTypes.TEXT,
      linkMap: DataTypes.TEXT,
      quotes: DataTypes.TEXT,
      quoter: DataTypes.STRING,
      groomSosmed1: DataTypes.TEXT,
      groomSosmed2: DataTypes.TEXT,
      groomSosmed3: DataTypes.TEXT,
      brideSosmed1: DataTypes.TEXT,
      brideSosmed2: DataTypes.TEXT,
      brideSosmed3: DataTypes.TEXT,
      urlCouple: DataTypes.STRING,
      noTemplate: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "invitations",
    }
  );
  return invitations;
};
