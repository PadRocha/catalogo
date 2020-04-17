'use strict'

/*------------------------------------------------------------------*/
// Controlador de key.js
/*------------------------------------------------------------------*/

const Key = require('../models/key'); //* Calls key.js model

const fs = require('fs-extra'); //* Calls fs-extra
const path = require('path'); //* Calls path
const cloudinary = require('cloudinary'); //* Calls cloudinary

const perPage = 15;

cloudinary.config({
    cloud_name: process.env.C_NAME,
    api_key: process.env.C_KEY,
    api_secret: process.env.C_SECRET
});

function infoStatus(query) {
    const status = { white: 0, gray: 0, brown: 0, blue: 0, purple: 0, green: 0 };
    var percentage = 0;
    return new Promise(resolve => Key.find(query).exec((err, key) => {
        key.forEach(d => {
            let image = d.image; image.forEach(i => {
                switch (i.status) {
                    case 0: ++status.white; break;
                    case 1: ++status.gray; break;
                    case 2: ++status.brown; break;
                    case 3: ++status.blue; break;
                    case 4: ++status.purple; break;
                    case 5: ++status.green
                }
            });
            for (let i of image) if (5 === i.status) { ++percentage; break }
        });
        resolve([status, 100 * percentage / key.length])
    }));
}

const keyController = {
    saveKey(req, res) {
        if (!req.body) return res.status(400).send({ message: 'Bad Request' });
        const newKey = new Key({
            code: req.body.code,
            line: req.body.line,
            desc: req.body.desc
        });
        const Line = require('../models/line'); //* Calls line.js model
        Line.findOne({ '_id': newKey.line }).select('_id').exec((err, line) => {
            if (err) return res.status(500).send({ message: 'Line Internal Server message' });
            if (!line) return res.status(404).send({ message: 'Line Not Found' });
            newKey.save((err, keyStored) => {
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (!keyStored) return res.status(204).send({ message: 'Key No Content' });
                return res.status(200).send({ data: keyStored });
            });
        });
    },
    saveKeyStatus(req, res) {
        if (!req.body && !req.body.status) return res.status(400).send({ message: 'Bad Request' });
        const newKey = new Key({
            code: req.body.code,
            line: req.body.line,
            desc: req.body.desc
        });
        for (let idN = 0; idN < 3; idN++) newKey.image.push({
            idN,
            status: req.body.status
        });
        const Line = require('../models/line'); //* Calls line.js model
        Line.findOne({ '_id': newKey.line }).select('_id').exec((err, line) => {
            if (err) return res.status(500).send({ message: 'Line Internal Server message' });
            if (!line) return res.status(404).send({ message: 'Line Not Found' });
            newKey.save((err, keyStored) => {
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (!keyStored) return res.status(204).send({ message: 'Key No Content' });
                return res.status(200).send({ data: keyStored });
            });
        });
    },
    listKey(req, res) {
        Key.find({}).sort({ 'line': 1, 'code': 1 }).exec((err, key) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!key) return res.status(404).send({ message: 'Key Not Found' });
            return res.status(200).send({ data: key });
        });
    },
    listKeyPage(req, res) {
        if (!req.params.page) return res.status(400).send({ message: 'Bad Request' });
        const pag = Number(req.params.page);
        const query = {};
        Key.paginate(query, { page: pag, limit: perPage, sort: { 'line': 1, 'code': 1 } }, async (err, key) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!key) return res.status(404).send({ message: 'Key Not Found' });
            const [status, percentage] = await infoStatus(query);
            key.status = status;
            key.percentage = percentage;
            return res.status(200).send({ data: key });
        });
    },
    listKeyRegex(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        const id = req.params.id;
        let findKey = id.length < 7
            ? Key.find({ 'line': { $regex: '^' + id, $options: 'i' } })
            : Key.find({ 'line': id.slice(0, 6), 'code': { $regex: '^' + id.slice(6), $options: 'i' } });
        findKey.sort({ 'line': 1, 'code': 1 }).exec((err, key) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!key) return res.status(404).send({ message: 'Key Not Found' });
            return res.status(200).send({ data: key });
        });
    },
    listKeyRegexPage(req, res) {
        if (!req.params.id && !req.params.page) return res.status(400).send({ message: 'Bad Request' });
        const id = req.params.id;
        const pag = Number(req.params.page);
        let query = id.length < 7
            ? { 'line': { $regex: '^' + id, $options: 'i' } }
            : { 'line': id.slice(0, 6), 'code': { $regex: '^' + id.slice(6), $options: 'i' } };
        Key.paginate(query, { page: pag, limit: perPage, sort: { 'line': 1, 'code': 1 } }, async (err, key) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!key) return res.status(404).send({ message: 'Key Not Found' });
            const [status, percentage] = await infoStatus(query);
            key.status = status;
            key.percentage = percentage;
            return res.status(200).send({ data: key });
        });
    },
    listKeyLine(req, res) {
        if (!req.params.line) return res.status(400).send({ message: 'Bad Request' });
        Key.find({ 'line': req.params.line }).sort('code').exec((err, key) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!key) return res.status(404).send({ message: 'Key Not Found' });
            return res.status(200).send({ data: key });
        });
    },
    listKeyLinePage(req, res) {
        if (!req.params.line && !req.params.page) return res.status(400).send({ message: 'Bad Request' });
        const pag = Number(req.params.page);
        const query = { 'line': req.params.line };
        Key.paginate(query, { page: pag, limit: perPage, sort: 'code' }, async (err, key) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!key) return res.status(404).send({ message: 'Key Not Found' });
            const [status, percentage] = await infoStatus(query);
            key.status = status;
            key.percentage = percentage;
            return res.status(200).send({ data: key });
        });
    },
    getKey(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        Key.findById(req.params.id).populate('line').exec((err, key) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!key) return res.status(404).send({ message: 'Key Not Found' });
            return res.status(200).send({ data: key });
        });
    },
    updateKey(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        if (!req.body) return res.status(400).send({ message: 'Bad Request' });
        Key.findOneAndUpdate(req.params.id, req.body, (err, keyUpdated) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!keyUpdated) return res.status(404).send({ message: 'Key Not Found' });
            return res.status(200).send({ data: keyUpdated });
        });
    },
    deleteKey(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        Key.findByIdAndDelete(req.params.id, (err, keyDeleted) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!keyDeleted) return res.status(404).send({ message: 'Key Not Found' });
            keyDeleted.image.forEach(async e => {
                await cloudinary.v2.uploader.destroy(e.publicId);
            });
            return res.status(200).send({ data: keyDeleted });
        });
    },
    saveStatus(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        if (!req.body && !req.body.idN && !req.body.status) return res.status(400).send({ message: 'Bad Request' });
        Key.findOneAndUpdate({ '_id': req.params.id, 'image.idN': { $ne: req.body.idN } },
            { $push: { 'image': { 'idN': req.body.idN, 'status': req.body.status } } }, (err, statusStored) => {
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (!statusStored) return res.status(404).send({ message: 'Key Not Found' });
                return res.status(200).send({ data: statusStored });
            });
    },
    updateStatus(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        if (!req.body && !req.body.idN && !req.body.status) return res.status(400).send({ message: 'Bad Request' });
        const id = Number(req.body.idN);
        Key.findOneAndUpdate({ '_id': req.params.id, 'image.idN': id },
            { $set: { 'image.$.status': req.body.status } }, (err, statusUpdated) => {
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (statusUpdated) return res.status(200).send({ data: statusUpdated });
                else {
                    Key.findOneAndUpdate({ '_id': req.params.id, 'image.idN': { $ne: id } },
                        { $push: { 'image': { 'idN': id, 'status': req.body.status } } }, (err, statusStored) => {
                            if (err) return res.status(500).send({ message: 'Internal Server message' });
                            if (!statusStored) return res.status(404).send({ message: 'Key Not Found' });
                            return res.status(200).send({ data: statusStored });
                        });
                }
            });
    },
    deleteStatus(req, res) {
        if (!req.params._id && !req.params.idN) return res.status(400).send({ message: 'Bad Request' });
        let id = Number(req.params.idN);
        Key.findOneAndUpdate({ '_id': req.params._id }, { $pull: { 'image': { 'idN': id, 'status': { $gte: 0, $lte: 4 } } } },
            (err, statusDeleted) => {
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (!statusDeleted) return res.status(404).send({ message: 'Key Not Found' });
                try {
                    const deleted = statusDeleted.image.find(x => x.idN === id).status;
                    if (deleted == 5) return res.status(404).send({ message: 'Key -> image Not Found' });
                } catch (message) {
                    return res.status(404).send({ message: 'Key -> image Not Found' });
                }
                return res.status(200).send({ data: statusDeleted });
            });
    },
    getImage(req, res) {
        const image = req.params.image;
        const pathFile = './uploads/' + image;
        fs.exists(pathFile, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen...'
                });
            }
        });
    },
    async saveImage(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        if (!req.body && !req.body.idN && !req.file) return res.status(400).send({ message: 'Bad Request' });
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        //?  'image.status': { $ne: null }, 
        const idN = Number(req.body.idN);
        Key.findOneAndUpdate({ '_id': req.params.id, 'image.idN': idN },
            { $set: { 'image.$.status': 5, 'image.$.img': result.url, 'image.$.publicId': result.public_id } }, { new: true },
            async (err, imageStored) => {
                if (err || !imageStored) {
                    await cloudinary.v2.uploader.destroy(result.public_id);
                    await fs.unlink(req.file.path)
                }
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (!imageStored) return res.status(404).send({ message: 'Key Not Found' });
                await fs.unlink(req.file.path);
                return res.status(200).send({ data: imageStored });
            });
    },
    async updateImage(req, res) {
        if (!req.params.id) return res.status(400).send({ message: 'Bad Request' });
        if (!req.body && !req.body.idN && !req.file) return res.status(400).send({ message: 'Bad Request' });
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const id = Number(req.body.idN);
        Key.findOneAndUpdate({ '_id': req.params.id, 'image.idN': id, 'image.status': 5, 'image.img': { $ne: null }, 'image.publicId': { $ne: null } },
            { $set: { 'image.$.img': result.url, 'image.$.publicId': result.public_id } },
            async (err, imageUpdated) => {
                if (err || !imageStored) {
                    await cloudinary.v2.uploader.destroy(result.public_id);
                    await fs.unlink(req.file.path)
                }
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (!imageUpdated) return res.status(404).send({ message: 'Key Not Found' });
                await cloudinary.v2.uploader.destroy(imageUpdated.image.find(x => x.idN === id).publicId);
                await fs.unlink(req.file.path);
                return res.status(200).send({ data: imageUpdated });
            });
    },
    deleteImage(req, res) {
        if (!req.params._id && !req.params.idN) return res.status(400).send({ message: 'Bad Request' });
        const id = Number(req.params.idN);
        Key.findOneAndUpdate({ '_id': req.params._id }, { $pull: { 'image': { 'idN': id, 'status': 5 } } },
            async (err, imageDeleted) => {
                if (err) return res.status(500).send({ message: 'Internal Server message' });
                if (!imageDeleted) return res.status(404).send({ message: 'Key Not Found' });
                await cloudinary.v2.uploader.destroy(imageDeleted.image.find(x => x.idN === id).publicId);
                return res.status(200).send({ data: imageDeleted });
            });
    }//,
};

/*------------------------------------------------------------------*/

module.exports = keyController;