import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";
import Pasiens from "../../PasienModel.js";

const { DataTypes } = Sequelize;

const TDs = db.define(
  "tds",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sistole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    distole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    respiratory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    heartrate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    pasienId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Pasiens.hasMany(TDs);
TDs.belongsTo(Pasiens, { foreignKey: "pasienId" });

export default TDs;
