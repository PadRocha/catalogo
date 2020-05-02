"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const request_promise_1 = __importDefault(require("request-promise"));
const line_1 = __importDefault(require("../models/line"));
const key_1 = __importDefault(require("../models/key"));
request_promise_1.default.defaults({ encoding: null });
function createPdf(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = new pdfkit_1.default();
        const filename = 'catalogo.pdf';
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.fontSize(8);
        let img, header = path_1.default.join(__dirname, '../assets/pdf-header.png'), imgDefault = path_1.default.join(__dirname, '../assets/pdf-default.jpg'), spaceX = (doc.page.width - 48) / 5, spaceY = 130.3, xl = 24, yl = 84, pagination = 0;
        const lines = yield line_1.default.find({}).sort('_id');
        yield Promise.all(lines.map((line) => __awaiter(this, void 0, void 0, function* () {
            let keys = yield key_1.default.find({ 'line': line._id }).sort('code');
            keys = yield Promise.all(keys.map((key) => __awaiter(this, void 0, void 0, function* () {
                const index = key.image.findIndex(k => k.img != null);
                try {
                    if (index != -1) {
                        img = yield request_promise_1.default.get({
                            uri: key.image[index].img,
                            encoding: null
                        }).then(res => {
                            return Buffer.from(res, 'utf8');
                        });
                    }
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
            })));
            return {
                _id: line._id,
                name: line.name,
                started: line.started,
                keys
            };
        }))).then((lines) => __awaiter(this, void 0, void 0, function* () {
            for (const line of lines) {
                let xi = 0, yi = 0;
                doc.on('pageAdded', () => {
                    ++pagination;
                    doc.save();
                    line.name = 'Línea: ' + line.name;
                    doc.image(header, 24, 24, { width: doc.page.width - 48 });
                    doc.fontSize(10);
                    doc.rect(doc.page.width - 53 - doc.widthOfString(line.name), 40, doc.widthOfString(line.name) + 10, 20)
                        .fill('#000000')
                        .fillColor('white')
                        .text(line.name, doc.page.width - 48 - doc.widthOfString(line.name), 45, { width: doc.widthOfString(line.name) });
                    doc.restore()
                        .fontSize(8);
                    doc.moveTo(24, doc.page.height - 24)
                        .lineTo(doc.page.width - 24, doc.page.height - 24)
                        .rect(24, doc.page.height - 33, 10, 9)
                        .stroke()
                        .text(pagination, 24, doc.page.height - 31, { width: doc.widthOfString(pagination) });
                });
                doc.addPage();
                line.keys.forEach((key) => {
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
        }));
        doc.end();
        doc.pipe(res);
    });
}
exports.createPdf = createPdf;
