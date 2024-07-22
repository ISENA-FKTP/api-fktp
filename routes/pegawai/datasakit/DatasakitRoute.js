import express from "express";
import {
  getDatasakits,
  getDatasakitById,
  createDatasakit,
  updateDatasakit,
  deleteDatasakit,
  getDatasakitByPegawaiId,
} from "../../../controllers/pegawai/datasakit/Datasakits.js";
import { verifyPegawai } from "../../../middleware/verify.js";
import { pegawaiOnly, statistikOnly } from "../../../middleware/userOnly.js";

const router = express.Router();

router.get("/datasakits", verifyPegawai, getDatasakits);
router.get("/datasakitstatistik", statistikOnly, getDatasakits);
router.get("/datasakits/:id", verifyPegawai, pegawaiOnly, getDatasakitById);
router.get(
  "/datasakits/pegawai/:id",
  getDatasakitByPegawaiId
);
router.post("/datasakits", verifyPegawai, pegawaiOnly, createDatasakit);
router.patch("/datasakits/:id", verifyPegawai, pegawaiOnly, updateDatasakit);
router.delete("/datasakits/:id", verifyPegawai, pegawaiOnly, deleteDatasakit);

export default router;
