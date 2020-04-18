const User = require('../src/models/users')


User.findByIdAndUpdate('5e99e8be34226cb5f860ed90', {
    age: 22
}).then((user) => {
    console.log(user)
    return User.countDocuments({
        age: 22
    })
}).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log('error occured')
})