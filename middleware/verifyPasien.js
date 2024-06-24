import Pasiens from "../models/PasienModel.js";

export const verifyPasien = async (req, res, next) => {
  try {
    const { pasienId } = req.userDbId;
    console.log("Pasien ID:", pasienId);
    if (!pasienId) {
      return res.status(401).json({ msg: "Mohon masukkan data pasien" });
    }

    const pasien = await Pasiens.findOne({
      where: {
        userId: pasienId,
      },
    });

    if (!pasien) {
      return res.status(404).json({ msg: "Pasien tidak ada!" });
    }

    req.pasienId = pasien.id;
    console.log("User ID:", req.userId);

    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
