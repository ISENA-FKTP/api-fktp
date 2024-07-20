import express from "express";
import {
  getDatarekammedis,
  createDatarekammedis,
  updateDatarekammedis,
  deleteDatarekammedis,
} from "../../../controllers/pegawai/datasakit/Datarekammedis.js";
import { verifyPegawai } from "../../../middleware/verify.js";
import upload from "../../../multerConfig.js";

const router = express.Router();

router.get("/datarekammedis", verifyPegawai, getDatarekammedis);
router.get("/datarekammedis/:id", verifyPegawai, getDatarekammedis);

router.post(
  "/datarekammedis",
  verifyPegawai,
  upload.single("filerekammedis"),
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
