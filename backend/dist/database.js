"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fmt = require('fmt');
const config_1 = __importDefault(require("./config/config"));
const dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    config: { autoIndex: false }
};
mongoose_1.default.connect(config_1.default.DB.URI, dbOptions, err => {
    if (err)
        console.error('\x1b[37mDB: \x1b[31merror >\x1b[0m', err);
    else
        fmt.field('\x1b[37mDB', '\x1b[33mconnected\x1b[0m');
    fmt.sep();
});
