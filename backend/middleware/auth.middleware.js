import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

  const verifyAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res
      .status(401)
      .json({ success: false, message: "Internal server error" });
  }
};

export default verifyAuth;
