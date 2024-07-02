import express from "express";
import { getDeletedataobats } from "../../controllers/apotek/Deletedataobats.js";
import { verifyUser } from "../../middleware/verify.js";
import { apotekerOnly } from "../../middleware/userOnly.js";

const router = express.Router();

router.get("/deletedataobats", verifyUser, apotekerOnly, getDeletedataobats);

export default router;
