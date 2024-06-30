import Diagnosas from "../../../../models/pasien/dokter/datakunjungan/DiagnosaModel.js";
import Pasiens from "../../../../models/pasien/PasienModel.js";
import TotalPenyakit from "../../../../models/pasien/data_statistik/TotalpenyakitModel.js";
import { Op } from "sequelize";

export const getDiagnosas = async (req, res) => {
  try {
    let response;
    if (req.role === "pasien") {
      response = await Diagnosas.findAll({
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Diagnosas.findAll({
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

export const getDiagnosaById = async (req, res) => {
  try {
    const diagnosa = await Diagnosas.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!diagnosa) return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "pasien") {
      response = await Diagnosas.findOne({
        where: {
          id: diagnosa.id,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Diagnosas.findOne({
        where: {
          [Op.and]: [{ id: diagnosa.id }, { pasienId: req.pasienId }],
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

export const createDiagnosa = async (req, res) => {
  const { jenispenyakit, kesadaran, suhu } = req.body;

  if (!jenispenyakit || !kesadaran || !suhu) {
    return res.status(400).json({ msg: "Semua kolom harus diisi!" });
  }

  try {
    const diagnosa = await Diagnosas.create({
      jenispenyakit: jenispenyakit,
      kesadaran: kesadaran,
      suhu: suhu,
      pasienId: req.pasienId,
    });

    let totalPenyakit = await TotalPenyakit.findOne({
      where: {
        jenispenyakit: jenispenyakit,
        userId: req.userId,
      },
    });

    if (totalPenyakit) {
      totalPenyakit.jumlah += 1;
      await totalPenyakit.save();
    } else {
      await TotalPenyakit.create({
        jenispenyakit: diagnosa.jenispenyakit,
        kesadaran: diagnosa.kesadaran,
        suhu: diagnosa.suhu,
        jumlah: 1,
        userId: req.userId,
      });
    }

    res
      .status(201)
      .json({ msg: "Data Diagnosa Berhasil Ditambahkan", diagnosa });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateDiagnosa = async (req, res) => {
  try {
    const diagnosa = await Diagnosas.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!diagnosa) return res.status(404).json({ msg: "Data not found!" });
    const allowedFields = ["jenispenyakit", "kesadaran", "suhu"];
    const updateFields = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields[key] = req.body[key];
      }
    });

    await Diagnosas.update(updateFields, {
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json({ msg: "Data Diagnosa berhasil diperbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteDiagnosa = async (req, res) => {
  try {
    const diagnosa = await Diagnosas.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!diagnosa) return res.status(404).json({ msg: "Data not found!" });
    const { jenispenyakit, kesadaran, suhu } = req.body;
    if (req.role === "pasien") {
      await Diagnosas.destroy({
        where: {
          id: diagnosa.id,
        },
      });
    } else {
      if (req.pasienId !== diagnosa.pasienId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Diagnosas.destroy({
        where: {
          [Op.and]: [{ id: diagnosa.id }, { pasienId: req.pasienId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Diagnosa berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
