import { Router } from "express";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware.js";

const router = Router()

router.route("/category")
.get(authMiddleware, authAdminMiddleware, getCategory)
.post(authMiddleware, authAdminMiddleware, createCategory)

router.route("/category/:id")
.delete(authMiddleware, authAdminMiddleware, deleteCategory)
.put(authMiddleware, authAdminMiddleware, updateCategory)

export default router