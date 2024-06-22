import express from "express";
import {
    getTTs,
    getTTById,
    createTT,
    updateTT,
    deleteTT
} from "../../controllers/datakunjungan_dokter/Tandatangans.js";
import { verifyPasien } from "../../middleware/verifyPasien.js";
import { apotekerOnly, dokterOnly ,verifyUser } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get('/tts',verifyPasien,   getTTs);
router.get('/tts/:id', verifyPasien,  getTTById);
router.post('/tts', verifyPasien, dokterOnly,  createTT);
router.patch('/tts/:id',verifyPasien, dokterOnly, updateTT);
router.delete('/tts/:id',verifyPasien, dokterOnly, deleteTT);

export default router;