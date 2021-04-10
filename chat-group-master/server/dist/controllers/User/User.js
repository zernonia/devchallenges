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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var CrudController_1 = require("../CrudController");
var handleError_1 = require("../../utils/handleError");
var index_1 = require("../../models/index");
var axios_1 = __importDefault(require("axios"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var maxAge = 3 * 24 * 60 * 60;
var createToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, "chat group", {
        expiresIn: maxAge,
    });
};
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserController.prototype.create = function (req, res) {
        var code = req.body.code;
        var body = {
            client_id: "686f5323f518cfc824f3",
            client_secret: "4684c25e7370d0f49e6d4d2e6ced6258ff2cf505",
            code: code,
            state: "randomstring",
        };
        var config = {
            headers: {
                Accept: "application/json",
            },
        };
        axios_1.default
            .post("https://github.com/login/oauth/access_token", body, config)
            .then(function (response) {
            if (response.data.error) {
                res.status(500);
            }
            else {
                axios_1.default.get('https://api.github.com/user', {
                    headers: {
                        'Authorization': "token " + response.data.access_token
                    }
                }).then(function (responseFromGitHub) {
                    var _a = responseFromGitHub.data, id = _a.id, name = _a.name, avatar_url = _a.avatar_url;
                    var update = {
                        github_id: id,
                        name: name,
                        photo: avatar_url,
                    };
                    var option = {
                        new: true,
                        upsert: true
                    };
                    index_1.User.findOneAndUpdate({ github_id: id }, update, option).then(function (updatedResult) {
                        var token = createToken(updatedResult === null || updatedResult === void 0 ? void 0 : updatedResult._id);
                        res.cookie('jwt', token, { maxAge: maxAge * 1000 });
                        res.status(201).json(updatedResult);
                    }).catch(function (e) {
                        console.log(e);
                        res.status(400).json(e);
                    });
                });
            }
        });
    };
    UserController.prototype.loginUsingEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, token, err_1, errors;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, index_1.User.loginWithEmail(email, password)];
                    case 2:
                        user = _b.sent();
                        token = createToken(user._id);
                        res.cookie('jwt', token, { maxAge: maxAge * 1000 });
                        res.status(201).json(user._id);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        errors = handleError_1.handleErrors(err_1);
                        res.status(400).json({ errors: errors });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.createUsingEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, token, err_2, errors;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, index_1.User.create({ email: email, password: password })];
                    case 2:
                        user = _b.sent();
                        token = createToken(user._id);
                        res.cookie('jwt', token, { maxAge: maxAge * 1000 });
                        res.status(201).json(user._id);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _b.sent();
                        errors = handleError_1.handleErrors(err_2);
                        res.status(400).json({ errors: errors });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.read = function (req, res) {
        var cookies = jsonwebtoken_1.default.decode(req.cookies.jwt, {
            json: true
        });
        var id = cookies === null || cookies === void 0 ? void 0 : cookies.id;
        var populate = {
            path: "channel",
            select: "name",
        };
        index_1.User.findById(id).select('-password').populate(populate).then(function (response) {
            res.json(response);
        });
    };
    UserController.prototype.update = function (req, res) {
        throw new Error("Method not implemented.");
    };
    UserController.prototype.delete = function (req, res) {
        throw new Error("Method not implemented.");
    };
    return UserController;
}(CrudController_1.CrudController));
exports.UserController = UserController;
