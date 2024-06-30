import Pengajuans from "../../../../models/pasien/admin/kajiawal/PengajuanModel.js";
import Pasiens from "../../../../models//pasien/PasienModel.js";
import { Op } from "sequelize";

export const getPengajuans = async (req, res) => {
  try {
    let response;
    if (req.role === "pasien") {
      response = await Pengajuans.findAll({
        attributes: [
          "uuid",
          "politujuan",
          "perawatan",
          "jeniskunjungan",
          "keluhan",
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
      response = await Pengajuans.findAll({
        attributes: [
          "uuid",
          "politujuan",
          "perawatan",
          "jeniskunjungan",
          "keluhan",
          "createdAt",
        ],
        where: {
          pasienId: req.pasienId,
        },
        include: [
          {
            model: Pasiens,
            attributes: ["uuid", "nama", "nobpjs"], // tambahkan atribut yang Anda perlukan dari model Pasiens
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
    if (req.role === "pasien") {
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
  const {
    politujuan,
    perawatan,
    jeniskunjungan,
    keluhan,
    anamnesia,
    tanggalKunjungan,
  } = req.body;

  if (!politujuan || !perawatan || !jeniskunjungan || !keluhan) {
    return res.status(400).json({ msg: "Semua kolom harus diisi!" });
  }

  try {
    const pengajuan = await Pengajuans.create({
      politujuan: politujuan,
      perawatan: perawatan,
      jeniskunjungan: jeniskunjungan,
      keluhan: keluhan,
      anamnesia: anamnesia,
      tanggalKunjungan: tanggalKunjungan,
      pasienId: req.pasienId,
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
    if (req.role === "pasien") {
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
