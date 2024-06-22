// import Diagnosas from "../../models/datakunjungan_dokter/DiagonsaModel.js";
import TotalPenyakit from "../../models/data_statistik/TotalPenyakitModel.js";
import Users from "../../models/UserModel.js";

// Fungsi untuk membuat total penyakit
export const getTotalPenyakits = async(req, res) => {
    try {
        let response;
        if(req.role === "statistik"){
            response = await TotalPenyakit.findAll({
                attributes:['uuid','jenispenyakit', 'kesadaran', 'suhu', 'createdAt'],
                include:[{
                    model: Users,
                    attributes:['username','email']
                }]
            });
        }else{
            response = await TotalPenyakit.findAll({
                attributes:['uuid','jenispenyakit', 'kesadaran', 'suhu', 'createdAt'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Users,
                    attributes:['username','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const deleteTotalPenyakit = async(req, res) => {
    try {
        const totalpenyakit = await TotalPenyakit.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!totalpenyakit) return res.status(404).json({msg: "Data not found!"});
        const {jenispenyakit} = req.body;
        if(req.role === "statistik"){
            await TotalPenyakit.destroy({
                where:{
                    id: totalpenyakit.id
                }
            });
        }else{
            if(req.userId !== totalpenyakit.userId) return res.status(403).json({msg: "Akses terlarang"});
            await TotalPenyakit.destroy({
                where:{
                    [Op.and]:[{id: totalpenyakit.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data Total Penyakit berhasil dihapus!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}