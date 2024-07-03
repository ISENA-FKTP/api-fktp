import express from "express";
import {
  getTDs,
  getTDById,
  createTD,
  updateTD,
  deleteTD,
} from "../../../../controllers/pasien/admin/kajiawal/Tekanandarahs.js";
import { verifyPasien } from "../../../../middleware/verify.js";
import { klinikOnly } from "../../../../middleware/userOnly.js";

const router = express.Router();

router.get("/tds", verifyPasien, getTDs);
router.get("/tdsDokter/:id", klinikOnly, getTDById);
router.get("/tds/:id", verifyPasien, getTDById);
router.post("/tds", verifyPasien, klinikOnly, createTD);
router.patch("/tds/:id", verifyPasien, klinikOnly, updateTD);
router.delete("/tds/:id", verifyPasien, klinikOnly, deleteTD);

export default router;
