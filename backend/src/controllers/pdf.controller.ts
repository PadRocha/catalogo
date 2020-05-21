/*------------------------------------------------------------------*/
// Controlador de pdf.js
/*------------------------------------------------------------------*/

import { Request, Response } from 'express';
import { MongooseFilterQuery } from 'mongoose';
import path from 'path';
import pdfkit from 'pdfkit';
import fetch from 'node-fetch';
import { v2 } from 'cloudinary'

import Line, { ILine } from '../models/line';
import Key, { IKey } from '../models/key';

export async function createPdf(req: Request, res: Response) {
    const doc = new pdfkit();
    const filename = 'catalogo.pdf';
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');
    doc.fontSize(8);
    // doc.image(path.join(__dirname, '../assets/pdf-header.png'), 24, 24, { width: 564 });
    let img: Buffer | string, header = path.join(__dirname, '../../assets/pdf-header.png'), imgDefault = path.join(__dirname, '../../assets/pdf-default.jpg'),
        spaceX = (doc.page.width - 48) / 5, spaceY = 130.3, xl = 24, yl = 84, pagination: any = 0;
    const lines = await Line.find().sort('identifier');
    await Promise.all(lines.map(async line => {
        const query: MongooseFilterQuery<ILine> = { 'line': line.identifier };
        let keys: Array<IKey> = await Key.find(query).sort('code');
        keys = await Promise.all(keys.map(async (key: IKey) => {
            const index = key.image.sort((a, b) => a.idN - b.idN).findIndex(k => k.img != null);
            try {
                if (index != -1) img = await fetch(
                    v2.url(<string>key.image[index].publicId, { width: 113, crop: "scale" }),
                    { method: 'GET' }
                ).then(res => res.buffer());
                else throw new Error('No image Found');
            } catch (e) {
                img = imgDefault;
            } finally {
                return <IKey>{
                    _id: key._id,
                    code: key.code,
                    line: key.line,
                    desc: key.desc,
                    img
                };
            }
        }));
        return {
            identifier: line.identifier,
            name: line.name,
            started: line.started,
            keys
        };
    })).then(async lines => {
        for (const line of lines) {
            let xi = 0, yi = 0;
            doc.on('pageAdded', () => {
                ++pagination;
                doc.save();
                let name = 'Línea: ' + line.name;
                doc.image(header, 24, 24, { width: doc.page.width - 48 });
                doc.fontSize(10);
                doc.rect(doc.page.width - 53 - doc.widthOfString(name), 40, doc.widthOfString(name) + 10, 20)
                    .fill('#000000')
                    .fillColor('white')
                    .text(line.name, doc.page.width - 48 - doc.widthOfString(name), 45, { width: doc.widthOfString(name) });
                doc.restore()
                    .fontSize(8);
                doc.moveTo(24, doc.page.height - 24)
                    .lineTo(doc.page.width - 24, doc.page.height - 24)
                    .rect(24, doc.page.height - 33, 10, 9)
                    .stroke()
                    .text(pagination, 24, doc.page.height - 31, { width: doc.widthOfString(pagination) });
            });
            doc.addPage();
            line.keys.forEach(key => {
                if (yi == 5) {
                    yi = 0;
                    doc.addPage();
                }
                doc.image(key.img, xl + (spaceX * xi), yl + (spaceY * yi), { fit: [112.8, 79.66] })
                    .rect(xl + (spaceX * xi), yl + (spaceY * yi), 112.8, 79.66)
                    .stroke();
                doc.text(key.line + key.code, xl + (spaceX * xi), yl + (spaceY * yi) + 83.66, { width: 112.8, height: 12.66, align: 'center' })
                    .rect(xl + (spaceX * xi), yl + (spaceY * yi) + 79.66, 112.8, 12.66)
                    .stroke();
                doc.text(key.desc, xl + (spaceX * xi), yl + (spaceY * yi) + 98.32, { width: 112.8, height: 37.98, align: 'center' })
                    .rect(xl + (spaceX * xi), yl + (spaceY * yi) + 92.32, 112.8, 37.98)
                    .stroke();
                if (++xi == 5) {
                    xi = 0;
                    yi++;
                }
            });
        }
    });
    // console.log(doc.page.height);
    doc.end();
    doc.pipe(<any>res);
}

export async function personalizePdf(req: Request, res: Response) {

}

export async function pdfData(req: Request, res: Response) {
    const lines = await Line.find().sort('identifier');
    if (!lines) return res.status(404).send({ message: 'Document not found' });
    return res.status(200).send(await Promise.all(lines.map(async line => {
        const query: MongooseFilterQuery<ILine> = { 'line': line.identifier };
        let keys = await Key.find(query).sort('code');
        keys = await Promise.all(keys.map(async (key: IKey) => {
            const img = key.image.sort((a, b) => a.idN - b.idN).find(k => k.img != null);
            return <IKey>{
                _id: key._id,
                code: key.code,
                line: key.line,
                desc: key.desc,
                img
            };
        }));
        return {
            identifier: line.identifier,
            name: line.name,
            started: line.started,
            keys
        };
    })));
}
export async function personalizePdfData(req: Request, res: Response) {
    let query: MongooseFilterQuery<ILine> = {};
    if (req.body.containsIdentifiers && req.body.containsIdentifiers.length) query.identifier = {
        $in: req.body.containsIdentifiers
    }
    if (req.body.filterIdentifiers && req.body.filterIdentifiers.length) query.identifier = {
        $nin: req.body.filterIdentifiers
    }
    const lines = await Line.find(query).sort('identifier');
    return res.status(200).send(lines);
}