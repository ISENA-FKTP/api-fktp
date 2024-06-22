import Pasiens from "../models/PasienModel.js";

export const LoginPasien = async (req, res) => {
  try {
    const pasien = await Pasiens.findOne({
      where: {
        nobpjs: req.body.nobpjs,
      },
    });

    if (!pasien) {
      return res.status(404).json({ msg: "Pasien Tidak Terdaftar!" });
    }

    const {
      uuid,
      nobpjs,
      nama,
      statuspeserta,
      tgllahir,
      gender,
      ppkumum,
      nohp,
      norm,
    } = pasien;

    res.status(200).json({
      uuid,
      nobpjs,
      nama,
      statuspeserta,
      tgllahir,
      gender,
      ppkumum,
      nohp,
      norm,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("LoginPasien error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
