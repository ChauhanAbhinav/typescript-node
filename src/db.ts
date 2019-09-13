import mongoose from "mongoose";
const url: any = process.env.API_URL;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("mongodb connected");
});
