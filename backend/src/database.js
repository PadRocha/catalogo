'use strict'

/*------------------------------------------------------------------*/
// Data Base Connection
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose
const mongoosePaginate = require('mongoose-paginate-v2'); //* Calls mongoose-paginate-v2

mongoose.plugin(mongoosePaginate);

const URI = process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost/database';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, err => {
    if (err) console.log('Error > ', err);
    else console.log('DB Connected');
}, { config: { autoIndex: false } });