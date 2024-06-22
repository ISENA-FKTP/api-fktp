import Pasiens from "../models/PasienModel.js";

export const verifyPasien = async (req, res, next) => {
  try {
    if (!req.session.pasienId) {
      return res.status(401).json({ msg: "Mohon Masukan Data Pasien" });
    }

    const pasien = await Pasiens.findOne({
      where: {
        uuid: req.session.pasienId,
      },
    });

    if (!pasien) {
      return res.status(404).json({ msg: "Pasien tidak ada!" });
    }

    req.pasienId = pasien.id;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
