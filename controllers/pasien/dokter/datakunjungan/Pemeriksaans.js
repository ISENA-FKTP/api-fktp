import Pemeriksaans from "../../../../models/pasien/dokter/datakunjungan/PemeriksaanModel.js";
import Pasiens from "../../../../models/pasien/PasienModel.js";
import { Op } from "sequelize";

export const getPemeriksaans = async (req, res) => {
  try {
    let response;
    if (req.role === "pasien") {
      response = await Pemeriksaans.findAll({
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Pemeriksaans.findAll({
        where: {
          pasienId: req.pasienId,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPemeriksaanById = async (req, res) => {
  try {
    const pemeriksaan = await Pemeriksaans.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pemeriksaan) return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "pasien") {
      response = await Pemeriksaans.findOne({
        where: {
          id: pemeriksaan.id,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Pemeriksaans.findOne({
        where: {
          [Op.and]: [{ id: pemeriksaan.id }, { pasienId: req.pasienId }],
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPemeriksaan = async (req, res) => {
  const { kasusKLL, namadokter, pelayanannonmedis, statuspulang, pasienId } =
    req.body;
  try {
    const pemeriksaan = await Pemeriksaans.create({
      kasusKLL: kasusKLL,
      namadokter: namadokter,
      pelayanannonmedis: pelayanannonmedis,
      statuspulang: statuspulang,
      pasienId: pasienId,
    });

    res
      .status(201)
      .json({ msg: "Data Pemeriksaan Berhasil Ditambahkan", pemeriksaan });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePemeriksaan = async (req, res) => {
  try {
    const pemeriksaan = await Pemeriksaans.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pemeriksaan) return res.status(404).json({ msg: "Data not found!" });
    const allowedFields = [
      "kasusKLL",
      "namadokter",
      "pelayanannonmedis",
      "statuspulang",
    ];
    const updateFields = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields[key] = req.body[key];
      }
    });

    // Lakukan pembaruan data
    await Pemeriksaans.update(updateFields, {
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json({ msg: "Data Pemeriksaan berhasil diperbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePemeriksaan = async (req, res) => {
  try {
    const pemeriksaan = await Pemeriksaans.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pemeriksaan) return res.status(404).json({ msg: "Data not found!" });
    const { kasusKLL, namadokter, pelayanannonmedis, statuspulang } = req.body;
    if (req.role === "pasien") {
      await Pemeriksaans.destroy({
        where: {
          id: pemeriksaan.id,
        },
      });
    } else {
      if (req.pasienId !== pemeriksaan.pasienId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Pemeriksaans.destroy({
        where: {
          [Op.and]: [{ id: pemeriksaan.id }, { pasienId: req.pasienId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Pemeriksaan berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
