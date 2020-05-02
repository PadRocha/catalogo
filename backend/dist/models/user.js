"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config/config"));
const userSchema = new mongoose_1.Schema({
    nickname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: 'user',
        required: true
    }
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();
    const salt = await bcryptjs_1.default.genSalt(config_1.default.KEY.SALT);
    bcryptjs_1.default.hash(user.password, salt, function (err, hash) {
        if (err)
            return next(err);
        user.password = hash;
        return next();
    });
});
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs_1.default.compareSync(password, this.password);
};
exports.default = mongoose_1.model('User', userSchema);
