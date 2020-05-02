"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const totalKey = (line) => new Promise((resolve) => key_1.default.countDocuments({ 'line': line._id }, (err, countKeys) => __awaiter(void 0, void 0, void 0, function* () {
    return resolve({
        _id: line._id,
        name: line.name,
        started: line.started,
        countKeys
    });
})));
function saveLine(req, res) {
    if (!req.body)
        return res.status(400).send({ message: 'Bad Request' });
    const newLine = new line_1.default({
        _id: req.body._id,
        name: req.body.name
    });
    newLine.save((err, lineStored) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
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
            return res.status(500).send({ message: 'Internal Server message' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}
exports.listLine = listLine;
function listLineTotalKey(req, res) {
    const query = {};
    line_1.default.find(query).sort('_id').exec((err, line) => __awaiter(this, void 0, void 0, function* () {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        const data = yield Promise.all(line.map(l => totalKey(l)));
        return res.status(200).send({ data });
    }));
}
exports.listLineTotalKey = listLineTotalKey;
function listLinePage(req, res) {
    if (!req.params.page)
        return res.status(400).send({ message: 'Bad Request' });
    const query = {};
    const options = {
        page: Number(req.params.page),
        limit: perPage,
        sort: '_id'
    };
    line_1.default.paginate(query, options, (err, line) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}
exports.listLinePage = listLinePage;
function listLineTotalKeyPage(req, res) {
    if (!req.params.page)
        return res.status(400).send({ message: 'Bad Request' });
    const query = {};
    const options = {
        page: Number(req.params.page),
        limit: perPage,
        sort: '_id'
    };
    line_1.default.paginate(query, options, (err, line) => __awaiter(this, void 0, void 0, function* () {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        const data = line;
        data.docs = yield Promise.all(line.docs.map(l => totalKey(l)));
        return res.status(200).send({ data });
    }));
}
exports.listLineTotalKeyPage = listLineTotalKeyPage;
function listLineRegex(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Bad Request' });
    const query = {
        '_id': {
            $regex: '^' + req.params.id,
            $options: 'i'
        }
    };
    line_1.default.find(query).sort('_id').exec((err, line) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}
exports.listLineRegex = listLineRegex;
function listLineTotalKeyRegex(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Bad Request' });
    const query = {
        '_id': {
            $regex: '^' + req.params.id,
            $options: 'i'
        }
    };
    line_1.default.find(query).sort('_id').exec((err, line) => __awaiter(this, void 0, void 0, function* () {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        const data = yield Promise.all(line.map(l => totalKey(l)));
        return res.status(200).send({ data });
    }));
}
exports.listLineTotalKeyRegex = listLineTotalKeyRegex;
function listLineRegexPage(req, res) {
    if (!req.params.id || !req.params.page)
        return res.status(400).send({ message: 'Bad Request' });
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
            return res.status(500).send({ message: 'Internal Server message' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}
exports.listLineRegexPage = listLineRegexPage;
function listLineTotalKeyRegexPage(req, res) {
    if (!req.params.id || !req.params.page)
        return res.status(400).send({ message: 'Bad Request' });
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
    line_1.default.paginate(query, options, (err, line) => __awaiter(this, void 0, void 0, function* () {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        const data = line;
        data.docs = yield Promise.all(line.docs.map(l => totalKey(l)));
        return res.status(200).send({ data });
    }));
}
exports.listLineTotalKeyRegexPage = listLineTotalKeyRegexPage;
function getLine(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Bad Request' });
    line_1.default.findById(req.params.id).exec((err, line) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}
exports.getLine = getLine;
function updateLine(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Bad Request' });
    if (!req.body)
        return res.status(400).send({ message: 'Bad Request' });
    const id = req.params.id;
    if (req.body._id) {
        if (!req.body.name)
            return res.status(400).send({ message: 'Bad Request' });
        const newLine = new line_1.default(req.body);
        line_1.default.findByIdAndDelete(id, (err, lineDeleted) => {
            if (err)
                return res.status(500).send({ message: 'Replace 1 Internal Server message' });
            if (!lineDeleted)
                return res.status(404).send({ message: 'Line Not Found' });
            newLine.save((err, lineStored) => {
                if (err)
                    return res.status(500).send({ message: 'Replace 2 Internal Server message' });
                if (!lineStored)
                    return res.status(204).send({ message: 'Line No Content' });
                if (lineDeleted._id !== lineStored._id) {
                    key_1.default.updateMany({ 'line': lineDeleted._id }, { 'line': lineStored._id }).exec(err => {
                        if (err)
                            return res.status(500).send({ message: 'Key Internal Server message' });
                    });
                }
                return res.status(200).send({ data: lineDeleted });
            });
        });
    }
    else {
        line_1.default.findByIdAndUpdate(id, req.body, (err, lineUpdated) => {
            if (err)
                return res.status(500).send({ message: 'Internal Server message' });
            if (!lineUpdated)
                return res.status(404).send({ message: 'Line Not Found' });
            return res.status(200).send({ data: lineUpdated });
        });
    }
}
exports.updateLine = updateLine;
function deleteLine(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Bad Request' });
    line_1.default.findByIdAndDelete(req.params.id, (err, lineDeleted) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server message' });
        if (!lineDeleted)
            return res.status(404).send({ message: 'Line Not Found' });
        let keyImage = new Array();
        key_1.default.find({ 'line': lineDeleted._id }).select('image -_id').exec((err, lineDeleted) => {
            if (err)
                return res.status(500).send({ message: 'Key Internal Server message' });
            if (lineDeleted)
                keyImage = lineDeleted;
        });
        key_1.default.deleteMany({ 'line': lineDeleted._id }).exec(err => {
            if (err)
                return res.status(500).send({ message: 'Key delete Internal Server message' });
            keyImage.forEach(e => {
                e.image.forEach((f) => __awaiter(this, void 0, void 0, function* () {
                    if (f.publicId)
                        yield cloudinary_1.v2.uploader.destroy(f.publicId);
                }));
            });
        });
        return res.status(200).send({ data: lineDeleted });
    });
}
exports.deleteLine = deleteLine;
