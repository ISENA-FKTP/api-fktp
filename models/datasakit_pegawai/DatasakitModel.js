import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Pegawais from "../PegawaiModel.js";


const {DataTypes} = Sequelize;

const Datasakits = db.define('datasakits', {
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
    jenisperawatan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    lamacuti:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    awalsakit:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    WFH:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    sumberbiaya:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    pegawaiId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: true
        }
    },
},{
    freezeTableName: true
});

Pegawais.hasMany(Datasakits);
Datasakits.belongsTo(Pegawais, {foreignKey: 'pegawaiId'});

export default Datasakits;