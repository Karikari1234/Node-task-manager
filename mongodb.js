const {
    MongoClient,
    ObjectID
} = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'MyDatabase'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        return console.log('Error !')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Naafiz',
    //     age: 21
    // }, (error, result) => {
    //     if (error)
    //         return console.log('Error in inserting')
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany(
    //     [{
    //         name: 'Karim',
    //         age: 25
    //     }, {
    //         name: 'Rarim',
    //         age: 27
    //     }], (error, result) => {
    //         if (error) {
    //             return console.log('error occured')
    //         }

    //         console.log(result.ops)
    //     }
    // )

    // db.collection('tasks').insertMany(
    //     [{
    //         description: 'Clean the room',
    //         completed: false
    //     }, {
    //         description: 'Wash the dishes',
    //         completed: true
    //     }, {
    //         description: 'Fill water',
    //         completed: true
    //     }], (error, result) => {
    //         if (error) {
    //             return console.log('error occured')
    //         }

    //         console.log(result.ops)
    //     }
    // )

})