import express from "express"
import { googleAuth, login, logOut, resetPassword, sendOtp, singUp, VerifyOtp } from "../controller/authController.js"

const authRouter = express.Router()
authRouter.post("/signup",singUp)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)
authRouter.post("/sendotp",sendOtp)
authRouter.post("/verifyotp",VerifyOtp)
authRouter.post("/resetpassword",resetPassword)
authRouter.post("/googleauth",googleAuth)

export default authRouter