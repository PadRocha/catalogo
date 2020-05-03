"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const config_1 = __importDefault(require("./config/config"));
const app = express_1.default();
app.set('trust proxy', true);
app.set('env', config_1.default.ENV);
app.set('port', process.env.PORT || 4000);
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, 'uploads'),
    filename: (req, file, cb) => cb(null, uuid_1.v4() + path_1.default.extname(file.originalname).toLowerCase())
});
if (app.get('env') === 'development') {
    app.use(morgan_1.default('dev'));
}
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(multer_1.default({
    storage,
    dest: path_1.default.join(__dirname, 'uploads'),
    fileFilter(req, file, cb) {
        var filetypes = /jpeg|jpg|png|gif/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname)
            return cb(null, true);
        cb(`Error: File upload only supports the following filetypes - ${filetypes}`);
    },
    limits: { fileSize: 1000000 },
}).single('image'));
app.use('/api', api_routes_1.default);
exports.default = app;
