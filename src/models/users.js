const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Age is invalid')
            }
        }
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is incorrect')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().search('password') != -1) {
                throw new Error('Password incorrect')
            }
        }
    }
})

module.exports = User