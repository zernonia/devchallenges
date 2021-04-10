"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../../controllers");
exports.router = express_1.default.Router();
exports.router.post("/loginWithGithub", controllers_1.userController.create);
exports.router.post("/loginWithEmail", controllers_1.userController.loginUsingEmail);
exports.router.post("/signup", controllers_1.userController.createUsingEmail);
exports.router.get("/", controllers_1.userController.read);
exports.router.patch("/", controllers_1.userController.update);
exports.router.delete("/", controllers_1.userController.delete);
