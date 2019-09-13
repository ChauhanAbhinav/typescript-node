"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var url = process.env.API_URL;
mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    console.log("mongodb connected");
});
