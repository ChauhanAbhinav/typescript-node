"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cart_model_1 = require("./cart.model"); // model
var CartController = /** @class */ (function () {
    function CartController() {
        var _this = this;
        // add item to cart
        this.addItem = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, customerId, productId, doc, error_1, items, index, response, error_2, cart, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = req.body;
                        customerId = Number(req.body.customerId);
                        productId = Number(data.items[0].id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cart_model_1.Cart.findOne({ customerId: customerId })];
                    case 2:
                        doc = _a.sent(); // check if cutomer exist in cart collecton
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        res.status(400).json({ result: "Error", error: error_1 });
                        return [3 /*break*/, 4];
                    case 4:
                        if (!doc) return [3 /*break*/, 11];
                        items = doc.toObject().items;
                        index = items.findIndex(function (x) { return x.id === productId; });
                        if (!(index === -1)) return [3 /*break*/, 9];
                        // if item not exist in cart already
                        items.push({ id: productId, name: data.items[0].name, price: data.items[0].price });
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, cart_model_1.Cart.updateOne({ customerId: data.customerId }, { items: items })];
                    case 6:
                        response = _a.sent();
                        res.status(200).json({ result: "Success", response: response });
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        console.error(error_2);
                        res.status(400).json({ result: "Error", error: error_2 });
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        res.sendStatus(304); // item already exist
                        _a.label = 10;
                    case 10: return [3 /*break*/, 15];
                    case 11:
                        cart = new cart_model_1.Cart({
                            customerName: data.customerName,
                            customerId: data.customerId,
                            items: [{
                                    id: productId,
                                    name: data.items[0].name,
                                    price: data.items[0].price,
                                }],
                        });
                        _a.label = 12;
                    case 12:
                        _a.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, cart.save()];
                    case 13:
                        response = _a.sent();
                        res.status(200).json({ result: "Success", response: response });
                        return [3 /*break*/, 15];
                    case 14:
                        error_3 = _a.sent();
                        console.error(error_3);
                        res.status(400).json({ result: "Error", error: error_3 });
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        // delete item from cart
        this.deleteItem = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var customerId, productId, doc, error_4, items, index, filtered, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        customerId = Number(req.params.customerId);
                        productId = Number(req.params.productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cart_model_1.Cart.findOne({ customerId: customerId })];
                    case 2:
                        doc = _a.sent(); // check for customer in cart
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error(error_4);
                        res.status(400).json({ result: "Error", error: error_4 });
                        return [3 /*break*/, 4];
                    case 4:
                        if (!doc) return [3 /*break*/, 11];
                        items = doc.toObject().items;
                        index = items.findIndex(function (x) { return x.id === productId; });
                        if (!(index > -1)) return [3 /*break*/, 9];
                        // check if item is exist or not, if exist then delete it
                        delete items[index];
                        filtered = items.filter(function (el) {
                            return el != null;
                        });
                        items = filtered;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, cart_model_1.Cart.updateOne({ customerId: customerId }, { items: items })];
                    case 6:
                        response = _a.sent();
                        res.status(200).json({ result: "Success", response: response });
                        return [3 /*break*/, 8];
                    case 7:
                        error_5 = _a.sent();
                        console.error(error_5);
                        res.status(400).json({ result: "Error", error: error_5 });
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        // item not exist
                        res.sendStatus(304);
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        // customer not exist in cart
                        res.sendStatus(304);
                        _a.label = 12;
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        // delete all items
        this.deleteAllItems = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var customerId, doc, error_6, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        customerId = Number(req.params.customerId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cart_model_1.Cart.findOne({ customerId: customerId })];
                    case 2:
                        doc = _a.sent(); // check for customer in cart
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        console.error(error_6);
                        res.status(400).json({ result: "Error", error: error_6 });
                        return [3 /*break*/, 4];
                    case 4:
                        if (!doc) return [3 /*break*/, 9];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, cart_model_1.Cart.updateOne({ customerId: customerId }, { items: [] })];
                    case 6:
                        response = _a.sent();
                        res.status(200).json({ result: "Success", response: response });
                        return [3 /*break*/, 8];
                    case 7:
                        error_7 = _a.sent();
                        console.error(error_7);
                        res.status(400).json({ result: "Error", error: error_7 });
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        res.sendStatus(304); // customer not exist
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        // get all items
        this.getAllItems = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var customerId, doc, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        customerId = Number(req.params.customerId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cart_model_1.Cart.findOne({ customerId: customerId })];
                    case 2:
                        doc = _a.sent(); // check for customer in cart
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _a.sent();
                        console.error(error_8);
                        res.status(400).json({ result: "Error", error: error_8 });
                        return [3 /*break*/, 4];
                    case 4:
                        if (doc) {
                            try {
                                // send items array in response
                                res.status(200).json({ result: "Success", response: doc.toObject().items });
                            }
                            catch (error) {
                                console.error(error);
                                res.status(400).json({ result: "Error", error: error });
                            }
                        }
                        else {
                            res.sendStatus(404); // customer not exist
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return CartController;
}());
exports.default = new CartController();
