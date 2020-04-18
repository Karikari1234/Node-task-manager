const express = require('express')
const Task = require('../models/tasks')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body)

    try {
        await newTask.save()
        res.status(201)
        res.send(newTask)
    } catch (error) {
        res.status(400).send()
    }

})




router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500)
        res.send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500)
        res.send()
    }

})

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const updatedTask = await Task.updateOne({
            _id: _id
        }, req.body)
        if (!updatedTask) {
            return res.status(404).send('Not Found')
        }

        res.send(updatedTask)
    } catch (error) {
        res.status(500)
        res.send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const deletedTask = await Task.findByIdAndRemove({
            _id: _id
        })
        if (!deletedTask) {
            return res.status(404).send()
        }

        res.send(deletedTask)
    } catch (error) {
        res.status(500)
        res.send()
    }
})

module.exports = router