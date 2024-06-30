import Pegawais from "../../models/pegawai/PegawaiModel.js";

export const LoginPegawai = async (req, res) => {
  try {
    const pegawai = await Pegawais.findOne({
      where: {
        nonrp: req.body.nrp,
      },
    });

    if (!pegawai) {
      return res.status(404).json({ msg: "Pegawai Tidak Terdaftar!" });
    }

    const { uuid, namapegawai, nrp, pangkat, satuankerja } = pegawai;

    res.status(200).json({ uuid, namapegawai, nrp, pangkat, satuankerja });
  } catch (error) {
    console.error("LoginPegawai error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
