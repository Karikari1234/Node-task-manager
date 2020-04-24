const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            return cb(new Error('Please upload an image file'))
        }

        cb(undefined, true)
    }
})
const router = new express.Router()




router.post('/users', async (req, res) => {
    const newUser = new User(req.body)

    try {
        await newUser.save()
        const token = await newUser.generateAuthToken()
        res.status(201).send({
            newUser,
            token
        })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/me/avators', auth, upload.single('avator'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send('Success')
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

router.delete('/users/me/avators', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send('User Profile Picture deleted')
})

router.get('/users/me/avators', auth, async (req, res) => {
    res.set('Content-Type', 'image/jpg')
    if (!req.user.avatar) {
        res.status(404).send()
    }
    res.send(req.user.avatar)
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }

})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }

})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})



router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send('Bad request')
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500)
        res.send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
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