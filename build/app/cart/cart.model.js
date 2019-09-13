"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CartSchema = new mongoose_1.Schema({
    customerId: { type: Number, required: true, unique: true },
    customerName: { type: String, required: true },
    items: [{
            id: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
        }],
});
exports.Cart = mongoose_1.model("cart", CartSchema);
