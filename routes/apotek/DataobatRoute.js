import express from "express";
import {
  getDataobats,
  getDataobatById,
  createDataobat,
  updateDataobat,
  deleteDataobat,
  tambahKurangDataObats,
} from "../../controllers/apotek/Dataobats.js";
import { apotekerOnly, statistikOnly } from "../../middleware/userOnly.js";

const router = express.Router();

router.get("/dataobats", apotekerOnly, getDataobats);
router.get("/dataobatStatistik", statistikOnly, getDataobats);
router.get("/dataobats/:id", apotekerOnly, getDataobatById);
router.post("/dataobats", apotekerOnly, createDataobat);
router.patch("/dataobats/:id", apotekerOnly, updateDataobat);
router.patch(
  "/dataobats/tambahkurangobats/:uuid",
  apotekerOnly,
  tambahKurangDataObats
);
router.delete("/dataobats/:id", apotekerOnly, deleteDataobat);

export default router;
