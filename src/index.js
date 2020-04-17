const express = require('express')
require('./db/mongoose.js')
const User = require('./models/users.js')
const Task = require('./models/tasks.js')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000;


app.post('/users', (req, res) => {
    const newUser = new User(req.body)
    newUser.save().then(() => {
        res.send(newUser)
        console.log(newUser)
    }).catch((error) => {
        res.status(400)
        res.send('Errorrr')

    })
})


app.post('/tasks', (req, res) => {
    const newTask = new Task(req.body)
    newTask.save().then(() => res.send(newTask)).catch((error) => {
        res.status(400)
        res.send('Errrorrrr')
    })
})


app.listen(port, () => {
    console.log('Server up and running')
})