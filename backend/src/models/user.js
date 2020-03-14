'use strict'

/*------------------------------------------------------------------*/
// Modelo de user.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose
const bcryptjs = require('bcryptjs'); //* Calls bcryptjs

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: 'user',
        required: true
    }
});

/*------------------------------------------------------------------*/

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcryptjs.genSalt(Number(process.env.SALT), function (err, salt) {
        if (err) return next(err);
        bcryptjs.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            return next();
        });
    });
});

userSchema.methods.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.password);
};

/*------------------------------------------------------------------*/

module.exports = mongoose.model('User', userSchema);