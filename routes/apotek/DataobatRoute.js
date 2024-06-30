import express from "express";
import {
  getDataobats,
  getDataobatById,
  createDataobat,
  updateDataobat,
  deleteDataobat,
} from "../../controllers/itemobat_apoteker/Dataobats.js";
import { verifyUser } from "../../middleware/verify.js";
import { apotekerOnly } from "../../middleware/userOnly.js";

const router = express.Router();

router.get("/dataobats", verifyUser, getDataobats);
router.get("/dataobats/:id", verifyUser, getDataobatById);
router.post("/dataobats", verifyUser, apotekerOnly, createDataobat);
router.patch("/dataobats/:id", verifyUser, apotekerOnly, updateDataobat);
router.delete("/dataobats/:id", verifyUser, apotekerOnly, deleteDataobat);

export default router;
