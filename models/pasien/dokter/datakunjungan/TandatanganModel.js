import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Pasiens from "../PasienModel.js";


const {DataTypes} = Sequelize;

const TTs = db.define('tts', {
    uuid:{
        type: DataTypes.STRING, 
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    tandatangan:{
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

Pasiens.hasMany(TTs);
TTs.belongsTo(Pasiens, {foreignKey: 'pasienId'});

export default TTs;