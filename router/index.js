const express = require('express')
const app = express()
const router = express.Router()
const main = require('./main')
const signIn = require('./signIn')
const logOut = require('./logOut')
const admin = require('./admin')
const signUp = require('./signUp')

router.use('/', signIn)
router.use('/main', main)
router.use('/logout', logOut)
router.use('/admin', admin)
router.use('/signup', signUp)


module.exports = router;