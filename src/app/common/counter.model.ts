import { model, Schema } from "mongoose";

const CounterSchema: Schema = new Schema({
    customerId: {type: Number},
    productId: {type: Number},
    });

const Counter = model("counters", CounterSchema);

const initialize = async () => {
    const seq = await Counter.findOne({});
    if (!seq) {
        try {
            await new Counter({customerId: 0, productId: 0}).save();
        } catch (err) {
            console.log(err);
        }

}
};
initialize();
export default Counter;
