import express from "express";
import {
  getPegawais,
  getPegawaiById,
  getPegawaiByNoNRP,
  createPegawai,
  updatePegawai,
  deletePegawai,
} from "../controllers/Pegawais.js";
import { pawasOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/pegawais", getPegawais);
router.get("/pegawais/:id", getPegawaiById);
router.get("/pegawais/nonrp/:nrp", getPegawaiByNoNRP);
router.post("/pegawais", pawasOnly, createPegawai);
router.patch("/pegawais/:id", pawasOnly, updatePegawai);
router.delete("/pegawais/:id", pawasOnly, deletePegawai);

export default router;
