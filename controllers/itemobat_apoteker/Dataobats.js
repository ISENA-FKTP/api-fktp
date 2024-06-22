import Dataobats from "../../models/itemobat_apoteker/DataobatModel.js";
import DeletedDataobats from "../../models/itemobat_apoteker/DeletedataobatModel.js";
import Users from "../../models/UserModel.js";

export const getDataobats = async(req, res) => {
    try {
        let response;
        if(req.role === "dokter" || req.role === "apoteker"){
            response = await Dataobats.findAll({
                attributes:['uuid', 'namaobat', 'jumlahobat', 'tglmasuk', 'tglkadaluarsa', 'nobatch', 'jenisobat', 'hargaobat', 'kategori', 'createdAt'],
                include:[{
                    model: Users,
                    attributes:['username','email']
                }]
            });
        }else{
            response = await Dataobats.findAll({
                attributes:['uuid', 'namaobat', 'jumlahobat', 'tglmasuk', 'tglkadaluarsa', 'nobatch', 'jenisobat', 'hargaobat', 'kategori', 'createdAt'],
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

export const getDataobatById = async(req, res) => {
    try {
        const itemobat = await Dataobats.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!itemobat) return res.status(404).json({msg: "Data not found!"});
        let response;
        if(req.role === "dokter" || req.role === "apoteker"){
            response = await Dataobats.findOne({
                attributes:['uuid', 'namaobat', 'jumlahobat', 'tglkadaluarsa', 'nobatch', 'jenisobat', 'hargaobat', 'kategori', 'createdAt'],
                where:{
                    id: itemobat.id
                },
                include:[{
                    model: Users,
                    attributes:['username','email']
                }]
            });
        }else{
            response = await Dataobats.findOne({
                attributes:['uuid', 'namaobat', 'jumlahobat', 'tglkadaluarsa', 'nobatch', 'jenisobat', 'hargaobat', 'kategori', 'createdAt'],
                where:{
                    [Op.and]:[{id: itemobat.id}, {userId: req.userId}]
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

export const createDataobat = async(req, res) => {
    const {namaobat, jumlahobat,tglmasuk, tglkadaluarsa, nobatch, jenisobat, hargaobat, kategori ,role} = req.body;
    try {
        await Dataobats.create({
            namaobat: namaobat,
            jumlahobat: jumlahobat,
            tglmasuk: tglmasuk,
            tglkadaluarsa: tglkadaluarsa,
            nobatch: nobatch,
            jenisobat: jenisobat,
            hargaobat: hargaobat,
            kategori: kategori,
            role: role,
            userId: req.userId
        });
        res.status(201).json({msg: "Data Obat Berhasil Dimasukan!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateDataobat = async(req, res) => {
    try {
        const itemobat = await Dataobats.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!itemobat) return res.status(404).json({msg: "Data not found!"});
        const {namaobat, jumlahobat, tglmasuk, tglkadaluarsa, nobatch, jenisobat, hargaobat, kategori} = req.body;
        if(req.role === "apoteker"){
            await Dataobats.update({namaobat, jumlahobat, tglmasuk, tglkadaluarsa, nobatch, jenisobat, hargaobat, kategori},{
                where:{
                    id: itemobat.id
                }
            });
        }else{
            if(req.userId !== itemobat.userId) return res.status(403).json({msg: "Access X"});
            await Dataobats.update({namaobat, jumlahobat, tglmasuk, tglkadaluarsa, nobatch, jenisobat, hargaobat, kategori},{
                where:{
                    [Op.and]:[{id: itemobat.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data Obat berhasil di perbaharui!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteDataobat = async(req, res) => {
    try {
        const itemobat = await Dataobats.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!itemobat) return res.status(404).json({ msg: "Data not found!" });

        // Simpan data yang dihapus ke dalam DeletedDataobats
        await DeletedDataobats.create({
            uuid: itemobat.uuid,
            namaobat: itemobat.namaobat,
            jumlahobat: itemobat.jumlahobat,
            tglmasuk: itemobat.tglmasuk,
            tglkadaluarsa: itemobat.tglkadaluarsa, 
            nobatch: itemobat.nobatch,
            jenisobat: itemobat.jenisobat,
            hargaobat: itemobat.hargaobat,
            kategori: itemobat.kategori,
            userId: itemobat.userId,
            deletedAt: new Date()
        });

        if (req.role === "apoteker") {
            await Dataobats.destroy({
                where: {
                    id: itemobat.id
                }
            });
        } else {
            if (req.userId !== itemobat.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await Dataobats.destroy({
                where: {
                    [Op.and]: [{ id: itemobat.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Data Obat berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};