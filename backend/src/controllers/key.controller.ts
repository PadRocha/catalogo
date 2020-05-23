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

const limit = config.LIMIT.KEY;

v2.config({
    cloud_name: config.CDB.C_NAME,
    api_key: config.CDB.C_KEY,
    api_secret: config.CDB.C_SECRET
});

function infoStatus(query: MongooseFilterQuery<IKey>) {
    const status = { white: 0, gray: 0, brown: 0, blue: 0, purple: 0, green: 0 };
    var percentage = 0;
    return new Promise<Array<object | number>>(resolve => Key.find(query).exec((err: Error, key: Array<IKey>) => {
        key.forEach(k => {
            k.image.forEach(i => {
                switch (i.status) {
                    case 0: ++status.white; break;
                    case 1: ++status.gray; break;
                    case 2: ++status.brown; break;
                    case 3: ++status.blue; break;
                    case 4: ++status.purple; break;
                    case 5: ++status.green; break;
                }
            });
            for (let i of k.image) if (5 === i.status) { ++percentage; break; }
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
    const status = Number(req.body.status);
    if (status > 4) return res.status(400).send({ message: 'Client has not sent params' });
    const newKey = new Key(req.body);
    for (let idN = 0; idN < 4; idN++) newKey.image.push(<IImage>{ idN, status });
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
    const page = Number(req.params.page);
    if (page < 1) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<IKey> = {};
    const options: PaginateOptions = { page, limit, sort: { 'line': 1, 'code': 1 } };
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
    const id = req.params.id;
    if (!id) return res.status(400).send({ message: 'Client has not sent params' });
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
    const id = req.params.id;
    const page = Number(req.params.page);
    if (!id || page < 1) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<IKey> = id.length < 7
        ? { 'line': { $regex: `^${id}`, $options: 'i' } }
        : { 'line': id.slice(0, 6), 'code': { $regex: `^${id.slice(6)}`, $options: 'i' } };
    const options: PaginateOptions = { page, limit, sort: { 'line': 1, 'code': 1 } };
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
    const page = Number(req.params.page);
    if (!req.params.line || page < 1) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<IKey> = { 'line': req.params.line };
    const options: PaginateOptions = { page, limit, sort: 'code' };
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
    const idN = Number(req.body.idN);
    const status = Number(req.body.status);
    if (!req.params.id || idN > 4 || status > 4) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<IKey> = {
        '_id': req.params.id,
        'image.idN': { $ne: idN }
    };
    const update: UpdateQuery<IKey> = {
        $push: {
            'image': {
                idN,
                status,
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
    const idN = Number(req.body.idN);
    const status = Number(req.body.status);
    if (!req.params.id || idN > 4 || status > 4) return res.status(400).send({ message: 'Client has not sent params' });
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
    const idN: any = Number(req.params.idN);
    if (!req.params.id || idN > 4) return res.status(400).send({ message: 'Client has not sent params' });
    const update: UpdateQuery<IKey> = {
        $pull: {
            'image': { idN, 'status': { $gte: 0, $lte: 4 } }
        }
    };
    Key.findByIdAndUpdate(req.params.id, update, (err, statusDeleted: any) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!statusDeleted) return res.status(404).send({ message: 'Document not found' });
        try {
            const deleted = statusDeleted.image.find((x: IImage) => x.idN === idN).status;
            if (deleted == 5) return res.status(404).send({ message: 'Key -> image Not Found' });
        } catch {
            return res.status(404).send({ message: 'Key -> image Not Found' });
        }
        return res.status(200).send({ data: statusDeleted });
    });
}

export async function saveImage(req: Request, res: Response) {
    const idN = Number(req.body.idN);
    if (!req.params.id || idN > 4 || !req.file) return res.status(400).send({ message: 'Client has not sent params' });
    const result = await v2.uploader.upload(req.file.path, { folder: 'products' });
    //TODO: Check  'image.status': { $ne: null }, 
    const query: MongooseFilterQuery<IKey> = {
        '_id': req.params.id,
        'image.idN': idN
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
    const idN = Number(req.body.idN);
    if (!req.params.id || idN > 4 || !req.file) return res.status(400).send({ message: 'Client has not sent params' });
    const result = await v2.uploader.upload(req.file.path, { folder: 'products' });
    const query: MongooseFilterQuery<IKey> = {
        '_id': req.params.id,
        'image.idN': idN,
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
    console.log("updateImage -> idN", idN)
    Key.findOneAndUpdate(query, update, async (err, imageUpdated: any) => {
        if (err || !imageUpdated) {
            await v2.uploader.destroy(result.public_id);
            await fs.unlink(req.file.path)
        }
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!imageUpdated) return res.status(404).send({ message: 'Document not found' });
        await v2.uploader.destroy(imageUpdated.image.find((x: IImage) => x.idN === idN).publicId);
        await fs.unlink(req.file.path);
        return res.status(200).send({ data: imageUpdated });
    });
}

export function deleteImage(req: Request, res: Response) {
    const idN = Number(req.params.idN);
    if (!req.params.id || idN > 4) return res.status(400).send({ message: 'Client has not sent params' });
    const update: UpdateQuery<IKey> = {
        $pull: {
            'image': { idN, 'status': 5 }
        }
    };
    Key.findByIdAndUpdate(req.params.id, update, async (err, imageDeleted: any) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!imageDeleted) return res.status(404).send({ message: 'Document not found' });
        await v2.uploader.destroy(imageDeleted.image.find((x: IImage) => x.idN === idN).publicId);
        return res.status(200).send({ data: imageDeleted });
    });
}
export async function resetKeyStatus(req: Request, res: Response) {
    const status = Number(req.body.status);
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    const image = new Array<IImage>();
    if (status < 5) for (let idN = 1; idN < 4; idN++) image.push(<IImage>{ idN, status });
    const update: UpdateQuery<IKey> = { $set: { image } };
    Key.findByIdAndUpdate(req.params.id, update, async (err, key) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!key) return res.status(404).send({ message: 'Document not found' });
        await Promise.all(key.image.filter(i => i.publicId).map(async i => await v2.uploader.destroy(<string>i.publicId)));
        return res.status(200).send({ data: key });
    })
}