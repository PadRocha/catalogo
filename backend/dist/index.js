"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fmt = require('fmt');
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
require("./database");
(async () => {
    const server = await app_1.default.listen(app_1.default.get('port'));
    fmt.sep();
    fmt.title('Api Rest catálogo');
    fmt.field('\x1b[37mServer', `\x1b[33m${app_1.default.get('port')}\x1b[0m`);
    fmt.field('\x1b[37mStatus', `\x1b[33m${app_1.default.get('env')}\x1b[0m`);
})();
