/*------------------------------------------------------------------*/
// Api Routes
/*------------------------------------------------------------------*/

import { Router } from 'express';

import * as userController from '../controllers/user.controller';
import * as lineController from '../controllers/line.controller';
import * as keyController from '../controllers/key.controller';
import * as pdfController from '../controllers/pdf.controller';

import { authorized, authAdmin } from '../middlewares/auth'

const router = Router();

/*------------------------------------------------------------------*/

router.route('/')
    .get(authorized, userController.returnUser); //* User

/*------------------------------------------------------------------*/
// User Routes
/*------------------------------------------------------------------*/

router.route('/register')
    .post(authAdmin, userController.registerUser);

router.route('/login')
    .post(userController.loginUser);

/*------------------------------------------------------------------*/
// Line routes
/*------------------------------------------------------------------*/

router.route('/line')
    .get(lineController.listLine)
    .post(lineController.saveLine);

router.route('/line/:id')
    .get(lineController.getLine)
    .put(lineController.updateLine)
    .delete(lineController.deleteLine);

router.route('/line/page/:page')
    .get(authorized, lineController.listLinePage); //* User

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

/*------------------------------------------------------------------*/
// Key routes
/*------------------------------------------------------------------*/

router.route('/key')
    .get(keyController.listKey)
    .post(keyController.saveKey);

router.route('/key/:id')
    .get(authorized, keyController.getKey) //* User
    .put(keyController.updateKey)
    .delete(keyController.deleteKey);

router.route('/key/page/:page')
    .get(authorized, keyController.listKeyPage); //* User

router.route('/key/regex/:id')
    .get(keyController.listKeyRegex);

router.route('/key/regex/:id/page/:page')
    .get(authorized, keyController.listKeyRegexPage); //* User

router.route('/key/line/:line')
    .get(keyController.listKeyLine);

router.route('/key/line/:line/page/:page')
    .get(authorized, keyController.listKeyLinePage); //* User

router.route('/Key/status')
    .post(keyController.saveKeyStatus);

router.route('/key/status/:id')
    .post(keyController.saveStatus)
    .put(authorized, keyController.updateStatus); //* User

router.route('/key/status/:_id/delete/:idN')
    .delete(keyController.deleteStatus);

router.route('/key/image/:id')
    .post(keyController.saveImage)
    .put(keyController.updateImage);

router.route('/key/image/:_id/delete/:idN')
    .delete(keyController.deleteImage);

/*------------------------------------------------------------------*/
// PDF
/*------------------------------------------------------------------*/

router.route('/pdf')
    .get(pdfController.createPdf);

/*------------------------------------------------------------------*/

export default router;