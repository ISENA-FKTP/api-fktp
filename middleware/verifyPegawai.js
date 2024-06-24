import Pegawais from "../models/PegawaiModel.js";

export const verifyPegawai = async (req, res, next) => {
  try {
    const pegawaiId = req.userDbId;
    console.log("Pegawai ID:", pegawaiId);
    if (!pegawaiId) {
      return res.status(401).json({ msg: "Mohon masukkan data pegawai" });
    }

    const pegawai = await Pegawais.findOne({
      where: {
        userId: pegawaiId,
      },
    });

    if (!pegawai) {
      return res.status(404).json({ msg: "Pegawai tidak ada!" });
    }

    req.pegawaiId = pegawai.id;
    console.log("Pegawai ID:", req.pegawaiId);

    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
