"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var customer_controller_1 = __importDefault(require("./customer.controller")); // controller
var router = express_1.Router();
router.get("/all", customer_controller_1.default.getAllCustomers);
router.get("/:id", customer_controller_1.default.getCustomer);
router.post("/add", customer_controller_1.default.addCustomer);
router.put("/update/:id", customer_controller_1.default.updateCustomer);
router.delete("/delete/:id", customer_controller_1.default.deleteCustomer);
exports.default = router;
