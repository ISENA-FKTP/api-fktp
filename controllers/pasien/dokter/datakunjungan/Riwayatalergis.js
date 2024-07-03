import RAs from "../../../../models/pasien/dokter/datakunjungan/RiwayatalergiModel.js";
import Pasiens from "../../../../models/pasien/PasienModel.js";
import { Op } from "sequelize";

export const getRAs = async (req, res) => {
  try {
    let response;
    if (req.role === "pasien") {
      response = await RAs.findAll({
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await RAs.findAll({
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

export const getRAById = async (req, res) => {
  try {
    const riwayatalergi = await RAs.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!riwayatalergi) return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "pasien") {
      response = await RAs.findOne({
        where: {
          id: riwayatalergi.id,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await RAs.findOne({
        where: {
          [Op.and]: [{ id: riwayatalergi.id }, { pasienId: req.pasienId }],
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

export const createRA = async (req, res) => {
  const { makanan, udara, obatan, prognosa, pasienId } = req.body;
  try {
    const riwayatalergi = await RAs.create({
      makanan: makanan,
      udara: udara,
      obatan: obatan,
      prognosa: prognosa,
      pasienId: pasienId,
    });

    res
      .status(201)
      .json({ msg: "Data Riwayat Alergi Berhasil Ditambahkan", riwayatalergi });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateRA = async (req, res) => {
  try {
    const riwayatalergi = await RAs.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!riwayatalergi) return res.status(404).json({ msg: "Data not found!" });
    const allowedFields = ["makanan", "udara", "obatan", "prognasa"];
    const updateFields = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields[key] = req.body[key];
      }
    });

    await RAs.update(updateFields, {
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json({ msg: "Data Riwayat Alergi berhasil diperbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteRA = async (req, res) => {
  try {
    const riwayatalergi = await RAs.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!riwayatalergi) return res.status(404).json({ msg: "Data not found!" });
    const { makanan, udara, obatan, prognasa } = req.body;
    if (req.role === "pasien") {
      await RAs.destroy({
        where: {
          id: riwayatalergi.id,
        },
      });
    } else {
      if (req.pasienId !== riwayatalergi.pasienId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await RAs.destroy({
        where: {
          [Op.and]: [{ id: riwayatalergi.id }, { pasienId: req.pasienId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Riwayat Alergi berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
