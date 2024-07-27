import Datarekammedis from "../../../models/pegawai/datasakit/DatarekammedisModel.js";
import Pegawais from "../../../models/pegawai/PegawaiModel.js";
import { Op } from "sequelize";

export const getDatarekammedis = async (req, res) => {
  try {
    let response;
    if (req.role === "pegawai") {
      response = await Datarekammedis.findAll({
        attributes: [
          "uuid",
          "keterangan",
          "filerekammedis",
          "createdAt",
          "pegawaiId",
        ],
        include: [
          {
            model: Pegawais,
            attributes: ["namapegawai", "nrp", "satuankerja", "pangkat"],
          },
        ],
      });
    } else {
      response = await Datarekammedis.findAll({
        attributes: [
          "uuid",
          "keterangan",
          "filerekammedis",
          "createdAt",
          "pegawaiId",
        ],
        where: {
          pegawaiId: req.pegawaiId,
        },
        include: [
          {
            model: Pegawais,
            attributes: ["namapegawai", "nrp", "satuankerja", "pangkat"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDatarekammedisById = async (req, res) => {
  try {
    const datarekammedis = await Datarekammedis.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!datarekammedis)
      return res.status(404).json({ msg: "Data not found!" });
    let response;
    if (req.role === "pegawai") {
      response = await Datarekammedis.findOne({
        attributes: ["uuid", "keterangan", "filerekammedis", "createdAt"],
        where: {
          id: datarekammedis.id,
        },
        include: [
          {
            model: Pegawais,
            attributes: ["namapegawai", "nrp", "satuankerja", "pangkat"],
          },
        ],
      });
    } else {
      response = await Datarekammedis.findOne({
        attributes: ["uuid", "keterangan", "filerekammedis", "createdAt"],
        where: {
          [Op.and]: [{ id: datarekammedis.id }, { pegawaiId: req.pegawaiId }],
        },
        include: [
          {
            model: Pegawais,
            attributes: ["namapegawai", "nrp", "satuankerja", "pangkat"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDatarekammedisByPegawaiId = async (req, res) => {
  try {
    const datarekammedis = await Datarekammedis.findAll({
      where: {
        pegawaiId: req.params.id,
      },
      include: [
        {
          model: Pegawais,
          attributes: ["uuid", "namapegawai", "nrp", "satuankerja", "pangkat"],
        },
      ],
    });

    if (!datarekammedis)
      return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "pegawai") {
      response = await Datarekammedis.findAll({
        attributes: ["uuid", "keterangan", "filerekammedis", "createdAt"],
        include: [
          {
            model: Pegawais,
            attributes: ["namapegawai", "nrp", "satuankerja", "pangkat"],
          },
        ],
      });
    } else {
      response = await Datarekammedis.findAll({
        attributes: ["uuid", "keterangan", "filerekammedis", "createdAt"],
        include: [
          {
            model: Pegawais,
            attributes: ["namapegawai", "nrp", "satuankerja", "pangkat"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createDatarekammedis = async (req, res) => {
  const { keterangan, pegawaiId, filerekammedis} = req.body;
  // const filePath = req.file.path.replace("uploads\\", "");
  // const filerekammedis = filePath;

  if (!keterangan || !filerekammedis) {
    return res.status(400).json({ msg: "Semua kolom harus diisi!" });
  }
  try {
    const datarekammedis = await Datarekammedis.create({
      keterangan: keterangan,
      filerekammedis: filerekammedis,
      pegawaiId: pegawaiId,
    });

    res.status(201).json({
      msg: "Data Rekam Medis pada Pegawai Berhasil Dimasukan!",
      userId: datarekammedis.id,
    });
  } catch (error) {
    console.error(
      "Error menambahkan Data Rekam Medis pada Pegawai:",
      error.message
    );
    res.status(500).json({ msg: error.message });
  }
};

export const updateDatarekammedis = async (req, res) => {
  try {
    const datarekammedis = await Datarekammedis.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!datarekammedis)
      return res.status(404).json({ msg: "Data not found!" });
    const { keterangan, filerekammedis } = req.body;
    if (req.role === "pegawai") {
      await Datarekammedis.update(
        { keterangan, filerekammedis },
        {
          where: {
            id: datarekammedis.id,
          },
        }
      );
    } else {
      if (req.pegawaiId !== datarekammedis.pegawaiId)
        return res.status(403).json({ msg: "Access X" });
      await Datarekammedis.update(
        { keterangan, filerekammedis },
        {
          where: {
            [Op.and]: [{ id: datarekammedis.id }, { pegawaiId: req.pegawaiId }],
          },
        }
      );
    }
    res
      .status(200)
      .json({ msg: "Data Rekam Medis Pegawai berhasil di perbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteDatarekammedis = async (req, res) => {
  try {
    const datarekammedis = await Datarekammedis.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!datarekammedis)
      return res.status(404).json({ msg: "Data not found!" });
    if (req.role === "pegawai") {
      await Datarekammedis.destroy({
        where: {
          id: datarekammedis.id,
        },
      });
    } else {
      if (req.pegawaiId !== datarekammedis.pegawaiId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Datarekammedis.destroy({
        where: {
          [Op.and]: [{ id: datarekammedis.id }, { pegawaiId: req.pegawaiId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Rekam Medis Pegawai berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
