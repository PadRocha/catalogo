'use strict'

/*------------------------------------------------------------------*/
// Controlador de key.js
/*------------------------------------------------------------------*/

const Key = require('../models/key'); //* Calls key.js model

const fs = require('fs-extra'); //* Calls fs-extra
const path = require('path'); //* Calls path
const cloudinary = require('cloudinary'); //* Calls cloudinary

cloudinary.config({
    cloud_name: process.env.C_NAME,
    api_key: process.env.C_KEY,
    api_secret: process.env.C_SECRET
});

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
        Key.find({}).populate({ path: 'line', select: '_id' }).exec((err, key) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!key) return res.status(404).send({ error: 'Key Not Found' });
            return res.status(200).send({ data: key });
        });
    },
    getKey(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Key.findById(req.params.id).populate('line').exec((err, key) => {
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
    saveStatus(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body && !req.body.id && !req.body.status) return res.status(400).send({ error: 'Bad Request' });
        Key.findOneAndUpdate({ '_id': req.params.id }, { $push: { 'image': { 'id': req.body.id, 'status': req.body.status } } }, (err, statusStored) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!statusStored) return res.status(404).send({ error: 'Key Not Found' });
            return res.status(200).send({ data: statusStored });
        });
    },
    updateStatus(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body && !req.body.id && !req.body.status) return res.status(400).send({ error: 'Bad Request' });
        Key.findOneAndUpdate({ '_id': req.params.id, 'image.id': req.body.id }, { $set: { 'image.$.status': req.body.status } }, (err, statusUpdated) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!statusUpdated) return res.status(404).send({ error: 'Key Not Found' });
            return res.status(200).send({ data: statusUpdated });
        });
    },
    deleteStatus(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body && !req.body.id) return res.status(400).send({ error: 'Bad Request' });
        Key.findOneAndUpdate({ '_id': req.params.id }, { $pull: { 'image': { 'id': req.body.id, 'status': { $gte: 0, $lte: 4 } } } },
            (err, statusDeleted) => {
                if (err) return res.status(500).send({ error: 'Internal Server Error' });
                if (!statusDeleted) return res.status(404).send({ error: 'Key Not Found' });
                try {
                    const deleted = statusDeleted.image.find(x => x.id === req.body.id).status;
                    if (deleted == 5) return res.status(404).send({ error: 'Key -> image Not Found' });
                } catch (error) {
                    return res.status(404).send({ error: 'Key -> image Not Found' });
                }
                return res.status(200).send({ data: statusDeleted });
            });
    },
    getImage(req, res) {
        const image = req.params.image,
            pathFile = './uploads/' + image;
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
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body && !req.body.id && !req.file) return res.status(400).send({ error: 'Bad Request' });
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        Key.findOneAndUpdate({ '_id': req.params.id, 'image.id': req.body.id, 'image.status': 5 },
            { $set: { 'image.$.img': result.url, 'image.$.public': result.public_id } },
            async (err, imageStored) => {
                if (err || !imageStored) await cloudinary.v2.uploader.destroy(result.public_id);
                if (err) return res.status(500).send({ error: 'Internal Server Error' });
                if (!imageStored) return res.status(404).send({ error: 'Key Not Found' });
                await fs.unlink(req.file.path)
                return res.status(200).send({ data: imageStored });
            });
    },
    async updateImage(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body && !req.body.id && !req.file) return res.status(400).send({ error: 'Bad Request' });
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        Key.findOneAndUpdate({ '_id': req.params.id, 'image.id': req.body.id, 'image.status': 5 },
            { $set: { 'image.$.img': result.url, 'image.$.public': result.public_id } },
            async (err, imageUpdated) => {
                if (err || !imageUpdated) await cloudinary.v2.uploader.destroy(result.public_id);
                if (err) return res.status(500).send({ error: 'Internal Server Error' });
                if (!imageUpdated) return res.status(404).send({ error: 'Key Not Found' });
                await cloudinary.v2.uploader.destroy(imageUpdated.image.find(x => x.id === req.body.id).public);
                await fs.unlink(req.file.path)
                return res.status(200).send({ data: imageUpdated });
            });
    },
    deleteImage(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body && !req.body.id) return res.status(400).send({ error: 'Bad Request' });
        Key.findOneAndUpdate({ '_id': req.params.id, 'image.id': req.body.id, 'image.status': 5 },
            { $set: { 'image.$.img': null, 'image.$.public': null } },
            async (err, imageDeleted) => {
                if (err) return res.status(500).send({ error: 'Internal Server Error' });
                if (!imageDeleted) return res.status(404).send({ error: 'Key Not Found' });
                await cloudinary.v2.uploader.destroy(imageDeleted.image.find(x => x.id === req.body.id).public);
                return res.status(200).send({ data: imageDeleted });
            });
    },
    deleteKey(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Key.findByIdAndDelete(req.params.id, (err, keyDeleted) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!keyDeleted) return res.status(404).send({ error: 'Key Not Found' });
            return res.status(200).send({ data: keyDeleted });
        });
    },
};

/*------------------------------------------------------------------*/

module.exports = keyController;