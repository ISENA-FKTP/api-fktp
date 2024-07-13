import express from "express";
import {
  getTTs,
  getTTById,
  createTT,
  updateTT,
  deleteTT,
} from "../../../../controllers/pasien/dokter/datakunjungan/Tandatangans.js";
import { verifyPasien } from "../../../../middleware/verify.js";
import { dokterOnly } from "../../../../middleware/userOnly.js";

const router = express.Router();

router.get("/tts", verifyPasien, getTTs);
router.get("/tts/:id", dokterOnly, getTTById);
router.post("/tts", dokterOnly, createTT);
router.patch("/tts/:id", verifyPasien, dokterOnly, updateTT);
router.delete("/tts/:id", verifyPasien, dokterOnly, deleteTT);

export default router;
