"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ChannelController = void 0;
var index_1 = require("../../models/index");
var CrudController_1 = require("../CrudController");
var ChannelController = /** @class */ (function (_super) {
    __extends(ChannelController, _super);
    function ChannelController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChannelController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, admin, description, channel, data, user, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, admin = _a.admin, description = _a.description;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, index_1.Channel.create({ admin: admin, name: name, description: description })];
                    case 2:
                        channel = _b.sent();
                        data = {
                            $push: {
                                channel: channel._id
                            }
                        };
                        return [4 /*yield*/, index_1.User.findByIdAndUpdate(admin, data)];
                    case 3:
                        user = _b.sent();
                        res.status(201).json(channel);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        res.status(400).json(err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChannelController.prototype.addMessage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, message, user, msg, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, message = _a.message, user = _a.user;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, index_1.Message.create({ user: user, message: message })];
                    case 2:
                        msg = _b.sent();
                        res.status(201).json(msg);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _b.sent();
                        res.status(400).json(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChannelController.prototype.public = function (req, res) {
        throw new Error("Method not implemented.");
    };
    ChannelController.prototype.read = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, index_1.Channel.find({})];
                    case 1:
                        channel = _a.sent();
                        res.json(channel);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(400).json(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChannelController.prototype.update = function (req, res) {
        throw new Error("Method not implemented.");
    };
    ChannelController.prototype.delete = function (req, res) {
        throw new Error("Method not implemented.");
    };
    return ChannelController;
}(CrudController_1.CrudController));
exports.ChannelController = ChannelController;
