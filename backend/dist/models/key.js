"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const keySchema = new mongoose_1.Schema({
    code: {
        type: String,
        trim: true,
        maxlength: 4,
        uppercase: true,
        required: true
    },
    line: {
        type: String,
        ref: 'Line',
        required: true
    },
    desc: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: [{
                idN: {
                    type: Number,
                    required: true
                },
                publicId: {
                    type: String,
                    default: null
                },
                img: {
                    type: String,
                    default: null
                },
                status: {
                    type: Number,
                    default: 0,
                    min: 0,
                    max: 5,
                    required: true
                }
            }],
        _id: false,
        idN: true
    },
    conf: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});
keySchema.index({ code: 1, line: 1 }, { unique: true });
keySchema.pre('save', function (next) {
    const key = this;
    const length = key.code.length;
    let code = '';
    for (let i = 0; i < (4 - length); i++)
        key.code = '0' + key.code;
    return next();
});
keySchema.plugin(mongoose_paginate_v2_1.default);
;
exports.default = mongoose_1.model('Key', keySchema);
