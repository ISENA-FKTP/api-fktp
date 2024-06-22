import express from "express";
import {
    getHomevisits,
    getHomevisitById,
    createHomevisit,
    updateHomevisit,
    deleteHomevisit
} from "../../controllers/datasakit_pegawai/Homevisits.js";
import { verifyPegawai } from "../../middleware/verifyPegawai.js";
import { pawasOnly, verifyUser } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get('/homevisits', verifyPegawai, getHomevisits);
router.get('/homevisits/:id', verifyPegawai, pawasOnly, getHomevisitById);
router.post('/homevisits', verifyPegawai, pawasOnly,  createHomevisit);
router.patch('/homevisits/:id',verifyPegawai, pawasOnly,  updateHomevisit);
router.delete('/homevisits/:id',verifyPegawai, pawasOnly, deleteHomevisit);

export default router;