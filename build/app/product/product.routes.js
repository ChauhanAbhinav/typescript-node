"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var product_controller_1 = __importDefault(require("./product.controller"));
var router = express_1.Router();
router.get("/all", product_controller_1.default.getAllProducts);
router.get("/:id", product_controller_1.default.getProduct);
router.post("/add", product_controller_1.default.addProduct);
router.put("/update/:id", product_controller_1.default.updateProduct);
router.delete("/delete/:id", product_controller_1.default.deleteProduct);
exports.default = router;
