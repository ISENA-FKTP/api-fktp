import express from "express";
import { getDeletedataobats } from "../../controllers/apotek/Deletedataobats.js";
import { apotekerOnly } from "../../middleware/userOnly.js";

const router = express.Router();

router.get("/deletedataobats", apotekerOnly, getDeletedataobats);

export default router;
