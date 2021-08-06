const express = require('express')
const router = express.Router()
const login = require('../../models/login')

router.get('/', (req , res) =>　{
    res.render('index')
})

router.post('/', (req, res) => {
    login.find({ email : req.body.inputEmail })
      .lean()
      .then(user => {
        if(!user[0]) {
            const alert = '此email尚未註冊'
            res.render('index', { alert })
        }else if (user[0].password !== req.body.inputPassword) {
            const alert = '請輸入正確的密碼'
            res.render('index', { alert })
        }else {
            res.render('success', { firstName : user[0].firstName })
        }
      })
      .catch(error => console.log(error))
})

module.exports = router