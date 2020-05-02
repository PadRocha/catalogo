"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const moment_1 = __importDefault(require("moment"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config/config"));
function authorized(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization)
            return res.status(403).send({ message: 'Forbidden' });
        const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];
        if (token === 'null')
            return res.status(403).send({ message: 'Forbidden' });
        try {
            var payload = jsonwebtoken_1.verify(token, config_1.default.KEY.SECRET);
            const user = yield user_1.default.findById(payload.sub);
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
    });
}
exports.authorized = authorized;
function authAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization)
            return res.status(403).send({ message: 'Forbidden' });
        const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];
        if (token === 'null')
            return res.status(403).send({ message: 'Forbidden' });
        try {
            var payload = jsonwebtoken_1.verify(token, config_1.default.KEY.SECRET);
            const user = yield user_1.default.findById(payload.sub);
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
    });
}
exports.authAdmin = authAdmin;
