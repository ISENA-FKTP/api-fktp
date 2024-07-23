import express from "express";
import {
  getPengajuans,
  getPengajuanById,
  createPengajuan,
  updatePengajuan,
  deletePengajuan,
  getPengajuanByIdPrimary,
} from "../../../../controllers/pasien/admin/kajiawal/Pengajuans.js";
import { verifyPasien } from "../../../../middleware/verify.js";
import { klinikOnly, statistikOnly } from "../../../../middleware/userOnly.js";

const router = express.Router();

router.get("/pengajuans", verifyPasien, getPengajuans);
router.get("/pengajuansStatistik", statistikOnly, getPengajuans);
router.get("/pengajuansDokter", klinikOnly, getPengajuans);
router.get("/pengajuans/:id", verifyPasien, getPengajuanById);
router.get("/pengajuans/dokter/:id", klinikOnly, getPengajuanByIdPrimary);
router.post("/pengajuans", verifyPasien, createPengajuan);
router.patch("/pengajuans/:id", klinikOnly, updatePengajuan);
router.delete("/pengajuans/:id", verifyPasien, klinikOnly, deletePengajuan);

export default router;
