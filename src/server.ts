import dotenv from "dotenv";  // read .env file

// load environment variables
const env = dotenv.config({ path: "src/env/.env" });
if (env.error) {
    throw env.error;
}

import App from "./app";
import "./db";  // database

// Create a new express application instance
const app = new App();
app.listen();
