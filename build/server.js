"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv")); // read .env file
// load environment variables
var env = dotenv_1.default.config({ path: "src/env/.env" });
if (env.error) {
    throw env.error;
}
var app_1 = __importDefault(require("./app"));
require("./db"); // database
// Create a new express application instance
var app = new app_1.default();
app.listen();
