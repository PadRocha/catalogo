'use strict'

const jwt = require('jsonwebtoken'); //* Calls jsonwebtoken
const moment = require('moment'); //* Calls moment

exports.createToken = (user) => {
    var payload = {
        sub: user._id,
        nickname: user.nickname,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    return jwt.sign(payload, process.env.SECRET_KEY);
};