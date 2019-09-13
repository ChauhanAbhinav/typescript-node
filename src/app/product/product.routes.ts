import { Router } from "express";

import ProductController from "./product.controller";

const router = Router();
router.get("/all",  ProductController.getAllProducts);
router.get("/:id",  ProductController.getProduct);
router.post("/add",  ProductController.addProduct);
router.put("/update/:id",  ProductController.updateProduct);
router.delete("/delete/:id",  ProductController.deleteProduct);

export default router;
