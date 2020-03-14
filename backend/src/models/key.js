'use strict'

/*------------------------------------------------------------------*/
// Modelo de key.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const keySchema = new Schema({
    code: {
        type: String,
        trim: true,
        // minlength: 4,
        maxlength: 4,
        uppercase: true,
        required: true
    },
    line: {
        type: String,
        ref: 'Line',
        required: true
    },
    desc: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: [{
            img: {
                type: String,
                required: () => { return this.status === 5; }
            },
            status: {
                type: Number,
                default: 0,
                min: 0,
                max: 5,
                required: true
            }
        }],
        maxlength: 3
    },
    conf: {
        type: Boolean,
        default: false,
        required: true
    }
});

/*------------------------------------------------------------------*/

keySchema.pre('save', function (next) {
    const key = this;
    const length = key.code.length;
    // if (!key.isModified('code')) return next();
    for (let i = 0; i < (4 - length); i++) {
        key.code = '0' + key.code
    }

    return next();
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Key', keySchema);