import express from "express";
import {
  getKFs,
  getKFById,
  createKF,
  updateKF,
  deleteKF,
} from "../../../../controllers/pasien/admin/kajiawal/Keadaanfisiks.js";
import { verifyPasien } from "../../../../middleware/verify.js";
import { klinikOnly } from "../../../../middleware/userOnly.js";

const router = express.Router();

router.get("/kfs", verifyPasien, getKFs);
router.get("/kfs/:id", verifyPasien, getKFById);
router.post("/kfs", verifyPasien, klinikOnly, createKF);
router.patch("/kfs/:id", verifyPasien, klinikOnly, updateKF);
router.delete("/kfs/:id", verifyPasien, klinikOnly, deleteKF);

export default router;
