import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Pasiens from "../PasienModel.js";


const {DataTypes} = Sequelize;

const Pengajuans = db.define('pengajuans', {
    uuid:{
        type: DataTypes.STRING, 
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    politujuan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    perawatan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    jeniskunjungan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    keluhan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    
    pasienId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: true
        }
    },
},{
    freezeTableName: true
});

Pasiens.hasMany(Pengajuans);
Pengajuans.belongsTo(Pasiens, {foreignKey: 'pasienId'});

export default Pengajuans;