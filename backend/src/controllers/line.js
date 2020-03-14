'use strict'

/*------------------------------------------------------------------*/
// Controlador de line.js
/*------------------------------------------------------------------*/

const Line = require('../models/line'); //* Calls line.js model

const lineController = {
    saveLine(req, res) {
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        const newLine = new Line(req.body);
        newLine.save((err, lineStored) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!lineStored) return res.status(204).send({ error: 'Line No Content' });
            return res.status(200).send({ data: lineStored });
        });
    },
    listLine(req, res) {
        Line.find({}).exec((err, line) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!line) return res.status(404).send({ error: 'Line Not Found' });
            return res.status(200).send({ data: line });
        });
    },
    getLine(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Line.findById(req.params.id).exec((err, line) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!line) return res.status(404).send({ error: 'Line Not Found' });
            return res.status(200).send({ data: line });
        });
    },
    updateLine(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        Line.findOneAndUpdate(req.params.id, req.body, (err, lineUpdated) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!lineUpdated) return res.status(404).send({ error: 'Line Not Found' });
            return res.status(200).send({ data: lineUpdated });
        });
    },
    deleteLine(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Line.findOneAndDelete(req.params.id, (err, lineDeleted) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!lineDeleted) return res.status(404).send({ error: 'Line Not Found' });
            return res.status(200).send({ data: lineDeleted });
        });
    },
};

/*------------------------------------------------------------------*/

module.exports = lineController;