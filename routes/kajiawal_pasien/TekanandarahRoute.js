import express from "express";
import {
  getTDs,
  getTDById,
  createTD,
  updateTD,
  deleteTD,
} from "../../controllers/kajiawal_pasien/Tekanandarahs.js";
import { verifyPasien } from "../../middleware/verifyPasien.js";
import { klinikOnly } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/tds", verifyPasien, getTDs);
router.get("/tds/:id", verifyPasien, getTDById);
router.post("/tds", verifyPasien, klinikOnly, createTD);
router.patch("/tds/:id", verifyPasien, klinikOnly, updateTD);
router.delete("/tds/:id", verifyPasien, klinikOnly, deleteTD);

export default router;
