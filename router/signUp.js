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

router.post('/', (req,res) => {
    id = req.body.id
    password = req.body.password
    connection.query('select * from acceptqueue where id = ?', [id], (err, rows) => {
        if (err) console.log(err)
        if(rows.length){
            res.render('signup', {'message': '이미 사용중인 아이디 입니다.'})
        }else {
            sql = {id: id, password: password, name: req.body.name}
            query = connection.query('insert into acceptqueue set ?', sql, (err,rows) => {              
                if(err) throw err
                else res.redirect('/')
            })
        }
    })
}
)

module.exports = router