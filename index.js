import express from "express";
import db from "./config/Database.js";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import PasienRoute from "./routes/PasienRoute.js";
import AuthPasienRoute from "./routes/AuthPasienRoute.js";
import KeadaanfisikRoute from "./routes/kajiawal_pasien/KeadaanfisikRoute.js";
import PengajuanRoute from "./routes/kajiawal_pasien/PengajuanRoute.js";
import TekanandarahRoute from "./routes/kajiawal_pasien/TekanandarahRoute.js";
import DiagnosaRoute from "./routes/datakunjungan_dokter/DiagnosaRoute.js";
import PemeriksaanRoute from "./routes/datakunjungan_dokter/PemeriksaanRoute.js";
import PelayananRoute from "./routes/datakunjungan_dokter/PelayananRoute.js";
import ObatRoute from "./routes/datakunjungan_dokter/ObatRoute.js";
import RiwayatalergiRoute from "./routes/datakunjungan_dokter/RiwayatalergiRoute.js";
import TandatanganRoute from "./routes/datakunjungan_dokter/TandatanganRoute.js";
import DataobatRoute from "./routes/itemobat_apoteker/DataobatRoute.js";
import PegawaiRoute from "./routes/PegawaiRoute.js";
import AuthPegawaiRoute from "./routes/AuthPegawaiRoute.js";
import DatasakitRoute from "./routes/datasakit_pegawai/DatasakitRoute.js";
import HomevisitRoute from "./routes/datasakit_pegawai/HomevisitRoute.js";
import TotalPenyakitRoute from "./routes/data_statistik/TotalPenyakitRoute.js";
import DeletedataobatRoute from "./routes/itemobat_apoteker/DeletedataobatRoute.js";
import { verifyToken } from "./middleware/verifyToken.js";
import { verifyUser } from "./middleware/AuthUser.js";

dotenv.config();

const app = express();

// 1. Enable CORS middleware before defining routes
app.use(
  cors({
    credentials: true,
    // origin: "https://isena-fktp.vercel.app",
    origin: "http://localhost:5173",
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

// 5. Use routes - make sure this comes after the middleware setup
app.use(AuthRoute);
app.use(verifyToken);
app.use(verifyUser);

// Protected routes
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
app.use(TotalPenyakitRoute);
app.use(DeletedataobatRoute);

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
