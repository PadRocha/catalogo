/*------------------------------------------------------------------*/
// Controlador de line.js
/*------------------------------------------------------------------*/

import { Request, Response } from 'express';
import { PaginateOptions, MongooseFilterQuery, MongooseUpdateQuery } from 'mongoose';
import { v2 } from 'cloudinary';

import Line, { ILine } from '../models/line';
import Key, { IKey } from '../models/key';

import config from '../config/config';

const perPage = 20;

v2.config({
    cloud_name: config.CDB.C_NAME,
    api_key: config.CDB.C_KEY,
    api_secret: config.CDB.C_SECRET
});

// cloudinary.v2.cloudinary_js_config
const totalKey = (line: ILine) => new Promise<ILine>((resolve) => Key.countDocuments({ 'line': line._id }, async (err, countKeys: number) => resolve(<ILine>{
    _id: line._id,
    name: line.name,
    started: line.started,
    countKeys
})));

export function saveLine(req: Request, res: Response) {
    if (!req.body) return res.status(400).send({ message: 'Client has not sent params' });
    const newLine = new Line({
        _id: req.body._id,
        name: req.body.name
    });
    newLine.save((err, lineStored) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!lineStored) return res.status(204).send({ message: 'Line No Content' });
        return res.status(200).send({ data: lineStored });
    });
}

export function listLine(req: Request, res: Response) {
    const query: MongooseFilterQuery<ILine> = {};
    Line.find(query).sort('_id').exec((err, line) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}

export function listLineTotalKey(req: Request, res: Response) {
    const query: MongooseFilterQuery<ILine> = {};
    Line.find(query).sort('_id').exec(async (err, line) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Line Not Found' });
        const data = await Promise.all(line.map(l => totalKey(l)))
        return res.status(200).send({ data });
    });
}

export function listLinePage(req: Request, res: Response) {
    if (!req.params.page) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {};
    const options: PaginateOptions = {
        page: Number(req.params.page),
        limit: perPage,
        sort: '_id'
    };
    Line.paginate(query, options, (err, line) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}

export function listLineTotalKeyPage(req: Request, res: Response) {
    if (!req.params.page) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {};
    const options: PaginateOptions = {
        page: Number(req.params.page),
        limit: perPage,
        sort: '_id'
    };
    Line.paginate(query, options, async (err, line) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Line Not Found' });
        const data = line;
        data.docs = await Promise.all(line.docs.map(l => totalKey(l)));
        return res.status(200).send({ data })
    });
}

export function listLineRegex(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {
        '_id': {
            $regex: '^' + req.params.id,
            $options: 'i'
        }
    };
    Line.find(query).sort('_id').exec((err, line) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}

export function listLineTotalKeyRegex(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {
        '_id': {
            $regex: '^' + req.params.id,
            $options: 'i'
        }
    };
    Line.find(query).sort('_id').exec(async (err, line) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Line Not Found' });
        const data = await Promise.all(line.map(l => totalKey(l)))
        return res.status(200).send({ data });
    });
}

export function listLineRegexPage(req: Request, res: Response) {
    if (!req.params.id || !req.params.page) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {
        '_id': {
            $regex: '^' + req.params.id,
            $options: 'i'
        }
    };
    const options: PaginateOptions = {
        page: Number(req.params.page),
        limit: perPage,
        sort: '_id'
    };
    Line.paginate(query, options, (err, line) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}

export function listLineTotalKeyRegexPage(req: Request, res: Response) {
    if (!req.params.id || !req.params.page) return res.status(400).send({ message: 'Client has not sent params' });
    const query: MongooseFilterQuery<ILine> = {
        '_id': {
            $regex: '^' + req.params.id,
            $options: 'i'
        }
    };
    const options: PaginateOptions = {
        page: Number(req.params.page),
        limit: perPage,
        sort: '_id'
    };
    Line.paginate(query, options, async (err, line) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Line Not Found' });
        const data = line;
        data.docs = await Promise.all(line.docs.map(l => totalKey(l)))
        return res.status(200).send({ data });
    });
}

export function getLine(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    Line.findById(req.params.id).exec((err, line) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!line) return res.status(404).send({ message: 'Line Not Found' });
        return res.status(200).send({ data: line });
    });
}

export function updateLine(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    if (!req.body) return res.status(400).send({ message: 'Client has not sent params' });
    const id = req.params.id
    if (req.body._id) {
        if (!req.body.name) return res.status(400).send({ message: 'Client has not sent params' });
        const newLine = new Line(req.body);
        // {_id: req.body._id,name: req.body.name}
        Line.findByIdAndDelete(id, (err, lineDeleted) => {
            if (err) return res.status(500).send({ message: 'Replace 1 Internal Server Error' });
            if (!lineDeleted) return res.status(404).send({ message: 'Line Not Found' });
            newLine.save((err, lineStored) => {
                if (err) return res.status(500).send({ message: 'Replace 2 Internal Server Error' });
                if (!lineStored) return res.status(204).send({ message: 'Line No Content' });
                if (lineDeleted._id !== lineStored._id) {
                    Key.updateMany({ 'line': lineDeleted._id }, { 'line': lineStored._id }).exec(err => {
                        if (err) return res.status(500).send({ message: 'Key Internal Server Error' });
                    });
                }
                return res.status(200).send({ data: lineDeleted });
            });
        });
    } else {
        Line.findByIdAndUpdate(id, req.body, (err, lineUpdated) => {
            if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
            if (!lineUpdated) return res.status(404).send({ message: 'Line Not Found' });
            return res.status(200).send({ data: lineUpdated });
        });
    }
}

export function deleteLine(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).send({ message: 'Client has not sent params' });
    Line.findByIdAndDelete(req.params.id, (err, lineDeleted) => {
        if (err) return res.status(406).send({ message: 'Internal error, probably error with params' });
        if (!lineDeleted) return res.status(404).send({ message: 'Line Not Found' });
        let keyImage = new Array<IKey>();
        Key.find({ 'line': lineDeleted._id }).select('image -_id').exec((err, lineDeleted) => {
            if (err) return res.status(500).send({ message: 'Key Internal Server Error' });
            if (lineDeleted) keyImage = lineDeleted;
        });
        Key.deleteMany({ 'line': lineDeleted._id }).exec(err => {
            if (err) return res.status(500).send({ message: 'Key delete Internal Server Error' });
            keyImage.forEach(e => {
                e.image.forEach(async f => {
                    if (f.publicId) await v2.uploader.destroy(f.publicId);
                });
            });
        });
        return res.status(200).send({ data: lineDeleted });
    });
}