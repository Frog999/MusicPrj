const express = require('express')
const app = express()
const router = express.Router()
const mariadb = require('mysql')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;

const connection = mariadb.createConnection({
    host: 'localhost',
    port: 3309,
    user: 'root',
    password: '1234',
    database: 'music'
})
connection.connect()


router.get('/', (req,res) => {
    if(!req.user) res.redirect('/')
    else{
        let result = false;
        connection.query("select rank from user where id = ?", [req.user], (err,rows) => {
            if(err) throw err
            if(rows[0].rank == 'admin') result = true
            if(result) res.render('admin')
            else res.redirect('/main')
        })
    }
})


module.exports = router