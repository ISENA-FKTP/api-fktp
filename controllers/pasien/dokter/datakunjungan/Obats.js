import Obats from "../../../../models/pasien/dokter/datakunjungan/ObatModel.js";
import Pasiens from "../../../../models/pasien/PasienModel.js";
import { Op } from "sequelize";

export const getObats = async (req, res) => {
  try {
    let response;
    if (req.role === "dokter" || req.role === "admin") {
      response = await Obats.findAll({
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Obats.findAll({
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

export const getObatById = async (req, res) => {
  try {
    const itemobat = await Obats.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!itemobat) return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "dokter" || req.role === "admin") {
      response = await Obats.findOne({
        where: {
          id: itemobat.id,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Obats.findOne({
        where: {
          [Op.and]: [{ id: itemobat.id }, { pasienId: req.pasienId }],
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

export const getObatByStatus = async (req, res) => {
  try {
    const itemobat = await Obats.findAll({
      where: {
        status: req.params.status,
      },
    });

    if (!itemobat || itemobat.length === 0) {
      return res.status(404).json({ msg: "Data not found!" });
    }

    const ids = itemobat.map((obat) => obat.dataValues.id);

    let response;
    if (req.role === "dokter" || req.role === "apoteker") {
      response = await Obats.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs", "tgllahir"],
          },
        ],
      });
    } else {
      response = await Obats.findAll({
        where: {
          [Op.and]: [
            { id: { [Op.in]: ids } },
            { pasienId: req.dataValues.pasienId },
          ],
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs", "tgllahir"],
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createObat = async (req, res) => {
  const { jenisobat, BMHP, pasienId } = req.body;

  const processedJenisObat = jenisobat.map((item) =>
    item.trim() === "" ? null : item
  );

  try {
    const itemobat = await Obats.create({
      jenisobat1: processedJenisObat[0],
      jenisobat2: processedJenisObat[1],
      jenisobat3: processedJenisObat[2],
      jenisobat4: processedJenisObat[3],
      jenisobat5: processedJenisObat[4],
      BMHP: BMHP,
      status: false,
      pasienId: pasienId,
    });

    res.status(201).json({ msg: "Data Obat Berhasil Ditambahkan", itemobat });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateObat = async (req, res) => {
  try {
    const itemobat = await Obats.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!itemobat) return res.status(404).json({ msg: "Data not found!" });
    const allowedFields = [
      "jenisobat1",
      "jenisobat2",
      "jenisobat3",
      "jenisobat4",
      "jenisobat5",
      "BMHP",
      "status",
    ];
    const updateFields = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields[key] = req.body[key];
      }
    });

    await Obats.update(updateFields, {
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json({ msg: "Data Obat berhasil diperbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteObat = async (req, res) => {
  try {
    const itemobat = await Obats.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!itemobat) return res.status(404).json({ msg: "Data not found!" });

    if (req.role === "dokter" || req.role === "admin") {
      await Obats.destroy({
        where: {
          id: itemobat.id,
        },
      });
    } else {
      if (req.pasienId !== itemobat.pasienId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Obats.destroy({
        where: {
          [Op.and]: [{ id: itemobat.id }, { pasienId: req.pasienId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Obat berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
