import express from "express";
import {
  getObats,
  getObatById,
  createObat,
  updateObat,
  deleteObat,
} from "../../../../controllers/pasien/dokter/datakunjungan/Obats.js";
import { verifyPasien } from "../../../../middleware/verify.js";
import { dokterOnly } from "../../../../middleware/userOnly.js";

const router = express.Router();

router.get("/obats", verifyPasien, getObats);
router.get("/obats/:id", verifyPasien, getObatById);
router.post("/obats", dokterOnly, createObat);
router.patch("/obats/:id", verifyPasien, dokterOnly, updateObat);
router.delete("/obats/:id", verifyPasien, dokterOnly, deleteObat);

export default router;
