import express from "express";
import {
  getPengajuans,
  getPengajuanById,
  createPengajuan,
  updatePengajuan,
  deletePengajuan,
} from "../../../../controllers/pasien/admin/kajiawal/Pengajuans.js";
import { verifyPasien } from "../../../../middleware/verify.js";
import { klinikOnly } from "../../../../middleware/userOnly.js";

const router = express.Router();

router.get("/pengajuans", verifyPasien, getPengajuans);
router.get("/pengajuansDokter", klinikOnly, getPengajuans);
router.get("/pengajuans/:id", verifyPasien, getPengajuanById);
router.post("/pengajuans", verifyPasien, createPengajuan);
router.patch("/pengajuans/:id", verifyPasien, klinikOnly, updatePengajuan);
router.delete("/pengajuans/:id", verifyPasien, klinikOnly, deletePengajuan);

export default router;
