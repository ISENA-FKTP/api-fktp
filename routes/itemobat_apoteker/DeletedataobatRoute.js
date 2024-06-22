import express from "express";
import {
    getDeletedataobats
} from "../../controllers/itemobat_apoteker/Deletedataobats.js";
import { verifyUser, statistikOnly} from "../../middleware/AuthUser.js";

const router = express.Router();

router.get('/deletedataobats', verifyUser,  statistikOnly, getDeletedataobats);

export default router;