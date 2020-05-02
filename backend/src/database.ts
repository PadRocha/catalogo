/*------------------------------------------------------------------*/
// Data Base Connection
/*------------------------------------------------------------------*/

import mongoose, { ConnectionOptions } from 'mongoose';

import config from './config/config';

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    config: { autoIndex: false }
}

mongoose.connect(config.DB.URI, dbOptions, err => {
    if (err) console.error('Error > ', err);
    else console.log('DB Connected');
});