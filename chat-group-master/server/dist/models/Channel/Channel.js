"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = {
    admin: [{
            type: mongoose_1.SchemaTypes.ObjectId,
            ref: 'user'
        }],
    description: {
        type: mongoose_1.SchemaTypes.String,
    },
    name: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        lowercase: true,
        unique: true
    },
    message: [{
            type: mongoose_1.SchemaTypes.ObjectId,
            ref: 'message'
        }],
    user: [{
            type: mongoose_1.SchemaTypes.ObjectId,
            ref: 'user'
        }],
};
var channelSchema = new mongoose_1.Schema(schema);
var Channel = mongoose_1.model('channel', channelSchema);
exports.default = Channel;
