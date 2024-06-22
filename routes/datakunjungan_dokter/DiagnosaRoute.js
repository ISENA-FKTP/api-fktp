import express from "express";
import {
    getDiagnosas,
    getDiagnosaById,
    createDiagnosa,
    updateDiagnosa,
    deleteDiagnosa
} from "../../controllers/datakunjungan_dokter/Diagnosas.js";
import { verifyPasien } from "../../middleware/verifyPasien.js";
// import { verifyUser } from '../../middleware/AuthUser.js';
import { apotekerOnly, dokterOnly, verifyUser } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get('/diagnosas',verifyUser ,verifyPasien,   getDiagnosas);
router.get('/diagnosas/:id', verifyPasien,  getDiagnosaById);
router.post('/diagnosas', verifyUser, verifyPasien, dokterOnly,  createDiagnosa);
router.patch('/diagnosas/:id',verifyPasien, dokterOnly, updateDiagnosa);
router.delete('/diagnosas/:id',verifyPasien, dokterOnly, deleteDiagnosa);

export default router;