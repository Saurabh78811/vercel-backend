import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser, updateProfile } from "../controller/userController.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

// ✅ Secure route: only accessible if user is authenticated
userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.post("/profile" ,isAuth,upload.single("photoUrl"),updateProfile)

export default userRouter;
