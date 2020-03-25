'use strict'

/*------------------------------------------------------------------*/
// Controlador de user.js
/*------------------------------------------------------------------*/

const User = require('../models/user'); //* Calls user.js model
const jsonwebtoken = require('jsonwebtoken'); //* Calls jsonwebtoken
const jwt = require('../services/jwt');

const userController = {
    registerUser(req, res) {
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        const newUser = new User(req.body);
        newUser.save((err, userStored) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!userStored) return res.status(204).send({ error: 'User No Content' });
            return res.status(200).send({ token: jwt.createToken(userStored) });
        });
    },
    loginUser(req, res) {
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        const userData = req.body;
        User.findOne({ nickname: userData.nickname }, (err, user) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!user) return res.status(404).send({ error: 'User Not Found' });
            if (!user.comparePassword(userData.password)) return res.status(401).send({ error: 'Unauthorized' });
            else return res.status(200).send({ token: jwt.createToken(user) });
        });
    },
    returnUser(req, res) {
        if (!req.headers.authorization) return res.status(403).send({ error: 'Forbidden' });
        const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];

        if (token === 'null') return res.status(403).send({ error: 'Forbidden' });

        try {
            var payload = jsonwebtoken.verify(token, process.env.SECRET_KEY);
            return res.status(200).send({ _id: payload.sub, nickname: payload.nickname, role: payload.role });
        } catch (error) {
            return res.status(409).send({ error: 'The request could not be processed because of conflict in the current state of the resourcess' });
        }
    }//,
};

/*------------------------------------------------------------------*/

module.exports = userController;