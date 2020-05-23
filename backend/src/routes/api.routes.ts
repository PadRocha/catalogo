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
 * @apiDefine header
 * @apiHeader {String} Authorization Users unique access-key.
 * 
 * @apiHeaderExample {json} Request-E:
 *      {
 *           "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCI8.eyJzdWIiOiI1ZTZiZWVmMWNmNjI3OTVkZTBlMWU3OTEiLCJuaWNrbmFtZSI6InBhZHJvY2hhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg4MzkxNTUxLCJleHAiOjE1OTA5ODM1NTF9.kXECNDTfHt6yMdpR__InB6wu0Z8FKs8083mBnyVVaWg"
 *      }
 */

/**
 * @apiDefine page
 * @apiParam (params) {number} page Number of page.
 */

/**
 * @apiDefine regex
 * @apiParam (params) {string} id Regular expression that matches the start.
 */

/**
 * @apiDefine BodyLine
 * @apiParam (body) {String} identifier Line identifier
 * @apiParam (body) {String} name Line name
 * 
 * @apiParamExample  {json} Request-E:
 *      {
 *      	"code": "1",
 *      	"line": "ACCSEH",
 *      	"desc": "Agarradera puerta Combi"
 *      }
 */

/**
 * @apiDefine BodyKey
 * @apiParam (body) {String} code Key identification code
 * @apiParam (body) {String} line Line Identifier of the line to which the product belongs
 * @apiParam (body) {String} desc Product description
 * 
 * @apiParamExample  {json} Request-E:
 *      {
 *          "code": "1",
 *          "line": "ACCSEH",
 *          "desc": "Agarradera puerta Combi"
 *      }
 */

/**
 * @apiDefine SuccessToken
 * @apiSuccess {json} token User Token identificaction
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCI8.eyJzdWIiOiI1ZTZiZWVmMWNmNjI3OTVkZTBlMWU3OTEiLCJuaWNrbmFtZSI6InBhZHJvY2hhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg4MzkxNTUxLCJleHAiOjE1OTA5ODM1NTF9.kXECNDTfHt6yMdpR__InB6wu0Z8FKs8083mBnyVVaWg"
 *      }
 */

/**
 * @apiDefine SuccessLines
 * @apiParam (Success 200 [Array])  {String} _id Line´s _id
 * @apiParam (Success 200 [Array])  {String} identifier Line identifier
 * @apiParam (Success 200 [Array])  {String} name Line name
 * @apiParam (Success 200 [Array])  {Date} started Line creation date
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": [   
 *              {
 *                  "_id": "5eb3153570f6e647a499dac8",
 *                  "identifier": "ACCSEH",
 *                  "name": "Accesorios (SEH)",
 *                  "started": "2020-04-21T20:25:10.395Z",
 *                  "__v": 0
 *              }
 *          ]
 *      }
 */

/**
 * @apiDefine SuccessLinesPaged
 * @apiParam (Success 200 [Array])  {String} _id Line´s _id
 * @apiParam (Success 200 [Array])  {String} identifier Line identifier
 * @apiParam (Success 200 [Array])  {String} name Line name
 * @apiParam (Success 200 [Array])  {Date} started Line creation date
 * 
 * @apiParam (Paged format) {Array} docs Array of Line Documents
 * @apiParam (Paged format) {Number} totalDocs Total number of documents in collection that match a query
 * @apiParam (Paged format) {Number} limit Limit that was used
 * @apiParam (Paged format) {Number} totalPages Total number of pages.
 * @apiParam (Paged format) {Number} page Current page number
 * @apiParam (Paged format) {Number} pagingCounter The starting sl. number of first document.
 * @apiParam (Paged format) {Boolean} hasPrevPage Availability of prev page.
 * @apiParam (Paged format) {Boolean} hasNextPage Availability of next page.
 * @apiParam (Paged format) {Number} prevPage Previous page number if available or NULL
 * @apiParam (Paged format) {Number} nextPage Next page number if available or NULL
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": {
 *              "docs": [
 *                  {
 *                      "_id": "5eb3153570f6e647a499dac8",
 *                      "identifier": "ACCSEH",
 *                      "name": "Accesorios (SEH)",
 *                      "started": "2020-04-21T20:25:10.395Z",
 *                  }
 *              ],
 *              "totalDocs": 1,
 *              "limit": 20,
 *              "totalPages": 1,
 *              "page": 1,
 *              "pagingCounter": 1,
 *              "hasPrevPage": false,
 *              "hasNextPage": false,
 *              "prevPage": null,
 *              "nextPage": null
 *          }
 *      }
 */

/**
 * @apiDefine SuccessLinesTotalKey
 * @apiParam (Success 200 [Array])  {String} _id Line´s _id
 * @apiParam (Success 200 [Array])  {String} identifier Line identifier
 * @apiParam (Success 200 [Array])  {String} name Line name
 * @apiParam (Success 200 [Array])  {Date} started Line creation date
 * @apiParam (Success 200 [Array])  {Number} countKeys Total Key in Line
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": [
 *              {
 *                  "_id": "5eb3153570f6e647a499dac8",
 *                  "identifier": "ACCSEH",
 *                  "name": "Accesorios (SEH)",
 *                  "started": "2020-04-21T20:25:10.395Z",
 *                  "countKeys": 26
 *              }
 *          ]
 *      }
 */

/**
 * @apiDefine SuccessLinesTotalKeyPaged
 * @apiParam (Success 200 [Array])  {String} _id Line´s _id
 * @apiParam (Success 200 [Array])  {String} identifier Line identifier
 * @apiParam (Success 200 [Array])  {String} name Line name
 * @apiParam (Success 200 [Array])  {Date} started Line creation date
 * @apiParam (Success 200 [Array])  {Number} countKeys Total Key in Line
 * 
 * @apiParam (Paged format) {Array} docs Array of Line Documents
 * @apiParam (Paged format) {Number} totalDocs Total number of documents in collection that match a query
 * @apiParam (Paged format) {Number} limit Limit that was used
 * @apiParam (Paged format) {Number} totalPages Total number of pages.
 * @apiParam (Paged format) {Number} page Current page number
 * @apiParam (Paged format) {Number} pagingCounter The starting sl. number of first document.
 * @apiParam (Paged format) {Boolean} hasPrevPage Availability of prev page.
 * @apiParam (Paged format) {Boolean} hasNextPage Availability of next page.
 * @apiParam (Paged format) {Number} prevPage Previous page number if available or NULL
 * @apiParam (Paged format) {Number} nextPage Next page number if available or NULL
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": {
 *              "docs": [
 *                  {
 *                      "_id": "5eb3153570f6e647a499dac8",
 *                      "identifier": "ACCSEH",
 *                      "name": "Accesorios (SEH)",
 *                      "started": "2020-04-21T20:25:10.395Z",
 *                      "countKeys": 26
 *                  }
 *              ],
 *              "totalDocs": 1,
 *              "limit": 20,
 *              "totalPages": 1,
 *              "page": 1,
 *              "pagingCounter": 1,
 *              "hasPrevPage": false,
 *              "hasNextPage": false,
 *              "prevPage": null,
 *              "nextPage": null
 *          }
 *      }
 */

/**
 * @apiDefine SuccessLine
 * @apiSuccess {String} _id Line´s _id
 * @apiSuccess {String} identifier Line identifier
 * @apiSuccess {String} name Line name
 * @apiSuccess {Date} started Line creation date
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": {
 *              "_id": "5eb3153570f6e647a499dac8",
 *              "identifier": "ACCSEH",
 *              "name": "Accesorios (SEH)",
 *              "started": "2020-04-21T20:25:10.395Z",
 *              "__v": 0
 *          }
 *      }
 */

/**
 * @apiDefine SuccessKeys
 * @apiSuccess (Success 200 [Array]) {String} _id Key´s _id
 * @apiSuccess (Success 200 [Array]) {String} code Key identification code
 * @apiSuccess (Success 200 [Array]) {String} line Line Identifier of the line to which the product belongs
 * @apiSuccess (Success 200 [Array]) {String} desc Product description
 * @apiSuccess (Success 200 [Array]) {Array} image Image Array
 * @apiSuccess (Success 200 [Array]) {Date} createdAt Key creation date
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": [
 *              {
 *                  "_id": "5eb46acb6ef103586032739e",
 *                  "code": "0001",
 *                  "line": "ACCSEH",
 *                  "desc": "Agarradera puerta Combi",
 *                  "image": [],
 *                  "createdAt": "2020-05-07T20:08:43.212Z",
 *                  "__v": 0
 *              }
 *          ]
 *      }
 */

/**
 * @apiDefine SuccessKeysPaged
 * @apiSuccess (Success 200 [Array]) {String} _id Key´s _id
 * @apiSuccess (Success 200 [Array]) {String} code Key identification code
 * @apiSuccess (Success 200 [Array]) {String} line Line Identifier of the line to which the product belongs
 * @apiSuccess (Success 200 [Array]) {String} desc Product description
 * @apiSuccess (Success 200 [Array]) {Array} image Image Array
 * @apiSuccess (Success 200 [Array]) {Date} createdAt Key creation date
 * 
 * @apiSuccess (Paged format) {Array} docs Array of Line Documents
 * @apiSuccess (Paged format) {Number} totalDocs Total number of documents in collection that match a query
 * @apiSuccess (Paged format) {Number} limit Limit that was used
 * @apiSuccess (Paged format) {Number} totalPages Total number of pages.
 * @apiSuccess (Paged format) {Number} page Current page number
 * @apiSuccess (Paged format) {Number} pagingCounter The starting sl. number of first document.
 * @apiSuccess (Paged format) {Boolean} hasPrevPage Availability of prev page.
 * @apiSuccess (Paged format) {Boolean} hasNextPage Availability of next page.
 * @apiSuccess (Paged format) {Number} prevPage Previous page number if available or NULL
 * @apiSuccess (Paged format) {Number} nextPage Next page number if available or NULL
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": {
 *              "docs": [
 *                  {
 *                      "_id": "5eb46acb6ef103586032739e",
 *                      "code": "0001",
 *                      "line": "ACCSEH",
 *                      "desc": "Agarradera puerta Combi",
 *                      "image": [],
 *                      "createdAt": "2020-05-07T20:08:43.212Z",
 *                      "__v": 0
 *                  }
 *              ],
 *              "totalDocs": 1,
 *              "limit": 20,
 *              "totalPages": 1,
 *              "page": 1,
 *              "pagingCounter": 1,
 *              "hasPrevPage": false,
 *              "hasNextPage": false,
 *              "prevPage": null,
 *              "nextPage": null
 *          }
 *      }
 */

/**
 * @apiDefine SuccessKey
 * @apiSuccess {String} _id Key´s _id
 * @apiSuccess {String} code Key identification code
 * @apiSuccess {String} line Line Identifier of the line to which the product belongs
 * @apiSuccess {String} desc Product description
 * @apiSuccess {Array} image Image Array
 * @apiSuccess {Date} createdAt Key creation date
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": {
 *              "_id": "5eb46acb6ef103586032739e",
 *              "code": "0001",
 *              "line": "ACCSEH",
 *              "desc": "Agarradera puerta Combi",
 *              "image": [],
 *              "createdAt": "2020-05-07T20:08:43.212Z",
 *              "__v": 0
 *          }
 *      }
 */

/**
 * @apiDefine SuccessKeyImage
 * @apiSuccess {String} _id Key´s _id
 * @apiSuccess {String} code Key identification code
 * @apiSuccess {String} line Line Identifier of the line to which the product belongs
 * @apiSuccess {String} desc Product description
 * @apiSuccess {Array} image Image Array
 * @apiSuccess {Date} createdAt Key creation date
 * 
 * @apiSuccess (Image [Array]) {Number} idN Image identifier number
 * @apiSuccess (Image [Array]) {Number} status Image status that will be saved
 * @apiSuccess (Image [Array]) {String} img Url of Cloudinary
 * @apiSuccess (Image [Array]) {String} publicId Code of Image in Cloudinary
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": {
 *              "_id": "5eb46acb6ef103586032739e",
 *              "code": "0001",
 *              "line": "ACCSEH",
 *              "desc": "Agarradera puerta Combi",
 *              "image": [
 *                  {
 *                      "publicId": null,
 *                      "img": null,
 *                      "status": 0,
 *                      "idN": 0
 *                  }
 *              ],
 *              "createdAt": "2020-05-07T20:08:43.212Z",
 *              "__v": 0
 *          }
 *      }
 */

/**
 * @apiDefine SuccessImage
 * @apiSuccess {String} _id Key´s _id
 * @apiSuccess {String} code Key identification code
 * @apiSuccess {String} line Line Identifier of the line to which the product belongs
 * @apiSuccess {String} desc Product description
 * @apiSuccess {Array} image Image Array
 * @apiSuccess {Date} createdAt Key creation date
 * 
 * @apiSuccess (Image [Array]) {Number} idN Image identifier number
 * @apiSuccess (Image [Array]) {Number} status Image status that will be saved
 * @apiSuccess (Image [Array]) {String} img Url of Cloudinary
 * @apiSuccess (Image [Array]) {String} publicId Code of Image in Cloudinary
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": {
 *              "_id": "5eb46acb6ef103586032739e",
 *              "code": "0001",
 *              "line": "ACCSEH",
 *              "desc": "Agarradera puerta Combi",
 *              "image": [
 *                  {
 *                      "publicId": "p7bywshakg3xnjd2mzc2",
 *                      "img": "http://res.cloudinary.com/c-tr-co-productions/image/upload/v1589075981/p7bywshakg3xnjd2mzc2.jpg",
 *                      "status": 0,
 *                      "idN": 0
 *                  }
 *              ],
 *              "createdAt": "2020-05-07T20:08:43.212Z",
 *              "__v": 0
 *          }
 *      }
 */

/**
 * @apiDefine HeaderErrors
 * @apiError Passport[P] Request Header does not contain token
 * 
 * @apiErrorExample {json} P-R:
 *      HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.
 *      {
 *          "message": "Client has not sent Token"
 *      }
 * 
 * @apiError Credencials[CR] Passport does not contain credentials
 * 
 * @apiErrorExample {json} CR-R:
 *      HTTP/1.1 403 The request contained valid data and was understood by the server, but the server is refusing action.
 *      {
 *          "message": "The user does not have the necessary credentials for this operation"
 *      }
 * 
 * @apiError Access[A] Passport of user is invalid
 * 
 * @apiErrorExample {json} A-R:
 *      HTTP/1.1 423 The resource that is being accessed is locked.
 *      {
 *          "message": "Access denied"
 *      }
 * 
 * @apiError Decryp[D] Decrypting Failed
 * 
 * @apiErrorExample {json} D-R:
 *      HTTP/1.1 409 The decryption process was unable to process the token.
 *      {
 *          "message": "Error decrypting token"
 *      } 
 */

/**
 * @apiDefine BadRequest
 * @apiError BadRequest[BR] Request not contains data
 * 
 * @apiErrorExample {json} BR-R:
 *      HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.
 *      {
 *          "message": "Client has not sent params"
 *      }
 */

/**
 * @apiDefine Conflict
 * @apiError Concflict[C] An internal error ocurred
 * 
 * @apiErrorExample {json} C-R:
 *      HTTP/1.1 409 Indicates that the request could not be processed because of conflict in the current state of the resource
 *      {
 *          "message": "Internal error, probably error with params"
 *      }
 */

/**
 * @apiDefine NoContent
 * @apiError NoContent[NC] Couldn´t return
 * 
 * @apiErrorExample {json} NC-R:
 *      HTTP/1.1 204 The server successfully processed the request and is not returning any content.
 *      {
 *          "message": "Saved and is not returning any content"
 *      }
 */

/**
 * @apiDefine NotFound
 * @apiError NotFound[NF] Server didn´t find request
 * 
 * @apiErrorExample {json} NF-R:
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
 * @apiuse header
 * 
 * @apiSuccess {string} identifier id´s User.
 * @apiSuccess {string} nikcname Nickname of the User.
 * @apiSuccess {string} role Role of the User
 * 
 * @apiSuccessExample {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *           "identifier": "5e6ceef1cf62796de0e1e791", 
 *           "nickname": "padrocha", 
 *           "role": "$3a$10$WjLK2U2TqVjG8Y5g4qyUC.xJ5h3x8IDtb3VLzZmkKpMAvbnOsNJ0i"
 *      }
 * 
 * @apiError Auth[AU] Auth failed
 * 
 * @apiErrorExample {json} AU-R:
 *      HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.
 *      {
 *          "message": "Client has not sent params"
 *      }
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/')
    .get(authorized, userController.returnUser);

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
 * @apiParamExample  {json} Request-E:
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
 * @apiuse HeaderErrors
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
 * @apiParamExample  {json} Request-E:
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
 * @apiError Unauthorized[U] User are not allowed
 * 
 * @apiErrorExample {json} U-R:
 *      HTTP/1.1 401 The user does not have valid authentication credentials for the target resource.
 *      {
 *          "message": "Unauthorized"
 *      }
 * 
 */

router.route('/login')
    .post(userController.loginUser);

/*------------------------------------------------------------------*/
// Line routes
/*------------------------------------------------------------------*/

/**
 * 
 * @api {get} /line List Line
 * @apiName listLine
 * @apiDescription Show all *Line documents*
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line
 * 
 * 
 * @apiuse header
 * 
 * @apiuse SuccessLines
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

/**
 * 
 * @api {post} /line Save Line
 * @apiName saveLine
 * @apiDescription Save a *Line document* in the database
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line
 * 
 * 
 * @apiuse header
 * 
 * @apiuse BodyLine
 * 
 * @apiuse SuccessLine
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NoContent
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/line')
    .get(authAdmin, lineController.listLine)
    .post(authAdmin, lineController.saveLine);

/**
 * 
 * @api {get} /line/:id Get Line
 * @apiName getLine
 * @apiDescription Return the *Line document* that matchs with the id
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/ACCSEH
 * 
 * 
 * @apiuse header
 * 
 * @apiParam  (params) {string} id Line identifier.
 * 
 * @apiuse SuccessLine
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

/**
 * 
 * @api {put} /line/:id Update Line
 * @apiName updateLine
 * @apiDescription Update the line in id and returns the *Line* before the update, also update all the keys that contain Line
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/ACCSEH
 * 
 * 
 * @apiuse header
 * 
 * @apiParam  (params) {string} id Line identifier.
 * 
 * @apiuse BodyLine
 * 
 * @apiuse SuccessLine
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiError BatchUpdate[BU] Update multiple documents
 * 
 * @apiErrorExample {json} BU-R:
 *      HTTP/1.1 409 Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.
 *      {
 *          "message": "Batch update process has failed"
 *      }
 * 
 * @apiuse HeaderErrors
 * 
 */

/**
 * 
 * @api {delete} /line/:id Delete Line
 * @apiName deleteLine
 * @apiDescription Delete the line in id and returns the *Line* before delete it, also delete all de keys that contain Line
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/ACCSEH
 * 
 * 
 * @apiuse header
 * 
 * @apiParam  (params) {string} id Line identifier.
 * 
 * @apiuse SuccessLine
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiError BatchRemoval[BR] Delete multiple documents
 * 
 * @apiErrorExample {json} BR-R:
 *      HTTP/1.1 409 Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.
 *      {
 *          "message": "Batch removal process has failed"
 *      }
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/line/:id')
    .get(authAdmin, lineController.getLine)
    .put(authAdmin, lineController.updateLine)
    .delete(authAdmin, lineController.deleteLine);

/**
 * 
 * @api {get} /line/page/:page List Line Page
 * @apiName listLinePage
 * @apiDescription Show all *Line documents* with the paged format
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/page/1
 * 
 * 
 * @apiuse header
 * 
 * @apiuse page
 * 
 * @apiuse SuccessLinesPaged
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/line/page/:page')
    .get(authorized, lineController.listLinePage);

/**
 * 
 * @api {get} /line/regex/:id List Line Regex
 * @apiName listLineRegex
 * @apiDescription Show all *Line documents* found with the regex.
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/regex/ACC
 * 
 * 
 * @apiuse header
 * 
 * @apiuse regex
 * 
 * @apiuse SuccessLines
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/line/regex/:id')
    .get(authAdmin, lineController.listLineRegex);

/**
 * 
 * @api {get} /line/regex/:id/page/:page List Line Regex Page
 * @apiName listLineRegexPage
 * @apiDescription Show all *Line documents* found with the regex with the paged format
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/regex/ACC/page/1
 * 
 * 
 * @apiuse header
 * 
 * @apiuse regex
 * @apiuse page
 * 
 * @apiuse SuccessLinesPaged
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/line/regex/:id/page/:page')
    .get(authorized, lineController.listLineRegexPage);

/**
 * 
 * @api {get} /line/total/key List Line Key
 * @apiName ListLineTotalKey
 * @apiDescription Show all *Line documents* adding the total of Keys that belong to the line
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/total/key
 * 
 * 
 * @apiuse header
 * 
 * @apiuse SuccessLinesTotalKey
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/line/total/key')
    .get(authAdmin, lineController.listLineTotalKey);

/**
 * 
 * @api {get} /line/total/key/page/:page List Line Key Page
 * @apiName ListLineTotalKeyPage
 * @apiDescription Show all *Line documents* adding the total of Keys that belong to the line with the paged format
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/total/key/page/1
 * 
 * 
 * @apiuse header
 * 
 * @apiuse page
 * 
 * @apiuse SuccessLinesTotalKeyPaged
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/line/total/key/page/:page')
    .get(authAdmin, lineController.listLineTotalKeyPage);

/**
 * 
 * @api {get} /line/total/key/regex/:id List Line Key Regex
 * @apiName listLineTotalKeyRegex
 * @apiDescription Show all *Line documents* found with the regex adding the total of Keys that belong to the line
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/total/key/regex/ACC
 * 
 * 
 * @apiuse header
 * 
 * @apiuse regex
 * 
 * @apiuse SuccessLinesTotalKey
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/line/total/key/regex/:id')
    .get(authAdmin, lineController.listLineTotalKeyRegex);

/**
 * 
 * @api {get} /line/total/key/regex/:id/page/:page List Line Key Regex Page
 * @apiName listLineTotalKeyRegexPage
 * @apiDescription Show all *Line documents* found with the regex  adding the total of Keys that belong to the line with the paged format
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/total/key/regex/ACC/page/1
 * 
 * 
 * @apiuse header
 * 
 * @apiuse regex
 * @apiuse page
 * 
 * @apiuse SuccessLinesTotalKeyPaged
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/line/total/key/regex/:id/page/:page')
    .get(authAdmin, lineController.listLineTotalKeyRegexPage);

/**
 * 
 * @api {get} /line/force/:id Force Update Line
 * @apiName forceUpdateLine
 * @apiDescription Update the *Line document*. **Warning** This funcion only will update the Line but wont update the line param in the Keys
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/force/ACCSEH
 * 
 * 
 * @apiuse header
 * 
 * @apiuse page
 * 
 * @apiuse SuccessLine
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

/**
 * 
 * @api {delete} /line/force/:id Force Delete Line
 * @apiName forceDeleteLine
 * @apiDescription Delete a *Line document*. **Warning** This funcion only will update the Line but wont delete all the Lines with this param in the Keys
 * @apiGroup Line
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/line/force/ACCSEH
 * 
 * 
 * @apiuse header
 * 
 * @apiuse page
 * 
 * @apiuse SuccessLine
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/line/force/:id')
    .put(authAdmin, lineController.forceUpdateLine)
    .delete(authAdmin, lineController.forceDeleteLine);

/*------------------------------------------------------------------*/
// Key routes
/*------------------------------------------------------------------*/

/**
 * 
 * @api {get} /key List Key
 * @apiName listKey
 * @apiDescription Show all *Key document*
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key
 * 
 * 
 * @apiuse header
 * 
 * @apiuse SuccessKeys
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

/**
 * 
 * @api {post} /key Save Key
 * @apiName saveKey
 * @apiDescription Save a *Key document* in the database
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key
 * 
 * 
 * @apiuse header
 * 
 * @apiuse BodyKey
 * 
 * @apiuse SuccessKey
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse NoContent
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key')
    .get(authAdmin, keyController.listKey)
    .post(authAdmin, keyController.saveKey);

/**
 * 
 * @api {get} /key/:id Get Key
 * @apiName getKey
 * @apiDescription Return the *Key document* that matchs with the id
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/5eb46acb6ef103586032739e
 * 
 * 
 * @apiuse header
 * 
 * @apiParam  (params) {string} id Key´s _id.
 * 
 * @apiuse SuccessKey
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

/**
 * 
 * @api {put} /key/:id Update Key
 * @apiName updateKey
 * @apiDescription Update the key in id and returns the *Key* before the update.
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/5eb46acb6ef103586032739e
 * 
 * 
 * @apiuse header
 * 
 * @apiParam  (params) {string} id Key´s _id.
 * 
 * @apiuse BodyKey
 * 
 * @apiuse SuccessKey
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

/**
 * 
 * @api {delete} /key/:id Delete Key
 * @apiName deleteKey
 * @apiDescription Delete the line in id and returns the *Key* before delete it.
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/5eb46acb6ef103586032739e
 * 
 * 
 * @apiuse header
 * 
 * @apiParam  (params) {string} id Key´s _id.
 * 
 * @apiuse SuccessKey
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key/:id')
    .get(authorized, keyController.getKey)
    .put(authAdmin, keyController.updateKey)
    .delete(authAdmin, keyController.deleteKey);

/**
 * 
 * @api {get} /key/page/:page List Key Page
 * @apiName listKeyPage
 * @apiDescription Show all *Key documents* with the paged format
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/page/1
 * 
 * 
 * @apiuse header
 * 
 * @apiuse page
 * 
 * @apiuse SuccessKeysPaged
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key/page/:page')
    .get(authorized, keyController.listKeyPage);

/**
 * 
 * @api {get} /key/regex/:id List Key Regex
 * @apiName listKeyRegex
 * @apiDescription Show all *Key documents* found with the regex.
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/regex/ACCSEH00
 * 
 * 
 * @apiuse header
 * 
 * @apiuse regex
 * 
 * @apiuse SuccessKeys
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key/regex/:id')
    .get(authorized, keyController.listKeyRegex);

/**
 * 
 * @api {get} /Key/regex/:id/page/:page List Key Regex Page
 * @apiName listKeyRegexPage
 * @apiDescription Show all *Key documents* found with the regex with the paged format
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/regex/ACCSEH00/page/1
 * 
 * 
 * @apiuse header
 * 
 * @apiuse regex
 * @apiuse page
 * 
 * @apiuse SuccessKeysPaged
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key/regex/:id/page/:page')
    .get(authorized, keyController.listKeyRegexPage);

/**
 * 
 * @api {get} /key/line/:line List Key Line
 * @apiName listKeyLine
 * @apiDescription shows all *Key documents* where Line matches identifier.
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/line/ACCSEH
 * 
 * 
 * @apiuse header
 * 
 * @apiParam (params) {string} line Identifier that connect Key with Line
 * @apiuse SuccessKey
 * 
 * @apiUse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key/line/:line')
    .get(authorized, keyController.listKeyLine);

/**
 * 
 * @api {get} /key/line/:line/page/:page List Key Line Page
 * @apiName listKeyLinePage
 * @apiDescription shows all *Key documents* where Line matches identifier with the paged format.
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/line/ACCSEH/page/1
 * 
 * 
 * @apiuse header
 * 
 * @apiParam (params) {string} line Identifier that connect Key with Line
 * @apiUse page
 * 
 * @apiuse SuccessKeysPaged
 * 
 * @apiUse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key/line/:line/page/:page')
    .get(authorized, keyController.listKeyLinePage);

/**
 * 
 * @api {post} /key/status Save Key Status
 * @apiName saveKeyStatus
 * @apiDescription Save a *Key document* in the database with a status seted in the three default *Image*´s
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission admin
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/status
 * 
 * 
 * @apiuse header
 * 
 * @apiParam (body) {String} code Key identification code
 * @apiParam (body) {String} line Line Identifier of the line to which the product belongs
 * @apiParam (body) {String} desc Product description
 * @apiParam (body) {Number} status Image status that will be saved
 * @apiParamExample  {json} Request-E:
 *      {
 *          "code": "1",
 *          "line": "ACCSEH",
 *          "desc": "Agarradera puerta Combi"
 *          "status": 0
 *      }
 * 
 * @apiSuccess {String} _id Key´s _id
 * @apiSuccess {String} code Key identification code
 * @apiSuccess {String} line Line Identifier of the line to which the product belongs
 * @apiSuccess {String} desc Product description
 * @apiSuccess {Array} image Image Array
 * @apiSuccess {Date} createdAt Key creation date
 * 
 * @apiSuccess (Image [Array]) {Number} idN Image identifier number
 * @apiSuccess (Image [Array]) {Number} status Image status that will be saved
 * @apiSuccess (Image [Array]) {String} img Url of Cloudinary
 * @apiSuccess (Image [Array]) {String} publicId Code of Image in Cloudinary
 * 
 * @apiSuccessExample  {json} Success-R:
 *      HTTP/1.1 200 OK
 *      {
 *          "data": {
 *              "_id": "5eb46acb6ef103586032739e",
 *              "code": "0001",
 *              "line": "ACCSEH",
 *              "desc": "Agarradera puerta Combi",
 *              "image": [
 *                  {
 *                      "publicId": null,
 *                      "img": null,
 *                      "status": 0,
 *                      "idN": 0
 *                  },
 *                  {
 *                      "publicId": null,
 *                      "img": null,
 *                      "status": 0,
 *                      "idN": 1
 *                  },
 *                  {
 *                      "publicId": null,
 *                      "img": null,
 *                      "status": 0,
 *                      "idN": 2
 *                  }
 *              ],
 *              "createdAt": "2020-05-07T20:08:43.212Z",
 *              "__v": 0
 *          }
 *      }
 * 
 * @apiuse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse NoContent
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/Key/status')
    .post(authorized, keyController.saveKeyStatus);

/**
 * 
 * @api {post} /key/:id/status Save Status
 * @apiName saveStatus
 * @apiDescription Saves the status of an Image in *Key*
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/5eb46acb6ef103586032739e/status
 * 
 * 
 * @apiuse header
 * 
 * @apiParam (params) {string} id Key´s _id
 * 
 * @apiParam (body) {Number} idN Image identifier number
 * @apiParam (body) {Number} status Image status that will be saved
 * 
 * @apiParamExample  {json} Request-E:
 *      {
 *          "idN": 0,
 *          "status": 0
 *      }
 * 
 * @apiuse SuccessKeyImage
 * 
 * @apiUse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

/**
 * 
 * @api {put} /key/:id/status Update Status
 * @apiName updateStatus
 * @apiDescription Updates the status of a *Key* image if it exists, otherwise it creates it
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/5eb46acb6ef103586032739e/status
 * 
 * 
 * @apiuse header
 * 
 * @apiParam (params) {string} id Key´s _id
 * 
 * @apiParam (body) {Number} idN Image identifier number
 * @apiParam (body) {Number} status Image status that will be saved
 * 
 * @apiParamExample  {json} Request-E:
 *      {
 *          "idN": 0,
 *          "status": 0
 *      }
 * 
 * @apiuse SuccessKeyImage
 * 
 * @apiUse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key/:id/status')
    .post(authorized, keyController.saveStatus)
    .put(authorized, keyController.updateStatus);

/**
 * 
 * @api {delete} /key/:id/status/:idN Delete Status
 * @apiName deleteStatus
 * @apiDescription Delete the Image in *Key*
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/5eb46acb6ef103586032739e/status/0
 * 
 * 
 * @apiuse header
 * 
 * @apiParam (params) {string} id Key´s _id
 * @apiParam (params) {Number} idN Image identifier number
 * 
 * @apiuse SuccessKeyImage
 * 
 * @apiUse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key/:id/status/:idN')
    .delete(authorized, keyController.deleteStatus);

/**
 * 
 * @api {post} /key/:id/image Save Image
 * @apiName saveImage
 * @apiDescription Saves a Image in *Key* and Upload it in Cloudinary service
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/5eb46acb6ef103586032739e/image
 * 
 * 
 * @apiuse header
 * 
 * @apiParam (params) {string} id Key´s _id
 * 
 * @apiParam (form) {Number} idN Image identifier number
 * @apiParam (form) {File} file Image
 * 
 * @apiuse SuccessImage
 * 
 * @apiUse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

/**
 * 
 * @api {put} /key/:id/image Update Image
 * @apiName updateImage
 * @apiDescription Replace a Image in *Key* and Upload it in Cloudinary service, deleting the old one
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/5eb46acb6ef103586032739e/image
 * 
 * 
 * @apiuse header
 * 
 * @apiParam (params) {string} id Key´s _id
 * 
 * @apiParam (form) {Number} idN Image identifier number
 * @apiParam (form) {File} file Image
 * 
 * @apiuse SuccessImage
 * 
 * @apiUse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key/:id/image')
    .post(authorized, keyController.saveImage)
    .put(authAdmin, keyController.updateImage);

/**
 * 
 * @api {delete} /key/:id/image Delete Image
 * @apiName deleteImage
 * @apiDescription Remove an Image in *Key* and delete it in Cludinary
 * @apiGroup Key
 * @apiVersion  0.1.0
 * @apiPermission user
 * @apiExample {url} Example usage:
 *     http://localhost:4000/api/key/5eb46acb6ef103586032739e/image
 * 
 * 
 * @apiuse header
 * 
 * @apiParam (params) {string} id Key´s _id
 * @apiParam (params) {Number} idN Image identifier number
 * 
 * @apiuse SuccessImage
 * 
 * @apiUse BadRequest
 * 
 * @apiuse Conflict
 * 
 * @apiuse NotFound
 * 
 * @apiuse HeaderErrors
 * 
 */

router.route('/key/:id/image/:idN')
    .delete(authAdmin, keyController.deleteImage);

router.route('/reset')
    .get(authAdmin, keyController.resetAllStatus);

router.route('/reset/line/:identifier')
    .post(authAdmin, lineController.resetLineStatus);

router.route('/reset/key/:id')
    .post(authAdmin, keyController.resetKeyStatus);

/*------------------------------------------------------------------*/
// PDF
/*------------------------------------------------------------------*/

router.route('/pdf')
    .get(pdfController.createPdf)
    .post(pdfController.personalizePdf);

router.route('/pdf/data')
    .get(pdfController.pdfData)
    .post(pdfController.personalizePdfData);

/*------------------------------------------------------------------*/

export default router;