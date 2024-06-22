import Pegawais from "../models/PegawaiModel.js";

export const verifyPegawai = async (req, res, next) => {
  try {
    if (!req.session.pegawaiId) {
      return res.status(401).json({ msg: "Mohon Masukan Data Pegawai" });
    }

    const pegawai = await Pegawais.findOne({
      where: {
        uuid: req.session.pegawaiId,
      },
    });

    if (!pegawai) {
      return res.status(404).json({ msg: "Pegawai tidak ada!" });
    }

    req.pegawaiId = pegawai.id;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
