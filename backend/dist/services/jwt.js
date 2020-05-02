"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    var payload = {
        sub: user._id,
        nickname: user.nickname,
        role: user.role,
        iat: moment_1.default().unix(),
        exp: moment_1.default().add(30, 'days').unix()
    };
    return jsonwebtoken_1.sign(payload, config_1.default.KEY.SECRET);
}
exports.default = createToken;
