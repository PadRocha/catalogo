'use strict'

/*------------------------------------------------------------------*/
// Controlador de user.js
/*------------------------------------------------------------------*/

const User = require('../models/user'); //* Calls user.js model
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
};

/*------------------------------------------------------------------*/

module.exports = userController;