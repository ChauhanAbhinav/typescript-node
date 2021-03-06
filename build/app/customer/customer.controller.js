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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var counter_model_1 = __importDefault(require("../common/counter.model")); // counter model for unique id's for customers and products
var customer_model_1 = require("./customer.model"); // model
var CustomerController = /** @class */ (function () {
    function CustomerController() {
        var _this = this;
        this.addCustomer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cust, doc, seq, customer, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cust = req.body;
                        return [4 /*yield*/, counter_model_1.default.findOne({})];
                    case 1:
                        doc = _a.sent();
                        if (doc) {
                            seq = doc.toObject().customerId;
                            seq = seq + 1;
                        }
                        customer = new customer_model_1.Customer({
                            id: seq,
                            name: cust.name,
                            email: cust.email,
                            mobile: cust.mobile,
                            address: cust.address,
                            pincode: cust.pincode,
                        });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, customer.save()];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, counter_model_1.default.updateOne({}, { customerId: seq })];
                    case 4:
                        _a.sent(); // update counter
                        res.status(200).json({ result: "Success", response: response });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        // catch for any error occurs in try block while saving saving to db
                        console.error(error_1);
                        res.status(400).json({ result: "Error", error: error_1 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateCustomer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cust, id, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cust = req.body;
                        id = Number(req.params.id);
                        if (cust.id) {
                            delete cust.id;
                        } // delete id if present in payload, otherwise it will update too
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, customer_model_1.Customer.updateOne({ id: id }, cust)];
                    case 2:
                        response = _a.sent();
                        if (response.nModified) {
                            res.status(200).json({ result: "Success", response: response });
                        }
                        else {
                            res.sendStatus(304); // send status not modified, customer not updated
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        res.status(400).json({ result: "Error", error: error_2 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteCustomer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Number(req.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, customer_model_1.Customer.findOneAndRemove({ id: id })];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            res.status(200).json({ result: "Success", response: response });
                        }
                        else {
                            // no response, send status not modified, customer not deleted
                            res.status(304).json({ result: "Fail", response: "Customer not deleted" });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error(error_3);
                        res.status(400).json({ result: "Error", error: error_3 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getCustomer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Number(req.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, customer_model_1.Customer.findOne({ id: id })];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            res.status(200).json({ result: "Success", response: response });
                        }
                        else {
                            // no response, send status not found, customer not found
                            res.status(404).json({ result: "Fail", response: "Customer not found" });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error(error_4);
                        res.status(400).json({ result: "Error", error: error_4 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAllCustomers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, customer_model_1.Customer.find({})];
                    case 1:
                        response = _a.sent();
                        if (response.length !== 0) {
                            res.status(200).json({ result: "Success", response: response });
                        }
                        else {
                            // check response array length, send status not found, customer not found
                            res.status(404).json({ result: "Fail", response: "No customer found" });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error(error_5);
                        res.status(400).json({ result: "Error", error: error_5 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return CustomerController;
}());
exports.default = new CustomerController();
