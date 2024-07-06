import { response } from "express";
import Dataobats from "../../models/apotek/DataobatModel.js";
import DeletedDataobats from "../../models/apotek/DeletedataobatModel.js";
import Users from "../../models/UserModel.js";
import { Op } from "sequelize";

export const getDataobats = async (req, res) => {
  try {
    let response;
    if (req.role === "dokter" || req.role === "apoteker") {
      response = await Dataobats.findAll({
        attributes: [
          "uuid",
          "namaobat",
          "jumlahobat",
          "tglmasuk",
          "tglkadaluarsa",
          "nobatch",
          "jenisobat",
          "hargaobat",
          "kategori",
          "createdAt",
        ],
        include: [
          {
            model: Users,
            attributes: ["username", "email"],
          },
        ],
      });
    } else {
      response = await Dataobats.findAll({
        attributes: [
          "uuid",
          "namaobat",
          "jumlahobat",
          "tglmasuk",
          "tglkadaluarsa",
          "nobatch",
          "jenisobat",
          "hargaobat",
          "kategori",
          "createdAt",
        ],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["username", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDataobatById = async (req, res) => {
  try {
    const itemobat = await Dataobats.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!itemobat) return res.status(404).json({ msg: "Data not found!" });
    let response;
    if (req.role === "dokter" || req.role === "apoteker") {
      response = await Dataobats.findOne({
        attributes: [
          "uuid",
          "namaobat",
          "jumlahobat",
          "tglkadaluarsa",
          "nobatch",
          "jenisobat",
          "hargaobat",
          "kategori",
          "createdAt",
        ],
        where: {
          id: itemobat.id,
        },
        include: [
          {
            model: Users,
            attributes: ["username", "email"],
          },
        ],
      });
    } else {
      response = await Dataobats.findOne({
        attributes: [
          "uuid",
          "namaobat",
          "jumlahobat",
          "tglkadaluarsa",
          "nobatch",
          "jenisobat",
          "hargaobat",
          "kategori",
          "createdAt",
        ],
        where: {
          [Op.and]: [{ id: itemobat.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["username", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createDataobat = async (req, res) => {
  const {
    namaobat,
    jumlahobat,
    tglmasuk,
    tglkadaluarsa,
    nobatch,
    jenisobat,
    hargaobat,
    kategori,
  } = req.body;

  if (
    !namaobat ||
    !jumlahobat ||
    !tglmasuk ||
    !tglkadaluarsa ||
    !nobatch ||
    !jenisobat ||
    !hargaobat ||
    !kategori
  ) {
    return res.status(400).json({ msg: "Semua kolom harus diisi!" });
  }

  try {
    const dataobat = await Dataobats.create({
      namaobat: namaobat,
      jumlahobat: jumlahobat,
      tglmasuk: tglmasuk,
      tglkadaluarsa: tglkadaluarsa,
      nobatch: nobatch,
      jenisobat: jenisobat,
      hargaobat: hargaobat,
      kategori: kategori,
      role: req.role,
      userId: req.userDbId,
    });
    res.status(201).json({
      msg: "Data Obat Berhasil Dimasukan!",
    });
  } catch (error) {
    console.error("Error menambahkan Data Obat:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const updateDataobat = async (req, res) => {
  try {
    const itemobat = await Dataobats.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!itemobat)
      return res.status(404).json({ msg: "Data Obat Tidak Ditemukan!" });
    const {
      namaobat,
      jumlahobat,
      tglmasuk,
      tglkadaluarsa,
      nobatch,
      jenisobat,
      hargaobat,
      kategori,
    } = req.body;

    await DeletedDataobats.create({
      namaobat: itemobat.namaobat,
      jumlahobat: itemobat.jumlahobat,
      tglmasuk: itemobat.tglmasuk,
      tglkadaluarsa: itemobat.tglkadaluarsa,
      nobatch: itemobat.nobatch,
      jenisobat: itemobat.jenisobat,
      hargaobat: itemobat.hargaobat,
      kategori: itemobat.kategori,
      userId: itemobat.userId,
      deletedAt: new Date(),
    });

    if (req.role === "apoteker") {
      await Dataobats.update(
        {
          namaobat,
          jumlahobat,
          tglmasuk,
          tglkadaluarsa,
          nobatch,
          jenisobat,
          hargaobat,
          kategori,
        },
        {
          where: {
            id: itemobat.id,
          },
        }
      );
    } else {
      if (req.userId !== itemobat.userId)
        return res.status(403).json({ msg: "Access Denied" });
      await Dataobats.update(
        {
          namaobat,
          jumlahobat,
          tglmasuk,
          tglkadaluarsa,
          nobatch,
          jenisobat,
          hargaobat,
          kategori,
        },
        {
          where: {
            [Op.and]: [{ id: itemobat.id }, { userId: req.userId }],
          },
        }
      );
    }

    res.status(200).json({ msg: "Data Obat berhasil diperbarui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const tambahKurangDataObats = async (req, res) => {
  try {
    const { uuid } = req.params;
    const itemobat = await Dataobats.findOne({
      where: { uuid },
    });
    if (!itemobat) {
      return res.status(404).json({ msg: "Data Obat Tidak Ditemukan!" });
    }

    const currentObat = req.body.jumlahobats;

    if (typeof currentObat !== "number") {
      return res.status(400).json({ msg: "Jumlah obat harus berupa angka" });
    }
    let updatedJumlahobat;
    console.log("Body request:", req.body.status);

    if (req.body.status === "Tambah") {
      updatedJumlahobat = itemobat.dataValues.jumlahobat + currentObat;
    } else if (req.body.status === "Kurangi") {
      updatedJumlahobat = itemobat.dataValues.jumlahobat - currentObat;
      if (updatedJumlahobat < 0) updatedJumlahobat = 0;
    } else {
      return res.status(400).json({ msg: "Status tidak valid" });
    }

    if (req.role === "apoteker") {
      console.log(
        "Updating data for apoteker with UUID:",
        itemobat.dataValues.uuid
      );
      const result = await Dataobats.update(
        { jumlahobat: updatedJumlahobat },
        { where: { uuid: itemobat.dataValues.uuid } }
      );
      if (result[0] === 0) {
        console.error(
          "No rows updated. UUID may not match:",
          itemobat.dataValues.uuid
        );
      } else {
        console.log("Data updated successfully:");
      }
    } else {
      if (req.userId !== itemobat.userId) {
        return res.status(403).json({ msg: "Access Denied" });
      }
      console.log(
        "Updating data for user with UUID:",
        itemobat.uuid,
        "and userId:",
        req.userId
      );
      const result = await Dataobats.update(
        { jumlahobat: updatedJumlahobat },
        {
          where: {
            [Op.and]: [{ uuid: itemobat.uuid }, { userId: req.userId }],
          },
        }
      );
      if (result[0] === 0) {
        console.error(
          "No rows updated. UUID or userId may not match:",
          itemobat.uuid,
          req.userId
        );
      }
    }

    res.status(200).json({ msg: "Data Obat berhasil diperbarui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteDataobat = async (req, res) => {
  try {
    const itemobat = await Dataobats.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!itemobat) return res.status(404).json({ msg: "Data not found!" });

    await DeletedDataobats.create({
      namaobat: itemobat.namaobat,
      jumlahobat: itemobat.jumlahobat,
      tglmasuk: itemobat.tglmasuk,
      tglkadaluarsa: itemobat.tglkadaluarsa,
      nobatch: itemobat.nobatch,
      jenisobat: itemobat.jenisobat,
      hargaobat: itemobat.hargaobat,
      kategori: itemobat.kategori,
      userId: itemobat.userId,
      deletedAt: new Date(),
    });

    if (req.role === "apoteker") {
      await Dataobats.destroy({
        where: {
          id: itemobat.id,
        },
      });
    } else {
      if (req.userId !== itemobat.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Dataobats.destroy({
        where: {
          [Op.and]: [{ id: itemobat.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Obat berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
