import express from "express";
import {
  getDiagnosas,
  getDiagnosaById,
  createDiagnosa,
  updateDiagnosa,
  deleteDiagnosa,
} from "../../../../controllers/pasien/dokter/datakunjungan/Diagnosas.js";
import { verifyPasien } from "../../../../middleware/verify.js";
import { dokterOnly } from "../../../../middleware/userOnly.js";

const router = express.Router();

router.get("/diagnosas", verifyPasien, getDiagnosas);
router.get("/diagnosas/:id", verifyPasien, getDiagnosaById);
router.post("/diagnosas", verifyPasien, dokterOnly, createDiagnosa);
router.patch("/diagnosas/:id", verifyPasien, dokterOnly, updateDiagnosa);
router.delete("/diagnosas/:id", verifyPasien, dokterOnly, deleteDiagnosa);

export default router;
