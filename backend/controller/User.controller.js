import User from "../model/User.model.js";
import jwt from "jsonwebtoken";
import uploadOnCloudinary from "../config/cloudinary.js";

const isProduction = process.env.NODE_ENV === "production";

const options = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
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

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

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

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
        success: false,
      });
    }

    const user = await User.create({
      userName,
      email,
      password,
    });

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Welcome! Your account has been created successfully.",
        user,
        success: true,
      });
  } catch (error) {
    console.log("Registration Error:", error);
    return res.status(500).json({
      message: "Something went wrong on our end. Please try again later",
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        message: "Invalid email or password. Please try again",
        success: false,
      });
    }

    const isCorrectPassword = await user.matchPassword(password);
    if (!isCorrectPassword) {
      return res.json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
      " -password -refreshToken",
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: `Welcome back, ${loggedInUser.userName}!`,
        user: loggedInUser,
        success: true,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "We're having trouble logging you in. Please try again shortly.",
      success: false,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userName } = req.body;
    const profilePic = req.file;
    const userId = req.user._id;

    if (!userName && !profilePic) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update profile" });
    }

    const updatedData = {};
    if (userName) {
      updatedData.userName = userName;
    }

    if (profilePic) {
      const uploadResult = await uploadOnCloudinary(profilePic.path);
      if (!uploadResult) {
        return res
          .status(400)
          .json({
            message:
              "We couldn't upload your photo right now. Please try again.",
          });
      }
      updatedData.profilePic = uploadResult.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    }).select(" -password -refreshToken");

    return res.status(200).json({
      user: updatedUser,
      success: true,
      message: "Your profile has been updated successfully!",
    });
  } catch (error) {
    console.log("Error Upadating Profile:", error);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while saving your changes. Please try again later.",
    });
  }
};

const userProfile = async (req,res) => {
  try {
    const userId = req.user._id;
    const loggedInuser = await User.findById(userId).select(
      "-password -refreshToken"
    );

    if (!loggedInuser) {
      return res.status(404).json({ 
        message: "User not found",
        success: false
       });
    }

    return res.status(200).json({
      user: loggedInuser,
      success: true
    });
  } catch (error) {
     console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "We couldn't find your account information."
     });
    }

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "You have been logged out successfully. See you soon!",
      });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout. Please try again.",
    });
  }
};

export { refreshAccessToken, registerUser, loginUser, updateProfile, logoutUser, userProfile};
