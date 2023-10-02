"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("invitations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      familyName: {
        type: Sequelize.STRING,
      },
      familyName2: {
        type: Sequelize.STRING,
      },
      groomDad: {
        type: Sequelize.STRING,
      },
      groomMom: {
        type: Sequelize.STRING,
      },
      brideDad: {
        type: Sequelize.STRING,
      },
      brideMom: {
        type: Sequelize.STRING,
      },
      groom: {
        type: Sequelize.STRING,
      },
      bride: {
        type: Sequelize.STRING,
      },
      day: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      address: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING,
      },
      place: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.TEXT,
      },
      linkMap: {
        type: Sequelize.TEXT,
      },
      quotes: {
        type: Sequelize.TEXT,
      },
      quoter: {
        type: Sequelize.STRING,
      },
      groomSosmed1: {
        type: Sequelize.TEXT,
      },
      groomSosmed2: {
        type: Sequelize.TEXT,
      },
      groomSosmed3: {
        type: Sequelize.TEXT,
      },
      brideSosmed1: {
        type: Sequelize.TEXT,
      },
      brideSosmed2: {
        type: Sequelize.TEXT,
      },
      brideSosmed3: {
        type: Sequelize.TEXT,
      },
      urlCouple: {
        type: Sequelize.STRING,
      },
      noTemplate: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("invitations");
  },
};
