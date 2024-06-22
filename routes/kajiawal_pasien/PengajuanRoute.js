import express from "express";
import {
  getPengajuans,
  getPengajuanById,
  createPengajuan,
  updatePengajuan,
  deletePengajuan,
} from "../../controllers/kajiawal_pasien/Pengajuans.js";
import { verifyPasien } from "../../middleware/verifyPasien.js";
import { klinikOnly, verifyUser } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/pengajuans", verifyPasien, getPengajuans);
router.get("/pengajuans/:id", verifyPasien, getPengajuanById);
router.post("/pengajuans", verifyPasien, createPengajuan);
router.patch("/pengajuans/:id", verifyPasien, klinikOnly, updatePengajuan);
router.delete("/pengajuans/:id", verifyPasien, klinikOnly, deletePengajuan);

export default router;
