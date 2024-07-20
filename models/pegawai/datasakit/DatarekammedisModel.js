import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";
import Pegawais from "../PegawaiModel.js";

const { DataTypes } = Sequelize;

const Datarekammedis = db.define(
  "datarekammedis",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    keterangan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    filerekammedis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    pegawaiId: {
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

Pegawais.hasMany(Datarekammedis);
Datarekammedis.belongsTo(Pegawais, { foreignKey: "pegawaiId" });

export default Datarekammedis;
