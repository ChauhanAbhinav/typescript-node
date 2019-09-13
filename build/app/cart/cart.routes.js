"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cart_controller_1 = __importDefault(require("./cart.controller"));
var router = express_1.Router();
router.get("/all/:customerId", cart_controller_1.default.getAllItems);
router.post("/add", cart_controller_1.default.addItem);
router.delete("/delete/all/:customerId", cart_controller_1.default.deleteAllItems);
router.delete("/delete/:customerId/:productId", cart_controller_1.default.deleteItem);
exports.default = router;
