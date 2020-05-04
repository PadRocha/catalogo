"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const line_1 = __importDefault(require("../models/line"));
const key_1 = __importDefault(require("../models/key"));
const config_1 = __importDefault(require("../config/config"));
const perPage = 20;
cloudinary_1.v2.config({
    cloud_name: config_1.default.CDB.C_NAME,
    api_key: config_1.default.CDB.C_KEY,
    api_secret: config_1.default.CDB.C_SECRET
});
const totalKey = (line) => new Promise((resolve) => key_1.default.countDocuments({ 'line': line._id }, async (err, countKeys) => resolve({
    _id: line._id,
    name: line.name,
    started: line.started,
    countKeys
})));
function saveLine(req, res) {
    if (!req.body)
        return res.status(400).send({ message: 'Client has not sent params' });
    const newLine = new line_1.default(req.body);
    newLine.save((err, lineStored) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!lineStored)
            return res.status(204).send({ message: 'Line No Content' });
        return res.status(200).send({ data: lineStored });
    });
}
exports.saveLine = saveLine;
function listLine(req, res) {
    const query = {};
    line_1.default.find(query).sort('_id').exec((err, line) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}
exports.listLine = listLine;
function listLineTotalKey(req, res) {
    const query = {};
    line_1.default.find(query).sort('_id').exec(async (err, line) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        const data = await Promise.all(line.map(l => totalKey(l)));
        return res.status(200).send({ data });
    });
}
exports.listLineTotalKey = listLineTotalKey;
function listLinePage(req, res) {
    if (!req.params.page)
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = {};
    const options = {
        page: Number(req.params.page),
        limit: perPage,
        sort: '_id'
    };
    line_1.default.paginate(query, options, (err, line) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}
exports.listLinePage = listLinePage;
function listLineTotalKeyPage(req, res) {
    if (!req.params.page)
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = {};
    const options = {
        page: Number(req.params.page),
        limit: perPage,
        sort: '_id'
    };
    line_1.default.paginate(query, options, async (err, line) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        const data = line;
        data.docs = await Promise.all(line.docs.map(l => totalKey(l)));
        return res.status(200).send({ data });
    });
}
exports.listLineTotalKeyPage = listLineTotalKeyPage;
function listLineRegex(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = {
        '_id': {
            $regex: '^' + req.params.id,
            $options: 'i'
        }
    };
    line_1.default.find(query).sort('_id').exec((err, line) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}
exports.listLineRegex = listLineRegex;
function listLineTotalKeyRegex(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = {
        '_id': {
            $regex: '^' + req.params.id,
            $options: 'i'
        }
    };
    line_1.default.find(query).sort('_id').exec(async (err, line) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        const data = await Promise.all(line.map(l => totalKey(l)));
        return res.status(200).send({ data });
    });
}
exports.listLineTotalKeyRegex = listLineTotalKeyRegex;
function listLineRegexPage(req, res) {
    if (!req.params.id || !req.params.page)
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = {
        '_id': {
            $regex: '^' + req.params.id,
            $options: 'i'
        }
    };
    const options = {
        page: Number(req.params.page),
        limit: perPage,
        sort: '_id'
    };
    line_1.default.paginate(query, options, (err, line) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}
exports.listLineRegexPage = listLineRegexPage;
function listLineTotalKeyRegexPage(req, res) {
    if (!req.params.id || !req.params.page)
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = {
        '_id': {
            $regex: '^' + req.params.id,
            $options: 'i'
        }
    };
    const options = {
        page: Number(req.params.page),
        limit: perPage,
        sort: '_id'
    };
    line_1.default.paginate(query, options, async (err, line) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        const data = line;
        data.docs = await Promise.all(line.docs.map(l => totalKey(l)));
        return res.status(200).send({ data });
    });
}
exports.listLineTotalKeyRegexPage = listLineTotalKeyRegexPage;
function getLine(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Client has not sent params' });
    line_1.default.findById(req.params.id).exec((err, line) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}
exports.getLine = getLine;
function updateLine(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Client has not sent params' });
    if (!req.body)
        return res.status(400).send({ message: 'Client has not sent params' });
    const id = req.params.id;
    if (req.body._id) {
        if (!req.body.name)
            return res.status(400).send({ message: 'Client has not sent params' });
        const newLine = new line_1.default(req.body);
        line_1.default.findByIdAndDelete(id, (err, lineDeleted) => {
            if (err)
                return res.status(500).send({ message: 'Replace 1 Internal Server Error' });
            if (!lineDeleted)
                return res.status(404).send({ message: 'Line Not Found' });
            newLine.save((err, lineStored) => {
                if (err)
                    return res.status(500).send({ message: 'Replace 2 Internal Server Error' });
                if (!lineStored)
                    return res.status(204).send({ message: 'Line No Content' });
                if (lineDeleted._id !== lineStored._id) {
                    key_1.default.updateMany({ 'line': lineDeleted._id }, { 'line': lineStored._id }).exec(err => {
                        if (err)
                            return res.status(500).send({ message: 'Key Internal Server Error' });
                    });
                }
                return res.status(200).send({ data: lineDeleted });
            });
        });
    }
    else {
        line_1.default.findByIdAndUpdate(id, req.body, (err, lineUpdated) => {
            if (err)
                return res.status(406).send({ message: 'Internal error, probably error with params' });
            if (!lineUpdated)
                return res.status(404).send({ message: 'Line Not Found' });
            return res.status(200).send({ data: lineUpdated });
        });
    }
}
exports.updateLine = updateLine;
function deleteLine(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Client has not sent params' });
    line_1.default.findByIdAndDelete(req.params.id, (err, lineDeleted) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!lineDeleted)
            return res.status(404).send({ message: 'Line Not Found' });
        let keyImage = new Array();
        key_1.default.find({ 'line': lineDeleted._id }).select('image -_id').exec((err, lineDeleted) => {
            if (err)
                return res.status(500).send({ message: 'Key Internal Server Error' });
            if (lineDeleted)
                keyImage = lineDeleted;
        });
        key_1.default.deleteMany({ 'line': lineDeleted._id }).exec(err => {
            if (err)
                return res.status(500).send({ message: 'Key delete Internal Server Error' });
            keyImage.forEach(e => {
                e.image.forEach(async (f) => {
                    if (f.publicId)
                        await cloudinary_1.v2.uploader.destroy(f.publicId);
                });
            });
        });
        return res.status(200).send({ data: lineDeleted });
    });
}
exports.deleteLine = deleteLine;
