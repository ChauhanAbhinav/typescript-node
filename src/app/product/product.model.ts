import { model, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
    name: {type: String, required: true},
    id: { type: Number, required: true, unique: true},
    brand: { type: String, required: true },
    expiry: { type: Date, required: true },
    manufacture: { type: Date, required: true },
    price: { type: String, required: true },
});

// Export the model and return your IUser interface
export const Product = model("products", ProductSchema);
