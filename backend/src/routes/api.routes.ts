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

/**
 * @apiDefine admin Admin access only
 * This function is restricted for administrators.
*/

/**
 * @apiDefine user User access only
 * This function is restricted for logged in users.
*/


/**
 * @apiDefine SuccessToken
 * @apiSuccess {json} token User Token identificaction
 * 
 * @apiSuccessExample  {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCI8.eyJzdWIiOiI1ZTZiZWVmMWNmNjI3OTVkZTBlMWU3OTEiLCJuaWNrbmFtZSI6InBhZHJvY2hhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg4MzkxNTUxLCJleHAiOjE1OTA5ODM1NTF9.kXECNDTfHt6yMdpR__InB6wu0Z8FKs8083mBnyVVaWg"
 *      }
 */

/**
 * @apiDefine BadRequest
 * @apiError Bad_Request Request not contains data
 * 
 * @apiErrorExample {json} Bad_Request-Response:
 *      HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.
 *      {
 *          "message": "Client has not sent params"
 *      }
 */

/**
 * @apiDefine Conflict
 * @apiError Concflict An internal error ocurred
 * 
 * @apiErrorExample {json} Conflict-Response:
 *      HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource
 *      {
 *          "message": "Internal error, probably error with params"
 *      }
 */

/**
 * @apiDefine NoContent
 * @apiError No_Content Couldn´t return
 * 
 * @apiErrorExample {json} No_Content-Response:
 *      HTTP/1.1 204 The server successfully processed the request and is not returning any content.
 *      {
 *          "message": "Saved and is not returning any content"
 *      }
 */

/**
 * @apiDefine NotFound
 * @apiError Not_Found Server didn´t find request
 * 
 * @apiErrorExample {json} Not_Found-Response:
 *      HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
 *      {
 *          "message": "Document not found"
 *      }
 */

/*------------------------------------------------------------------*/

/**
 * 
 * @api {get} / Request User Info
 * @apiName ReturnUser
 * @apiDescription Allow an user to Request his info
 * @apiGroup User
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/
 * 
 * 
 * @apiSuccess {string} _id id´s User.
 * @apiSuccess {string} nikcname Nickname of the User.
 * @apiSuccess {string} role Role of the User
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "_id": "5e6ceef1cf62796de0e1e791", 
 *           "nickname": "padrocha", 
 *           "role": "$3a$10$WjLK2U2TqVjG8Y5g4qyUC.xJ5h3x8IDtb3VLzZmkKpMAvbnOsNJ0i"
 *      }
 * 
 * @apiError message Request Header does not contain token
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.
 *      {
 *          "message": "Client has not sent Token"
 *      }
 * 
 * @apiError message Request Header does not contain token
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 403 The server cannot or will not process the request due to an apparent client error.
 *      {
 *          "message": "Client has not sent Token"
 *      }
 * 
 * 
 */

router.route('/')
    .get(authorized, userController.returnUser); //* User

/*------------------------------------------------------------------*/
// User Routes
/*------------------------------------------------------------------*/

/**
 * 
 * @api {post} /register Register User
 * @apiName RegisterUser
 * @apiDescription Allows an Admin to register a user
 * @apiGroup User
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/register
 * 
 * 
 * @apiParam  (body) {String} nikcname Nickname of the User.
 * @apiParam  (body) {String} password Password ot the User
 * @apiParam  (body) {String} role Role of the User
 * 
 * @apiParamExample  {json} Request-Example:
 *      {
 *          "nickname": "padrocha", 
 *          "password": "pass",
 *          "role": "admin"
 *      }
 * 
 * @apiuse SuccessToken
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NoContent
 * 
 */

router.route('/register')
    .post(authAdmin, userController.registerUser);

/**
 * 
 * @api {post} /login Login User
 * @apiName LoginUser
 * @apiDescription Verify if the user exits and have the correct password
 * @apiGroup User
 * @apiVersion  0.1.0
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/login
 * 
 * 
 * @apiParam  (body) {String} nikcname Nickname of the User.
 * @apiParam  (body) {String} password Password ot the User
 * 
 * @apiParamExample  {json} Request-Example:
 *      {
 *          "nickname": "padrocha", 
 *          "password": "pass"
 *      }
 * 
 * @apiuse SuccessToken
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 */

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
    .get(pdfController.createPdf)
    .post(pdfController.personalizePdf);

/*------------------------------------------------------------------*/

export default router;