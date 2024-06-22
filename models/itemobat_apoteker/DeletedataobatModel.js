// models/itemobat_apoteker/DeletedataobatModel.js
import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Users from "../UserModel.js";

const { DataTypes } = Sequelize;

const Deletedataobats = db.define('deletedataobats', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    namaobat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jumlahobat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tglmasuk:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    tglkadaluarsa: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nobatch: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jenisobat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hargaobat: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    kategori: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false 
});

// Define relation with Users model
Deletedataobats.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Deletedataobats, { foreignKey: 'userId' });

export default Deletedataobats;
