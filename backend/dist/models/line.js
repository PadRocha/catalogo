"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const lineSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        trim: true,
        minlength: 6,
        maxlength: 6,
        uppercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    started: {
        type: Date,
        default: Date.now,
        required: true
    },
    ended: {
        type: Date
    }
});
lineSchema.plugin(mongoose_paginate_v2_1.default);
;
exports.default = mongoose_1.model('Line', lineSchema);
