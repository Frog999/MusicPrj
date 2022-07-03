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
    if(!req.user) res.redirect('/')
    else{
        let result = false;
        connection.query("select rank from user where id = ?", [req.user], (err,rows) => {
            if(err) throw err
            if(rows[0].rank == 'admin') result = true
            if(!result) res.redirect('/main')
            else {
                connection.query("select id, name, date from acceptqueue", (err, result) => {
                    if (err) res.send(err)
                    else res.render('admin', {data: result})
                })
            }
        })
    }
})

router.post('/accept', (req, res) => {
    let id = req.body.id
    connection.query('insert into user(id, name, password) select id, name, password from acceptqueue where id =?;', id,
    (err, rows) => {
        if (err) console.log(err)
        else {
            connection.query('delete from acceptqueue where id =?', id,
            (err, rows) => {
                if(err) console.log(err)
                else res.redirect('/admin')
            })
            
        }
    })
})

router.post('/reject', (req,res) => {
    let id = req.body.id
    connection.query('delete from acceptqueue where id = ? ', id,
    (err, rows) => {
        if (err) console.log(err)
        else res.redirect('/admin')
    })
})

module.exports = router