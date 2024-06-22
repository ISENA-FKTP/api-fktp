import express from "express";
import {
    getRAs,
    getRAById,
    createRA,
    updateRA,
    deleteRA
} from "../../controllers/datakunjungan_dokter/Riwayatalergis.js";
import { verifyPasien } from "../../middleware/verifyPasien.js";
import { apotekerOnly, dokterOnly,verifyUser } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get('/ras', verifyPasien,  getRAs);
router.get('/ras/:id', verifyPasien,  getRAById);
router.post('/ras', verifyPasien, dokterOnly,  createRA);
router.patch('/ras/:id',verifyPasien, dokterOnly,  updateRA);
router.delete('/ras/:id',verifyPasien, dokterOnly, deleteRA);

export default router;