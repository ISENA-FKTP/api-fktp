import Homevisits from "../../models/datasakit_pegawai/HomevisitModel.js";
import Pegawais from "../../models/PegawaiModel.js";

export const getHomevisits = async(req, res) => {
    try {
        let response;
        if(req.role === "pegawai"){
            response = await Homevisits.findAll({
                attributes:['uuid', 'keluhan', 'pemeriksaanfisik', 'diagnosa', 'terapi', 'saranmedis', 'fotodokumentasi', 'createdAt'],
                include:[{
                    model: Pegawais,
                    attributes:['namapegawai', 'nrp']
                }]
            });
        }else{
            response = await Homevisits.findAll({
                attributes:['uuid', 'keluhan', 'pemeriksaanfisik', 'diagnosa', 'terapi', 'saranmedis', 'fotodokumentasi', 'createdAt'],
                where:{
                    pegawaiId: req.pegawaiId
                },
                include:[{
                    model: Pegawais,
                    attributes:['namapegawai', 'nrp']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getHomevisitById = async(req, res) => {
    try {
        const homevisit = await Homevisits.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!homevisit) return res.status(404).json({msg: "Data not found!"});
        let response;
        if(req.role === "pegawai"){
            response = await Homevisits.findOne({
                attributes:['uuid', 'keluhan', 'pemeriksaanfisik', 'diagnosa', 'terapi', 'saranmedis', 'fotodokumentasi', 'createdAt'],
                where:{
                    id: homevisit.id
                },
                include:[{
                    model: Pegawais,
                    attributes:['namapegawai','nrp']
                }]
            });
        }else{
            response = await Homevisits.findOne({
                attributes:['uuid', 'keluhan', 'pemeriksaanfisik', 'diagnosa', 'terapi', 'saranmedis', 'fotodokumentasi', 'createdAt'],
                where:{
                    [Op.and]:[{id: homevisit.id}, {pegawaiId: req.pegawaiId}]
                },
                include:[{
                    model: Pegawais,
                    attributes:['namapegawai','nrp']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createHomevisit = async(req, res) => {
    const {keluhan, pemeriksaanfisik, diagnosa, terapi, saranmedis, fotodokumentasi} = req.body;
    try {
        await Homevisits.create({
            keluhan: keluhan,
            pemeriksaanfisik: pemeriksaanfisik,
            diagnosa: diagnosa,
            terapi: terapi,
            saranmedis: saranmedis,
            fotodokumentasi: fotodokumentasi,
            pegawaiId: req.pegawaiId
        });
        res.status(201).json({msg: "Data Hasil Kunjungan Pegawai Berhasil Dimasukan!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateHomevisit = async(req, res) => {
    try {
        const homevisit = await Homevisits.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!homevisit) return res.status(404).json({msg: "Data not found!"});
        const {keluhan, pemeriksaanfisik, diagnosa, terapi, saranmedis, fotodokumentasi} = req.body;
        if(req.role === "pegawai"){
            await Homevisits.update({keluhan, pemeriksaanfisik, diagnosa, terapi, saranmedis, fotodokumentasi},{
                where:{
                    id: homevisit.id
                }
            });
        }else{
            if(req.pegawaiId !== homevisit.pegawaiId) return res.status(403).json({msg: "Access X"});
            await Homevisits.update({keluhan, pemeriksaanfisik, diagnosa, terapi, saranmedis, fotodokumentasi},{
                where:{
                    [Op.and]:[{id: homevisit.id}, {pegawaiId: req.pegawaiId}]
                }
            });
        }
        res.status(200).json({msg: "Data Hasil Kunjungan Pegawai berhasil di perbaharui!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteHomevisit = async(req, res) => {
    try {
        const homevisit = await Homevisits.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!homevisit) return res.status(404).json({msg: "Data not found!"});
        const {keluhan, pemeriksaanfisik, diagnosa, terapi, saranmedis, fotodokumentasi} = req.body;
        if(req.role === "pegawai"){
            await Homevisits.destroy({
                where:{
                    id: homevisit.id
                }
            });
        }else{
            if(req.pegawaiId !== homevisit.pegawaiId) return res.status(403).json({msg: "Akses terlarang"});
            await Homevisits.destroy({
                where:{
                    [Op.and]:[{id: homevisit.id}, {pegawaiId: req.pegawaiId}]
                }
            });
        }
        res.status(200).json({msg: "Data Hasil Kunjungan Pegawai berhasil dihapus!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}