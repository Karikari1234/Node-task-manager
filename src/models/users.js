const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Task = require('./tasks')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
        unique: true,
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
            if (value.toLowerCase().search('password') !== -1) {
                throw new Error('Password incorrect')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})


userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject

}
userSchema.methods.generateAuthToken = async function () {
    const user = this
    //console.log(user)
    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({
        token
    })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    //console.log("find Creds being called")
    const user = await User.findOne({
        email
    })
    //console.log("user found or not?")
    if (!user) {
        //console.log("not found")
        throw new Error('Unable to log in')
    }
    //console.log("found and match")

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        //console.log("found and password not match")
        throw new Error('Unable to log in')
    }
    // console.log("found and password match")
    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({
        owner: user._id
    })

    next()
})



const User = mongoose.model('User', userSchema)



module.exports = User