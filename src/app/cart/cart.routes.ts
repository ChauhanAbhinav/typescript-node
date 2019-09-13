import { Router } from "express";

import CartController from "./cart.controller";

const router = Router();
router.get("/all/:customerId",  CartController.getAllItems);
router.post("/add",  CartController.addItem);
router.delete("/delete/all/:customerId",  CartController.deleteAllItems);
router.delete("/delete/:customerId/:productId",  CartController.deleteItem);

export default router;
