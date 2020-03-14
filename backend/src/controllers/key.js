'use strict'

/*------------------------------------------------------------------*/
// Controlador de key.js
/*------------------------------------------------------------------*/

const Key = require('../models/key'); //* Calls key.js model

const keyController = {
    saveKey(req, res) {
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        const newKey = new Key(req.body);
        newKey.save((err, keyStored) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!keyStored) return res.status(204).send({ error: 'Key No Content' });
            return res.status(200).send({ data: keyStored });
        });
    },
    listKey(req, res) {
        Key.find({}).populate('line').exec((err, key) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!key) return res.status(404).send({ error: 'Key Not Found' });
            return res.status(200).send({ data: key });
        });
    },
    getKey(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Key.findById(req.params.id).exec((err, key) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!key) return res.status(404).send({ error: 'Key Not Found' });
            return res.status(200).send({ data: key });
        });
    },
    updateKey(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        Key.findOneAndUpdate(req.params.id, req.body, (err, keyUpdated) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!keyUpdated) return res.status(404).send({ error: 'Key Not Found' });
            return res.status(200).send({ data: keyUpdated });
        });
    },
    deleteKey(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Key.findOneAndDelete(req.params.id, (err, keyDeleted) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!keyDeleted) return res.status(404).send({ error: 'Key Not Found' });
            return res.status(200).send({ data: keyDeleted });
        });
    },
};

/*------------------------------------------------------------------*/

module.exports = keyController;