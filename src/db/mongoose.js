const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age is invalid')
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is incorrect')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (value.toLowerCase().search('password') != -1) {
//                 throw new Error('Password incorrect')
//             }
//         }
//     }
// })


// const me = new User({
//     name: 'Rahim',
//     age: 22,
//     email: 'youremail@xyz.com',
//     password: '1234'
// })
// me.save().then(() => console.log(me)).catch((error) => console.log('Error occured', error))

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })


// const newTask = new Task({
//     description: '  Make Breakfast',
// })

// newTask.save().then(() => console.log(newTask)).catch((error) => console.log(error))