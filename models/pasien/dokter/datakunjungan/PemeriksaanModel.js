import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";
import Pasiens from "../../PasienModel.js";

const { DataTypes } = Sequelize;

const Pemeriksaans = db.define(
  "pemeriksaans",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kasusKLL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    namadokter: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pelayanannonmedis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    statuspulang: {
      type: DataTypes.STRING,
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

Pasiens.hasMany(Pemeriksaans);
Pemeriksaans.belongsTo(Pasiens, { foreignKey: "pasienId" });

export default Pemeriksaans;
