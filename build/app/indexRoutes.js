"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import all routes
var cart_routes_1 = __importDefault(require("./cart/cart.routes"));
var customer_routes_1 = __importDefault(require("./customer/customer.routes"));
var product_routes_1 = __importDefault(require("./product/product.routes"));
var router = express_1.Router();
router.use("/customer", customer_routes_1.default);
router.use("/product", product_routes_1.default);
router.use("/cart", cart_routes_1.default);
exports.default = router;
// const Routes: Router[] = [];
// Routes.push(customerRoutes);
// Routes.push(ProductRoutes);
// export default Routes;
