import Users from "../models/UserModel.js";
import Pasiens from "../models/pasien/PasienModel.js";
import Pegawais from "../models/pegawai/PegawaiModel.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({ msg: "Please login in your account!" });
  }

  try {
    const user = await Users.findOne({
      where: {
        uuid: req.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found at Verify User" });
    }
    req.userDbId = user.id;
    next();
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("Token tidak ditemukan di header");
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Gagal memverifikasi token" });
    }

    req.userId = decoded.uuid;
    req.username = decoded.username;
    req.role = decoded.role;
    console.log("Token berhasil diverifikasi, userId:", req.userId);
    next();
  });
};

export const verifyPasien = async (req, res, next) => {
  try {
    const pasienId = req.userDbId;
    if (!pasienId) {
      return res.status(401).json({ msg: "Mohon masukkan data pasien" });
    }

    const pasien = await Pasiens.findOne({
      where: {
        userId: pasienId,
      },
    });

    if (!pasien) {
      return res.status(404).json({ msg: "Pasien tidak ada!" });
    }

    req.pasienId = pasien.id;
    console.log("User ID:", req.userId);

    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const verifyPegawai = async (req, res, next) => {
  try {
    const pegawaiId = req.userDbId;
    console.log("Pegawai ID:", pegawaiId);
    if (!pegawaiId) {
      return res.status(401).json({ msg: "Mohon masukkan data pegawai" });
    }

    const pegawai = await Pegawais.findOne({
      where: {
        userId: pegawaiId,
      },
    });

    if (!pegawai) {
      return res.status(404).json({ msg: "Pegawai tidak ada!" });
    }

    req.pegawaiId = pegawai.id;
    console.log("Pegawai ID:", req.pegawaiId);

    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
