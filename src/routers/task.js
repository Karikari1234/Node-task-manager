const express = require('express')
const Task = require('../models/tasks')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const newTask = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await newTask.save()
        res.status(201)
        res.send(newTask)
    } catch (error) {
        res.status(400).send()
    }

})




router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? 1 : -1
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500)
        res.send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({
            _id: _id,
            owner: req.user._id
        })
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500)
        res.send()
    }

})

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const updatedTask = await Task.updateOne({
            _id: _id,
            owner: req.user._id
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

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const deletedTask = await Task.findOneAndRemove({
            _id: _id,
            owner: req.user._id
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