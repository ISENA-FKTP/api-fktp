import express from "express";
import { LoginPasien } from "../../controllers/pasien/AuthPasien.js";

const router = express.Router();

router.post("/loginpasien", LoginPasien);

export default router;
