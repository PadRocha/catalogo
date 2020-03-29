'use strict'

const jwt = require('jsonwebtoken'); //* Calls jsonwebtoken
const moment = require('moment'); //* Calls moment

exports.authorized = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).send({ message: 'Forbidden' });
    const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];

    if (token === 'null') return res.status(403).send({ message: 'Forbidden' });

    try {
        var payload = jwt.verify(token, process.env.SECRET_KEY);
        if (payload.exp <= moment().unix()) return res.status(423).send({ message: 'The resource that is being accessed is locked' });
    } catch (message) {
        return res.status(409).send({ message: 'Indicates that the request could not be processed because of conflict in the current state of the resourcess' });
    }

    req.user = payload;

    return next();
}

exports.authAdmin = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).send({ message: 'Forbidden' });
    const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];

    if (token === 'null') return res.status(403).send({ message: 'Forbidden' });

    try {
        var payload = jwt.verify(token, process.env.SECRET_KEY);
        if (payload.exp <= moment().unix()) return res.status(423).send({ message: 'The resource that is being accessed is locked' });
        if (payload.role !== 'admin') return res.status(423).send({ message: 'The resource that is being accessed is locked' });
    } catch (message) {
        return res.status(409).send({ message: 'Indicates that the request could not be processed because of conflict in the current state of the resourcess' });
    }

    req.user = payload;

    return next();
}