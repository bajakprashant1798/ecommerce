import { Router } from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";

const router = Router()

router.route("/products")
.get(getProduct)
.post(createProduct)

router.route("/products/:id")
.delete(deleteProduct)
.put(updateProduct)

export default router