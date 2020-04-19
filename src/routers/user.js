const express = require('express')
const User = require('../models/users')
const router = new express.Router()




router.post('/users', async (req, res) => {
    const newUser = new User(req.body)

    try {
        await newUser.save()
        const token = await newUser.generateAuthToken()
        res.status(201)
        res.send(newUser)
    } catch (error) {
        res.status(400).send()
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500)
        res.send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500)
        res.send()
    }

})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send('Bad request')
    }

    try {

        const updatedUser = await User.findById(req.params.id)

        updates.forEach((update) => {
            updatedUser[update] = req.body[update]
        })
        await updatedUser.save()
        // const updatedUser = await User.updateOne({
        //     _id: _id
        // }, req.body)

        if (!updatedUser) {
            return res.status(404).send()
        }

        res.send(updatedUser)
    } catch (error) {
        res.status(500)
        res.send()
    }
})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const deletedUser = await User.findByIdAndRemove({
            _id: _id
        })
        if (!deletedUser) {
            return res.status(404).send()
        }

        res.send(deletedUser)
    } catch (error) {
        res.status(500)
        res.send()
    }
})

router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        if (!user) {
            res.status(400).send('Bad Request')
        }


        res.send({
            user,
            token
        })

    } catch (error) {
        res.status(400).send('Bad Request')
    }

})

module.exports = router