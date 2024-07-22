import express from "express";
import { getDeletedataobats } from "../../controllers/apotek/Deletedataobats.js";
import { apotekerOnly, statistikOnly } from "../../middleware/userOnly.js";

const router = express.Router();

router.get("/deletedataobats", apotekerOnly, getDeletedataobats);
router.get("/deletedataobatStatistik", statistikOnly, getDeletedataobats);

export default router;
