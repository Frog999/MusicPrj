const express = require('express')
const app = express()
const router = express.Router()
const main = require('./main')
const signIn = require('./signIn')

router.use('/', signIn)
router.use('/main', main)

module.exports = router;