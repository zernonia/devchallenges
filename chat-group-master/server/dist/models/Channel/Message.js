"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = {
    user: {
        type: mongoose_1.SchemaTypes.ObjectId,
        required: true,
        ref: "user"
    },
    message: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    created_at: {
        type: mongoose_1.SchemaTypes.Date,
        default: Date.now()
    }
};
var messageSchema = new mongoose_1.Schema(schema);
var Message = mongoose_1.model('message', messageSchema);
exports.default = Message;
