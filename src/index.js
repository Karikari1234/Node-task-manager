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
        res.status(201)
        res.send(newUser)
        console.log(newUser)
    }).catch((error) => {
        res.status(400)
        res.send('Errorrr')

    })
})


app.post('/tasks', (req, res) => {
    const newTask = new Task(req.body)
    newTask.save().then(() => {
        res.status(201)
        res.send(newTask)
    }).catch((error) => {
        res.status(400)
        res.send('Errrorrrr')
    })
})


app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500)
        res.send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404)
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})


app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500)
        res.send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404)
        }

        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})


app.listen(port, () => {
    console.log('Server up and running')
})