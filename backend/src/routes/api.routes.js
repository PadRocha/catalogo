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
    .get();

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

router.route('/key/status/:id')
    .post(keyController.saveStatus)
    .put(keyController.updateStatus)
    .delete(keyController.deleteStatus);

router.route('/key/image/:id')
    .get(keyController.getImage)
    .post(keyController.saveImage)
    .put(keyController.updateImage)
    .delete(keyController.deleteImage);

/*------------------------------------------------------------------*/

module.exports = router;