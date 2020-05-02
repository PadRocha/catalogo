"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("../controllers/user.controller"));
const lineController = __importStar(require("../controllers/line.controller"));
const keyController = __importStar(require("../controllers/key.controller"));
const pdfController = __importStar(require("../controllers/pdf.controller"));
const auth_1 = require("../middlewares/auth");
const router = express_1.Router();
router.route('/')
    .get(auth_1.authorized, userController.returnUser);
router.route('/register')
    .post(auth_1.authAdmin, userController.registerUser);
router.route('/login')
    .post(userController.loginUser);
router.route('/line')
    .get(lineController.listLine)
    .post(lineController.saveLine);
router.route('/line/:id')
    .get(lineController.getLine)
    .put(lineController.updateLine)
    .delete(lineController.deleteLine);
router.route('/line/page/:page')
    .get(auth_1.authorized, lineController.listLinePage);
router.route('/line/regex/:id')
    .get(lineController.listLineRegex);
router.route('/line/regex/:id/page/:page')
    .get(lineController.listLineRegexPage);
router.route('/line/total/key')
    .get(lineController.listLineTotalKey);
router.route('/line/total/key/page/:page')
    .get(lineController.listLineTotalKeyPage);
router.route('/line/total/key/regex/:id')
    .get(lineController.listLineTotalKeyRegex);
router.route('/line/total/key/regex/:id/page/:page')
    .get(lineController.listLineTotalKeyRegexPage);
router.route('/key')
    .get(keyController.listKey)
    .post(keyController.saveKey);
router.route('/key/:id')
    .get(auth_1.authorized, keyController.getKey)
    .put(keyController.updateKey)
    .delete(keyController.deleteKey);
router.route('/key/page/:page')
    .get(auth_1.authorized, keyController.listKeyPage);
router.route('/key/regex/:id')
    .get(keyController.listKeyRegex);
router.route('/key/regex/:id/page/:page')
    .get(auth_1.authorized, keyController.listKeyRegexPage);
router.route('/key/line/:line')
    .get(keyController.listKeyLine);
router.route('/key/line/:line/page/:page')
    .get(auth_1.authorized, keyController.listKeyLinePage);
router.route('/Key/status')
    .post(keyController.saveKeyStatus);
router.route('/key/status/:id')
    .post(keyController.saveStatus)
    .put(auth_1.authorized, keyController.updateStatus);
router.route('/key/status/:_id/delete/:idN')
    .delete(keyController.deleteStatus);
router.route('/key/image/:id')
    .post(keyController.saveImage)
    .put(keyController.updateImage);
router.route('/key/image/:_id/delete/:idN')
    .delete(keyController.deleteImage);
router.route('/pdf')
    .get(pdfController.createPdf);
exports.default = router;
