// User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
