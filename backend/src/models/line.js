'use strict'

/*------------------------------------------------------------------*/
// Modelo de line.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose
const mongoosePaginate = require('mongoose-paginate-v2'); //* Calls mongoose-paginate-v2

const Schema = mongoose.Schema;

const lineSchema = new Schema({
    _id: {
        type: String,
        trim: true,
        minlength: 6,
        maxlength: 6,
        uppercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    started: {
        type: Date,
        default: Date.now,
        required: true
    },
    ended: {
        type: Date
    }
});

lineSchema.plugin(mongoosePaginate);

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Line', lineSchema);