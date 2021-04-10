"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var index_1 = require("../../controllers/index");
exports.router = express_1.default.Router();
exports.router.post('/', index_1.channelController.create);
exports.router.get('/', index_1.channelController.read);
