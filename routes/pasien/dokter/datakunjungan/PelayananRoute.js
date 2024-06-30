import express from "express";
import {
  getPelayanans,
  getPelayananById,
  createPelayanan,
  updatePelayanan,
  deletePelayanan,
} from "../../../../controllers/pasien/dokter/datakunjungan/Pelayanans.js";
import { verifyPasien } from "../../../../middleware/verify.js";
import { dokterOnly } from "../../../../middleware/userOnly.js";

const router = express.Router();

router.get("/pelayanans", verifyPasien, getPelayanans);
router.get("/pelayanans/:id", verifyPasien, getPelayananById);
router.post("/pelayanans", verifyPasien, dokterOnly, createPelayanan);
router.patch("/pelayanans/:id", verifyPasien, dokterOnly, updatePelayanan);
router.delete("/pelayanans/:id", verifyPasien, dokterOnly, deletePelayanan);

export default router;
