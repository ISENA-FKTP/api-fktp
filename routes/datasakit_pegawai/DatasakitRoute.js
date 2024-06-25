import express from "express";
import {
  getDatasakitByPegawaiId,
  getDatasakits,
  getDatasakitById,
  createDatasakit,
  updateDatasakit,
  deleteDatasakit,
} from "../../controllers/datasakit_pegawai/Datasakits.js";
import { verifyPegawai } from "../../middleware/verifyPegawai.js";
import { pawasOnly } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/datasakits", verifyPegawai, getDatasakits);
router.get("/datasakits/:id", verifyPegawai, pawasOnly, getDatasakitById);
router.get(
  "/datasakits/pegawai/:id",
  verifyPegawai,
  pawasOnly,
  getDatasakitByPegawaiId
);
router.post("/datasakits", pawasOnly, createDatasakit);
router.patch("/datasakits/:id", verifyPegawai, pawasOnly, updateDatasakit);
router.delete("/datasakits/:id", verifyPegawai, pawasOnly, deleteDatasakit);

export default router;
