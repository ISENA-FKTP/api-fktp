import express from "express";
import {
  getPegawais,
  getPegawaiById,
  getPegawaiByNoNRP,
  createPegawai,
  updatePegawai,
  deletePegawai,
} from "../../controllers/pegawai/Pegawais.js";
import { pegawaiOnly } from "../../middleware/userOnly.js";

const router = express.Router();

router.get("/pegawais", getPegawais);
router.get("/pegawais/:uuid", getPegawaiById);
router.get("/pegawais/nonrp/:nrp", getPegawaiByNoNRP);
router.post("/pegawais", pegawaiOnly, createPegawai);
router.patch("/pegawais/:id", pegawaiOnly, updatePegawai);
router.delete("/pegawais/:id", pegawaiOnly, deletePegawai);

export default router;
