import TDs from "../../../../models/pasien/admin/kajiawal/TekanandarahModel.js";
import Pasiens from "../../../../models//pasien/PasienModel.js";
import { Op } from "sequelize";

export const getTDs = async (req, res) => {
  console.log("Ini Data: ", req);
  try {
    let response;
    if (req.role === "admin" || req.role === "dokter") {
      response = await TDs.findAll({
        attributes: [
          "uuid",
          "sistole",
          "distole",
          "respiratory",
          "heartrate",
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
      response = await TDs.findAll({
        attributes: [
          "uuid",
          "sistole",
          "distole",
          "respiratory",
          "heartrate",
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

export const getTDById = async (req, res) => {
  try {
    const td = await TDs.findOne({
      where: {
        pasienId: req.params.id,
      },
    });

    if (!td) return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "admin" || req.role === "dokter") {
      response = await TDs.findOne({
        where: {
          id: td.id,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await TDs.findOne({
        where: {
          [Op.and]: [{ id: td.id }, { pasienId: req.params.id }],
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

export const createTD = async (req, res) => {
  const { sistole, distole, respiratory, heartrate, pasienId } = req.body;

  if (!sistole || !distole || !respiratory || !heartrate || !pasienId) {
    return res.status(400).json({ msg: "Semua kolom harus diisi!" });
  }

  try {
    const td = await TDs.create({
      sistole: sistole,
      distole: distole,
      respiratory: respiratory,
      heartrate: heartrate,
      pasienId: pasienId,
    });

    res
      .status(201)
      .json({ msg: "Data Tekanan Darah Berhasil Ditambahkan", td });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateTD = async (req, res) => {
  try {
    const td = await TDs.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!td) return res.status(404).json({ msg: "Data not found!" });

    const allowedFields = ["sistole", "distole", "respiratory", "heartrate"];

    const updateFields = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields[key] = req.body[key];
      }
    });

    await TDs.update(updateFields, {
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json({ msg: "Data Tekanan Darah berhasil diperbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteTD = async (req, res) => {
  try {
    const td = await TDs.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!td) return res.status(404).json({ msg: "Data not found!" });
    const { sistole, distole, respiratory, heartrate } = req.body;
    if (req.role === "pasien") {
      await TDs.destroy({
        where: {
          id: td.id,
        },
      });
    } else {
      if (req.pasienId !== td.pasienId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await TDs.destroy({
        where: {
          [Op.and]: [{ id: td.id }, { pasienId: req.pasienId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Tekanan Darah berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
