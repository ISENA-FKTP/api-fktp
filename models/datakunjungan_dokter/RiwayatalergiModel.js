import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Pasiens from "../PasienModel.js";


const {DataTypes} = Sequelize;

const RAs = db.define('ras', {
    uuid:{
        type: DataTypes.STRING, 
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    makanan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    udara:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    obatan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    prognasa:{
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

Pasiens.hasMany(RAs);
RAs.belongsTo(Pasiens, {foreignKey: 'pasienId'});

export default RAs;