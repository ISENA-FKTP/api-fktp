import express from "express";
import {
  getDatasakits,
  getDatasakitById,
  createDatasakit,
  updateDatasakit,
  deleteDatasakit,
} from "../../../controllers/pegawai/datasakit/Datasakits.js";
import { verifyPegawai } from "../../../middleware/verify.js";
import { pegawaiOnly } from "../../../middleware/userOnly.js";

const router = express.Router();

router.get("/datasakits", verifyPegawai, getDatasakits);
router.get("/datasakits/:id", verifyPegawai, pegawaiOnly, getDatasakitById);
router.get(
  "/datasakits/pegawai/:id",
  verifyPegawai,
  pegawaiOnly,
  getDatasakitByPegawaiId
);
router.post("/datasakits", pegawaiOnly, createDatasakit);
router.patch("/datasakits/:id", verifyPegawai, pegawaiOnly, updateDatasakit);
router.delete("/datasakits/:id", verifyPegawai, pegawaiOnly, deleteDatasakit);

export default router;
