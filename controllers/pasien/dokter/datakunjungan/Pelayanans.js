import Pelayanans from "../../../../models/pasien/dokter/datakunjungan/PelayananModel.js";
import Pasiens from "../../../../models/pasien/PasienModel.js";
import { Op } from "sequelize";

export const getPelayanans = async (req, res) => {
  try {
    let response;
    if (req.role === "pasien") {
      response = await Pelayanans.findAll({
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Pelayanans.findAll({
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

export const getPelayananById = async (req, res) => {
  try {
    const pelayanan = await Pelayanans.findOne({
      where: {
        pasienId: req.params.id,
      },
    });

    if (!pelayanan) return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "admin" || req.role === "dokter") {
      response = await Pelayanans.findOne({
        where: {
          id: pelayanan.id,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Pelayanans.findOne({
        where: {
          [Op.and]: [{ id: pelayanan.id }, { pasienId: req.pasienId }],
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

export const createPelayanan = async (req, res) => {
  const {
    perawatan,
    jeniskunjungan,
    poli,
    tanggalkunjungan,
    keluhan,
    anestesi,
    pasienId,
  } = req.body;
  try {
    const pelayanan = await Pelayanans.create({
      perawatan: perawatan,
      jeniskunjungan: jeniskunjungan,
      poli: poli,
      tanggalkunjungan: tanggalkunjungan,
      keluhan: keluhan,
      anestesi: anestesi,
      pasienId: pasienId,
    });

    res
      .status(201)
      .json({ msg: "Data Pelayanan Berhasil Ditambahkan", pelayanan });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePelayanan = async (req, res) => {
  try {
    const pelayanan = await Pelayanans.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pelayanan) return res.status(404).json({ msg: "Data not found!" });
    const allowedFields = [
      "perawatan",
      "jeniskunjungan",
      "poli",
      "tanggalkunjungan",
      "keluhan",
      "anestesi",
    ];
    const updateFields = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields[key] = req.body[key];
      }
    });

    // Lakukan pembaruan data
    await Pelayanans.update(updateFields, {
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json({ msg: "Data Pelayanan berhasil diperbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePelayanan = async (req, res) => {
  try {
    const pelayanan = await Pelayanans.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pelayanan) return res.status(404).json({ msg: "Data not found!" });
    const { beratbadan, tinggibadan, lingkarperut, imtBBTB } = req.body;
    if (req.role === "pasien") {
      await Pelayanans.destroy({
        where: {
          id: pelayanan.id,
        },
      });
    } else {
      if (req.pasienId !== pelayanan.pasienId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Pelayanans.destroy({
        where: {
          [Op.and]: [{ id: pelayanan.id }, { pasienId: req.pasienId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Pelayanan berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
