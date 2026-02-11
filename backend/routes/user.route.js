import express from 'express'
import { refreshAccessToken, registerUser, loginUser,updateProfile, logoutUser } from "../controller/User.controller.js"
import upload from "../middleware/multer.middleware.js";
import verifyAuth from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshAccessToken);
userRouter.put("/update-profile",verifyAuth, upload.single("profilePic") ,updateProfile)
userRouter.post("/logout",verifyAuth,logoutUser);

export default userRouter;