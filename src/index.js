const express = require('express')
require('./db/mongoose.js')
const User = require('./models/users.js')
const Task = require('./models/tasks.js')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000;


app.post('/users', async (req, res) => {
    const newUser = new User(req.body)

    try {
        await newUser.save()
        res.status(201)
        res.send(newUser)
    } catch (error) {
        res.status(400).send()
    }
})


app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body)

    try {
        await newTask.save()
        res.status(201)
        res.send(newTask)
    } catch (error) {
        res.status(400).send()
    }

})


app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500)
        res.send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404)
        }

        res.send(user)
    } catch (error) {
        res.status(500)
        res.send()
    }

})


app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500)
        res.send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404)
        }

        res.send(task)
    } catch (error) {
        res.status(500)
        res.send()
    }

})


app.listen(port, () => {
    console.log('Server up and running')
})