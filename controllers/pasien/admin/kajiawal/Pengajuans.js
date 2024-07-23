import Pengajuans from "../../../../models/pasien/admin/kajiawal/PengajuanModel.js";
import Pasiens from "../../../../models//pasien/PasienModel.js";
import { Op } from "sequelize";

export const getPengajuans = async (req, res) => {
  try {
    let response;
    if (
      req.role === "dokter" ||
      req.role === "admin" ||
      req.role === "kepala bidang"
    ) {
      response = await Pengajuans.findAll({
        attributes: [
          "uuid",
          "politujuan",
          "perawatan",
          "jeniskunjungan",
          "keluhan",
          "approved",
          "createdAt",
        ],
        include: [
          {
            model: Pasiens,
            attributes: ["id", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Pengajuans.findAll({
        attributes: [
          "uuid",
          "politujuan",
          "perawatan",
          "jeniskunjungan",
          "keluhan",
          "approved",
          "createdAt",
        ],
        where: {
          userId: req.pasienId,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["id", "nama", "nobpjs"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPengajuanById = async (req, res) => {
  try {
    const pengajuan = await Pengajuans.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pengajuan) return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "admin" || req.role === "dokter") {
      response = await Pengajuans.findOne({
        where: {
          id: pengajuan.id,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Pengajuans.findOne({
        where: {
          [Op.and]: [{ id: pengajuan.id }, { pasienId: req.pasienId }],
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

export const getPengajuanByIdPrimary = async (req, res) => {
  try {
    const pengajuan = await Pengajuans.findOne({
      where: {
        pasienId: req.params.id,
      },
    });

    if (!pengajuan) return res.status(404).json({ msg: "Data not found!" });

    let response;
    if (req.role === "admin" || req.role === "dokter") {
      response = await Pengajuans.findOne({
        where: {
          id: pengajuan.id,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"],
          },
        ],
      });
    } else {
      response = await Pengajuans.findOne({
        where: {
          [Op.and]: [{ id: pengajuan.id }, { pasienId: req.pasienId }],
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

export const createPengajuan = async (req, res) => {
  const { politujuan, perawatan, jeniskunjungan, keluhan, pasienId } = req.body;

  if (!politujuan || !perawatan || !jeniskunjungan || !keluhan || !pasienId) {
    return res.status(400).json({ msg: "Semua kolom harus diisi!" });
  }

  try {
    const pengajuan = await Pengajuans.create({
      politujuan: politujuan,
      perawatan: perawatan,
      jeniskunjungan: jeniskunjungan,
      keluhan: keluhan,
      approved: false,
      pasienId: pasienId,
    });

    res
      .status(201)
      .json({ msg: "Data Pengajuan Berhasil Ditambahkan", pengajuan });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePengajuan = async (req, res) => {
  try {
    const pengajuan = await Pengajuans.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pengajuan) return res.status(404).json({ msg: "Data not found!" });

    const allowedFields = [
      "politujuan",
      "perawatan",
      "jeniskunjungan",
      "keluhan",
      "approved",
    ];

    const updateFields = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields[key] = req.body[key];
      }
    });

    await Pengajuans.update(updateFields, {
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json({ msg: "Data Pengajuan berhasil diperbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePengajuan = async (req, res) => {
  try {
    const pengajuan = await Pengajuans.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pengajuan) return res.status(404).json({ msg: "Data not found!" });
    const { politujuan, perawatan, jeniskunjungan, keluhan } = req.body;
    if (req.role === "admin" || req.role === "dokter") {
      await Pengajuans.destroy({
        where: {
          id: pengajuan.id,
        },
      });
    } else {
      if (req.pasienId !== pengajuan.pasienId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Pengajuans.destroy({
        where: {
          [Op.and]: [{ id: pengajuan.id }, { pasienId: req.pasienId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Pengajuan berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
