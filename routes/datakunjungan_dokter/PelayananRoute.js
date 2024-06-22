import express from "express";
import {
    getPelayanans,
    getPelayananById,
    createPelayanan,
    updatePelayanan,
    deletePelayanan
} from "../../controllers/datakunjungan_dokter/Pelayanans.js";
import { verifyPasien } from "../../middleware/verifyPasien.js";
import { apotekerOnly, dokterOnly, verifyUser } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get('/pelayanans',verifyPasien,    getPelayanans);
router.get('/pelayanans/:id', verifyPasien,  getPelayananById);
router.post('/pelayanans', verifyPasien, dokterOnly,  createPelayanan);
router.patch('/pelayanans/:id',verifyPasien, dokterOnly,  updatePelayanan);
router.delete('/pelayanans/:id',verifyPasien, dokterOnly, deletePelayanan);

export default router;