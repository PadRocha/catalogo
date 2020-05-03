"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cloudinary_1 = require("cloudinary");
const line_1 = __importDefault(require("../models/line"));
const key_1 = __importDefault(require("../models/key"));
async function createPdf(req, res) {
    const doc = new pdfkit_1.default();
    const filename = 'catalogo.pdf';
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');
    doc.fontSize(8);
    let img, header = path_1.default.join(__dirname, '../assets/pdf-header.png'), imgDefault = path_1.default.join(__dirname, '../assets/pdf-default.jpg'), spaceX = (doc.page.width - 48) / 5, spaceY = 130.3, xl = 24, yl = 84, pagination = 0;
    const lines = await line_1.default.find({}).sort('_id');
    await Promise.all(lines.map(async (line) => {
        let keys = await key_1.default.find({ 'line': line._id }).sort('code');
        keys = await Promise.all(keys.map(async (key) => {
            const index = key.image.sort((a, b) => a.idN - b.idN).findIndex(k => k.img != null);
            try {
                if (index != -1)
                    img = await node_fetch_1.default(cloudinary_1.v2.url(key.image[index].publicId, { width: 113, crop: "scale" }), { method: 'GET' }).then(res => res.buffer());
                else
                    throw new Error('No image Found');
            }
            catch (error) {
                img = imgDefault;
            }
            finally {
                return {
                    _id: key._id,
                    code: key.code,
                    line: key.line,
                    desc: key.desc,
                    img
                };
            }
        }));
        return {
            _id: line._id,
            name: line.name,
            started: line.started,
            keys
        };
    })).then(async (lines) => {
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
    doc.end();
    doc.pipe(res);
}
exports.createPdf = createPdf;
async function personalizePdf(req, res) {
}
exports.personalizePdf = personalizePdf;
