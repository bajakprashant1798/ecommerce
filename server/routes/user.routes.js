import { Router } from "express";
import {  registerUser, refreshTokenCookie, login, logout, getUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/refresh_token").get(refreshTokenCookie)
router.route("/information").get(authMiddleware, getUser)

export default router