import express from "express";
import {
  getDatarekammedis,
  getDatarekammedisById,
  getDatarekammedisByPegawaiId,
  createDatarekammedis,
  updateDatarekammedis,
  deleteDatarekammedis,
} from "../../../controllers/pegawai/datasakit/Datarekammedis.js";
import { verifyPegawai } from "../../../middleware/verify.js";
import upload from "../../../multerConfig.js";

const router = express.Router();

router.get("/datarekammedis", verifyPegawai, getDatarekammedis);
router.get("/datarekammedis/:id", verifyPegawai, getDatarekammedisById);
router.get(
  "/datarekammedis/pegawai/:id",
  verifyPegawai,
  getDatarekammedisByPegawaiId
);

router.post(
  "/datarekammedis",
  verifyPegawai,
  // upload.single("filerekammedis"),
  createDatarekammedis
);

router.patch(
  "/datarekammedis/:id",

  verifyPegawai,
  updateDatarekammedis
);
router.delete(
  "/datarekammedis/:id",

  verifyPegawai,
  deleteDatarekammedis
);

export default router;
