import express from "express";
import {
  getTotalPenyakits,
  deleteTotalPenyakit,
} from "../../../controllers/pasien/data_statistik/Totalpenyakits.js";
import { statistikOnly } from "../../../middleware/verify.js";

const router = express.Router();

router.get("/totalpenyakits", getTotalPenyakits);
router.delete("/totalpenyakits/:id", statistikOnly, deleteTotalPenyakit);

export default router;
