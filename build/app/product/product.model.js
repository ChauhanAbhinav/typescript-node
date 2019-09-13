"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    brand: { type: String, required: true },
    expiry: { type: Date, required: true },
    manufacture: { type: Date, required: true },
    price: { type: String, required: true },
});
// Export the model and return your IUser interface
exports.Product = mongoose_1.model("products", ProductSchema);
