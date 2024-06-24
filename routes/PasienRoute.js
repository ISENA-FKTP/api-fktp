import express from "express";
import {
  getPasiens,
  getPasienById,
  createPasien,
  updatePasien,
  deletePasien,
  getPasienByNoBPJS,
} from "../controllers/Pasiens.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/pasiens", getPasiens);
router.get(
  "/pasiens/nobpjs/:nobpjs",
  verifyToken,
  verifyUser,
  getPasienByNoBPJS
);
router.post("/pasiens", adminOnly, createPasien);
router.patch("/pasiens/:id", adminOnly, updatePasien);
router.delete("/pasiens/:id", adminOnly, deletePasien);

export default router;
