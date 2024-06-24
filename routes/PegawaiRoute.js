import express from "express";
import {
  getPegawais,
  getPegawaiById,
  getPegawaiByNoNRP,
  createPegawai,
  updatePegawai,
  deletePegawai,
} from "../controllers/Pegawais.js";
import { verifyUser, pawasOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/pegawais", verifyUser, getPegawais);
router.get("/pegawais/:id", verifyUser, getPegawaiById);
router.get("/pegawais/nonrp/:nrp", verifyUser, getPegawaiByNoNRP);
router.post("/pegawais", verifyUser, pawasOnly, createPegawai);
router.patch("/pegawais/:id", verifyUser, pawasOnly, updatePegawai);
router.delete("/pegawais/:id", verifyUser, pawasOnly, deletePegawai);

export default router;
