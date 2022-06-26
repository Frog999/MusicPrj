const express = require('express')
const app = express()
const router = express.Router()

router.get('/', (req,res) => {
    console.log("logOut user", req.user)
    req.logOut((err) => {
        if (err) {return next(err)}
        res.redirect('/')
    })
})

module.exports = router