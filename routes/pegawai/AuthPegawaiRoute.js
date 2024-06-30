import express from "express";
import { LoginPegawai } from "../../controllers/pegawai/AuthPegawai.js";

const router = express.Router();

router.post("/loginpegawai", LoginPegawai);

export default router;
