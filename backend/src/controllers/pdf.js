'use strict'

/*------------------------------------------------------------------*/
// Controlador de pdf.js
/*------------------------------------------------------------------*/

const Line = require('../models/line'); //* Calls line.js model
const Key = require('../models/key'); //* Calls key.js model

const path = require('path'); //* Calls path
const pdfkit = require('pdfkit'); //* Calls pdfkit
const fs = require('fs-extra'); //* Calls fs-extra
const request = require('request').defaults({ encoding: null }); //* Calls request
const async = require('async'); //* Calls async

const doRequest = (url) => new Promise((resolve, reject) => request(url, (error, res, body) => !error && res.statusCode == 200 ? resolve(body) : reject(error)));

const pdfController = {
    async createPdf(req, res) {
        const doc = new pdfkit();
        const filename = 'catalogo.pdf';
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.fontSize(8);
        doc.image(path.join(__dirname, '../assets/pdf-header.png'), 24, 24, { width: 564 });
        let img, xl = 24, yl = 84, spaceX = 130.3, spaceY = 112.8;
        let lines = {};
        Line.find({}).sort('_id').exec(async (err, line) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!line) return res.status(404).send({ message: 'Line Not Found' });
            // Key.find({ 'line': line[2].id }).sort('code').exec(async (err, key) => {
            //     let index = key[2].image.findIndex(k => k.img != null);
            //     try {
            //         if (index != -1) img = await doRequest(key[2].image[index].img);
            //         else throw new Error('No image Found');
            //     } catch (error) {
            //         img = path.join(__dirname, '../assets/pdf-default.jpg');
            //     } finally {
            //         doc.image(img, xl, yl + (spaceX * 0), { fit: [112.8, 79.66] })
            //             .rect(xl, yl + (spaceX * 0), 112.8, 79.66)
            //             .stroke();
            //         doc.text(key[2].line + key[2].code, xl, yl + (spaceX * 0) + 83.66, { width: 112.8, height: 12.66, align: 'center' })
            //             .rect(xl, yl + (spaceX * 0) + 79.66, 112.8, 12.66)
            //             .stroke();
            //         doc.text(key[2].desc, xl, yl + (spaceX * 0) + 98.32, { width: 112.8, height: 37.98, align: 'center' })
            //             .rect(xl, yl + (spaceX * 0) + 92.32, 112.8, 37.98)
            //             .stroke();
            //     }
            // });
            line.shift()
            async.forEachOf(line, (l, key, callback) => {
                Key.find({ 'line': l._id }).sort('code').exec(async (err, k) => {
                    if (err) return callback(err);
                    try {
                        lines[l._id] = k;
                    } catch (e) {
                        return callback(e);
                    }
                    callback();
                });
            }, async err => {
                if (err) console.error(err.message);
                async.forEachOf(lines, (l, k) => {
                    console.log(l, k);

                })
                // for (const l in lines) {
                //     let xR = 0, yR = 0;
                //     async.map(lines[l], async (key) => {
                //         let index = key.image.findIndex(k => k.img != null);
                //         try {
                //             if (index != -1) img = await doRequest(key.image[index].img);
                //             else throw new Error('No image Found');
                //         } catch (error) {
                //             img = path.join(__dirname, '../assets/pdf-default.jpg');
                //         } finally {
                //             return img;
                //         }
                //     }, (err, results) => {
                //         results.forEach((key, i) => {
                //             key.forEach(img => {
                //                 console.log("img", img)
                //                 // doc.image(img, xl, yl + (spaceX * i), { fit: [112.8, 79.66] })
                //                 //     .rect(xl, yl + (spaceX * i), 112.8, 79.66)
                //                 //     .stroke();
                //             });
                //             // doc.addPage();
                //         });
                //     });
                // }
                doc.end();
                doc.pipe(res);
            });
        });
    },
    personalizePdf(req, res) {
        //
    }//,
};

/*------------------------------------------------------------------*/

module.exports = pdfController;