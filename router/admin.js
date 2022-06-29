const express = require('express')
const app = express()
const router = express.Router()
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
connection.connect()

router.get('/', (req,res) => {
    connection.query("select id, name, date from acceptqueue", (err, result) => {
        if (err) res.send(err)
        else res.render('admin', {data: result})
    })
    // if(!req.user) res.redirect('/')
    // else{
    //     let result = false;
    //     connection.query("select rank from user where id = ?", [req.user], (err,rows) => {
    //         if(err) throw err
    //         if(rows[0].rank == 'admin') result = true
    //         if(!result) res.redirect('/main')
    //         else {
    //             connection.query("select id, name, date from acceptqueue", (err, result) => {
    //                 if (err) res.send(err)
    //                 else res.render('admin', {data: result})
    //             })
    //         }
    //     })
    // }
})


module.exports = router