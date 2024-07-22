import Datasakits from "../../../models/pegawai/datasakit/DatasakitModel.js";
import Pegawais from "../../../models/pegawai/PegawaiModel.js";
import { Op } from "sequelize";

export const getDatasakits = async (req, res) => {
  try {
    let response;
    if (req.role === "pegawai" || req.role === "kepala bidang") {
      response = await Datasakits.findAll({
        attributes: [
          "uuid",
          "jenispenyakit",
          "jenisperawatan",
          "lamacuti",
          "awalsakit",
          "keterangan",
          "wfh",
          "sumberbiaya",
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
      response = await Datasakits.findAll({
        attributes: [
          "uuid",
          "jenispenyakit",
          "jenisperawatan",
          "lamacuti",
          "awalsakit",
          "keterangan",
          "wfh",
          "sumberbiaya",
          "createdAt",
        ],
        where: {
          pegawaiId: req.pegawaiId,
        },
        include: [
          {
            model: Pegawais,
            attributes: ["namapegawai", "nrp"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDatasakitById = async (req, res) => {
  try {
    const datasakit = await Datasakits.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!datasakit) return res.status(404).json({ msg: "Data not found!" });
    let response;
    if (req.role === "pegawai") {
      response = await Datasakits.findOne({
        attributes: [
          "uuid",
          "jenispenyakit",
          "jenisperawatan",
          "lamacuti",
          "awalsakit",
          "keterangan",
          "wfh",
          "sumberbiaya",
          "createdAt",
        ],
        where: {
          id: datasakit.id,
        },
        include: [
          {
            model: Pegawais,
            attributes: [
              "uuid",
              "namapegawai",
              "nrp",
              "satuankerja",
              "pangkat",
            ],
          },
        ],
      });
    } else {
      response = await Datasakits.findOne({
        attributes: [
          "uuid",
          "jenispenyakit",
          "jenisperawatan",
          "lamacuti",
          "awalsakit",
          "keterangan",
          "wfh",
          "sumberbiaya",
          "createdAt",
        ],
        where: {
          [Op.and]: [{ id: datasakit.id }, { pegawaiId: req.pegawaiId }],
        },
        include: [
          {
            model: Pegawais,
            attributes: ["namapegawai", "nrp"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDatasakitByPegawaiId = async (req, res) => {
  if (req.role === "pegawai" || req.role === "kepala bidang") {
    try {
      const datasakitList = await Datasakits.findAll({
        where: {
          pegawaiId: req.params.id,
        },
        include: [
          {
            model: Pegawais,
            attributes: [
              "uuid",
              "namapegawai",
              "nrp",
              "satuankerja",
              "pangkat",
            ],
          },
        ],
      });

      if (!datasakitList.length)
        return res.status(404).json({ msg: "Data not found!" });

      let response;
      if (req.role === "pegawai") {
        response = datasakitList.map((datasakit) => {
          const {
            uuid,
            jenispenyakit,
            jenisperawatan,
            lamacuti,
            awalsakit,
            keterangan,
            WFH,
            sumberbiaya,
            createdAt,
            pegawai,
          } = datasakit.dataValues;

          return {
            uuid,
            jenispenyakit,
            jenisperawatan,
            lamacuti,
            awalsakit,
            keterangan,
            WFH,
            sumberbiaya,
            createdAt,
            Pegawais: {
              uuid: pegawai.dataValues.uuid,
              namapegawai: pegawai.dataValues.namapegawai,
              nrp: pegawai.dataValues.nrp,
              satuankerja: pegawai.dataValues.satuankerja,
              pangkat: pegawai.dataValues.pangkat,
            },
          };
        });
      } else {
        response = datasakitList.map((datasakit) => {
          const {
            uuid,
            jenispenyakit,
            jenisperawatan,
            lamacuti,
            awalsakit,
            keterangan,
            WFH,
            sumberbiaya,
            createdAt,
            pegawai,
          } = datasakit.dataValues;

          return {
            uuid,
            jenispenyakit,
            jenisperawatan,
            lamacuti,
            awalsakit,
            keterangan,
            WFH,
            sumberbiaya,
            createdAt,
            Pegawais: {
              namapegawai: pegawai.dataValues.namapegawai,
              nrp: pegawai.dataValues.nrp,
            },
          };
        });
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
};

export const createDatasakit = async (req, res) => {
  const {
    jenispenyakit,
    jenisperawatan,
    lamacuti,
    awalsakit,
    keterangan,
    WFH,
    sumberbiaya,
    pegawaiId,
  } = req.body;
  try {
    await Datasakits.create({
      jenispenyakit: jenispenyakit,
      jenisperawatan: jenisperawatan,
      lamacuti: lamacuti,
      awalsakit: awalsakit,
      keterangan: keterangan,
      WFH: WFH,
      sumberbiaya: sumberbiaya,
      pegawaiId: pegawaiId,
    });
    console.log();
    res.status(201).json({ msg: "Data Sakit Pegawai Berhasil Dimasukan!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateDatasakit = async (req, res) => {
  try {
    const datasakit = await Datasakits.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!datasakit) return res.status(404).json({ msg: "Data not found!" });
    const {
      jenispenyakit,
      jenisperawatan,
      lamacuti,
      awalsakit,
      keterangan,
      wfh,
      sumberbiaya,
    } = req.body;
    if (req.role === "pegawai") {
      await Datasakits.update(
        {
          jenispenyakit,
          jenisperawatan,
          lamacuti,
          awalsakit,
          keterangan,
          wfh,
          sumberbiaya,
        },
        {
          where: {
            id: datasakit.id,
          },
        }
      );
    } else {
      if (req.pegawaiId !== datasakit.pegawaiId)
        return res.status(403).json({ msg: "Access X" });
      await Datasakits.update(
        {
          jenispenyakit,
          jenisperawatan,
          lamacuti,
          awalsakit,
          keterangan,
          wfh,
          sumberbiaya,
        },
        {
          where: {
            [Op.and]: [{ id: datasakit.id }, { pegawaiId: req.pegawaiId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Data Sakit Pegawai berhasil di perbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteDatasakit = async (req, res) => {
  try {
    const datasakit = await Datasakits.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!datasakit) return res.status(404).json({ msg: "Data not found!" });
    const {
      jenispenyakit,
      jenisperawatan,
      lamacuti,
      awalsakit,
      keterangan,
      wfh,
      sumberbiaya,
    } = req.body;
    if (req.role === "pegawai") {
      await Datasakits.destroy({
        where: {
          id: datasakit.id,
        },
      });
    } else {
      if (req.pegawaiId !== datasakit.pegawaiId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Datasakits.destroy({
        where: {
          [Op.and]: [{ id: datasakit.id }, { pegawaiId: req.pegawaiId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Sakit Pegawai berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
