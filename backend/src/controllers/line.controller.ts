/*------------------------------------------------------------------*/
// Controlador de line.js
/*------------------------------------------------------------------*/

import { Request, Response } from 'express';
import { PaginateOptions, MongooseFilterQuery } from 'mongoose';
import { v2 } from 'cloudinary';

import Line, { ILine } from '../models/line';
import Key, { IKey } from '../models/key';

import config from '../config/config';

const limit = config.limit.LINE;

v2.config({
    cloud_name: config.CDB.C_NAME,
    api_key: config.CDB.C_KEY,
    api_secret: config.CDB.C_SECRET
});

const totalKey = (line: ILine) => new Promise<ILine>((resolve) => Key.countDocuments({ 'line': line.identifier }, async (err, countKeys) => resolve(<ILine>{
    identifier: line.identifier,
    name: line.name,
    started: line.started,
    countKeys
})));

export async function saveLine(req: Request, res: Response) {
    if (!req.body) return res.status(400).send({ message: 'Client has not sent params' });
    const newLine = new Line(req.body);
    newLine.save((err, lineStored) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!lineStored) return res.status(204).send({ message: 'Saved and is not returning any content' });
        return res.status(200).send({ data: lineStored });
    });
}

export function listLine(req: Request, res: Response) {
    Line.find().sort('identifier').exec((err, line) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: line });
    });
}

export function listLineTotalKey(req: Request, res: Response) {
    Line.find().sort('identifier').exec(async (err, line) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        const data = await Promise.all(line.map(l => totalKey(l)))
        return res.status(200).send({ data });
    });
}

export function listLinePage(req: Request, res: Response) {
    const page = Number(req.params.page);
    if (page < 1) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {};
    const options: PaginateOptions = { page, limit, sort: 'identifier' };
    Line.paginate(query, options, (err, line) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: line });
    });
}

export function listLineTotalKeyPage(req: Request, res: Response) {
    const page = Number(req.params.page);
    if (page < 1) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {};
    const options: PaginateOptions = { page, limit, sort: 'identifier' };
    Line.paginate(query, options, async (err, line) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        const data = line;
        data.docs = await Promise.all(line.docs.map(l => totalKey(l)));
        return res.status(200).send({ data })
    });
}

export function listLineRegex(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {
        'identifier': {
            $regex: `^${req.params.id}`,
            $options: 'i'
        }
    };
    Line.find(query).sort('identifier').exec((err, line) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: line });
    });
}

export function listLineTotalKeyRegex(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {
        'identifier': {
            $regex: `^${req.params.id}`,
            $options: 'i'
        }
    };
    Line.find(query).sort('identifier').exec(async (err, line) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        const data = await Promise.all(line.map(l => totalKey(l)))
        return res.status(200).send({ data });
    });
}

export function listLineRegexPage(req: Request, res: Response) {
    const page = Number(req.params.page);
    if (!req.params.id || page < 1) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {
        'identifier': {
            $regex: `^${req.params.id}`,
            $options: 'i'
        }
    };
    const options: PaginateOptions = { page, limit, sort: 'identifier' };
    Line.paginate(query, options, (err, line) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: line });
    });
}

export function listLineTotalKeyRegexPage(req: Request, res: Response) {
    const page = Number(req.params.page);
    if (!req.params.id || page < 1) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {
        'identifier': {
            $regex: `^${req.params.id}`,
            $options: 'i'
        }
    };
    const options: PaginateOptions = { page, limit, sort: 'identifier' };
    Line.paginate(query, options, async (err, line) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        const data = line;
        data.docs = await Promise.all(line.docs.map(l => totalKey(l)))
        return res.status(200).send({ data });
    });
}

export function getLine(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    Line.findOne({ 'identifier': req.params.id }).exec((err, line) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: line });
    });
}

export function updateLine(req: Request, res: Response) {
    if (!req.params.id || !req.body) return res.status(400).send({ message: 'Client has not sent params' });
    Line.findOneAndUpdate({ 'identifier': req.params.id }, req.body, { new: true }, async (err, lineUpdated) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!lineUpdated) return res.status(404).send({ message: 'Document not found' });
        if (req.params.id !== lineUpdated.id) await Key.updateMany({ 'line': req.params.id }, { 'line': lineUpdated.identifier }).exec(err => {
            if (err) return res.status(409).send({ message: 'Batch update process has failed' });
        });
        return res.status(200).send({ data: lineUpdated });
    });
}

export function deleteLine(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = { 'identifier': req.params.id };
    Line.findOneAndDelete(query, async (err, lineDeleted) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!lineDeleted) return res.status(404).send({ message: 'Document not found' });
        const query: MongooseFilterQuery<IKey> = { 'line': lineDeleted.identifier };
        const keys = await Key.find(query).select('image -_id');
        if (keys) await Key.deleteMany(query).exec(async err => {
            if (err) return res.status(409).send({ message: 'Batch removal process has failed' });
            await Promise.all(keys.map(async k => await Promise.all(k.image.map(async i => i.publicId && await v2.uploader.destroy(i.publicId)))));
        });
        return res.status(200).send({ data: lineDeleted });
    });
}

export function forceUpdateLine(req: Request, res: Response) {
    if (!req.params.id || !req.body) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = { 'identifier': req.params.id };
    Line.findOneAndUpdate(query, req.body, (err, lineUpdated) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!lineUpdated) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: lineUpdated });
    });
}

export function forceDeleteLine(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = { 'identifier': req.params.id };
    Line.findOneAndDelete(query, (err, lineDeleted) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!lineDeleted) return res.status(404).send({ message: 'Document not found' });
        return res.status(200).send({ data: lineDeleted });
    });
}