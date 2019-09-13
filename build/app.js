"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var indexRoutes_1 = __importDefault(require("./app/indexRoutes")); // import master route file - indexRoutes
var App = /** @class */ (function () {
    function App() {
        // port
        this.port = process.env.PORT || 3000;
        this.app = express_1.default();
        // Middlewares
        this.app.use(body_parser_1.default.json());
        // Routes
        this.app.use("/", indexRoutes_1.default);
    }
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("App listening on port " + _this.port);
        });
    };
    return App;
}());
exports.default = App;
