import express from "express";
import {
  getPasiens,
  getPasienById,
  createPasien,
  updatePasien,
  deletePasien,
  getPasienByNoBPJS,
} from "../../controllers/pasien/Pasiens.js";
import { adminOnly, klinikOnly } from "../../middleware/userOnly.js";

const router = express.Router();

router.get("/pasiens", getPasiens);
router.get("/pasiens/:id", getPasienById);
router.get("/pasiens/nobpjs/:nobpjs", getPasienByNoBPJS);
router.post("/pasiens", adminOnly, createPasien);
router.patch("/pasiens/:id", klinikOnly, updatePasien);
router.delete("/pasiens/:id", adminOnly, deletePasien);

export default router;
