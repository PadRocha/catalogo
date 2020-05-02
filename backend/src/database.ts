/*------------------------------------------------------------------*/
// Data Base Connection
/*------------------------------------------------------------------*/

import mongoose, { ConnectionOptions } from 'mongoose';
const fmt = require('fmt');

import config from './config/config';

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    config: { autoIndex: false }
}

mongoose.connect(config.DB.URI, dbOptions, err => {
    if (err) console.error('\x1b[37mDB: \x1b[31merror >\x1b[0m', err);
    else fmt.field('\x1b[37mDB', '\x1b[33mconnected\x1b[0m');
    fmt.sep();
});