import Pasiens from "../models/PasienModel.js";

export const LoginPasien = async (req, res) => {
    const pasien = await Pasiens.findOne({
        where:{
            nobpjs: req.body.nobpjs
        }
    });
    if(!pasien) return res.status(404).json({msg: "Pasien Tidak Terdaftar!"});
    req.session.pasienId = pasien.uuid;
    const uuid = pasien.uuid;
    const nobpjs = pasien.nobpjs;
    const nama = pasien.nama;
    const statuspeserta = pasien.statuspeserta;
    const tgllahir = pasien.tgllahir;
    const gender = pasien.gender;
    const ppkumum = pasien.ppkumum;
    const nohp = pasien.nohp;
    const norm = pasien.norm;
    res.status(200).json({uuid, nobpjs, nama, statuspeserta, tgllahir, gender, ppkumum, nohp, norm});
}