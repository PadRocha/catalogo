'use strict'

/*------------------------------------------------------------------*/
// Controlador de line.js
/*------------------------------------------------------------------*/

const Line = require('../models/line'); //* Calls line.js model
const Key = require('../models/key'); //* Calls key.js model

const cloudinary = require('cloudinary'); //* Calls cloudinary

const perPage = 20;

cloudinary.config({
    cloud_name: process.env.C_NAME,
    api_key: process.env.C_KEY,
    api_secret: process.env.C_SECRET
});

function totalKey(line) {
    return new Promise(resolve => {
        Key.countDocuments({ 'line': line._id }, async (err, countKeys) => {
            resolve({
                _id: line._id,
                name: line.name,
                started: line.started,
                countKeys
            });
        })
    });
}

const lineController = {
    saveLine(req, res) {
        if (!req.body) return res.status(400).send({ message: 'Bad Request' });
        const newLine = new Line(req.body);
        newLine.save((err, lineStored) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!lineStored) return res.status(204).send({ message: 'Line No Content' });
            return res.status(200).send({ data: lineStored });
        });
    },
    listLine(req, res) {
        Line.find({}).sort('_id').exec((err, line) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!line) return res.status(404).send({ message: 'Line Not Found' });
            return res.status(200).send({ data: line });
        });
    },
    listLineTotalKey(req, res) {
        Line.find({}).sort('_id').exec(async (err, line) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!line) return res.status(404).send({ message: 'Line Not Found' });
            const data = await Promise.all(line.map(l => totalKey(l)))
            return res.status(200).send({ data });
        });
    },
    listLinePage(req, res) {
        if (!req.params.page) return res.status(400).send({ message: 'Bad Request' });
        const pag = Number(req.params.page);
        Line.paginate({}, { page: pag, limit: perPage, sort: '_id' }, (err, line) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!line) return res.status(404).send({ message: 'Line Not Found' });
            return res.status(200).send({ data: line });
        });
    },
    listLineTotalKeyPage(req, res) {
        if (!req.params.page) return res.status(400).send({ message: 'Bad Request' });
        const pag = Number(req.params.page);
        Line.paginate({}, { page: pag, limit: perPage, sort: '_id' }, async (err, line) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!line) return res.status(404).send({ message: 'Line Not Found' });
            const data = line;
            data.docs = await Promise.all(line.docs.map(l => totalKey(l)))
            return res.status(200).send({ data });
        });
    },
    listLineRegex(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        Line.find({ '_id': { $regex: '^' + req.params.id, $options: 'i' } }).sort('_id').exec((err, line) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!line) return res.status(404).send({ message: 'Line Not Found' });
            return res.status(200).send({ data: line });
        });
    },
    listLineTotalKeyRegex(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        Line.find({ '_id': { $regex: '^' + req.params.id, $options: 'i' } }).sort('_id').exec(async (err, line) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!line) return res.status(404).send({ message: 'Line Not Found' });
            const data = await Promise.all(line.map(l => totalKey(l)))
            return res.status(200).send({ data });
        });
    },
    listLineRegexPage(req, res) {
        if (!req.params.id && !req.params.page) return res.status(400).send({ message: 'Bad Request' });
        const pag = Number(req.params.page);
        Line.paginate({ '_id': { $regex: '^' + req.params.id, $options: 'i' } }, { page: pag, limit: perPage, sort: '_id' },
            (err, line) => {
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (!line) return res.status(404).send({ message: 'Line Not Found' });
                return res.status(200).send({ data: line });
            });
    },
    listLineTotalKeyRegexPage(req, res) {
        if (!req.params.id && !req.params.page) return res.status(400).send({ message: 'Bad Request' });
        const pag = Number(req.params.page);
        Line.paginate({ '_id': { $regex: '^' + req.params.id, $options: 'i' } }, { page: pag, limit: perPage, sort: '_id' },
            async (err, line) => {
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (!line) return res.status(404).send({ message: 'Line Not Found' });
                const data = line;
                data.docs = await Promise.all(line.docs.map(l => totalKey(l)))
                return res.status(200).send({ data });
            });
    },
    getLine(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        Line.findById(req.params.id).exec((err, line) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!line) return res.status(404).send({ message: 'Line Not Found' });
            return res.status(200).send({ data: line });
        });
    },
    updateLine(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        if (!req.body) return res.status(400).send({ message: 'Bad Request' });
        const id = req.params.id
        if (req.body._id) {
            if (!req.body.name) return res.status(400).send({ message: 'Bad Request' });
            const newLine = new Line(req.body);
            Line.findByIdAndDelete(id, (err, lineDeleted) => {
                if (err) return res.status(500).send({ message: 'Replace 1 Internal Server message' });
                if (!lineDeleted) return res.status(404).send({ message: 'Line Not Found' });
                newLine.save((err, lineStored) => {
                    if (err) return res.status(500).send({ message: 'Replace 2 Internal Server message' });
                    if (!lineStored) return res.status(204).send({ message: 'Line No Content' });
                    if (lineDeleted._id !== lineStored._id) {
                        Key.updateMany({ 'line': lineDeleted._id }, { 'line': lineStored._id }).exec(err => {
                            if (err) return res.status(500).send({ message: 'Key Internal Server message' });
                        });
                    }
                    return res.status(200).send({ data: lineDeleted });
                });
            });
        } else {
            Line.findByIdAndUpdate(id, req.body, (err, lineUpdated) => {
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (!lineUpdated) return res.status(404).send({ message: 'Line Not Found' });
                return res.status(200).send({ data: lineUpdated });
            });
        }
    },
    deleteLine(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        Line.findByIdAndDelete(req.params.id, (err, lineDeleted) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!lineDeleted) return res.status(404).send({ message: 'Line Not Found' });
            let keyImage = new Array();
            Key.find({ 'line': lineDeleted._id }).select('image -_id').exec((err, lineDeleted) => {
                if (err) return res.status(500).send({ message: 'Key Internal Server message' });
                if (lineDeleted) keyImage = lineDeleted;
            });
            Key.deleteMany({ 'line': lineDeleted._id }).exec(err => {
                if (err) return res.status(500).send({ message: 'Key delete Internal Server message' });
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