import { model, Schema } from "mongoose";

const CartSchema: Schema = new Schema({

    customerId: {type: Number, required: true, unique: true},
    customerName: {type: String, required: true},
    items: [Object],
});

export const Cart = model("cart", CartSchema);
