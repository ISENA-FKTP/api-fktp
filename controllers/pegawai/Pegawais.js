import Pegawais from "../../models/pegawai/PegawaiModel.js";
import Users from "../../models/UserModel.js";

export const getPegawais = async (req, res) => {
  try {
    let response;
    if (req.role === "pegawai") {
      response = await Pegawais.findAll({
        attributes: [
          "uuid",
          "namapegawai",
          "nrp",
          "pangkat",
          "satuankerja",
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
      response = await Pegawais.findAll({
        attributes: [
          "uuid",
          "namapegawai",
          "nrp",
          "pangkat",
          "satuankerja",
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

export const getPegawaiById = async (req, res) => {
  try {
    const pegawai = await Pegawais.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    if (!pegawai) return res.status(404).json({ msg: "Data not found!" });
    let response;
    if (req.role === "pegawai") {
      response = await Pegawais.findOne({
        attributes: [
          "id",
          "uuid",
          "namapegawai",
          "nrp",
          "pangkat",
          "satuankerja",
          "createdAt",
        ],
        where: {
          id: pegawai.id,
        },
        include: [
          {
            model: Users,
            attributes: ["username", "email"],
          },
        ],
      });
    } else {
      response = await Pegawais.findOne({
        attributes: [
          "uuid",
          "namapegawai",
          "nrp",
          "pangkat",
          "satuankerja",
          "createdAt",
        ],
        where: {
          [Op.and]: [{ id: pegawai.id }, { userId: req.userId }],
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

export const getPegawaiByNoNRP = async (req, res) => {
  try {
    const pegawais = await Pegawais.findAll({
      where: {
        nrp: req.params.nrp,
      },
      include: [
        {
          model: Users,
          attributes: ["username", "email"],
        },
      ],
    });
    if (!pegawais || pegawais.length === 0) {
      return res
        .status(404)
        .json({ msg: "Pegawai dengan NRP ini tidak ditemukan." });
    }
    res.status(200).json(pegawais);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPegawai = async (req, res) => {
  const { namapegawai, nrp, pangkat, satuankerja } = req.body;
  try {
    await Pegawais.create({
      namapegawai: namapegawai,
      nrp: nrp,
      pangkat: pangkat,
      satuankerja: satuankerja,
      role: req.role,
      userId: req.userDbId,
    });
    res.status(201).json({ msg: "Data Pegawai Berhasil Dimasukkan!" });
  } catch (error) {
    console.error("Error creating pegawai:", error);
    res.status(500).json({ msg: error.message });
  }
};

export const updatePegawai = async (req, res) => {
  try {
    const pegawai = await Pegawais.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pegawai) return res.status(404).json({ msg: "Data not found!" });
    const { namapegawai, nrp, pangkat, satuankerja } = req.body;
    if (req.role === "pegawai") {
      await Pegawais.update(
        { namapegawai, nrp, pangkat, satuankerja },
        {
          where: {
            id: pegawai.id,
          },
        }
      );
    } else {
      if (req.userId !== pegawai.userId)
        return res.status(403).json({ msg: "Access X" });
      await Pegawais.update(
        { namapegawai, nrp, pangkat, satuankerja },
        {
          where: {
            [Op.and]: [{ id: pegawai.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Data Pegawai berhasil di perbaharui!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePegawai = async (req, res) => {
  try {
    const pegawai = await Pegawais.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pegawai) return res.status(404).json({ msg: "Data not found!" });
    const { namapegawai, nrp, pangkat, satuankerja } = req.body;
    if (req.role === "pegawai") {
      await Pegawais.destroy({
        where: {
          id: pegawai.id,
        },
      });
    } else {
      if (req.userId !== pegawai.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Pegawais.destroy({
        where: {
          [Op.and]: [{ id: pegawai.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Pegawai berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
