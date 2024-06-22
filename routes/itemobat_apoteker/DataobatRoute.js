import express from "express";
import {
    getDataobats,
    getDataobatById,
    createDataobat,
    updateDataobat,
    deleteDataobat
} from "../../controllers/itemobat_apoteker/Dataobats.js";
import { verifyUser, apotekOnly, apotekerOnly } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get('/dataobats',verifyUser,  getDataobats);
router.get('/dataobats/:id', verifyUser,  getDataobatById);
router.post('/dataobats', verifyUser, apotekOnly, createDataobat);
router.patch('/dataobats/:id',verifyUser, apotekOnly,  updateDataobat);
router.delete('/dataobats/:id',verifyUser, apotekOnly, deleteDataobat);

export default router;