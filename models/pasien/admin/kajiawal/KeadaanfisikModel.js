import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";
import Pasiens from "../../PasienModel.js";

const { DataTypes } = Sequelize;

const KFs = db.define(
  "kfs",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    beratbadan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tinggibadan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lingkarperut: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imtBBTB: {
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

Pasiens.hasMany(KFs);
KFs.belongsTo(Pasiens, { foreignKey: "pasienId" });

export default KFs;
