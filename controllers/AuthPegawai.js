import Pegawais from "../models/PegawaiModel.js";

export const LoginPegawai = async (req, res) => {
    const pegawai = await Pegawais.findOne({
        where:{
            nonrp: req.body.nrp
        }
    });
    if(!pegawai) return res.status(404).json({msg: "Pegawai Tidak Terdaftar!"});
    req.session.pegawaiId = pegawai.uuid;
    const uuid = pegawai.uuid;
    const namapegawai = pegawai.namapegawai;
    const nrp = pegawai.nrp;
    const pangkat = pegawai.pangkat;
    const satuankerja = pegawai.satuankerja;
    res.status(200).json({uuid, namapegawai, nrp, pangkat, satuankerja});
}