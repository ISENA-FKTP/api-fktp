import express from "express";
import {
    getObats,
    getObatById,
    createObat,
    updateObat,
    deleteObat
} from "../../controllers/datakunjungan_dokter/Obats.js";
import { verifyPasien } from "../../middleware/verifyPasien.js";
import { apotekerOnly, dokterOnly ,verifyUser } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get('/obats', verifyPasien,  getObats);
router.get('/obats/:id', verifyPasien, getObatById);
router.post('/obats', verifyPasien, dokterOnly,  createObat);
router.patch('/obats/:id',verifyPasien, dokterOnly,  updateObat);
router.delete('/obats/:id',verifyPasien, dokterOnly, deleteObat);

export default router;