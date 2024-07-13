import TTs from "../../../../models/pasien/dokter/datakunjungan/TandatanganModel.js";
import Pasiens from "../../../../models/pasien/PasienModel.js";
import { Op } from "sequelize";

export const getTTs = async (req, res) => {
  try {
    let response;
    if (req.role === "pasien") {
      response = await TTs.findAll({
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await TTs.findAll({
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

export const getTTById = async (req, res) => {
  try {
    const ttd = await TTs.findOne({
      where: {
        nrp: req.params.id,
      },
    });

    if (!ttd) return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "dokter") {
      response = await TTs.findOne({
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await TTs.findOne({
        where: {
          [Op.and]: [{ id: ttd.id }, { pasienId: req.pasienId }],
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

export const createTT = async (req, res) => {
  const { tandatangan, nrpDokter, pasienId } = req.body;
  try {
    const ttd = await TTs.create({
      tandatangan: tandatangan,
      nrp: nrpDokter,
      pasienId: pasienId,
    });

    res.status(201).json({ msg: "Tanda Tangan Berhasil Ditambahkan", ttd });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateTT = async (req, res) => {
  try {
    const ttd = await TTs.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!ttd) return res.status(404).json({ msg: "Data not found!" });
    const allowedFields = ["tandatangan"];
    const updateFields = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields[key] = req.body[key];
      }
    });

    await TTs.update(updateFields, {
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json({ msg: "Tanda Tangan berhasil diperbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteTT = async (req, res) => {
  try {
    const ttd = await TTs.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!ttd) return res.status(404).json({ msg: "Data not found!" });
    const { tandatangan } = req.body;
    if (req.role === "pasien") {
      await TTs.destroy({
        where: {
          id: ttd.id,
        },
      });
    } else {
      if (req.pasienId !== ttd.pasienId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await TTs.destroy({
        where: {
          [Op.and]: [{ id: ttd.id }, { pasienId: req.pasienId }],
        },
      });
    }
    res.status(200).json({ msg: "Tanda Tangan berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
