'use strict'

/*------------------------------------------------------------------*/
// Controlador de line.js
/*------------------------------------------------------------------*/

const Line = require('../models/line'); //* Calls line.js model
const Key = require('../models/key'); //* Calls key.js model

const cloudinary = require('cloudinary'); //* Calls cloudinary

cloudinary.config({
    cloud_name: process.env.C_NAME,
    api_key: process.env.C_KEY,
    api_secret: process.env.C_SECRET
});

const lineController = {
    saveLine(req, res) {
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        const newLine = new Line(req.body);
        newLine.save((err, lineStored) => {
            console.log("saveLine -> err", err)
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
        const id = req.params.id
        if (req.body._id) {
            if (!req.body.name) return res.status(400).send({ error: 'Bad Request' });
            const newLine = new Line(req.body);
            Line.findByIdAndDelete(id, (err, lineDeleted) => {
                if (err) return res.status(500).send({ error: 'Replace 1 Internal Server Error' });
                if (!lineDeleted) return res.status(404).send({ error: 'Line Not Found' });
                newLine.save((err, lineStored) => {
                    if (err) return res.status(500).send({ error: 'Replace 2 Internal Server Error' });
                    if (!lineStored) return res.status(204).send({ error: 'Line No Content' });
                    if (lineDeleted._id !== lineStored._id) {
                        Key.updateMany({ 'line': lineDeleted._id }, { 'line': lineStored._id }).exec(err => {
                            if (err) return res.status(500).send({ error: 'Key Internal Server Error' });
                        });
                    }
                    return res.status(200).send({ data: lineDeleted });
                });
            });
        } else {
            Line.findByIdAndUpdate(id, req.body, (err, lineUpdated) => {
                if (err) return res.status(500).send({ error: 'Internal Server Error' });
                if (!lineUpdated) return res.status(404).send({ error: 'Line Not Found' });
                return res.status(200).send({ data: lineUpdated });
            });
        }
    },
    deleteLine(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Line.findByIdAndDelete(req.params.id, (err, lineDeleted) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!lineDeleted) return res.status(404).send({ error: 'Line Not Found' });
            let keyImage = [];
            Key.find({ 'line': lineDeleted._id }).select('image -_id').exec((err, lineDeleted) => {
                if (err) return res.status(500).send({ error: 'Key Internal Server Error' });
                if (lineDeleted) keyImage = lineDeleted;
            });
            Key.deleteMany({ 'line': lineDeleted._id }).exec(err => {
                if (err) return res.status(500).send({ error: 'Key delete Internal Server Error' });
                keyImage.forEach(e => {
                    e.image.forEach(async f => {
                        await cloudinary.v2.uploader.destroy(f.public);
                    });
                });
            });
            return res.status(200).send({ data: lineDeleted });
        });
    },
};

/*------------------------------------------------------------------*/

module.exports = lineController;