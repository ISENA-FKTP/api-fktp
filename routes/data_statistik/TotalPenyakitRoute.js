import express from 'express';
import { getTotalPenyakits, deleteTotalPenyakit } from '../../controllers/data_statistik/TotalPenyakits.js';
import { verifyUser, statistikOnly } from '../../middleware/AuthUser.js';
// import { verifyPasien } from '../../middleware/verifyPasien.js';

const router = express.Router();

router.get('/totalpenyakits', verifyUser,  getTotalPenyakits);
router.delete('/totalpenyakits/:id', verifyUser, statistikOnly,  deleteTotalPenyakit);

export default router;
