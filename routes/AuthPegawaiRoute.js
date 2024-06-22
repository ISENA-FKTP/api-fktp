import express from "express";
import {
    LoginPegawai
} from "../controllers/AuthPegawai.js";

const router = express.Router();

router.post('/loginpegawai', LoginPegawai);


export default router;