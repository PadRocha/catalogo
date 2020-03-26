'use strict'

/*------------------------------------------------------------------*/
// Api Routes
/*------------------------------------------------------------------*/

const router = require('express').Router(); //* Calls the Router of express

const userController = require('../controllers/user'); //* Calls the module controllers/user.js
const lineController = require('../controllers/line'); //* Calls the module controllers/line.js
const keyController = require('../controllers/key'); //* Calls the module controllers/key.js

const mdAuth = require('../middlewares/auth'); //* Calls Security

/*------------------------------------------------------------------*/

router.route('/')
    .get(userController.returnUser);

/*------------------------------------------------------------------*/
// User Routes
/*------------------------------------------------------------------*/

router.route('/register')
    .post(userController.registerUser);

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
    .get(lineController.listLinePage);

router.route('/line/regex/:id')
    .get(lineController.listLineRegex);

router.route('/line/regex/:id/page/:page')
    .get(lineController.listLineRegexPage);

/*------------------------------------------------------------------*/
// Key routes
/*------------------------------------------------------------------*/

router.route('/key')
    .get(keyController.listKey)
    .post(keyController.saveKey);

router.route('/key/:id')
    .get(keyController.getKey)
    .put(keyController.updateKey)
    .delete(keyController.deleteKey);

router.route('/key/page/:page')
    .get(keyController.listKeyPage);

router.route('/key/regex/:id')
    .get(keyController.listKeyRegex);

router.route('/key/regex/:id/page/:page')
    .get(keyController.listKeyRegexPage);

router.route('/key/line/:line')
    .get(keyController.listKeyLine);

router.route('/key/line/:line/page/:page')
    .get(keyController.listKeyLinePage);

router.route('/key/status/:id')
    .post(keyController.saveStatus)
    .put(keyController.updateStatus);

router.route('/key/status/:_id/delete/:idN')
    .delete(keyController.deleteStatus);

router.route('/key/image/:id')
    .get(keyController.getImage)
    .post(keyController.saveImage)
    .put(keyController.updateImage);

router.route('/key/image/:_id/delete/:idN')
    .delete(keyController.deleteImage);

/*------------------------------------------------------------------*/

module.exports = router;