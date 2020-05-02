"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const moment_1 = __importDefault(require("moment"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config/config"));
async function authorized(req, res, next) {
    if (!req.headers.authorization)
        return res.status(403).send({ message: 'Forbidden' });
    const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];
    if (token === 'null')
        return res.status(403).send({ message: 'Forbidden' });
    try {
        var payload = jsonwebtoken_1.verify(token, config_1.default.KEY.SECRET);
        const user = await user_1.default.findById(payload.sub);
        if (!user ||
            user.nickname !== payload.nickname ||
            payload.exp <= moment_1.default().unix())
            return res.status(423).send({ message: 'The resource that is being accessed is locked' });
    }
    catch (message) {
        return res.status(409).send({ message: 'Indicates that the request could not be processed because of conflict in the current state of the resourcess' });
    }
    delete payload.iat;
    delete payload.exp;
    req.user = payload;
    return next();
}
exports.authorized = authorized;
async function authAdmin(req, res, next) {
    if (!req.headers.authorization)
        return res.status(403).send({ message: 'Forbidden' });
    const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];
    if (token === 'null')
        return res.status(403).send({ message: 'Forbidden' });
    try {
        var payload = jsonwebtoken_1.verify(token, config_1.default.KEY.SECRET);
        const user = await user_1.default.findById(payload.sub);
        if (!user ||
            user.nickname !== payload.nickname ||
            payload.role !== 'admin' || user.role !== 'admin' ||
            payload.exp <= moment_1.default().unix())
            return res.status(423).send({ message: 'The resource that is being accessed is locked' });
    }
    catch (message) {
        return res.status(409).send({ message: 'Indicates that the request could not be processed because of conflict in the current state of the resourcess' });
    }
    delete payload.iat;
    delete payload.exp;
    req.user = payload;
    return next();
}
exports.authAdmin = authAdmin;
