'use strict'

/*------------------------------------------------------------------*/
// Controlador de pdf.js
/*------------------------------------------------------------------*/

const Line = require('../models/line'); //* Calls line.js model
const Key = require('../models/key'); //* Calls key.js model

const path = require('path'); //* Calls path
const pdfkit = require('pdfkit'); //* Calls pdfkit
const request = require('request').defaults({ encoding: null }); //* Calls request

const doRequest = (url) => new Promise((resolve, reject) => request(url, (error, res, body) => !error && res.statusCode == 200 ? resolve(body) : reject(error)));

const pdfController = {
    async createPdf(req, res) {
        const doc = new pdfkit();
        const filename = 'catalogo.pdf';
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.fontSize(8);
        // doc.image(path.join(__dirname, '../assets/pdf-header.png'), 24, 24, { width: 564 });
        let img, spaceX = (doc.page.width - 48) / 5, spaceY = 130.3, xl = 24, yl = 84;
        const lines = await Line.find({}).sort('_id');
        await Promise.all(lines.map(async line => {
            let keys = await Key.find({ 'line': line._id }).sort('code');
            keys = await Promise.all(keys.map(async key => {
                let index = key.image.findIndex(k => k.img != null);
                try {
                    if (index != -1) img = await doRequest(key.image[index].img);
                    else throw new Error('No image Found');
                } catch (error) {
                    img = path.join(__dirname, '../assets/pdf-default.jpg');
                } finally {
                    return {
                        _id: key._id,
                        code: key.code,
                        line: key.line,
                        desc: key.desc,
                        image: img
                    };
                }
            }));
            return {
                _id: line._id,
                name: line.name,
                started: line.started,
                keys
            };
        })).then(lines => {
            for (const line of lines) {
                let xi = 0, yi = 0, page = 0;
                doc.on('pageAdded', () => {
                    doc.save();
                    line.name = 'Línea: ' + line.name;
                    doc.image(path.join(__dirname, '../assets/pdf-header.png'), 24, 24, { width: doc.page.width - 48 });
                    doc.fontSize(10);
                    doc.rect(doc.page.width - 53 - doc.widthOfString(line.name), 40, doc.widthOfString(line.name) + 10, 20)
                        .fill('#000000')
                        .fillColor('white')
                        .text(line.name, doc.page.width - 48 - doc.widthOfString(line.name), 45, { width: doc.widthOfString(line.name) });
                    doc.fontSize(8);
                    // doc.text('01', 24, doc.page.height - 24);
                    doc.moveTo(24, doc.page.height - 24)
                        .lineTo(doc.page.width - 24, doc.page.height - 24)
                        .stroke();
                    doc.restore();
                });
                doc.addPage();
                line.keys.forEach((key) => {
                    if (yi == 5) {
                        yi = 0;
                        doc.addPage();
                    }
                    doc.image(key.image, xl + (spaceX * xi), yl + (spaceY * yi), { fit: [112.8, 79.66] })
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
        doc.pipe(res);
    },
    personalizePdf(req, res) {
        //
    }//,
};

/*------------------------------------------------------------------*/

module.exports = pdfController;