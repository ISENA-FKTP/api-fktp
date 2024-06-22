import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Users from "../UserModel.js";

const { DataTypes } = Sequelize;

const TotalPenyakit = db.define('totalpenyakits', {
    uuid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    jenispenyakit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kesadaran:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    suhu:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }


}, {
    freezeTableName: true
});

Users.hasMany(TotalPenyakit, { foreignKey: 'userId' });
TotalPenyakit.belongsTo(Users, { foreignKey: 'userId' });

export default TotalPenyakit;
