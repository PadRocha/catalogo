"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = __importDefault(require("../services/jwt"));
const config_1 = __importDefault(require("../config/config"));
function registerUser(req, res) {
    if (!req.body)
        return res.status(400).send({ message: 'Bad Request' });
    const newUser = new user_1.default(req.body);
    newUser.save((err, userStored) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
        if (!userStored)
            return res.status(204).send({ message: 'User No Content' });
        delete userStored.password;
        return res.status(200).send({ token: jwt_1.default(userStored) });
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    if (!req.body)
        return res.status(400).send({ message: 'Bad Request' });
    const userData = req.body;
    user_1.default.findOne({ nickname: userData.nickname }, (err, user) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
        if (!user)
            return res.status(404).send({ message: 'User Not Found' });
        if (!user.comparePassword(userData.password))
            return res.status(401).send({ message: 'Unauthorized' });
        else {
            delete user.password;
            return res.status(200).send({ token: jwt_1.default(user) });
        }
    });
}
exports.loginUser = loginUser;
function returnUser(req, res) {
    if (!req.headers.authorization)
        return res.status(403).send({ message: 'Forbidden' });
    const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];
    if (token === 'null')
        return res.status(403).send({ message: 'Forbidden' });
    try {
        var payload = jsonwebtoken_1.verify(token, config_1.default.KEY.SECRET);
        delete payload.iat;
        delete payload.exp;
        return res.status(200).send({ _id: payload.sub, nickname: payload.nickname, role: payload.role });
    }
    catch (message) {
        return res.status(409).send({ message: 'The request could not be processed because of conflict in the current state of the resourcess' });
    }
}
exports.returnUser = returnUser;
