const express = require('express')
const app = express()
const router = require('./router/index')
const session = require('express-session')
const passport = require('passport');
const flash = require('connect-flash')


app.listen(3005, () => {
    console.log("Server is Running...")
})


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(session({
    secret: 'pepe the frog',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(router)