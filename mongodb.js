const {
    MongoClient,
    ObjectID
} = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'MyDatabase'


MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        return console.log('Error !')
    }

    const db = client.db(databaseName)

    const updatePromise = db.collection('users').updateOne({
        age: 21
    }, {
        $set: {
            name: 'XYZ'
        }
    })

    updatePromise.then((result) => console.log(result)).catch((error) => console.log(error))


})