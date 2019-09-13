"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var url = 'mongodb://127.0.0.1:27017/students';
var connect = function () {
    mongoose_1.default.connect(url, { useNewUrlParser: true }, function () {
        console.log('mongodb connected');
    });
};
exports.default = connect;
