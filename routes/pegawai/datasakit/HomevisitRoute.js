import express from "express";
import {
  getHomevisits,
  getHomevisitById,
  createHomevisit,
  updateHomevisit,
  deleteHomevisit,
} from "../../../controllers/pegawai/datasakit/Homevisits.js";
import { verifyPegawai } from "../../../middleware/verify.js";
import { pegawaiOnly } from "../../../middleware/userOnly.js";

const router = express.Router();

router.get("/homevisits", verifyPegawai, getHomevisits);
router.get("/homevisits/:id", verifyPegawai, pegawaiOnly, getHomevisitById);
router.post("/homevisits", verifyPegawai, pegawaiOnly, createHomevisit);
router.patch("/homevisits/:id", verifyPegawai, pegawaiOnly, updateHomevisit);
router.delete("/homevisits/:id", verifyPegawai, pegawaiOnly, deleteHomevisit);

export default router;
