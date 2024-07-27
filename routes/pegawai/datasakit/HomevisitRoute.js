import express from "express";
import {
  getHomevisits,
  getHomevisitById,
  createHomevisit,
  updateHomevisit,
  deleteHomevisit,
  getHomevisitByPegawaiId,
} from "../../../controllers/pegawai/datasakit/Homevisits.js";
import { verifyPegawai } from "../../../middleware/verify.js";
import { pegawaiOnly } from "../../../middleware/userOnly.js";
import upload from "../../../multerConfig.js";

const router = express.Router();

router.get("/homevisits", verifyPegawai, getHomevisits);
router.get("/homevisits/:id", verifyPegawai, pegawaiOnly, getHomevisitById);
router.get(
  "/homevisits/pegawai/:id",
  verifyPegawai,
  pegawaiOnly,
  getHomevisitByPegawaiId
);

router.post(
  "/homevisits",
  verifyPegawai,
  // upload.single("fotodokumentasi"),
  pegawaiOnly,
  createHomevisit
);
router.patch("/homevisits/:id", verifyPegawai, pegawaiOnly, updateHomevisit);
router.delete("/homevisits/:id", verifyPegawai, pegawaiOnly, deleteHomevisit);

export default router;
