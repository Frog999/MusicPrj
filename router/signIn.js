const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const mariadb = require('mysql')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;

const connection = mariadb.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'aa33562759',
    database: 'music'
})
connection.connect();

router.get('/', (req,res) => {
    let msg
    let errMsg = req.flash('error')
    if (errMsg) msg = errMsg
    console.log('index Page loaded')
    res.render('index')
})

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, id)
})

passport.use('local-login', new localStrategy({
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: true
}, (req, id, password, done) => {
    let sql = {id: id, password: password}
    let query = connection.query('select * from user where id = ? and password = ?;', [id],[password],
    (err, rows) => {
        if (err) return done(err);
        if(rows.length){
            return done(null, {'id': id, 'password': password})
        }else {
            return done(null, false, {'message': 'DB에서 해당 정보를 확인할 수 없습니다.'})
        }
    })
}))
router.post('/', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) res.status(500).json(err)
        if(!user) return res.status(401).json(info.message)

        req.logIn(user, (err) => {
            if (err) return next(err)
            return res.json(user)
        })
    })(req, res, next)
})

module.exports = router;