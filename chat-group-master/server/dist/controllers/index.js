"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelController = exports.userController = void 0;
var User_1 = require("./User/User");
var Channel_1 = require("./Channel/Channel");
var userController = new User_1.UserController();
exports.userController = userController;
var channelController = new Channel_1.ChannelController();
exports.channelController = channelController;
