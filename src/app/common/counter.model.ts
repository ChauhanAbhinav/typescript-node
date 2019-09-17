import { model, Schema } from "mongoose";

const CounterSchema: Schema = new Schema({
    _id: {type: String},
    seq: {type: Number},
    });

const Counter = model("counters", CounterSchema);

export default Counter;
