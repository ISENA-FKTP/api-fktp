import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("Token tidak ditemukan di header");
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("Gagal memverifikasi token:", err);
      return res.status(403).json({ message: "Gagal memverifikasi token" });
    }

    req.userId = decoded.uuid;
    req.username = decoded.username;
    req.role = decoded.role;
    console.log("Token berhasil diverifikasi, userId:", req.userId);
    next();
  });
};
