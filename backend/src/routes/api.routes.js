'use strict'

/*------------------------------------------------------------------*/
// Api Routes
/*------------------------------------------------------------------*/

const router = require('express').Router(); //* Calls the Router of express

const mdAuth = require('../middlewares/auth'); //* Calls Security

router.route('/')
    .get();

/*------------------------------------------------------------------*/

module.exports = router;