import { model, Schema } from "mongoose";

const CartSchema: Schema = new Schema({

    customerId: {type: Number, required: true, unique: true},
    customerName: {type: String, required: true},
    items: [{
        id : {type : Number, required: true},
        name : {type : String, required: true},
        price: {type: Number, required: true},
    }],
});

export const Cart = model("cart", CartSchema);
