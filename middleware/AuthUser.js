import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  console.log("Verifying user with UUID:", req.userId);
  console.log("User Role:", req.role);

  if (!req.userId) {
    return res.status(401).json({ msg: "Please login in your account!" });
  }

  try {
    const user = await Users.findOne({
      where: {
        uuid: req.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found at Verify User" });
    }
    req.userDbId = user.id;
    next();
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const checkRole = (roles) => async (req, res, next) => {
  console.log("Checking role:", roles);
  try {
    const user = await Users.findOne({
      where: {
        uuid: req.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: `User not found at ${req.userId}` });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }
    req.role = user.role;
    next();
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const klinikOnly = checkRole(["admin", "dokter"]);
export const dokterOnly = checkRole(["dokter"]);
export const adminOnly = checkRole(["admin"]);
export const apotekerOnly = checkRole(["apoteker"]);
export const pawasOnly = checkRole(["pegawai"]);
export const statistikOnly = checkRole(["statistik"]);
export const apotekOnly = checkRole(["apoteker", "dokter"]);
