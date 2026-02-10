import User from "../model/User.model.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
};

const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Couldn't find an account associated with that ID.");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    if (!accessToken || !refreshToken) {
      throw new Error(
        "Something went wrong while securing your session. Please try again.",
      );
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Token Generation error:".error);
    throw new Error(
      error.message || "An unexpected error occurred during authentication.",
    );
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;
    if (!incomingRefreshToken) {
      return res.status(401).json({
        message: "Your session has expired. Please log in again.",
        success: false,
      });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(401).json({
        message: "Account not found. Please register or log in.",
        success: false,
      });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({
        message: "Session is no longer valid. Please sign in again.",
        success: false,
      });
    }

    const { accessToken, refreshToken } = generateAccessRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Session renewed successfully.",
        accessToken,
        success: true,
      });
  } catch (error) {
    console.error("Auth Refresh Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating your session.",
    });
  }
};


export {refreshAccessToken};