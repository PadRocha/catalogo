"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const cloudinary_1 = require("cloudinary");
const line_1 = __importDefault(require("../models/line"));
const key_1 = __importDefault(require("../models/key"));
const config_1 = __importDefault(require("../config/config"));
const perPage = 15;
cloudinary_1.v2.config({
    cloud_name: config_1.default.CDB.C_NAME,
    api_key: config_1.default.CDB.C_KEY,
    api_secret: config_1.default.CDB.C_SECRET
});
function infoStatus(query) {
    const status = { white: 0, gray: 0, brown: 0, blue: 0, purple: 0, green: 0 };
    var percentage = 0;
    return new Promise(resolve => key_1.default.find(query).exec((err, key) => {
        key.forEach(d => {
            let image = d.image;
            image.forEach(i => {
                switch (i.status) {
                    case 0:
                        ++status.white;
                        break;
                    case 1:
                        ++status.gray;
                        break;
                    case 2:
                        ++status.brown;
                        break;
                    case 3:
                        ++status.blue;
                        break;
                    case 4:
                        ++status.purple;
                        break;
                    case 5: ++status.green;
                }
            });
            for (let i of image)
                if (5 === i.status) {
                    ++percentage;
                    break;
                }
        });
        resolve([status, 100 * percentage / key.length]);
    }));
}
function saveKey(req, res) {
    if (!req.body)
        return res.status(400).send({ message: 'Client has not sent params' });
    const newKey = new key_1.default({
        code: req.body.code,
        line: req.body.line,
        desc: req.body.desc
    });
    const query = { '_id': newKey.line };
    line_1.default.findOne(query).select('_id').exec((err, line) => {
        if (err)
            return res.status(500).send({ message: 'Line Internal Server Error' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        newKey.save((err, keyStored) => {
            if (err)
                return res.status(406).send({ message: 'Internal error, probably error with params' });
            if (!keyStored)
                return res.status(204).send({ message: 'Key No Content' });
            return res.status(200).send({ data: keyStored });
        });
    });
}
exports.saveKey = saveKey;
function saveKeyStatus(req, res) {
    if (!req.body || !req.body.status)
        return res.status(400).send({ message: 'Client has not sent params' });
    const newKey = new key_1.default({
        code: req.body.code,
        line: req.body.line,
        desc: req.body.desc
    });
    for (let idN = 0; idN < 3; idN++)
        newKey.image.push({
            idN,
            status: req.body.status
        });
    const query = { '_id': newKey.line };
    line_1.default.findOne(query).select('_id').exec((err, line) => {
        if (err)
            return res.status(500).send({ message: 'Line Internal Server Error' });
        if (!line)
            return res.status(404).send({ message: 'Line Not Found' });
        newKey.save((err, keyStored) => {
            if (err)
                return res.status(406).send({ message: 'Internal error, probably error with params' });
            if (!keyStored)
                return res.status(204).send({ message: 'Key No Content' });
            return res.status(200).send({ data: keyStored });
        });
    });
}
exports.saveKeyStatus = saveKeyStatus;
function listKey(req, res) {
    const query = {};
    key_1.default.find(query).sort({ 'line': 1, 'code': 1 }).exec((err, key) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!key)
            return res.status(404).send({ message: 'Key Not Found' });
        return res.status(200).send({ data: key });
    });
}
exports.listKey = listKey;
function listKeyPage(req, res) {
    if (!req.params.page)
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = {};
    const options = {
        page: Number(req.params.page),
        limit: perPage,
        sort: { 'line': 1, 'code': 1 }
    };
    key_1.default.paginate(query, options, async (err, key) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!key)
            return res.status(404).send({ message: 'Key Not Found' });
        const [status, percentage] = await infoStatus(query);
        key.status = status;
        key.percentage = percentage;
        return res.status(200).send({ data: key });
    });
}
exports.listKeyPage = listKeyPage;
function listKeyRegex(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Client has not sent params' });
    const id = req.params.id;
    let query = id.length < 7
        ? { 'line': { $regex: '^' + id, $options: 'i' } }
        : { 'line': id.slice(0, 6), 'code': { $regex: '^' + id.slice(6), $options: 'i' } };
    key_1.default.find(query).sort({ 'line': 1, 'code': 1 }).exec((err, key) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!key)
            return res.status(404).send({ message: 'Key Not Found' });
        return res.status(200).send({ data: key });
    });
}
exports.listKeyRegex = listKeyRegex;
function listKeyRegexPage(req, res) {
    if (!req.params.id || !req.params.page)
        return res.status(400).send({ message: 'Client has not sent params' });
    const id = req.params.id;
    const query = id.length < 7
        ? { 'line': { $regex: '^' + id, $options: 'i' } }
        : { 'line': id.slice(0, 6), 'code': { $regex: '^' + id.slice(6), $options: 'i' } };
    const options = {
        page: Number(req.params.page),
        limit: perPage,
        sort: { 'line': 1, 'code': 1 }
    };
    key_1.default.paginate(query, options, async (err, key) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!key)
            return res.status(404).send({ message: 'Key Not Found' });
        const [status, percentage] = await infoStatus(query);
        key.status = status;
        key.percentage = percentage;
        return res.status(200).send({ data: key });
    });
}
exports.listKeyRegexPage = listKeyRegexPage;
function listKeyLine(req, res) {
    if (!req.params.line)
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = { 'line': req.params.line };
    key_1.default.find(query).sort('code').exec((err, key) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!key)
            return res.status(404).send({ message: 'Key Not Found' });
        return res.status(200).send({ data: key });
    });
}
exports.listKeyLine = listKeyLine;
function listKeyLinePage(req, res) {
    if (!req.params.line || !req.params.page)
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = { 'line': req.params.line };
    const options = {
        page: Number(req.params.page),
        limit: perPage,
        sort: 'code'
    };
    key_1.default.paginate(query, options, async (err, key) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!key)
            return res.status(404).send({ message: 'Key Not Found' });
        const [status, percentage] = await infoStatus(query);
        key.status = status;
        key.percentage = percentage;
        return res.status(200).send({ data: key });
    });
}
exports.listKeyLinePage = listKeyLinePage;
function getKey(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Client has not sent params' });
    key_1.default.findById(req.params.id).populate('line').exec((err, key) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!key)
            return res.status(404).send({ message: 'Key Not Found' });
        return res.status(200).send({ data: key });
    });
}
exports.getKey = getKey;
function updateKey(req, res) {
    if (!req.params.id || !req.body)
        return res.status(400).send({ message: 'Client has not sent params' });
    key_1.default.findByIdAndUpdate(req.params.id, req.body, (err, keyUpdated) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!keyUpdated)
            return res.status(404).send({ message: 'Key Not Found' });
        return res.status(200).send({ data: keyUpdated });
    });
}
exports.updateKey = updateKey;
function deleteKey(req, res) {
    if (!req.params.id)
        return res.status(400).send({ message: 'Client has not sent params' });
    key_1.default.findByIdAndDelete(req.params.id, (err, keyDeleted) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!keyDeleted)
            return res.status(404).send({ message: 'Key Not Found' });
        keyDeleted.image.forEach(async (e) => {
            await cloudinary_1.v2.uploader.destroy(e.publicId);
        });
        return res.status(200).send({ data: keyDeleted });
    });
}
exports.deleteKey = deleteKey;
function saveStatus(req, res) {
    if (!req.params.id || !req.body || isNaN(req.body.idN) || isNaN(req.body.status))
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = {
        '_id': req.params.id,
        'image.idN': { $ne: req.body.idN }
    };
    const update = {
        $push: {
            'image': {
                'idN': req.body.idN,
                'status': req.body.status,
                'publicId': null,
                'img': null
            }
        }
    };
    key_1.default.findOneAndUpdate(query, update, (err, statusStored) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!statusStored)
            return res.status(404).send({ message: 'Key Not Found' });
        return res.status(200).send({ data: statusStored });
    });
}
exports.saveStatus = saveStatus;
function updateStatus(req, res) {
    if (!req.params.id || !req.body || isNaN(req.body.idN) || isNaN(req.body.status))
        return res.status(400).send({ message: 'Client has not sent params' });
    const query = {
        '_id': req.params.id,
        'image.idN': req.body.idN
    };
    const update = { $set: { 'image.$.status': req.body.status } };
    key_1.default.findOneAndUpdate(query, update, (err, statusUpdated) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (statusUpdated)
            return res.status(200).send({ data: statusUpdated });
        else
            saveStatus(req, res);
    });
}
exports.updateStatus = updateStatus;
function deleteStatus(req, res) {
    if (!req.params._id || !req.params.idN)
        return res.status(400).send({ message: 'Client has not sent params' });
    const id = Number(req.params.idN);
    const update = {
        $pull: {
            'image': {
                'idN': id,
                'status': { $gte: 0, $lte: 4 }
            }
        }
    };
    key_1.default.findByIdAndUpdate(req.params._id, update, (err, statusDeleted) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!statusDeleted)
            return res.status(404).send({ message: 'Key Not Found' });
        try {
            const deleted = statusDeleted.image.find((x) => x.idN === id).status;
            if (deleted == 5)
                return res.status(404).send({ message: 'Key -> image Not Found' });
        }
        catch (message) {
            return res.status(404).send({ message: 'Key -> image Not Found' });
        }
        return res.status(200).send({ data: statusDeleted });
    });
}
exports.deleteStatus = deleteStatus;
async function saveImage(req, res) {
    if (!req.params.id || !req.body || isNaN(req.body.idN) || !req.file)
        return res.status(400).send({ message: 'Client has not sent params' });
    const result = await cloudinary_1.v2.uploader.upload(req.file.path);
    const query = {
        '_id': req.params.id,
        'image.idN': req.body.idN
    };
    const update = {
        $set: {
            'image.$.status': 5,
            'image.$.img': result.url,
            'image.$.publicId': result.public_id
        }
    };
    key_1.default.findOneAndUpdate(query, update, { new: true }, async (err, imageStored) => {
        if (err || !imageStored) {
            await cloudinary_1.v2.uploader.destroy(result.public_id);
            await fs_extra_1.default.unlink(req.file.path);
        }
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!imageStored)
            return res.status(404).send({ message: 'Key Not Found' });
        await fs_extra_1.default.unlink(req.file.path);
        return res.status(200).send({ data: imageStored });
    });
}
exports.saveImage = saveImage;
async function updateImage(req, res) {
    if (!req.params.id || !req.body || isNaN(req.body.idN) || !req.file)
        return res.status(400).send({ message: 'Client has not sent params' });
    const result = await cloudinary_1.v2.uploader.upload(req.file.path);
    const query = {
        '_id': req.params.id,
        'image.idN': req.body.idN,
        'image.status': 5,
        'image.img': { $ne: null },
        'image.publicId': { $ne: null }
    };
    const update = {
        $set: {
            'image.$.img': result.url,
            'image.$.publicId': result.public_id
        }
    };
    key_1.default.findOneAndUpdate(query, update, async (err, imageUpdated) => {
        if (err || !imageUpdated) {
            await cloudinary_1.v2.uploader.destroy(result.public_id);
            await fs_extra_1.default.unlink(req.file.path);
        }
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!imageUpdated)
            return res.status(404).send({ message: 'Key Not Found' });
        await cloudinary_1.v2.uploader.destroy(imageUpdated.image.find((x) => x.idN === req.body.idN).publicId);
        await fs_extra_1.default.unlink(req.file.path);
        return res.status(200).send({ data: imageUpdated });
    });
}
exports.updateImage = updateImage;
function deleteImage(req, res) {
    if (!req.params._id || !req.params.idN)
        return res.status(400).send({ message: 'Client has not sent params' });
    const id = Number(req.params.idN);
    const update = {
        $pull: {
            'image': {
                'idN': id,
                'status': 5
            }
        }
    };
    key_1.default.findByIdAndUpdate(req.params._id, update, async (err, imageDeleted) => {
        if (err)
            return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!imageDeleted)
            return res.status(404).send({ message: 'Key Not Found' });
        await cloudinary_1.v2.uploader.destroy(imageDeleted.image.find((x) => x.idN === id).publicId);
        return res.status(200).send({ data: imageDeleted });
    });
}
exports.deleteImage = deleteImage;
