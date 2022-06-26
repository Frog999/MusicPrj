const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')

router.get('/',(req,res) => {
    console.log('main', req.user)
    if(!req.user) res.redirect('/')
    else res.render('main')
})

module.exports = router;