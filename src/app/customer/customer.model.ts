import { model, Schema } from "mongoose";

const CustomerSchema: Schema = new Schema({
    name: {type: String, required: true},
    id: {type: Number, required: true, unique: true},
    email: { type: String, required: true, unique: false},
    mobile: { type: Number, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
});

export const Customer = model("customers", CustomerSchema);
