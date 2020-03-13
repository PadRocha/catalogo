'use strict'

require('dotenv').config();

require('./database');

const app = require('./app'); //* Calls app

(async () => {
    await app.listen(app.get('port'));
    console.log('server', app.get('port'));
})();