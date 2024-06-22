import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Pasiens from "../PasienModel.js";


const {DataTypes} = Sequelize;

const Diagonsas = db.define('diagnosas', {
    uuid:{
        type: DataTypes.STRING, 
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    jenispenyakit:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
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

Pasiens.hasMany(Diagonsas);
Diagonsas.belongsTo(Pasiens, {foreignKey: 'pasienId'});

export default Diagonsas;