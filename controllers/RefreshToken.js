import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.query;

    if (!refreshToken) {
      console.log("No refresh token in query");
      return res.sendStatus(401);
    }

    const user = await Users.findOne({
      where: {
        jwt_token: refreshToken,
      },
    });

    if (!user) {
      console.log("Refresh token not found in database");
      return res.sendStatus(401);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          console.log("Failed to verify refresh token", err);
          return res.sendStatus(403);
        }

        const { exp: accessTokenExpiry } = decoded;

        if (accessTokenExpiry > Date.now() / 1000) {
          console.log("Access token is still valid, no need to refresh");
          return res.status(200).json({ accessToken: null });
        }

        const { uuid, username, email, satuankerja, role } = user;

        const newAccessToken = jwt.sign(
          { uuid, username, email, satuankerja, role },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );

        return res.json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    console.error("Error in refreshToken handler", error);
    res.sendStatus(500);
  }
};
