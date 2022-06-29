const express = require('express')
const app = express()
const mariadb = require('mysql')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const router = express.Router()

const connection = mariadb.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'aa33562759',
    database: 'music'
})
connection.connect()

router.get('/', (req,res) => {
    let msg
    let errMsg = req.flash('error')
    if (errMsg) msg = errMsg
    res.render('signUp', {'message': msg})
})

passport.serializeUser((user,done) => {
    console.log("ssss")
    done(null, user.id)
})

passport.deserializeUser((id,done)=> {
    done(null, id)
})

passport.use('local-join', new localStrategy({
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: true
}, (req, id, password, done) => {
    let query = connection.query('select * from user where id = ?', [id], (err, rows) => {
        if (err) return done(err)

        if(rows.length){
            console.log("existed user")
            return done(null, false, {message: '이미 사용중인 ID입니다.'})
        }else {
            sql = {id: id, password: password, name: req.body.name}
            query = connection.query('insert into acceptqueue set ?', sql, (err,rows) => {              
                if(err) throw err
                return done(null, {'id': id})
            })
        }
    })
}))

router.post('/', passport.authenticate('local-join', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}))

module.exports = router