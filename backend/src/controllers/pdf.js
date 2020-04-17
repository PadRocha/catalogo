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

const doRequest = (url) => new Promise((resolve, reject) => request(url, (error, res, body) => !error && res.statusCode == 200 ? resolve(body) : reject(error)));

const pdfController = {
    async createPdf(req, res) {
        const doc = new pdfkit();
        const filename = 'catalogo.pdf';
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.fontSize(8);
        doc.image(path.join(__dirname, '../assets/pdf-header.png'), 24, 24, { width: 564 });
        let content = 'bye';
        Key.find({}).sort({ 'line': 1, 'code': 1 }).exec(async (err, key) => {
            if (err) return res.status(500).send({ message: 'Internal Server message' });
            if (!key) return res.status(404).send({ message: 'Key Not Found' });
            let img = await doRequest('https://res.cloudinary.com/c-tr-co-productions/image/upload/v1586472176/k8gmsjvlruum6wirilhl.jpg');
            doc.image(img, 24, 112.8, { fit: [112.8, 79.66] })
                .rect(24, 112.8, 112.8, 79.66)
                .stroke();
            doc.image(img, 136.8, 112.8, { fit: [112.8, 79.66] })
                .rect(136.8, 112.8, 112.8, 79.66)
                .stroke();
            doc.image(img, 249.6, 112.8, { fit: [112.8, 79.66] })
                .rect(249.6, 112.8, 112.8, 79.66)
                .stroke();
            doc.image(img, 362.4, 112.8, { fit: [112.8, 79.66] })
                .rect(362.4, 112.8, 112.8, 79.66)
                .stroke();
            doc.image(img, 475.2, 112.8, { fit: [112.8, 79.66] })
                .rect(475.2, 112.8, 112.8, 79.66)
                .stroke();
            doc.text(content, 150, 50);


            console.log(doc.page.width, doc.page.height);
            doc.pipe(res);
            doc.end();

        });
    },
    personalizePdf(req, res) {
        //
    }//,
};

/*------------------------------------------------------------------*/

module.exports = pdfController;