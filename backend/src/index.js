'use strict'

require('dotenv').config();

require('./database');

const app = require('./app'); //* Calls app

(async () => {
    await app.listen(app.get('port'));
    console.info('server', app.get('port'));
})();