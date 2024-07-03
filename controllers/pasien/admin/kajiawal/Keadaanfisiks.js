import KFs from "../../../../models//pasien/admin/kajiawal/KeadaanfisikModel.js";
import Pasiens from "../../../../models//pasien/PasienModel.js";
import { Op } from "sequelize";

export const getKFs = async (req, res) => {
  try {
    let response;
    if (req.role === "admin" || req.role === "dokter") {
      response = await KFs.findAll({
        attributes: [
          "uuid",
          "beratbadan",
          "tinggibadan",
          "lingkarperut",
          "imtBBTB",
          "createdAt",
        ],
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await KFs.findAll({
        attributes: [
          "uuid",
          "beratbadan",
          "tinggibadan",
          "lingkarperut",
          "imtBBTB",
          "createdAt",
        ],
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

export const getKFById = async (req, res) => {
  try {
    const kf = await KFs.findOne({
      where: {
        pasienId: req.params.id,
      },
    });

    if (!kf) return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "admin" || req.role === "dokter") {
      response = await KFs.findOne({
        where: {
          id: kf.id,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await KFs.findOne({
        where: {
          [Op.and]: [{ id: kf.id }, { pasienId: req.params.id }],
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

export const createKF = async (req, res) => {
  const { beratbadan, tinggibadan, lingkarperut, imtBBTB, pasienId } = req.body;
  if (!beratbadan || !tinggibadan || !lingkarperut || !imtBBTB || !pasienId) {
    return res.status(400).json({ msg: "Semua kolom harus diisi!" });
  }
  try {
    const kf = await KFs.create({
      beratbadan: beratbadan,
      tinggibadan: tinggibadan,
      lingkarperut: lingkarperut,
      imtBBTB: imtBBTB,
      pasienId: pasienId,
    });

    res
      .status(201)
      .json({ msg: "Data Keadaan Fisik Berhasil Ditambahkan", kf });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateKF = async (req, res) => {
  try {
    const kf = await KFs.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!kf) return res.status(404).json({ msg: "Data not found!" });

    const allowedFields = [
      "beratbadan",
      "tinggibadan",
      "lingkarperut",
      "imtBBTB",
    ];

    const updateFields = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields[key] = req.body[key];
      }
    });

    await KFs.update(updateFields, {
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json({ msg: "Data Keadaan Fisik berhasil diperbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteKF = async (req, res) => {
  try {
    const kf = await KFs.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kf) return res.status(404).json({ msg: "Data not found!" });
    const { beratbadan, tinggibadan, lingkarperut, imtBBTB } = req.body;
    if (req.role === "pasien") {
      await KFs.destroy({
        where: {
          id: kf.id,
        },
      });
    } else {
      if (req.pasienId !== kf.pasienId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await KFs.destroy({
        where: {
          [Op.and]: [{ id: kf.id }, { pasienId: req.pasienId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Keadaan Fisik berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
