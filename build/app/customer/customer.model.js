"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CustomerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
});
exports.Customer = mongoose_1.model("customers", CustomerSchema);
