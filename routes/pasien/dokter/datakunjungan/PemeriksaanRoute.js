import express from "express";
import {
  getPemeriksaans,
  getPemeriksaanById,
  createPemeriksaan,
  updatePemeriksaan,
  deletePemeriksaan,
} from "../../../../controllers/pasien/dokter/datakunjungan/Pemeriksaans.js";
import { verifyPasien } from "../../../../middleware/verify.js";
import { dokterOnly } from "../../../../middleware/userOnly.js";

const router = express.Router();

router.get("/pemeriksaans", verifyPasien, getPemeriksaans);
router.get("/pemeriksaans/:id", verifyPasien, getPemeriksaanById);
router.post("/pemeriksaans", verifyPasien, dokterOnly, createPemeriksaan);
router.patch("/pemeriksaans/:id", verifyPasien, dokterOnly, updatePemeriksaan);
router.delete("/pemeriksaans/:id", verifyPasien, dokterOnly, deletePemeriksaan);

export default router;
