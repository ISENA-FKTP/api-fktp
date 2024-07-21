import express from "express";
import db from "./config/Database.js";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes//login/AuthRoute.js";
import TokenRoute from "./routes//login/TokenRoute.js"; // Perbarui import ini

import PasienRoute from "./routes/pasien/PasienRoute.js";
import AuthPasienRoute from "./routes/pasien/AuthPasienRoute.js";
import KeadaanfisikRoute from "./routes/pasien/admin/kajiawal/KeadaanfisikRoute.js";
import PengajuanRoute from "./routes/pasien/admin/kajiawal/PengajuanRoute.js";
import TekanandarahRoute from "./routes/pasien/admin/kajiawal/TekanandarahRoute.js";

import DiagnosaRoute from "./routes/pasien/dokter/datakunjungan/DiagnosaRoute.js";
import ObatRoute from "./routes/pasien/dokter/datakunjungan/ObatRoute.js";
import PelayananRoute from "./routes/pasien/dokter/datakunjungan/PelayananRoute.js";
import PemeriksaanRoute from "./routes/pasien/dokter/datakunjungan/PemeriksaanRoute.js";
import RiwayatalergiRoute from "./routes/pasien/dokter/datakunjungan/RiwayatalergiRoute.js";
import TandatanganRoute from "./routes/pasien/dokter/datakunjungan/TandatanganRoute.js";

import TotalpenyakitRoute from "./routes/pasien/data_statistik/TotalpenyakitRoute.js";

import PegawaiRoute from "./routes/pegawai/PegawaiRoute.js";
import AuthPegawaiRoute from "./routes/pegawai/AuthPegawaiRoute.js";
import DatasakitRoute from "./routes/pegawai/datasakit/DatasakitRoute.js";
import HomevisitRoute from "./routes/pegawai/datasakit/HomevisitRoute.js";

import DataobatRoute from "./routes/apotek/DataobatRoute.js";
import DeletedataobatRoute from "./routes/apotek/DeletedataobatRoute.js";

import { verifyToken, verifyUser } from "./middleware/verify.js";
import Datarekammedis from "./routes/pegawai/datasakit/DatarekammedisRoute.js";

dotenv.config();

const app = express();
app.use(express.static("uploads"));

// 1. Enable CORS middleware before defining routes
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://isena-fktp.vercel.app"],
  })
);

// 2. Set up helmet middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// 3. Use JSON middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4. Sync database
(async () => {
  await db.sync();
})();

// 5. Define unprotected routes
app.use(AuthRoute);
app.use(TokenRoute);

// 6. Apply middleware verification
app.use(verifyToken);
app.use(verifyUser);

// 7. Define protected routes
app.use(UserRoute);
app.use(PasienRoute);
app.use(AuthPasienRoute);
app.use(KeadaanfisikRoute);
app.use(PengajuanRoute);
app.use(TekanandarahRoute);
app.use(DiagnosaRoute);
app.use(PemeriksaanRoute);
app.use(PelayananRoute);
app.use(ObatRoute);
app.use(RiwayatalergiRoute);
app.use(TandatanganRoute);
app.use(DataobatRoute);
app.use(PegawaiRoute);
app.use(AuthPegawaiRoute);
app.use(DatasakitRoute);
app.use(HomevisitRoute);
app.use(TotalpenyakitRoute);
app.use(DeletedataobatRoute);
app.use(TotalpenyakitRoute);
app.use(Datarekammedis);

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
