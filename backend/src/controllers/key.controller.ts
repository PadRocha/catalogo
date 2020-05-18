/*------------------------------------------------------------------*/
// Controlador de key.js
/*------------------------------------------------------------------*/

import { Request, Response } from 'express';
import { PaginateOptions, MongooseFilterQuery, UpdateQuery } from 'mongoose';
import fs from 'fs-extra'
import { v2 } from 'cloudinary';

import Line, { ILine } from '../models/line';
import Key, { IKey, IImage } from '../models/key';

import config from '../config/config';

const perPage = 15;

v2.config({
    cloud_name: config.CDB.C_NAME,
    api_key: config.CDB.C_KEY,
    api_secret: config.CDB.C_SECRET
});

function infoStatus(query: MongooseFilterQuery<IKey>) {
    const status = { white: 0, gray: 0, brown: 0, blue: 0, purple: 0, green: 0 };
    var percentage = 0;
    return new Promise<Array<object | number>>(resolve => Key.find(query).exec((err: Error, key: Array<IKey>) => {
        key.forEach(d => {
            let image = d.image; image.forEach(i => {
                switch (i.status) {
                    case 0: ++status.white; break;
                    case 1: ++status.gray; break;
                    case 2: ++status.brown; break;
                    case 3: ++status.blue; break;
                    case 4: ++status.purple; break;
                    case 5: ++status.green; break;
                }
            });
            for (let i of image) if (5 === i.status) { ++percentage; break; }
        });
        resolve([status, 100 * percentage / key.length])
    }));
}

export function saveKey(req: Request, res: Response) {
    if (!req.body) return res.status(400).send({ message: 'Client has not sent params' });
    const newKey = new Key(req.body);
    const query: MongooseFilterQuery<ILine> = { 'identifier': newKey.line };
    Line.findOne(query).select('identifier').exec((err: Error, line: IKey) => {
        if (err) return res.status(500).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        newKey.save((err, keyStored) => {
            if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
            if (!keyStored) return res.status(204).send({ message: 'Saved and is not returning any content' });
            return res.status(200).send({ data: keyStored });
        });
    });
}

export function saveKeyStatus(req: Request, res: Response) {
    if (!req.body || !req.body.status || req.body.status > 4) return res.status(400).send({ message: 'Client has not sent params' });
    const newKey = new Key(req.body);
    for (let idN = 0; idN < 3; idN++) newKey.image.push(<IImage>{
        idN,
        status: req.body.status
    });
    const query: MongooseFilterQuery<ILine> = { 'identifier': newKey.line };
    Line.findOne(query).select('identifier').exec((err: Error, line: IKey) => {
        if (err) return res.status(500).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        newKey.save((err, keyStored) => {
            if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
            if (!keyStored) return res.status(204).send({ message: 'Saved and is not returning any content' });
            return res.status(200).send({ data: keyStored });
        });
    });
}

export function listKey(req: Request, res: Response) {
    Key.find().sort({ 'line': 1, 'code': 1 }).exec((err, key) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!key) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: key });
    });
}

export function listKeyPage(req: Request, res: Response) {
    if (!req.params.page) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<IKey> = {};
    const options: PaginateOptions = {
        page: Number(req.params.page),
        limit: perPage,
        sort: { 'line': 1, 'code': 1 }
    };
    Key.paginate(query, options, async (err, key) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!key) return res.status(404).send({ message: 'Document not found' });
        const [status, percentage] = await infoStatus(query);
        key.status = status;
        key.percentage = percentage;
        return res.status(200).send({ data: key });
    });
}

export function listKeyRegex(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    const id = req.params.id;
    let query: MongooseFilterQuery<IKey> = id.length < 7
        ? { 'line': { $regex: `^${id}`, $options: 'i' } }
        : { 'line': id.slice(0, 6), 'code': { $regex: `^${id.slice(6)}`, $options: 'i' } };
    Key.find(query).sort({ 'line': 1, 'code': 1 }).exec((err, key) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!key) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: key });
    });
}

export function listKeyRegexPage(req: Request, res: Response) {
    if (!req.params.id || !req.params.page) return res.status(400).send({ message: 'Client has not sent params' });
    const id = req.params.id;
    const query: MongooseFilterQuery<IKey> = id.length < 7
        ? { 'line': { $regex: `^${id}`, $options: 'i' } }
        : { 'line': id.slice(0, 6), 'code': { $regex: `^${id.slice(6)}`, $options: 'i' } };
    const options: PaginateOptions = {
        page: Number(req.params.page),
        limit: perPage,
        sort: { 'line': 1, 'code': 1 }
    };
    Key.paginate(query, options, async (err, key) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!key) return res.status(404).send({ message: 'Document not found' });
        const [status, percentage] = await infoStatus(query);
        key.status = status;
        key.percentage = percentage;
        return res.status(200).send({ data: key });
    });
}

export function listKeyLine(req: Request, res: Response) {
    if (!req.params.line) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<IKey> = { 'line': req.params.line };
    Key.find(query).sort('code').exec((err, key) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!key) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: key });
    });
}

export function listKeyLinePage(req: Request, res: Response) {
    if (!req.params.line || !req.params.page) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<IKey> = { 'line': req.params.line };
    const options: PaginateOptions = {
        page: Number(req.params.page),
        limit: perPage,
        sort: 'code'
    };
    Key.paginate(query, options, async (err, key) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!key) return res.status(404).send({ message: 'Document not found' });
        const [status, percentage] = await infoStatus(query);
        key.status = status;
        key.percentage = percentage;
        return res.status(200).send({ data: key });
    });
}

export function getKey(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    Key.findById(req.params.id).exec((err, key) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!key) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: key });
    });
}

export function updateKey(req: Request, res: Response) {
    if (!req.params.id || !req.body) return res.status(400).send({ message: 'Client has not sent params' });
    Key.findByIdAndUpdate(req.params.id, req.body, (err, keyUpdated) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!keyUpdated) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: keyUpdated });
    });
}

export function deleteKey(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    Key.findByIdAndDelete(req.params.id, async (err, keyDeleted) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!keyDeleted) return res.status(404).send({ message: 'Document not found' });
        await Promise.all(keyDeleted.image.map(async i => i.publicId && await v2.uploader.destroy(<string>i.publicId)));
        return res.status(200).send({ data: keyDeleted });
    });
}

export function saveStatus(req: Request, res: Response) {
    if (
        !req.params.id ||
        !req.body ||
        isNaN(req.body.idN) ||
        isNaN(req.body.status)
    ) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<IKey> = {
        '_id': req.params.id,
        'image.idN': { $ne: req.body.idN }
    };
    const update: UpdateQuery<IKey> = {
        $push: {
            'image': {
                'idN': req.body.idN,
                'status': req.body.status,
                'publicId': null,
                'img': null
            }
        }
    };
    Key.findOneAndUpdate(query, update, (err, statusStored) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!statusStored) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: statusStored });
    });
}

export function updateStatus(req: Request, res: Response) {
    if (
        !req.params.id ||
        !req.body ||
        isNaN(req.body.idN) ||
        isNaN(req.body.status)
    ) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<IKey> = {
        '_id': req.params.id,
        'image.idN': req.body.idN
    };
    const update: UpdateQuery<IKey> = { $set: { 'image.$.status': req.body.status } };
    Key.findOneAndUpdate(query, update, (err, statusUpdated) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (statusUpdated) return res.status(200).send({ data: statusUpdated });
        else saveStatus(req, res);
    });
}

export function deleteStatus(req: Request, res: Response) {
    if (!req.params.id || !req.params.idN) return res.status(400).send({ message: 'Client has not sent params' });
    const id: any = Number(req.params.idN);
    const update: UpdateQuery<IKey> = {
        $pull: {
            'image': {
                'idN': id,
                'status': { $gte: 0, $lte: 4 }
            }
        }
    };
    Key.findByIdAndUpdate(req.params.id, update, (err, statusDeleted: any) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!statusDeleted) return res.status(404).send({ message: 'Document not found' });
        try {
            const deleted = statusDeleted.image.find((x: IImage) => x.idN === id).status;
            if (deleted == 5) return res.status(404).send({ message: 'Key -> image Not Found' });
        } catch {
            return res.status(404).send({ message: 'Key -> image Not Found' });
        }
        return res.status(200).send({ data: statusDeleted });
    });
}

export async function saveImage(req: Request, res: Response) {
    if (
        !req.params.id ||
        !req.body ||
        isNaN(req.body.idN) ||
        !req.file
    ) return res.status(400).send({ message: 'Client has not sent params' });
    const result = await v2.uploader.upload(req.file.path, { folder: 'products' });
    //TODO: Check  'image.status': { $ne: null }, 
    const query: MongooseFilterQuery<IKey> = {
        '_id': req.params.id,
        'image.idN': req.body.idN
    };
    const update: UpdateQuery<IKey> = {
        $set: {
            'image.$.status': 5,
            'image.$.img': result.url,
            'image.$.publicId': result.public_id
        }
    };
    Key.findOneAndUpdate(query, update, { new: true }, async (err, imageStored) => {
        if (err || !imageStored) {
            await v2.uploader.destroy(result.public_id);
            await fs.unlink(req.file.path)
        }
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!imageStored) return res.status(404).send({ message: 'Document not found' });
        await fs.unlink(req.file.path);
        return res.status(200).send({ data: imageStored });
    });
}

export async function updateImage(req: Request, res: Response) {
    if (
        !req.params.id ||
        !req.body ||
        isNaN(req.body.idN) ||
        !req.file
    ) return res.status(400).send({ message: 'Client has not sent params' });
    const result = await v2.uploader.upload(req.file.path, { folder: 'products' });
    const query: MongooseFilterQuery<IKey> = {
        '_id': req.params.id,
        'image.idN': req.body.idN,
        'image.status': 5,
        'image.img': { $ne: null },
        'image.publicId': { $ne: null }
    };
    const update: UpdateQuery<IKey> = {
        $set: {
            'image.$.img': result.url,
            'image.$.publicId': result.public_id
        }
    };
    Key.findOneAndUpdate(query, update, async (err, imageUpdated: any) => {
        if (err || !imageUpdated) {
            await v2.uploader.destroy(result.public_id);
            await fs.unlink(req.file.path)
        }
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!imageUpdated) return res.status(404).send({ message: 'Document not found' });
        await v2.uploader.destroy(imageUpdated.image.find((x: IImage) => x.idN === req.body.idN).publicId);
        await fs.unlink(req.file.path);
        return res.status(200).send({ data: imageUpdated });
    });
}

export function deleteImage(req: Request, res: Response) {
    if (!req.params.id || !req.params.idN) return res.status(400).send({ message: 'Client has not sent params' });
    const id: any = Number(req.params.idN);
    const update: UpdateQuery<IKey> = {
        $pull: {
            'image': {
                'idN': id,
                'status': 5
            }
        }
    };
    Key.findByIdAndUpdate(req.params.id, update, async (err, imageDeleted: any) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!imageDeleted) return res.status(404).send({ message: 'Document not found' });
        await v2.uploader.destroy(imageDeleted.image.find((x: IImage) => x.idN === id).publicId);
        return res.status(200).send({ data: imageDeleted });
    });
}