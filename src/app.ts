import bodyParser from "body-parser";
import express from "express";
import Routes from "./app/indexRoutes";  // import master route file - indexRoutes

export default class App {
    public app: express.Application;
    public  port: any;

    constructor() {
        // port
        this.port = process.env.PORT || 3000 ;
        this.app =  express();

        // Middlewares
        this.app.use(bodyParser.json());
        // Routes
        this.app.use("/", Routes);
}
    public listen() {
        this.app.listen(this.port, () => {
            console.log("App listening on port " + this.port);
        });

    }
}
